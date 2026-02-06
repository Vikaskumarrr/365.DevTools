import { useState, useCallback, useMemo } from 'react';
import { FiCopy, FiAlertTriangle, FiCode, FiCheck, FiX, FiRefreshCw } from 'react-icons/fi';
import toast from 'react-hot-toast';
import AIToolWrapper from '../common/AIToolWrapper';
import { useAITool } from '../../context/AIToolContext';

/**
 * Regex flavor options
 * Validates: Requirements 5.5
 */
const REGEX_FLAVOR_OPTIONS = [
    { value: 'javascript', label: 'JavaScript', description: 'ECMAScript regex syntax' },
    { value: 'python', label: 'Python', description: 'Python re module syntax' },
    { value: 'pcre', label: 'PCRE', description: 'Perl Compatible Regular Expressions' }
];

/**
 * Prompt templates for regex generation
 * Validates: Requirements 5.1, 5.2, 5.4, 5.5
 */
const promptTemplates = {
    system: `You are a regex expert. Generate regex patterns based on natural language descriptions. Always provide the pattern, explanation, and examples. Be precise and ensure the pattern works correctly for the specified flavor.`,
    
    user: `Generate a {flavor} regex pattern for: {description}

Respond in the following exact format (use these exact headers):

PATTERN:
[the regex pattern here, without delimiters]

FLAGS:
[any flags needed, e.g., g, i, m - or "none" if no flags needed]

EXPLANATION:
[detailed explanation of each part of the regex]

MATCHES:
- [example 1 that should match]
- [example 2 that should match]
- [example 3 that should match]

NON-MATCHES:
- [example 1 that should NOT match]
- [example 2 that should NOT match]
- [example 3 that should NOT match]`
};

/**
 * Parse the AI response into structured regex result
 * Validates: Requirements 5.2, 5.4
 * 
 * @param {string} response - Raw AI response text
 * @returns {Object} Parsed regex result
 */
function parseRegexResponse(response) {
    const result = {
        pattern: '',
        flags: '',
        explanation: '',
        examples: {
            matches: [],
            nonMatches: []
        }
    };

    try {
        // Extract pattern
        const patternMatch = response.match(/PATTERN:\s*\n([^\n]+)/i);
        if (patternMatch) {
            result.pattern = patternMatch[1].trim();
        }

        // Extract flags
        const flagsMatch = response.match(/FLAGS:\s*\n([^\n]+)/i);
        if (flagsMatch) {
            const flags = flagsMatch[1].trim().toLowerCase();
            result.flags = flags === 'none' ? '' : flags;
        }

        // Extract explanation
        const explanationMatch = response.match(/EXPLANATION:\s*\n([\s\S]*?)(?=\n(?:MATCHES:|NON-MATCHES:|$))/i);
        if (explanationMatch) {
            result.explanation = explanationMatch[1].trim();
        }

        // Extract matches
        const matchesMatch = response.match(/MATCHES:\s*\n([\s\S]*?)(?=\n(?:NON-MATCHES:|$))/i);
        if (matchesMatch) {
            const matchLines = matchesMatch[1].split('\n')
                .map(line => line.replace(/^[-*]\s*/, '').trim())
                .filter(line => line.length > 0);
            result.examples.matches = matchLines.slice(0, 5); // Limit to 5 examples
        }

        // Extract non-matches
        const nonMatchesMatch = response.match(/NON-MATCHES:\s*\n([\s\S]*?)$/i);
        if (nonMatchesMatch) {
            const nonMatchLines = nonMatchesMatch[1].split('\n')
                .map(line => line.replace(/^[-*]\s*/, '').trim())
                .filter(line => line.length > 0);
            result.examples.nonMatches = nonMatchLines.slice(0, 5); // Limit to 5 examples
        }
    } catch (error) {
        console.error('[AIRegexGenerator] Error parsing response:', error);
    }

    return result;
}

