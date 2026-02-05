import { useState, useCallback, useMemo } from 'react';
import { FiCopy, FiFileText, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';
import AIToolWrapper from '../common/AIToolWrapper';
import { useAITool } from '../../context/AIToolContext';

/**
 * Writing action options
 * Validates: Requirements 8.2
 */
const WRITING_ACTIONS = [
    { value: 'improve', label: 'Improve Clarity', description: 'Enhance readability and flow' },
    { value: 'grammar', label: 'Fix Grammar', description: 'Correct grammar and spelling' },
    { value: 'concise', label: 'Make Concise', description: 'Shorten while preserving meaning' },
    { value: 'formal', label: 'Make Formal', description: 'Professional, formal tone' },
    { value: 'casual', label: 'Make Casual', description: 'Friendly, conversational tone' }
];

/**
 * Prompt templates for writing actions
 * Validates: Requirements 8.2, 8.6
 */
const promptTemplates = {
    system: `You are a professional writing assistant. Help improve text while preserving code blocks (text between \`\`\` markers) and technical terms exactly as they appear. Only modify the prose, not the code.`,
    
    improve: `Improve the clarity and readability of the following text while preserving its meaning and any code blocks:

{input}

Respond with ONLY the improved text, no explanations.`,
    
    grammar: `Fix any grammar and spelling errors in the following text while preserving code blocks:

{input}

Respond with ONLY the corrected text, no explanations.`,
    
    concise: `Make the following text more concise while preserving the key information and any code blocks:

{input}

Respond with ONLY the concise version, no explanations.`,
    
    formal: `Rewrite the following text in a more formal, professional tone while preserving code blocks:

{input}

Respond with ONLY the formal version, no explanations.`,
    
    casual: `Rewrite the following text in a more casual, conversational tone while preserving code blocks:

{input}

Respond with ONLY the casual version, no explanations.`
};

/**
 * Count words in text
 * Validates: Requirements 8.7
 */
function countWords(text) {
    if (!text || typeof text !== 'string') return 0;
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}


/**
 * AI Writing Assistant Content Component
 * Validates: Requirements 8.1, 8.2, 8.3, 8.5, 8.6, 8.7
 */
function AIWritingAssistantContent() {
    const { aiService, rateLimiter, setLoading, setError } = useAITool();
    
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [selectedActions, setSelectedActions] = useState(['improve']);
    const [isProcessing, setIsProcessing] = useState(false);

    const estimatedTokens = useMemo(() => {
        return aiService.estimateTokens(input);
    }, [input, aiService]);

    const inputWordCount = useMemo(() => countWords(input), [input]);
    const outputWordCount = useMemo(() => countWords(output), [output]);

    const isSubmitDisabled = useMemo(() => {
        return !input.trim() || selectedActions.length === 0 || isProcessing;
    }, [input, selectedActions, isProcessing]);

    const toggleAction = useCallback((action) => {
        setSelectedActions(prev => {
            if (prev.includes(action)) {
                return prev.filter(a => a !== action);
            }
            return [...prev, action];
        });
    }, []);

    const handleProcess = useCallback(async () => {
        if (isSubmitDisabled) return;

        setIsProcessing(true);
        setLoading(true);
        setOutput('');

        try {
            if (!rateLimiter.canMakeRequest(estimatedTokens)) {
                const waitTime = rateLimiter.getWaitTime();
                throw {
                    type: 'rate_limit',
                    message: `Rate limit reached. Please wait ${Math.ceil(waitTime / 1000)} seconds.`,
                    retryable: true
                };
            }

            let currentText = input;

            // Apply actions sequentially
            for (const action of selectedActions) {
                const prompt = promptTemplates[action].replace('{input}', currentText);
                
                const response = await aiService.complete({
                    prompt,
                    systemPrompt: promptTemplates.system,
                    maxTokens: 2048,
                    temperature: 0.3
                });

                rateLimiter.recordRequest(response.tokensUsed.total);
                currentText = response.content.trim();
            }

            setOutput(currentText);
            toast.success('Text processed successfully!');

        } catch (error) {
            console.error('[AIWritingAssistant] Error:', error);
            setError(error);
            toast.error(error.message || 'Failed to process text');
        } finally {
            setIsProcessing(false);
            setLoading(false);
        }
    }, [input, selectedActions, isSubmitDisabled, aiService, rateLimiter, estimatedTokens, setLoading, setError]);

    const handleCopy = useCallback(() => {
        if (!output) return;
        navigator.clipboard.writeText(output)
            .then(() => toast.success('Copied to clipboard!'))
            .catch(() => toast.error('Failed to copy'));
    }, [output]);

    const handleClear = useCallback(() => {
        setInput('');
        setOutput('');
    }, []);


    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    AI Writing Assistant
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Improve your technical writing with AI-powered suggestions.
                </p>
            </header>

            {/* Action Selection */}
            <div className="mb-6">
                <h2 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Select Actions
                </h2>
                <div className="flex flex-wrap gap-2">
                    {WRITING_ACTIONS.map(action => (
                        <button
                            key={action.value}
                            onClick={() => toggleAction(action.value)}
                            disabled={isProcessing}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                                selectedActions.includes(action.value)
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                            title={action.description}
                        >
                            {selectedActions.includes(action.value) && (
                                <FiCheck className="w-4 h-4" />
                            )}
                            {action.label}
                        </button>
                    ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {selectedActions.length > 1 
                        ? `Actions will be applied in order: ${selectedActions.map(a => WRITING_ACTIONS.find(wa => wa.value === a)?.label).join(' → ')}`
                        : 'Select one or more actions to apply'}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Section */}
                <section className="space-y-4" aria-labelledby="input-heading">
                    <div className="flex justify-between items-center">
                        <h2 id="input-heading" className="font-semibold text-gray-900 dark:text-white">
                            Original Text
                        </h2>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {inputWordCount} words
                        </span>
                    </div>

                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter or paste your text here..."
                        className="input-field min-h-[350px] font-sans text-sm"
                        disabled={isProcessing}
                    />

                    <div className="text-xs text-gray-400">
                        Estimated tokens: ~{estimatedTokens.toLocaleString()}
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleProcess}
                            disabled={isSubmitDisabled}
                            className="btn-primary flex-1 flex items-center justify-center gap-2"
                            aria-busy={isProcessing}
                        >
                            {isProcessing ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <FiFileText className="w-4 h-4" />
                                    <span>Process Text</span>
                                </>
                            )}
                        </button>
                        <button
                            onClick={handleClear}
                            disabled={(!input && !output) || isProcessing}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Clear
                        </button>
                    </div>
                </section>


                {/* Output Section */}
                <section className="space-y-4" aria-labelledby="output-heading">
                    <div className="flex justify-between items-center">
                        <h2 id="output-heading" className="font-semibold text-gray-900 dark:text-white">
                            Improved Text
                        </h2>
                        <div className="flex items-center gap-4">
                            {output && (
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {outputWordCount} words
                                </span>
                            )}
                            <button
                                onClick={handleCopy}
                                disabled={!output}
                                className="text-primary-500 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                title="Copy to clipboard"
                            >
                                <FiCopy size={20} />
                            </button>
                        </div>
                    </div>

                    <textarea
                        value={output}
                        readOnly
                        placeholder="Improved text will appear here..."
                        className="input-field min-h-[350px] font-sans text-sm bg-gray-50 dark:bg-gray-900"
                    />

                    {/* Word Count Comparison */}
                    {output && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                            <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">
                                Word Count Comparison
                            </h3>
                            <div className="flex items-center gap-4 text-sm">
                                <div className="text-gray-600 dark:text-gray-400">
                                    Original: <span className="font-semibold text-gray-900 dark:text-white">{inputWordCount}</span>
                                </div>
                                <div className="text-gray-400">→</div>
                                <div className="text-gray-600 dark:text-gray-400">
                                    Improved: <span className="font-semibold text-gray-900 dark:text-white">{outputWordCount}</span>
                                </div>
                                <div className={`font-semibold ${
                                    outputWordCount < inputWordCount 
                                        ? 'text-green-600 dark:text-green-400' 
                                        : outputWordCount > inputWordCount 
                                            ? 'text-yellow-600 dark:text-yellow-400'
                                            : 'text-gray-600 dark:text-gray-400'
                                }`}>
                                    ({outputWordCount < inputWordCount ? '-' : outputWordCount > inputWordCount ? '+' : ''}
                                    {Math.abs(outputWordCount - inputWordCount)} words)
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

function AIWritingAssistant() {
    return (
        <AIToolWrapper toolName="AI Writing Assistant">
            <AIWritingAssistantContent />
        </AIToolWrapper>
    );
}

export default AIWritingAssistant;
