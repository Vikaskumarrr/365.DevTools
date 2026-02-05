import { useState, useCallback, useMemo } from 'react';
import { FiCopy, FiAlertTriangle, FiFileText } from 'react-icons/fi';
import toast from 'react-hot-toast';
import AIToolWrapper from '../common/AIToolWrapper';
import { useAITool } from '../../context/AIToolContext';

/**
 * Prompt templates for different summary lengths
 * Validates: Requirements 3.2
 */
const promptTemplates = {
    brief: `Summarize the following text in 2-3 concise sentences, capturing only the most essential points:

{input}`,
    standard: `Provide a comprehensive summary of the following text. Include the main ideas, key points, and any important conclusions:

{input}`,
    detailed: `Provide a detailed summary of the following text. Structure your response with:
1. Main thesis/topic
2. Key points (bulleted)
3. Supporting details
4. Conclusions or implications

Text:
{input}`
};

/**
 * Summary length options with descriptions
 */
const summaryLengthOptions = [
    { value: 'brief', label: 'Brief', description: '2-3 sentences' },
    { value: 'standard', label: 'Standard', description: 'Comprehensive summary' },
    { value: 'detailed', label: 'Detailed', description: 'Structured with key points' }
];

/**
 * Context limit configuration
 * Approximate token limits for different models
 */
const CONTEXT_LIMITS = {
    default: 128000, // Most modern models support 128k
    warningThreshold: 0.8 // Warn at 80% of limit
};

/**
 * AI Text Summarizer Content Component
 * 
 * Implements the core summarization functionality.
 * Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7
 */