/**
 * Test a string against a regex pattern
 * 
 * @param {string} pattern - Regex pattern
 * @param {string} flags - Regex flags
 * @param {string} testString - String to test
 * @returns {Object} Test result with match status and matches
 */
function testRegex(pattern, flags, testString) {
    try {
        const regex = new RegExp(pattern, flags);
        const matches = testString.match(regex);
        return {
            isMatch: matches !== null,
            matches: matches || [],
            error: null
        };
    } catch (error) {
        return {
            isMatch: false,
            matches: [],
            error: error.message
        };
    }
}

/**
 * AI Regex Generator Content Component
 * 
 * Implements the core regex generation functionality.
 * Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7
 */
function AIRegexGeneratorContent() {
    const { aiService, rateLimiter, setLoading, setError } = useAITool();
    
    // Component state
    const [description, setDescription] = useState('');
    const [flavor, setFlavor] = useState('javascript');
    const [isProcessing, setIsProcessing] = useState(false);
    
    // Result state
    const [result, setResult] = useState(null);
    
    // Test area state
    const [testInput, setTestInput] = useState('');
    const [testResults, setTestResults] = useState(null);

    /**
     * Estimate token count for input
     */
    const estimatedTokens = useMemo(() => {
        return aiService.estimateTokens(description);
    }, [description, aiService]);

    /**
     * Check if generate button should be disabled
     * Validates: Requirements 5.1
     */
    const isSubmitDisabled = useMemo(() => {
        return !description.trim() || isProcessing;
    }, [description, isProcessing]);

    /**
     * Handle generate button click
     * Validates: Requirements 5.1, 5.2, 5.4, 5.5
     */
    const handleGenerate = useCallback(async () => {
        if (isSubmitDisabled) return;

        setIsProcessing(true);
        setLoading(true);
        setResult(null);
        setTestResults(null);

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

            // Get flavor label for display
            const flavorLabel = REGEX_FLAVOR_OPTIONS.find(f => f.value === flavor)?.label || flavor;

            // Build prompt from template
            const userPrompt = promptTemplates.user
                .replace('{flavor}', flavorLabel)
                .replace('{description}', description);

            // Make API call
            const response = await aiService.complete({
                prompt: userPrompt,
                systemPrompt: promptTemplates.system,
                maxTokens: 1024,
                temperature: 0.3
            });

            // Record usage
            rateLimiter.recordRequest(response.tokensUsed.total);

            // Parse response
            const parsedResult = parseRegexResponse(response.content);
            setResult(parsedResult);
            
            toast.success('Regex pattern generated!');

        } catch (error) {
            console.error('[AIRegexGenerator] Error:', error);
            setError(error);
            toast.error(error.message || 'Failed to generate regex');
        } finally {
            setIsProcessing(false);
            setLoading(false);
        }
    }, [description, flavor, isSubmitDisabled, aiService, rateLimiter, estimatedTokens, setLoading, setError]);

    /**
     * Handle test input change and run test
     * Validates: Requirements 5.3
     */
    const handleTestInputChange = useCallback((value) => {
        setTestInput(value);
        
        if (result?.pattern && value) {
            const testResult = testRegex(result.pattern, result.flags, value);
            setTestResults(testResult);
        } else {
            setTestResults(null);
        }
    }, [result]);

    /**
     * Run test on current input
     * Validates: Requirements 5.3
     */
    const handleRunTest = useCallback(() => {
        if (!result?.pattern || !testInput) return;
        
        const testResult = testRegex(result.pattern, result.flags, testInput);
        setTestResults(testResult);
    }, [result, testInput]);

    /**
     * Copy pattern to clipboard
     * Validates: Requirements 5.7
     */
    const handleCopyPattern = useCallback(() => {
        if (!result?.pattern) return;
        
        // Format pattern with delimiters and flags for easy use
        const formattedPattern = result.flags 
            ? `/${result.pattern}/${result.flags}`
            : `/${result.pattern}/`;
        
        navigator.clipboard.writeText(formattedPattern)
            .then(() => toast.success('Pattern copied to clipboard!'))
            .catch(() => toast.error('Failed to copy'));
    }, [result]);

    /**
     * Copy raw pattern (without delimiters) to clipboard
     */
    const handleCopyRawPattern = useCallback(() => {
        if (!result?.pattern) return;
        
        navigator.clipboard.writeText(result.pattern)
            .then(() => toast.success('Raw pattern copied!'))
            .catch(() => toast.error('Failed to copy'));
    }, [result]);

    /**
     * Handle feedback for refinement
     * Validates: Requirements 5.6
     */
    const handleRefine = useCallback(() => {
        // Append refinement request to description
        const refinedDescription = `${description}\n\nPlease refine the pattern. The previous pattern was: ${result?.pattern}`;
        setDescription(refinedDescription);
        toast.success('Description updated. Click Generate to refine the pattern.');
    }, [description, result]);

    /**
     * Clear all input and output
     */
    const handleClear = useCallback(() => {
        setDescription('');
        setResult(null);
        setTestInput('');
        setTestResults(null);
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    AI Regex Generator
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Generate regex patterns from natural language descriptions using AI.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Section */}
                <section className="space-y-4" aria-labelledby="input-heading">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                        <h2 id="input-heading" className="font-semibold text-gray-900 dark:text-white">
                            Pattern Description
                        </h2>
                        <div className="flex items-center gap-2">
                            {/* Flavor Selector */}
                            <label htmlFor="flavor-select" className="text-sm text-gray-700 dark:text-gray-300">
                                Flavor:
                            </label>
                            <select
                                id="flavor-select"
                                value={flavor}
                                onChange={(e) => setFlavor(e.target.value)}
                                className="input-field w-36"
                                aria-label="Select regex flavor"
                                disabled={isProcessing}
                            >
                                {REGEX_FLAVOR_OPTIONS.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Flavor Description */}
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {REGEX_FLAVOR_OPTIONS.find(o => o.value === flavor)?.description}
                    </p>

                    {/* Description Input */}
                    <label htmlFor="description-input" className="sr-only">
                        Describe the pattern you want to match
                    </label>
                    <textarea
                        id="description-input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe what you want to match, e.g., 'an email address' or 'a phone number in format (XXX) XXX-XXXX' or 'a URL starting with https'"
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
                                    <span>Generate Regex</span>
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
                            Generated Regex
                        </h2>
                        {result && (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleCopyPattern}
                                    className="text-primary-500 hover:text-primary-600 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    aria-label="Copy pattern with delimiters"
                                    title="Copy /{pattern}/{flags}"
                                >
                                    <FiCopy size={20} aria-hidden="true" />
                                </button>
                                <button
                                    onClick={handleRefine}
                                    className="text-primary-500 hover:text-primary-600 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    aria-label="Refine pattern"
                                    title="Refine pattern"
                                >
                                    <FiRefreshCw size={20} aria-hidden="true" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Result Display */}
                    {result ? (
                        <div className="space-y-4">
                            {/* Pattern Display */}
                            <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-gray-400 uppercase tracking-wide">Pattern</span>
                                    <button
                                        onClick={handleCopyRawPattern}
                                        className="text-xs text-gray-400 hover:text-gray-300 flex items-center gap-1"
                                        aria-label="Copy raw pattern"
                                    >
                                        <FiCopy size={12} aria-hidden="true" />
                                        Copy raw
                                    </button>
                                </div>
                                <code className="text-green-400 dark:text-green-300 font-mono text-lg break-all">
                                    {result.pattern}
                                </code>
                                {result.flags && (
                                    <div className="mt-2 text-sm text-gray-400">
                                        Flags: <span className="text-yellow-400">{result.flags}</span>
                                    </div>
                                )}
                            </div>

                            {/* Explanation */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                    Explanation
                                </h3>
                                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                    {result.explanation}
                                </p>
                            </div>

                            {/* Examples */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Matches */}
                                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                                    <h3 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2">
                                        <FiCheck className="w-4 h-4" aria-hidden="true" />
                                        Should Match
                                    </h3>
                                    <ul className="space-y-1">
                                        {result.examples.matches.map((example, index) => (
                                            <li key={index} className="text-sm text-green-700 dark:text-green-400 font-mono">
                                                {example}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Non-Matches */}
                                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                                    <h3 className="text-sm font-semibold text-red-800 dark:text-red-300 mb-2 flex items-center gap-2">
                                        <FiX className="w-4 h-4" aria-hidden="true" />
                                        Should NOT Match
                                    </h3>
                                    <ul className="space-y-1">
                                        {result.examples.nonMatches.map((example, index) => (
                                            <li key={index} className="text-sm text-red-700 dark:text-red-400 font-mono">
                                                {example}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 min-h-[200px] flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700">
                            <FiCode className="w-12 h-12 mb-4" aria-hidden="true" />
                            <p>Generated regex will appear here...</p>
                        </div>
                    )}
                </section>
            </div>

            {/* Test Area Section */}
            {result && (
                <section className="mt-8 space-y-4" aria-labelledby="test-heading">
                    <h2 id="test-heading" className="font-semibold text-gray-900 dark:text-white">
                        Test Your Regex
                    </h2>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Test Input */}
                            <div className="space-y-2">
                                <label htmlFor="test-input" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Test String
                                </label>
                                <textarea
                                    id="test-input"
                                    value={testInput}
                                    onChange={(e) => handleTestInputChange(e.target.value)}
                                    placeholder="Enter text to test against the regex..."
                                    className="input-field min-h-[120px] font-mono text-sm"
                                />
                                <button
                                    onClick={handleRunTest}
                                    disabled={!testInput}
                                    className="btn-primary w-full flex items-center justify-center gap-2"
                                >
                                    <FiCode className="w-4 h-4" aria-hidden="true" />
                                    Test Pattern
                                </button>
                            </div>

                            {/* Test Results */}
                            <div className="space-y-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Test Result
                                </span>
                                <div className={`min-h-[120px] rounded-lg p-4 border ${
                                    testResults === null
                                        ? 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700'
                                        : testResults.error
                                            ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
                                            : testResults.isMatch
                                                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                                                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                                }`}>
                                    {testResults === null ? (
                                        <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
                                            <p>Enter text and click Test to see results</p>
                                        </div>
                                    ) : testResults.error ? (
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
                                                <FiAlertTriangle className="w-5 h-5" aria-hidden="true" />
                                                <span className="font-semibold">Invalid Regex</span>
                                            </div>
                                            <p className="text-sm text-yellow-600 dark:text-yellow-400">
                                                {testResults.error}
                                            </p>
                                        </div>
                                    ) : testResults.isMatch ? (
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                                                <FiCheck className="w-5 h-5" aria-hidden="true" />
                                                <span className="font-semibold">Match Found!</span>
                                            </div>
                                            {testResults.matches.length > 0 && (
                                                <div className="mt-2">
                                                    <span className="text-xs text-green-600 dark:text-green-400 uppercase tracking-wide">
                                                        Matches:
                                                    </span>
                                                    <ul className="mt-1 space-y-1">
                                                        {testResults.matches.map((match, index) => (
                                                            <li key={index} className="text-sm font-mono text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded">
                                                                {match}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                                            <FiX className="w-5 h-5" aria-hidden="true" />
                                            <span className="font-semibold">No Match</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Screen reader announcement */}
            {result && (
                <div className="sr-only" aria-live="polite" aria-atomic="true">
                    Regex pattern generated successfully. Pattern: {result.pattern}
                </div>
            )}
        </div>
    );
}

/**
 * AI Regex Generator Component
 * 
 * Wraps the content with AIToolWrapper for API key management.
 * Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7
 */
function AIRegexGenerator() {
    return (
        <AIToolWrapper toolName="AI Regex Generator">
            <AIRegexGeneratorContent />
        </AIToolWrapper>
    );
}

export default AIRegexGenerator;
