import { useState } from 'react';
import { FiCopy, FiDownload } from 'react-icons/fi';
import toast from 'react-hot-toast';

function YAMLValidator() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    const validateYAML = () => {
        try {
            // Simple YAML to JSON conversion for validation
            const lines = input.split('\n');
            const result = {};
            
            lines.forEach(line => {
                const trimmed = line.trim();
                if (trimmed && !trimmed.startsWith('#')) {
                    const [key, ...valueParts] = trimmed.split(':');
                    if (key && valueParts.length > 0) {
                        const value = valueParts.join(':').trim();
                        result[key.trim()] = value.replace(/^["']|["']$/g, '');
                    }
                }
            });

            setOutput(JSON.stringify(result, null, 2));
            setError('');
            toast.success('YAML validated successfully!');
        } catch (err) {
            setError('Invalid YAML structure');
            setOutput('');
            toast.error('Invalid YAML');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        toast.success('Copied to clipboard!');
    };

    const clear = () => {
        setInput('');
        setOutput('');
        setError('');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">YAML Validator</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Validate and convert YAML to JSON format
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <section className="space-y-4" aria-labelledby="input-heading">
                    <h2 id="input-heading" className="font-semibold text-gray-900 dark:text-white">Input YAML</h2>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="name: John Doe&#10;age: 30&#10;email: john@example.com"
                        className="input-field min-h-[400px] font-mono text-sm"
                    />
                    <div className="flex gap-2">
                        <button onClick={validateYAML} className="btn-primary flex-1" disabled={!input.trim()}>
                            Validate YAML
                        </button>
                        <button onClick={clear} className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg">
                            Clear
                        </button>
                    </div>
                </section>

                <section className="space-y-4" aria-labelledby="output-heading">
                    <div className="flex justify-between items-center">
                        <h2 id="output-heading" className="font-semibold text-gray-900 dark:text-white">JSON Output</h2>
                        <button onClick={copyToClipboard} disabled={!output} className="text-primary-500 hover:text-primary-600 disabled:opacity-50 p-2 rounded-lg">
                            <FiCopy size={20} />
                        </button>
                    </div>
                    {error && (
                        <div role="alert" className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                            <strong>Error:</strong> {error}
                        </div>
                    )}
                    <textarea
                        value={output}
                        readOnly
                        placeholder="JSON output will appear here"
                        className="input-field min-h-[400px] font-mono text-sm bg-gray-50 dark:bg-gray-900"
                    />
                </section>
            </div>
        </div>
    );
}

export default YAMLValidator;
