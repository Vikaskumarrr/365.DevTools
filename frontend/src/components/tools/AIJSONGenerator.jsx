import { useState, useCallback, useMemo } from 'react';
import { FiCopy, FiDownload, FiAlertTriangle, FiCode, FiExternalLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import AIToolWrapper from '../common/AIToolWrapper';
import { useAITool } from '../../context/AIToolContext';

/**
 * JSON generation type options
 * Validates: Requirements 6.2
 */
const JSON_TYPE_OPTIONS = [
    { value: 'schema', label: 'JSON Schema', description: 'Generate a JSON Schema definition' },
    { value: 'sample', label: 'Sample Data', description: 'Generate sample JSON data objects' }
];

/**
 * Prompt templates for JSON generation
 * Validates: Requirements 6.1, 6.2
 */
const promptTemplates = {
    system: `You are a JSON expert. Generate valid, well-structured JSON based on natural language descriptions. Always ensure the output is valid JSON that can be parsed without errors.`,
    
    schema: `Generate a JSON Schema for: {description}

Respond with ONLY valid JSON Schema (no markdown code blocks, no explanations before or after). The schema should follow JSON Schema draft-07 or later specification and include:
- Appropriate type definitions
- Required fields where applicable
- Descriptions for fields
- Any relevant constraints (minLength, maxLength, minimum, maximum, pattern, etc.)`,
    
    sample: `Generate {count} sample JSON object(s) for: {description}

Respond with ONLY valid JSON (no markdown code blocks, no explanations before or after). 
- If generating multiple objects, return them as a JSON array
- If generating a single object, return just the object
- Use realistic, varied sample data
- Ensure all values are appropriate for their fields`
};

/**
 * Parse and validate JSON from AI response
 * Validates: Requirements 6.1, 6.4
 * 
 * @param {string} response - Raw AI response text
 * @returns {Object} Parsed result with json, formatted, and error fields
 */
function parseJSONResponse(response) {
    const result = {
        json: null,
        formatted: '',
        error: null,
        isValid: false
    };

    try {
        // Clean up the response - remove markdown code blocks if present
        let cleanedResponse = response.trim();
        
        // Remove markdown code blocks
        if (cleanedResponse.startsWith('```json')) {
            cleanedResponse = cleanedResponse.slice(7);
        } else if (cleanedResponse.startsWith('```')) {
            cleanedResponse = cleanedResponse.slice(3);
        }
        
        if (cleanedResponse.endsWith('```')) {
            cleanedResponse = cleanedResponse.slice(0, -3);
        }
        
        cleanedResponse = cleanedResponse.trim();

        // Try to parse the JSON
        const parsed = JSON.parse(cleanedResponse);
        result.json = parsed;
        result.formatted = JSON.stringify(parsed, null, 2);
        result.isValid = true;
    } catch (error) {
        result.error = error.message;
        result.formatted = response; // Show raw response if parsing fails
    }

    return result;
}

/**
 * AI JSON Generator Content Component
 * 
 * Implements the core JSON generation functionality.
 * Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7
 */
function AIJSONGeneratorContent() {
    const { aiService, rateLimiter, setLoading, setError } = useAITool();
    
    // Component state
    const [description, setDescription] = useState('');
    const [jsonType, setJsonType] = useState('schema');
    const [arrayCount, setArrayCount] = useState(3);
    const [isProcessing, setIsProcessing] = useState(false);
    
    // Result state
    const [result, setResult] = useState(null);

    /**
     * Estimate token count for input
     */
    const estimatedTokens = useMemo(() => {
        return aiService.estimateTokens(description);
    }, [description, aiService]);

    /**
     * Check if generate button should be disabled
     * Validates: Requirements 6.1
     */
    const isSubmitDisabled = useMemo(() => {
        return !description.trim() || isProcessing;
    }, [description, isProcessing]);

    /**
     * Handle generate button click
     * Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5
     */
    const handleGenerate = useCallback(async () => {
        if (isSubmitDisabled) return;

        setIsProcessing(true);
        setLoading(true);
        setResult(null);

        try {
            // Check rate limiter
            if (!rateLimiter.canMakeRequest(estimatedTokens)) {
                const waitTime = rateLimiter.getWaitTime();
                throw {
                    type: 'rate_limit',
                    message: `Rate limit reached. Please wait ${Math.ceil(waitTime / 1000)} seconds.`,
                    retryable: true
                };
            }

            // Build prompt based on type
            let userPrompt;
            if (jsonType === 'schema') {
                userPrompt = promptTemplates.schema.replace('{description}', description);
            } else {
                userPrompt = promptTemplates.sample
                    .replace('{count}', arrayCount.toString())
                    .replace('{description}', description);
            }

            // Make API call
            const response = await aiService.complete({
                prompt: userPrompt,
                systemPrompt: promptTemplates.system,
                maxTokens: 2048,
                temperature: 0.3
            });

            // Record usage
            rateLimiter.recordRequest(response.tokensUsed.total);

            // Parse response
            const parsedResult = parseJSONResponse(response.content);
            setResult({
                ...parsedResult,
                type: jsonType
            });
            
            if (parsedResult.isValid) {
                toast.success('JSON generated successfully!');
            } else {
                toast.error('Generated output has JSON syntax errors');
            }

        } catch (error) {
            console.error('[AIJSONGenerator] Error:', error);
            setError(error);
            toast.error(error.message || 'Failed to generate JSON');
        } finally {
            setIsProcessing(false);
            setLoading(false);
        }
    }, [description, jsonType, arrayCount, isSubmitDisabled, aiService, rateLimiter, estimatedTokens, setLoading, setError]);

    /**
     * Copy JSON to clipboard
     * Validates: Requirements 6.6
     */
    const handleCopy = useCallback(() => {
        if (!result?.formatted) return;
        
        navigator.clipboard.writeText(result.formatted)
            .then(() => toast.success('JSON copied to clipboard!'))
            .catch(() => toast.error('Failed to copy'));
    }, [result]);

    /**
     * Download JSON as file
     * Validates: Requirements 6.6
     */
    const handleDownload = useCallback(() => {
        if (!result?.formatted) return;
        
        const filename = jsonType === 'schema' ? 'schema.json' : 'data.json';
        const blob = new Blob([result.formatted], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        toast.success(`Downloaded ${filename}`);
    }, [result, jsonType]);

    /**
     * Clear all input and output
     */
    const handleClear = useCallback(() => {
        setDescription('');
        setResult(null);
    }, []);

    /**
     * Handle array count change with validation
     */
    const handleArrayCountChange = useCallback((e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 1 && value <= 100) {
            setArrayCount(value);
        }
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    AI JSON Generator
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Generate JSON schemas or sample data from natural language descriptions using AI.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Section */}
                <section className="space-y-4" aria-labelledby="input-heading">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                        <h2 id="input-heading" className="font-semibold text-gray-900 dark:text-white">
                            Data Description
                        </h2>
                        <div className="flex items-center gap-4">
                            {/* Type Selector */}
                            <div className="flex items-center gap-2">
                                <label htmlFor="type-select" className="text-sm text-gray-700 dark:text-gray-300">
                                    Type:
                                </label>
                                <select
                                    id="type-select"
                                    value={jsonType}
                                    onChange={(e) => setJsonType(e.target.value)}
                                    className="input-field w-36"
                                    aria-label="Select JSON generation type"
                                    disabled={isProcessing}
                                >
                                    {JSON_TYPE_OPTIONS.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Type Description */}
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {JSON_TYPE_OPTIONS.find(o => o.value === jsonType)?.description}
                    </p>

                    {/* Array Count Input - Only show for sample data */}
                    {jsonType === 'sample' && (
                        <div className="flex items-center gap-2">
                            <label htmlFor="array-count" className="text-sm text-gray-700 dark:text-gray-300">
                                Number of items:
                            </label>
                            <input
                                id="array-count"
                                type="number"
                                min="1"
                                max="100"
                                value={arrayCount}
                                onChange={handleArrayCountChange}
                                className="input-field w-20"
                                disabled={isProcessing}
                                aria-label="Number of sample items to generate"
                            />
                            <span className="text-xs text-gray-400 dark:text-gray-500">
                                (1-100)
                            </span>
                        </div>
                    )}

                    {/* Description Input */}
                    <label htmlFor="description-input" className="sr-only">
                        Describe the JSON structure you want to generate
                    </label>
                    <textarea
                        id="description-input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={jsonType === 'schema' 
                            ? "Describe the data structure, e.g., 'a user profile with name, email, age, and list of hobbies' or 'an e-commerce product with title, price, description, and categories'"
                            : "Describe the data you want, e.g., 'user profiles with realistic names and emails' or 'product listings for an electronics store'"
                        }
                        className="input-field min-h-[150px] font-sans text-sm"
                        disabled={isProcessing}
                    />

                    {/* Token Estimate */}
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                        Estimated tokens: ~{estimatedTokens.toLocaleString()}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={handleGenerate}
                            disabled={isSubmitDisabled}
                            className="btn-primary flex-1 flex items-center justify-center gap-2"
                            aria-busy={isProcessing}
                        >
                            {isProcessing ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                                    <span>Generating...</span>
                                </>
                            ) : (
                                <>
                                    <FiCode className="w-4 h-4" aria-hidden="true" />
                                    <span>Generate JSON</span>
                                </>
                            )}
                        </button>
                        <button
                            onClick={handleClear}
                            disabled={(!description && !result) || isProcessing}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Clear all input and output"
                        >
                            Clear
                        </button>
                    </div>
                </section>

                {/* Output Section */}
                <section className="space-y-4" aria-labelledby="output-heading">
                    <div className="flex justify-between items-center">
                        <h2 id="output-heading" className="font-semibold text-gray-900 dark:text-white">
                            Generated JSON
                            {result && (
                                <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                                    ({result.type === 'schema' ? 'Schema' : 'Sample Data'})
                                </span>
                            )}
                        </h2>
                        {result && (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleCopy}
                                    className="text-primary-500 hover:text-primary-600 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    aria-label="Copy JSON to clipboard"
                                    title="Copy to clipboard"
                                >
                                    <FiCopy size={20} aria-hidden="true" />
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="text-primary-500 hover:text-primary-600 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    aria-label="Download JSON file"
                                    title="Download JSON"
                                >
                                    <FiDownload size={20} aria-hidden="true" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Result Display */}
                    {result ? (
                        <div className="space-y-4">
                            {/* Validation Status */}
                            {!result.isValid && (
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <FiAlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                        <div>
                                            <h3 className="font-semibold text-yellow-800 dark:text-yellow-300">
                                                JSON Validation Error
                                            </h3>
                                            <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                                                {result.error}
                                            </p>
                                            <p className="text-xs text-yellow-600 dark:text-yellow-500 mt-2">
                                                The AI response could not be parsed as valid JSON. Try regenerating or editing manually.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* JSON Output */}
                            <div className="bg-gray-900 dark:bg-gray-950 rounded-lg overflow-hidden">
                                <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
                                    <span className="text-xs text-gray-400 uppercase tracking-wide">
                                        {result.type === 'schema' ? 'JSON Schema' : 'Sample Data'}
                                    </span>
                                    {result.isValid && (
                                        <span className="text-xs text-green-400 flex items-center gap-1">
                                            <span className="w-2 h-2 bg-green-400 rounded-full" aria-hidden="true" />
                                            Valid JSON
                                        </span>
                                    )}
                                </div>
                                <pre className="p-4 overflow-auto max-h-[500px] text-sm">
                                    <code className="text-green-400 dark:text-green-300 font-mono whitespace-pre">
                                        {result.formatted}
                                    </code>
                                </pre>
                            </div>

                            {/* Link to JSON Formatter */}
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-blue-500 text-xl" aria-hidden="true">{'{}'}</span>
                                        <div>
                                            <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                                                Need to edit or format further?
                                            </p>
                                            <p className="text-xs text-blue-600 dark:text-blue-400">
                                                Use our JSON Formatter tool for advanced editing
                                            </p>
                                        </div>
                                    </div>
                                    <Link
                                        to="/tools/json-formatter"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
                                    >
                                        <span>Open JSON Formatter</span>
                                        <FiExternalLink className="w-4 h-4" aria-hidden="true" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 min-h-[300px] flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700">
                            <FiCode className="w-12 h-12 mb-4" aria-hidden="true" />
                            <p>Generated JSON will appear here...</p>
                            <p className="text-sm mt-2">
                                Choose between JSON Schema or Sample Data
                            </p>
                        </div>
                    )}
                </section>
            </div>

            {/* Screen reader announcement */}
            {result && (
                <div className="sr-only" aria-live="polite" aria-atomic="true">
                    {result.isValid 
                        ? `JSON ${result.type === 'schema' ? 'schema' : 'sample data'} generated successfully.`
                        : 'JSON generated with validation errors. Please review the output.'
                    }
                </div>
            )}
        </div>
    );
}

/**
 * AI JSON Generator Component
 * 
 * Wraps the content with AIToolWrapper for API key management.
 * Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7
 */
function AIJSONGenerator() {
    return (
        <AIToolWrapper toolName="AI JSON Generator">
            <AIJSONGeneratorContent />
        </AIToolWrapper>
    );
}

export default AIJSONGenerator;
