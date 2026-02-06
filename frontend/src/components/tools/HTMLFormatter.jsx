import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function HTMLFormatter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    const formatHTML = () => {
        try {
            let formatted = input;
            formatted = formatted.replace(/></g, '>\n<');
            const lines = formatted.split('\n');
            let indentLevel = 0;
            const result = lines.map(line => {
                const trimmed = line.trim();
                if (trimmed.startsWith('</')) indentLevel = Math.max(0, indentLevel - 1);
                const indented = '  '.repeat(indentLevel) + trimmed;
                if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>')) {
                    indentLevel++;
                }
                return indented;
            }).join('\n');
            
            setOutput(result);
            setError('');
            toast.success('HTML formatted!');
        } catch (err) {
            setError(err.message);
            toast.error('Formatting failed');
        }
    };

    const minifyHTML = () => {
        const minified = input.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim();
        setOutput(minified);
        toast.success('HTML minified!');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">HTML Formatter</h1>
                <p className="text-gray-600 dark:text-gray-400">Format and beautify HTML code</p>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <section className="space-y-4">
                    <h2 className="font-semibold text-gray-900 dark:text-white">Input HTML</h2>
                    <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="<div><p>Hello</p></div>" className="input-field min-h-[400px] font-mono text-sm" />
                    <div className="flex gap-2">
                        <button onClick={formatHTML} className="btn-primary flex-1">Format</button>
                        <button onClick={minifyHTML} className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg flex-1">Minify</button>
                    </div>
                </section>
                <section className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-gray-900 dark:text-white">Output</h2>
                        <button onClick={() => { navigator.clipboard.writeText(output); toast.success('Copied!'); }} disabled={!output} className="text-primary-500 p-2 rounded-lg"><FiCopy size={20} /></button>
                    </div>
                    <textarea value={output} readOnly className="input-field min-h-[400px] font-mono text-sm bg-gray-50 dark:bg-gray-900" />
                </section>
            </div>
        </div>
    );
}

export default HTMLFormatter;
