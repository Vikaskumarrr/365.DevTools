import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function JSMinifier() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const minify = () => {
        try {
            // Basic JavaScript minification
            const minified = input
                .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '') // Remove comments
                .replace(/\s+/g, ' ') // Replace multiple spaces with single space
                .replace(/\s*([{}();,:])\s*/g, '$1') // Remove spaces around operators
                .trim();

            setOutput(minified);
            toast.success('JavaScript minified!');
        } catch (error) {
            toast.error('Minification failed');
        }
    };

    const copy = () => {
        navigator.clipboard.writeText(output);
        toast.success('Copied!');
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">JavaScript Minifier</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Minify JavaScript code
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <label className="font-semibold">JavaScript Input</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="function hello() {&#10;  console.log('Hello');&#10;}"
                        className="input-field min-h-[400px] font-mono text-sm"
                    />
                    <button onClick={minify} className="btn-primary w-full">
                        Minify JavaScript
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="font-semibold">Minified Output</label>
                        <button onClick={copy} disabled={!output} className="text-primary-500 hover:text-primary-600 disabled:opacity-50">
                            <FiCopy size={20} />
                        </button>
                    </div>
                    <textarea
                        value={output}
                        readOnly
                        placeholder="Minified code will appear here"
                        className="input-field min-h-[400px] font-mono text-sm bg-gray-50 dark:bg-gray-900"
                    />
                    {output && (
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Original size: {input.length} bytes → Minified: {output.length} bytes
                            <span className="ml-2 text-green-500">
                                ({((1 - output.length / input.length) * 100).toFixed(1)}% smaller)
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default JSMinifier;
