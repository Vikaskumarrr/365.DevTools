import { useState, useCallback, useMemo } from 'react';
import { FiCopy, FiAlertTriangle, FiDatabase, FiExternalLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import AIToolWrapper from '../common/AIToolWrapper';
import { useAITool } from '../../context/AIToolContext';

/**
 * SQL dialect options
 * Validates: Requirements 7.2
 */
const SQL_DIALECT_OPTIONS = [
    { value: 'mysql', label: 'MySQL', description: 'MySQL 8.0+ syntax' },
    { value: 'postgresql', label: 'PostgreSQL', description: 'PostgreSQL 14+ syntax' },
    { value: 'sqlite', label: 'SQLite', description: 'SQLite 3 syntax' },
    { value: 'sqlserver', label: 'SQL Server', description: 'Microsoft SQL Server syntax' }
];

/**
 * Destructive SQL keywords to check for warnings
 * Validates: Requirements 7.6
 */
const DESTRUCTIVE_KEYWORDS = [
    /\bDELETE\b/i,
    /\bDROP\b/i,
    /\bTRUNCATE\b/i,
    /\bUPDATE\b(?!.*\bWHERE\b)/i,
    /\bALTER\s+TABLE\b.*\bDROP\b/i
];

/**
 * Prompt templates for SQL generation
 * Validates: Requirements 7.1, 7.2, 7.3, 7.4
 */
const promptTemplates = {
    system: `You are a SQL expert. Generate clean, efficient, and well-formatted SQL queries based on natural language descriptions. Always follow best practices for the specified SQL dialect.`,
    
    user: `Generate a {dialect} SQL query for: {description}

{schemaContext}

Respond in the following exact format:

QUERY:
[the SQL query here, properly formatted with indentation]

EXPLANATION:
[brief explanation of what the query does and how it works]`
};

/**
 * Check if SQL query contains destructive operations
 * Validates: Requirements 7.6
 */
function isDestructiveQuery(query) {
    return DESTRUCTIVE_KEYWORDS.some(pattern => pattern.test(query));
}


/**
 * Parse the AI response into structured SQL result
 * Validates: Requirements 7.4, 7.5, 7.6
 */
function parseSQLResponse(response) {
    const result = {
        query: '',
        explanation: '',
        isDestructive: false
    };

    try {
        // Extract query
        const queryMatch = response.match(/QUERY:\s*\n([\s\S]*?)(?=\n(?:EXPLANATION:|$))/i);
        if (queryMatch) {
            result.query = queryMatch[1].trim();
            // Remove markdown code blocks if present
            if (result.query.startsWith('```sql')) {
                result.query = result.query.slice(6);
            } else if (result.query.startsWith('```')) {
                result.query = result.query.slice(3);
            }
            if (result.query.endsWith('```')) {
                result.query = result.query.slice(0, -3);
            }
            result.query = result.query.trim();
        }

        // Extract explanation
        const explanationMatch = response.match(/EXPLANATION:\s*\n([\s\S]*?)$/i);
        if (explanationMatch) {
            result.explanation = explanationMatch[1].trim();
        }

        // Check for destructive operations
        result.isDestructive = isDestructiveQuery(result.query);
    } catch (error) {
        console.error('[AISQLGenerator] Error parsing response:', error);
        result.query = response;
    }

    return result;
}

/**
 * AI SQL Generator Content Component
 * Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7
 */
function AISQLGeneratorContent() {
    const { aiService, rateLimiter, setLoading, setError } = useAITool();
    
    const [description, setDescription] = useState('');
    const [dialect, setDialect] = useState('postgresql');
    const [tableSchema, setTableSchema] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState(null);

    const estimatedTokens = useMemo(() => {
        return aiService.estimateTokens(description + tableSchema);
    }, [description, tableSchema, aiService]);

    const isSubmitDisabled = useMemo(() => {
        return !description.trim() || isProcessing;
    }, [description, isProcessing]);

    const handleGenerate = useCallback(async () => {
        if (isSubmitDisabled) return;

        setIsProcessing(true);
        setLoading(true);
        setResult(null);

        try {
            if (!rateLimiter.canMakeRequest(estimatedTokens)) {
                const waitTime = rateLimiter.getWaitTime();
                throw {
                    type: 'rate_limit',
                    message: `Rate limit reached. Please wait ${Math.ceil(waitTime / 1000)} seconds.`,
                    retryable: true
                };
            }

            const dialectLabel = SQL_DIALECT_OPTIONS.find(d => d.value === dialect)?.label || dialect;
            const schemaContext = tableSchema.trim() 
                ? `Table schema context:\n\`\`\`sql\n${tableSchema}\n\`\`\`` 
                : 'No table schema provided.';

            const userPrompt = promptTemplates.user
                .replace('{dialect}', dialectLabel)
                .replace('{description}', description)
                .replace('{schemaContext}', schemaContext);

            const response = await aiService.complete({
                prompt: userPrompt,
                systemPrompt: promptTemplates.system,
                maxTokens: 2048,
                temperature: 0.3
            });

            rateLimiter.recordRequest(response.tokensUsed.total);
            const parsedResult = parseSQLResponse(response.content);
            setResult(parsedResult);
            toast.success('SQL query generated!');

        } catch (error) {
            console.error('[AISQLGenerator] Error:', error);
            setError(error);
            toast.error(error.message || 'Failed to generate SQL');
        } finally {
            setIsProcessing(false);
            setLoading(false);
        }
    }, [description, dialect, tableSchema, isSubmitDisabled, aiService, rateLimiter, estimatedTokens, setLoading, setError]);

    const handleCopy = useCallback(() => {
        if (!result?.query) return;
        navigator.clipboard.writeText(result.query)
            .then(() => toast.success('SQL copied to clipboard!'))
            .catch(() => toast.error('Failed to copy'));
    }, [result]);

    const handleClear = useCallback(() => {
        setDescription('');
        setTableSchema('');
        setResult(null);
    }, []);


    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    AI SQL Generator
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Generate SQL queries from natural language descriptions using AI.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <section className="space-y-4" aria-labelledby="input-heading">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                        <h2 id="input-heading" className="font-semibold text-gray-900 dark:text-white">
                            Query Description
                        </h2>
                        <div className="flex items-center gap-2">
                            <label htmlFor="dialect-select" className="text-sm text-gray-700 dark:text-gray-300">
                                Dialect:
                            </label>
                            <select
                                id="dialect-select"
                                value={dialect}
                                onChange={(e) => setDialect(e.target.value)}
                                className="input-field w-36"
                                disabled={isProcessing}
                            >
                                {SQL_DIALECT_OPTIONS.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {SQL_DIALECT_OPTIONS.find(o => o.value === dialect)?.description}
                    </p>

                    <label htmlFor="description-input" className="sr-only">
                        Describe the SQL query you want
                    </label>
                    <textarea
                        id="description-input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the query, e.g., 'get all users who signed up in the last 30 days' or 'find the top 10 products by sales'"
                        className="input-field min-h-[120px] font-sans text-sm"
                        disabled={isProcessing}
                    />

                    <div className="space-y-2">
                        <label htmlFor="schema-input" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Table Schema (optional)
                        </label>
                        <textarea
                            id="schema-input"
                            value={tableSchema}
                            onChange={(e) => setTableSchema(e.target.value)}
                            placeholder="CREATE TABLE users (id INT, name VARCHAR(100), email VARCHAR(255), created_at TIMESTAMP);"
                            className="input-field min-h-[100px] font-mono text-sm bg-gray-900 dark:bg-gray-950 text-green-400"
                            disabled={isProcessing}
                            spellCheck="false"
                        />
                        <p className="text-xs text-gray-400">
                            Providing table schema helps generate more accurate queries
                        </p>
                    </div>

                    <div className="text-xs text-gray-400">
                        Estimated tokens: ~{estimatedTokens.toLocaleString()}
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleGenerate}
                            disabled={isSubmitDisabled}
                            className="btn-primary flex-1 flex items-center justify-center gap-2"
                            aria-busy={isProcessing}
                        >
                            {isProcessing ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Generating...</span>
                                </>
                            ) : (
                                <>
                                    <FiDatabase className="w-4 h-4" />
                                    <span>Generate SQL</span>
                                </>
                            )}
                        </button>
                        <button
                            onClick={handleClear}
                            disabled={(!description && !result) || isProcessing}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Clear
                        </button>
                    </div>
                </section>


                <section className="space-y-4" aria-labelledby="output-heading">
                    <div className="flex justify-between items-center">
                        <h2 id="output-heading" className="font-semibold text-gray-900 dark:text-white">
                            Generated SQL
                        </h2>
                        {result && (
                            <button
                                onClick={handleCopy}
                                className="text-primary-500 hover:text-primary-600 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                title="Copy to clipboard"
                            >
                                <FiCopy size={20} />
                            </button>
                        )}
                    </div>

                    {result ? (
                        <div className="space-y-4">
                            {result.isDestructive && (
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <FiAlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <h3 className="font-semibold text-red-800 dark:text-red-300">
                                                Destructive Operation Warning
                                            </h3>
                                            <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                                                This query contains potentially destructive operations (DELETE, DROP, TRUNCATE, or UPDATE without WHERE). 
                                                Please review carefully before executing.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="bg-gray-900 dark:bg-gray-950 rounded-lg overflow-hidden">
                                <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
                                    <span className="text-xs text-gray-400 uppercase tracking-wide">
                                        {SQL_DIALECT_OPTIONS.find(d => d.value === dialect)?.label} Query
                                    </span>
                                </div>
                                <pre className="p-4 overflow-auto max-h-[300px] text-sm">
                                    <code className="text-green-400 dark:text-green-300 font-mono whitespace-pre">
                                        {result.query}
                                    </code>
                                </pre>
                            </div>

                            {result.explanation && (
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                        Explanation
                                    </h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                        {result.explanation}
                                    </p>
                                </div>
                            )}

                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <FiDatabase className="text-blue-500 text-xl" />
                                        <div>
                                            <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                                                Need to format or edit?
                                            </p>
                                            <p className="text-xs text-blue-600 dark:text-blue-400">
                                                Use our SQL Formatter tool
                                            </p>
                                        </div>
                                    </div>
                                    <Link
                                        to="/tools/sql-formatter"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
                                    >
                                        <span>Open SQL Formatter</span>
                                        <FiExternalLink className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 min-h-[300px] flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700">
                            <FiDatabase className="w-12 h-12 mb-4" />
                            <p>Generated SQL will appear here...</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

function AISQLGenerator() {
    return (
        <AIToolWrapper toolName="AI SQL Generator">
            <AISQLGeneratorContent />
        </AIToolWrapper>
    );
}

export default AISQLGenerator;
