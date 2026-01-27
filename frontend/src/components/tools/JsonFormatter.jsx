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
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">JSON Formatter</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Format, validate, and beautify JSON instantly
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Section */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="font-semibold">Input JSON</label>
                        <div className="space-x-2">
                            <label className="text-sm">Indent:</label>
                            <select
                                value={indentSize}
                                onChange={(e) => setIndentSize(Number(e.target.value))}
                                className="input-field w-20"
                            >
                                <option value={2}>2</option>
                                <option value={4}>4</option>
                                <option value={8}>8</option>
                            </select>
                        </div>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='{"name": "John", "age": 30}'
                        className="input-field min-h-[400px] font-mono text-sm"
                    />
                    <div className="flex gap-2">
                        <button onClick={formatJson} className="btn-primary flex-1">
                            Format JSON
                        </button>
                        <button
                            onClick={minifyJson}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg flex-1"
                        >
                            Minify
                        </button>
                        <button
                            onClick={clear}
                            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg"
                        >
                            Clear
                        </button>
                    </div>
                </div>

                {/* Output Section */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="font-semibold">
                            Output {error && <span className="text-red-500 text-sm ml-2">{error}</span>}
                        </label>
                        <div className="space-x-2">
                            <button
                                onClick={copyToClipboard}
                                disabled={!output}
                                className="text-primary-500 hover:text-primary-600 disabled:opacity-50"
                            >
                                <FiCopy size={20} />
                            </button>
                            <button
                                onClick={downloadJson}
                                disabled={!output}
                                className="text-primary-500 hover:text-primary-600 disabled:opacity-50"
                            >
                                <FiDownload size={20} />
                            </button>
                        </div>
                    </div>
                    <textarea
                        value={output}
                        readOnly
                        placeholder="Formatted JSON will appear here"
                        className="input-field min-h-[400px] font-mono text-sm bg-gray-50 dark:bg-gray-900"
                    />
                </div>
            </div>
        </div>
    );
}

export default JsonFormatter;