function AITextSummarizerContent() {
    const { aiService, rateLimiter, setLoading, setError } = useAITool();
    
    // Component state
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [summaryLength, setSummaryLength] = useState('standard');
    const [isProcessing, setIsProcessing] = useState(false);

    /**
     * Calculate character count for input
     * Validates: Requirements 3.6
     */
    const characterCount = useMemo(() => input.length, [input]);

    /**
     * Estimate token count for input
     * Used for context limit warning
     */
    const estimatedTokens = useMemo(() => {
        return aiService.estimateTokens(input);
    }, [input, aiService]);

    /**
     * Check if input exceeds context limit
     * Validates: Requirements 3.7
     */
    const contextLimitWarning = useMemo(() => {
        const limit = CONTEXT_LIMITS.default;
        const threshold = limit * CONTEXT_LIMITS.warningThreshold;
        
        if (estimatedTokens > limit) {
            return {
                type: 'error',
                message: `Input exceeds maximum context length (~${limit.toLocaleString()} tokens). Please shorten your text.`
            };
        } else if (estimatedTokens > threshold) {
            return {
                type: 'warning',
                message: `Input is approaching context limit (~${Math.round((estimatedTokens / limit) * 100)}% of maximum). Consider shortening for best results.`
            };
        }
        return null;
    }, [estimatedTokens]);

    /**
     * Check if summarize button should be disabled
     * Validates: Requirements 3.4
     */
    const isSubmitDisabled = useMemo(() => {
        return !input.trim() || isProcessing || contextLimitWarning?.type === 'error';
    }, [input, isProcessing, contextLimitWarning]);

    /**
     * Handle summarize button click
     * Validates: Requirements 3.1, 3.3
     */
    const handleSummarize = useCallback(async () => {
        if (isSubmitDisabled) return;

        setIsProcessing(true);
        setLoading(true);
        setOutput('');

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

            // Build prompt from template
            const prompt = promptTemplates[summaryLength].replace('{input}', input);

            // Make API call
            const response = await aiService.complete({
                prompt,
                maxTokens: summaryLength === 'brief' ? 256 : summaryLength === 'standard' ? 512 : 1024,
                temperature: 0.5
            });

            // Record usage
            rateLimiter.recordRequest(response.tokensUsed.total);

            // Set output
            setOutput(response.content);
            toast.success('Summary generated successfully!');

        } catch (error) {
            console.error('[AITextSummarizer] Error:', error);
            setError(error);
            toast.error(error.message || 'Failed to generate summary');
        } finally {
            setIsProcessing(false);
            setLoading(false);
        }
    }, [input, summaryLength, isSubmitDisabled, aiService, rateLimiter, estimatedTokens, setLoading, setError]);

    /**
     * Copy summary to clipboard
     * Validates: Requirements 3.5
     */
    const handleCopy = useCallback(() => {
        if (!output) return;
        
        navigator.clipboard.writeText(output)
            .then(() => toast.success('Copied to clipboard!'))
            .catch(() => toast.error('Failed to copy'));
    }, [output]);

    /**
     * Clear all input and output
     */
    const handleClear = useCallback(() => {
        setInput('');
        setOutput('');
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    AI Text Summarizer
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Quickly summarize long text using AI. Choose your preferred summary length.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Section */}
                <section className="space-y-4" aria-labelledby="input-heading">
                    <div className="flex justify-between items-center">
                        <h2 id="input-heading" className="font-semibold text-gray-900 dark:text-white">
                            Input Text
                        </h2>
                        <div className="flex items-center gap-4">
                            {/* Summary Length Selector */}
                            <div className="flex items-center gap-2">
                                <label htmlFor="summary-length" className="text-sm text-gray-700 dark:text-gray-300">
                                    Length:
                                </label>
                                <select
                                    id="summary-length"
                                    value={summaryLength}
                                    onChange={(e) => setSummaryLength(e.target.value)}
                                    className="input-field w-32"
                                    aria-label="Select summary length"
                                    disabled={isProcessing}
                                >
                                    {summaryLengthOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Character Count */}
                            <span 
                                className="text-sm text-gray-500 dark:text-gray-400"
                                aria-label={`${characterCount} characters`}
                            >
                                {characterCount.toLocaleString()} chars
                            </span>
                        </div>
                    </div>

                    {/* Summary Length Description */}
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {summaryLengthOptions.find(o => o.value === summaryLength)?.description}
                    </p>

                    {/* Text Input */}
                    <label htmlFor="text-input" className="sr-only">
                        Enter text to summarize
                    </label>
                    <textarea
                        id="text-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste or type the text you want to summarize..."
                        className="input-field min-h-[400px] font-sans text-sm"
                        aria-describedby={contextLimitWarning ? "context-warning" : undefined}
                        disabled={isProcessing}
                    />

                    {/* Context Limit Warning */}
                    {contextLimitWarning && (
                        <div 
                            id="context-warning"
                            role="alert"
                            aria-live="polite"
                            className={`flex items-start gap-2 p-3 rounded-lg text-sm ${
                                contextLimitWarning.type === 'error'
                                    ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
                                    : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300'
                            }`}
                        >
                            <FiAlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{contextLimitWarning.message}</span>
                        </div>
                    )}

                    {/* Token Estimate */}
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                        Estimated tokens: ~{estimatedTokens.toLocaleString()}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={handleSummarize}
                            disabled={isSubmitDisabled}
                            className="btn-primary flex-1 flex items-center justify-center gap-2"
                            aria-busy={isProcessing}
                        >
                            {isProcessing ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                                    <span>Summarizing...</span>
                                </>
                            ) : (
                                <>
                                    <FiFileText className="w-4 h-4" aria-hidden="true" />
                                    <span>Summarize</span>
                                </>
                            )}
                        </button>
                        <button
                            onClick={handleClear}
                            disabled={(!input && !output) || isProcessing}
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
                            Summary
                        </h2>
                        <button
                            onClick={handleCopy}
                            disabled={!output}
                            className="text-primary-500 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Copy summary to clipboard"
                            title="Copy to clipboard"
                        >
                            <FiCopy size={20} aria-hidden="true" />
                        </button>
                    </div>

                    {/* Output Display */}
                    <label htmlFor="summary-output" className="sr-only">
                        Generated summary
                    </label>
                    <textarea
                        id="summary-output"
                        value={output}
                        readOnly
                        placeholder="Summary will appear here..."
                        className="input-field min-h-[400px] font-sans text-sm bg-gray-50 dark:bg-gray-900"
                        aria-live="polite"
                    />

                    {/* Output Stats */}
                    {output && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Summary: {output.length.toLocaleString()} characters
                        </div>
                    )}

                    {/* Screen reader announcement */}
                    {output && (
                        <div className="sr-only" aria-live="polite" aria-atomic="true">
                            Summary generated successfully. {output.split(/\s+/).length} words.
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

/**
 * AI Text Summarizer Component
 * 
 * Wraps the content with AIToolWrapper for API key management.
 * Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7
 */
function AITextSummarizer() {
    return (
        <AIToolWrapper toolName="AI Text Summarizer">
            <AITextSummarizerContent />
        </AIToolWrapper>
    );
}

export default AITextSummarizer;
