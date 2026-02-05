import { useState, useCallback, useMemo } from 'react';
import { FiCopy, FiAlertTriangle, FiCode } from 'react-icons/fi';
import toast from 'react-hot-toast';
import AIToolWrapper from '../common/AIToolWrapper';
import { useAITool } from '../../context/AIToolContext';

/**
 * Supported programming languages for code explanation
 * Validates: Requirements 4.2, 4.3
 */
const SUPPORTED_LANGUAGES = [
    { value: 'auto', label: 'Auto-detect' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'php', label: 'PHP' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'sql', label: 'SQL' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'bash', label: 'Bash/Shell' },
    { value: 'powershell', label: 'PowerShell' },
    { value: 'yaml', label: 'YAML' },
    { value: 'json', label: 'JSON' },
];

/**
 * Explanation depth options with descriptions
 * Validates: Requirements 4.7
 */
const EXPLANATION_DEPTH_OPTIONS = [
    { value: 'beginner', label: 'Beginner', description: 'Simple explanations, no jargon' },
    { value: 'intermediate', label: 'Intermediate', description: 'Balanced technical detail' },
    { value: 'expert', label: 'Expert', description: 'In-depth technical analysis' }
];

/**
 * Language detection patterns
 * Used for auto-detecting programming language from code
 * Validates: Requirements 4.2
 */
