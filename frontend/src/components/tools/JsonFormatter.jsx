import { useState } from 'react';
import { FiCopy, FiDownload } from 'react-icons/fi';
import toast from 'react-hot-toast';

function JsonFormatter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [indentSize, setIndentSize] = useState(2);

    const formatJson = () => {
        try {
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, indentSize);
            setOutput(formatted);
            setError('');
            toast.success('JSON formatted successfully!');
        } catch (err) {
            setError(err.message);
            setOutput('');
            toast.error('Invalid JSON');
        }
    };

    const minifyJson = () => {
        try {
            const parsed = JSON.parse(input);
            const minified = JSON.stringify(parsed);
            setOutput(minified);
            setError('');
            toast.success('JSON minified successfully!');
        } catch (err) {
            setError(err.message);
            toast.error('Invalid JSON');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        toast.success('Copied to clipboard!');
    };

    const downloadJson = () => {
        const blob = new Blob([output], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'formatted.json';
        a.click();
        toast.success('Downloaded!');
    };

    const clear = () => {
        setInput('');
        setOutput('');
        setError('');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">JSON Formatter</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Format, validate, and beautify JSON instantly
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Section */}
                <section className="space-y-4" aria-labelledby="input-heading">
                    <div className="flex justify-between items-center">
                        <h2 id="input-heading" className="font-semibold text-gray-900 dark:text-white">Input JSON</h2>
                        <div className="flex items-center gap-2">
                            <label htmlFor="indent-size" className="text-sm text-gray-700 dark:text-gray-300">
                                Indent:
                            </label>
                            <select
                                id="indent-size"
                                value={indentSize}
                                onChange={(e) => setIndentSize(Number(e.target.value))}
                                className="input-field w-20"
                                aria-label="Select indentation size"
                            >
                                <option value={2}>2</option>
                                <option value={4}>4</option>
                                <option value={8}>8</option>
                            </select>
                        </div>
                    </div>
                    <label htmlFor="json-input" className="sr-only">
                        Enter JSON to format
                    </label>
                    <textarea
                        id="json-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='{"name": "John", "age": 30}'
                        className="input-field min-h-[400px] font-mono text-sm"
                        aria-describedby={error ? "json-error" : undefined}
                        aria-invalid={error ? "true" : "false"}
                    />
                    <div className="flex gap-2">
                        <button 
                            onClick={formatJson} 
                            className="btn-primary flex-1"
                            disabled={!input.trim()}
                        >
                            Format JSON
                        </button>
                        <button
                            onClick={minifyJson}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!input.trim()}
                        >
                            Minify
                        </button>
                        <button
                            onClick={clear}
                            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!input && !output}
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
                            Output
                        </h2>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={copyToClipboard}
                                disabled={!output}
                                className="text-primary-500 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                aria-label="Copy formatted JSON to clipboard"
                                title="Copy to clipboard"
                            >
                                <FiCopy size={20} aria-hidden="true" />
                            </button>
                            <button
                                onClick={downloadJson}
                                disabled={!output}
                                className="text-primary-500 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                aria-label="Download formatted JSON as file"
                                title="Download JSON"
                            >
                                <FiDownload size={20} aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                    {error && (
                        <div 
                            id="json-error" 
                            role="alert" 
                            aria-live="assertive"
                            className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3"
                        >
                            <strong>Error:</strong> {error}
                        </div>
                    )}
                    <label htmlFor="json-output" className="sr-only">
                        Formatted JSON output
                    </label>
                    <textarea
                        id="json-output"
                        value={output}
                        readOnly
                        placeholder="Formatted JSON will appear here"
                        className="input-field min-h-[400px] font-mono text-sm bg-gray-50 dark:bg-gray-900"
                        aria-live="polite"
                    />
                    {output && (
                        <div className="sr-only" aria-live="polite" aria-atomic="true">
                            JSON formatted successfully. {output.split('\n').length} lines.
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

export default JsonFormatter;
