import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function CSSFormatter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const format = () => {
        try {
            let formatted = input
                .replace(/\s*{\s*/g, ' {\n  ')
                .replace(/\s*}\s*/g, '\n}\n\n')
                .replace(/\s*;\s*/g, ';\n  ')
                .replace(/\s*:\s*/g, ': ')
                .trim();

            setOutput(formatted);
            toast.success('CSS formatted!');
        } catch (error) {
            toast.error('Formatting failed');
        }
    };

    const minify = () => {
        const minified = input
            .replace(/\s+/g, ' ')
            .replace(/\s*{\s*/g, '{')
            .replace(/\s*}\s*/g, '}')
            .replace(/\s*;\s*/g, ';')
            .replace(/\s*:\s*/g, ':')
            .replace(/\s*,\s*/g, ',')
            .trim();
        setOutput(minified);
        toast.success('CSS minified!');
    };

    const copy = () => {
        navigator.clipboard.writeText(output);
        toast.success('Copied!');
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">CSS Formatter</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Format and minify CSS stylesheets
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <label className="font-semibold">CSS Input</label>
                    <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder=".button{color:red;padding:10px}" className="input-field min-h-[400px] font-mono text-sm" />
                    <div className="flex gap-2">
                        <button onClick={format} className="btn-primary flex-1">Format CSS</button>
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
                    <textarea value={output} readOnly placeholder="Formatted CSS will appear here" className="input-field min-h-[400px] font-mono text-sm bg-gray-50 dark:bg-gray-900" />
                </div>
            </div>
        </div>
    );
}

export default CSSFormatter;