const LANGUAGE_PATTERNS = {
    javascript: [
        /\bconst\s+\w+\s*=/,
        /\blet\s+\w+\s*=/,
        /\bfunction\s+\w+\s*\(/,
        /=>\s*{/,
        /\bconsole\.(log|error|warn)\(/,
        /\brequire\s*\(/,
        /\bmodule\.exports\b/,
        /\bimport\s+.*\s+from\s+['"]/,
        /\bexport\s+(default\s+)?(function|class|const)/,
    ],
    typescript: [
        /:\s*(string|number|boolean|any|void|never)\b/,
        /\binterface\s+\w+/,
        /\btype\s+\w+\s*=/,
        /\benum\s+\w+/,
        /<\w+>/,
        /\bas\s+(string|number|boolean|any)/,
    ],
    python: [
        /\bdef\s+\w+\s*\(/,
        /\bclass\s+\w+.*:/,
        /\bimport\s+\w+/,
        /\bfrom\s+\w+\s+import/,
        /\bif\s+__name__\s*==\s*['"]__main__['"]/,
        /\bprint\s*\(/,
        /\bself\./,
        /:\s*$/m,
        /\bTrue\b|\bFalse\b|\bNone\b/,
    ],
    java: [
        /\bpublic\s+(static\s+)?(void|class|interface)/,
        /\bprivate\s+(static\s+)?(void|class)/,
        /\bSystem\.out\.print/,
        /\bString\[\]\s+args/,
        /\bimport\s+java\./,
        /\bextends\s+\w+/,
        /\bimplements\s+\w+/,
        /@Override/,
    ],
    cpp: [
        /\b#include\s*<.*>/,
        /\bstd::/,
        /\bcout\s*<</,
        /\bcin\s*>>/,
        /\bint\s+main\s*\(/,
        /\bnamespace\s+\w+/,
        /\btemplate\s*</,
        /\bvector\s*</,
        /->/,
    ],
    c: [
        /\b#include\s*<.*\.h>/,
        /\bprintf\s*\(/,
        /\bscanf\s*\(/,
        /\bint\s+main\s*\(/,
        /\bmalloc\s*\(/,
        /\bfree\s*\(/,
        /\bstruct\s+\w+/,
        /\btypedef\s+/,
    ],
    csharp: [
        /\busing\s+System/,
        /\bnamespace\s+\w+/,
        /\bpublic\s+class\s+\w+/,
        /\bConsole\.(WriteLine|ReadLine)/,
        /\bvar\s+\w+\s*=/,
        /\basync\s+Task/,
        /\bawait\s+/,
        /\bLINQ\b/,
    ],
    go: [
        /\bpackage\s+\w+/,
        /\bfunc\s+\w+\s*\(/,
        /\bfmt\.(Print|Println|Printf)/,
        /\bimport\s+\(/,
        /\bgo\s+func/,
        /\bchan\s+\w+/,
        /\bdefer\s+/,
        /:=\s*/,
    ],
    rust: [
        /\bfn\s+\w+\s*\(/,
        /\blet\s+mut\s+/,
        /\bimpl\s+\w+/,
        /\bpub\s+(fn|struct|enum)/,
        /\buse\s+std::/,
        /\bmatch\s+\w+/,
        /\bOption<.*>/,
        /\bResult<.*>/,
        /\bprintln!\s*\(/,
    ],
    ruby: [
        /\bdef\s+\w+/,
        /\bclass\s+\w+/,
        /\bmodule\s+\w+/,
        /\brequire\s+['"]/,
        /\battr_(reader|writer|accessor)/,
        /\bputs\s+/,
        /\bend\s*$/m,
        /\bdo\s*\|/,
    ],
    php: [
        /<\?php/,
        /\$\w+\s*=/,
        /\bfunction\s+\w+\s*\(/,
        /\becho\s+/,
        /\bclass\s+\w+/,
        /\bpublic\s+function/,
        /\bnamespace\s+\w+/,
        /\buse\s+\w+\\/,
    ],
    swift: [
        /\bfunc\s+\w+\s*\(/,
        /\bvar\s+\w+\s*:/,
        /\blet\s+\w+\s*:/,
        /\bclass\s+\w+/,
        /\bstruct\s+\w+/,
        /\bimport\s+\w+/,
        /\bguard\s+let/,
        /\bif\s+let/,
        /\bprint\s*\(/,
    ],
    kotlin: [
        /\bfun\s+\w+\s*\(/,
        /\bval\s+\w+\s*[=:]/,
        /\bvar\s+\w+\s*[=:]/,
        /\bclass\s+\w+/,
        /\bdata\s+class/,
        /\bimport\s+\w+\./,
        /\bprintln\s*\(/,
        /\bwhen\s*\(/,
    ],
    sql: [
        /\bSELECT\s+/i,
        /\bFROM\s+/i,
        /\bWHERE\s+/i,
        /\bINSERT\s+INTO/i,
        /\bUPDATE\s+\w+\s+SET/i,
        /\bDELETE\s+FROM/i,
        /\bCREATE\s+TABLE/i,
        /\bJOIN\s+/i,
        /\bGROUP\s+BY/i,
    ],
    html: [
        /<html/i,
        /<head/i,
        /<body/i,
        /<div/i,
        /<span/i,
        /<script/i,
        /<style/i,
        /<!DOCTYPE/i,
    ],
    css: [
        /\{[\s\S]*?}/,
        /\.[a-zA-Z][\w-]*\s*\{/,
        /#[a-zA-Z][\w-]*\s*\{/,
        /@media\s+/,
        /@import\s+/,
        /:\s*(flex|grid|block|inline)/,
        /background(-color)?:/,
        /margin:|padding:/,
    ],
    bash: [
        /^#!/,
        /\becho\s+/,
        /\bif\s+\[\s*/,
        /\bfor\s+\w+\s+in/,
        /\bwhile\s+/,
        /\bfunction\s+\w+/,
        /\$\{?\w+\}?/,
        /\|\s*grep/,
    ],
    yaml: [
        /^\s*\w+:\s*$/m,
        /^\s*-\s+\w+/m,
        /^\s*\w+:\s+\w+/m,
        /^---\s*$/m,
    ],
    json: [
        /^\s*\{/,
        /^\s*\[/,
        /"[^"]+"\s*:/,
    ],
};

/**
 * Detect programming language from code content
 * Validates: Requirements 4.2
 * 
 * @param {string} code - The code to analyze
 * @returns {string} Detected language or 'javascript' as default
 */
function detectLanguage(code) {
    if (!code || !code.trim()) {
        return 'javascript';
    }

    const scores = {};
    
    // Calculate match scores for each language
    for (const [language, patterns] of Object.entries(LANGUAGE_PATTERNS)) {
        scores[language] = 0;
        for (const pattern of patterns) {
            if (pattern.test(code)) {
                scores[language]++;
            }
        }
    }

    // Find language with highest score
    let maxScore = 0;
    let detectedLanguage = 'javascript';
    
    for (const [language, score] of Object.entries(scores)) {
        if (score > maxScore) {
            maxScore = score;
            detectedLanguage = language;
        }
    }

    // Only return detected language if we have at least 2 matches
    return maxScore >= 2 ? detectedLanguage : 'javascript';
}

/**
 * Prompt templates for code explanation
 * Validates: Requirements 4.1, 4.4, 4.7
 */
const promptTemplates = {
    system: `You are an expert programmer who explains code clearly. Analyze the provided code and explain what it does. If you identify any security issues or potential improvements, include them in your response.`,
    
    user: {
        beginner: `Explain the following {language} code in simple terms that a beginner programmer would understand. Avoid technical jargon and use analogies where helpful:

\`\`\`{language}
{code}
\`\`\`

Provide:
1. A brief overview of what the code does (2-3 sentences)
2. A step-by-step breakdown of the key parts in simple language
3. Any potential issues or improvements (explained simply)`,

        intermediate: `Explain the following {language} code at an intermediate level:

\`\`\`{language}
{code}
\`\`\`

Provide:
1. A brief overview of what the code does
2. A breakdown of the key parts with technical details
3. Any potential security issues or concerns
4. Suggestions for improvements or best practices`,

        expert: `Provide an in-depth technical analysis of the following {language} code:

\`\`\`{language}
{code}
\`\`\`

Provide:
1. A concise overview of the code's purpose and architecture
2. Detailed analysis of algorithms, data structures, and design patterns used
3. Time and space complexity analysis where applicable
4. Security vulnerabilities and potential attack vectors
5. Performance optimization opportunities
6. Code quality and maintainability suggestions
7. Alternative approaches or implementations to consider`
    }
};

/**
 * Context limit configuration
 */
const CONTEXT_LIMITS = {
    default: 128000,
    warningThreshold: 0.8
};

/**
 * AI Code Explainer Content Component
 * 
 * Implements the core code explanation functionality.
 * Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5, 4.7
 */
function AICodeExplainerContent() {
    const { aiService, rateLimiter, setLoading, setError } = useAITool();
    
    // Component state
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('auto');
    const [explanationDepth, setExplanationDepth] = useState('intermediate');
    const [isProcessing, setIsProcessing] = useState(false);

    /**
     * Auto-detect language when code changes
     * Validates: Requirements 4.2
     */
    const detectedLanguage = useMemo(() => {
        return detectLanguage(code);
    }, [code]);

    /**
     * Get the effective language (manual selection or auto-detected)
     * Validates: Requirements 4.2, 4.3
     */
    const effectiveLanguage = useMemo(() => {
        return selectedLanguage === 'auto' ? detectedLanguage : selectedLanguage;
    }, [selectedLanguage, detectedLanguage]);

    /**
     * Calculate character count for input
     */
    const characterCount = useMemo(() => code.length, [code]);

    /**
     * Estimate token count for input
     */
    const estimatedTokens = useMemo(() => {
        return aiService.estimateTokens(code);
    }, [code, aiService]);

    /**
     * Check if input exceeds context limit
     */
    const contextLimitWarning = useMemo(() => {
        const limit = CONTEXT_LIMITS.default;
        const threshold = limit * CONTEXT_LIMITS.warningThreshold;
        
        if (estimatedTokens > limit) {
            return {
                type: 'error',
                message: `Code exceeds maximum context length (~${limit.toLocaleString()} tokens). Please shorten your code.`
            };
        } else if (estimatedTokens > threshold) {
            return {
                type: 'warning',
                message: `Code is approaching context limit (~${Math.round((estimatedTokens / limit) * 100)}% of maximum).`
            };
        }
        return null;
    }, [estimatedTokens]);

    /**
     * Check if explain button should be disabled
     */
    const isSubmitDisabled = useMemo(() => {
        return !code.trim() || isProcessing || contextLimitWarning?.type === 'error';
    }, [code, isProcessing, contextLimitWarning]);

    /**
     * Handle explain button click
     * Validates: Requirements 4.1, 4.4
     */
    const handleExplain = useCallback(async () => {
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

            // Get language label for display
            const languageLabel = SUPPORTED_LANGUAGES.find(l => l.value === effectiveLanguage)?.label || effectiveLanguage;

            // Build prompt from template
            const userPrompt = promptTemplates.user[explanationDepth]
                .replace(/{language}/g, languageLabel)
                .replace('{code}', code);

            // Make API call
            const response = await aiService.complete({
                prompt: userPrompt,
                systemPrompt: promptTemplates.system,
                maxTokens: explanationDepth === 'beginner' ? 1024 : explanationDepth === 'intermediate' ? 2048 : 4096,
                temperature: 0.3
            });

            // Record usage
            rateLimiter.recordRequest(response.tokensUsed.total);

            // Set output
            setOutput(response.content);
            toast.success('Code explanation generated!');

        } catch (error) {
            console.error('[AICodeExplainer] Error:', error);
            setError(error);
            toast.error(error.message || 'Failed to explain code');
        } finally {
            setIsProcessing(false);
            setLoading(false);
        }
    }, [code, effectiveLanguage, explanationDepth, isSubmitDisabled, aiService, rateLimiter, estimatedTokens, setLoading, setError]);

    /**
     * Copy explanation to clipboard
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
        setCode('');
        setOutput('');
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    AI Code Explainer
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Understand unfamiliar code quickly with AI-powered explanations.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Section */}
                <section className="space-y-4" aria-labelledby="input-heading">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                        <h2 id="input-heading" className="font-semibold text-gray-900 dark:text-white">
                            Code Input
                        </h2>
                        <div className="flex flex-wrap items-center gap-4">
                            {/* Language Selector */}
                            <div className="flex items-center gap-2">
                                <label htmlFor="language-select" className="text-sm text-gray-700 dark:text-gray-300">
                                    Language:
                                </label>
                                <select
                                    id="language-select"
                                    value={selectedLanguage}
                                    onChange={(e) => setSelectedLanguage(e.target.value)}
                                    className="input-field w-36"
                                    aria-label="Select programming language"
                                    disabled={isProcessing}
                                >
                                    {SUPPORTED_LANGUAGES.map(lang => (
                                        <option key={lang.value} value={lang.value}>
                                            {lang.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Explanation Depth Selector */}
                            <div className="flex items-center gap-2">
                                <label htmlFor="depth-select" className="text-sm text-gray-700 dark:text-gray-300">
                                    Depth:
                                </label>
                                <select
                                    id="depth-select"
                                    value={explanationDepth}
                                    onChange={(e) => setExplanationDepth(e.target.value)}
                                    className="input-field w-36"
                                    aria-label="Select explanation depth"
                                    disabled={isProcessing}
                                >
                                    {EXPLANATION_DEPTH_OPTIONS.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Language and Depth Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        {selectedLanguage === 'auto' && code.trim() && (
                            <span className="flex items-center gap-1">
                                <FiCode className="w-4 h-4" aria-hidden="true" />
                                Detected: <strong className="text-gray-700 dark:text-gray-300">
                                    {SUPPORTED_LANGUAGES.find(l => l.value === detectedLanguage)?.label || detectedLanguage}
                                </strong>
                            </span>
                        )}
                        <span>
                            {EXPLANATION_DEPTH_OPTIONS.find(o => o.value === explanationDepth)?.description}
                        </span>
                    </div>

                    {/* Code Input - with syntax highlighting styling */}
                    <label htmlFor="code-input" className="sr-only">
                        Enter code to explain
                    </label>
                    <textarea
                        id="code-input"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Paste or type the code you want explained..."
                        className="input-field min-h-[400px] font-mono text-sm bg-gray-900 dark:bg-gray-950 text-green-400 dark:text-green-300 placeholder-gray-500"
                        aria-describedby={contextLimitWarning ? "context-warning" : undefined}
                        disabled={isProcessing}
                        spellCheck="false"
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

                    {/* Stats */}
                    <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500">
                        <span>{characterCount.toLocaleString()} characters</span>
                        <span>~{estimatedTokens.toLocaleString()} tokens</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={handleExplain}
                            disabled={isSubmitDisabled}
                            className="btn-primary flex-1 flex items-center justify-center gap-2"
                            aria-busy={isProcessing}
                        >
                            {isProcessing ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                                    <span>Analyzing...</span>
                                </>
                            ) : (
                                <>
                                    <FiCode className="w-4 h-4" aria-hidden="true" />
                                    <span>Explain Code</span>
                                </>
                            )}
                        </button>
                        <button
                            onClick={handleClear}
                            disabled={(!code && !output) || isProcessing}
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
                            Explanation
                        </h2>
                        <button
                            onClick={handleCopy}
                            disabled={!output}
                            className="text-primary-500 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Copy explanation to clipboard"
                            title="Copy to clipboard"
                        >
                            <FiCopy size={20} aria-hidden="true" />
                        </button>
                    </div>

                    {/* Output Display */}
                    <div 
                        className="bg-white dark:bg-gray-800 rounded-lg p-6 min-h-[400px] overflow-auto border border-gray-200 dark:border-gray-700"
                        aria-live="polite"
                    >
                        {output ? (
                            <div className="prose dark:prose-invert max-w-none text-sm">
                                {/* Render output with basic formatting */}
                                {output.split('\n').map((line, index) => {
                                    // Handle headers
                                    if (line.startsWith('# ')) {
                                        return <h3 key={index} className="text-lg font-bold mt-4 mb-2 text-gray-900 dark:text-white">{line.slice(2)}</h3>;
                                    }
                                    if (line.startsWith('## ')) {
                                        return <h4 key={index} className="text-base font-semibold mt-3 mb-2 text-gray-800 dark:text-gray-200">{line.slice(3)}</h4>;
                                    }
                                    if (line.startsWith('### ')) {
                                        return <h5 key={index} className="text-sm font-semibold mt-2 mb-1 text-gray-700 dark:text-gray-300">{line.slice(4)}</h5>;
                                    }
                                    // Handle numbered lists
                                    if (/^\d+\.\s/.test(line)) {
                                        return <p key={index} className="ml-4 my-1 text-gray-700 dark:text-gray-300">{line}</p>;
                                    }
                                    // Handle bullet points
                                    if (line.startsWith('- ') || line.startsWith('* ')) {
                                        return <p key={index} className="ml-4 my-1 text-gray-700 dark:text-gray-300">• {line.slice(2)}</p>;
                                    }
                                    // Handle code blocks
                                    if (line.startsWith('```')) {
                                        return null; // Skip code fence markers
                                    }
                                    // Handle empty lines
                                    if (!line.trim()) {
                                        return <br key={index} />;
                                    }
                                    // Regular text
                                    return <p key={index} className="my-1 text-gray-700 dark:text-gray-300">{line}</p>;
                                })}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full min-h-[350px] text-gray-400 dark:text-gray-500">
                                <FiCode className="w-12 h-12 mb-4" aria-hidden="true" />
                                <p>Explanation will appear here...</p>
                            </div>
                        )}
                    </div>

                    {/* Output Stats */}
                    {output && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Explanation: {output.length.toLocaleString()} characters
                        </div>
                    )}

                    {/* Screen reader announcement */}
                    {output && (
                        <div className="sr-only" aria-live="polite" aria-atomic="true">
                            Code explanation generated successfully.
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

/**
 * AI Code Explainer Component
 * 
 * Wraps the content with AIToolWrapper for API key management.
 * Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5, 4.7
 */
function AICodeExplainer() {
    return (
        <AIToolWrapper toolName="AI Code Explainer">
            <AICodeExplainerContent />
        </AIToolWrapper>
    );
}

export default AICodeExplainer;
