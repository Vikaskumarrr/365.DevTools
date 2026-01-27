import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function SQLFormatter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const format = () => {
        try {
            // Basic SQL formatting
            let formatted = input
                .replace(/\s+/g, ' ')
                .replace(/\s*,\s*/g, ',\n  ')
                .replace(/\s*(SELECT|FROM|WHERE|JOIN|INNER JOIN|LEFT JOIN|RIGHT JOIN|ORDER BY|GROUP BY|HAVING|LIMIT)\s+/gi, '\n$1 ')
                .replace(/\s*;/g, ';\n')
                .trim();

            setOutput(formatted);
            toast.success('SQL formatted!');
        } catch (error) {
            toast.error('Formatting failed');
        }
    };

    const minify = () => {
        const minified = input.replace(/\s+/g, ' ').trim();
        setOutput(minified);
        toast.success('SQL minified!');
    };

    const copy = () => {
        navigator.clipboard.writeText(output);
        toast.success('Copied!');
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">SQL Formatter</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Format and beautify SQL queries
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <label className="font-semibold">SQL Input</label>
                    <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="SELECT * FROM users WHERE id=1" className="input-field min-h-[400px] font-mono text-sm" />
                    <div className="flex gap-2">
                        <button onClick={format} className="btn-primary flex-1">Format SQL</button>
                        <button onClick={minify} className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg flex-1">Minify</button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="font-semibold">Output</label>
                        <button onClick={copy} disabled={!output} className="text-primary-500 hover:text-primary-600 disabled:opacity-50">
                            <FiCopy size={20} />
                        </button>
                    </div>
                    <textarea value={output} readOnly placeholder="Formatted SQL will appear here" className="input-field min-h-[400px] font-mono text-sm bg-gray-50 dark:bg-gray-900" />
                </div>
            </div>
        </div>
    );
}

export default SQLFormatter;
