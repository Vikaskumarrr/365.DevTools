import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function BackslashEscape() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('escape');

    const escape = (text) => {
        return text
            .replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
            .replace(/'/g, "\\'")
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t');
    };

    const unescape = (text) => {
        return text
            .replace(/\\\\/g, '\\')
            .replace(/\\"/g, '"')
            .replace(/\\'/g, "'")
            .replace(/\\n/g, '\n')
            .replace(/\\r/g, '\r')
            .replace(/\\t/g, '\t');
    };

    const process = () => {
        const result = mode === 'escape' ? escape(input) : unescape(input);
        setOutput(result);
        toast.success(`${mode === 'escape' ? 'Escaped' : 'Unescaped'}!`);
    };

    const copy = () => {
        navigator.clipboard.writeText(output);
        toast.success('Copied!');
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Backslash Escape Tool</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Escape and unescape special characters
                </p>
            </div>

            <div className="flex justify-center mb-6">
                <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-600">
                    <button onClick={() => setMode('escape')} className={`px-6 py-2 font-medium rounded-l-lg ${mode === 'escape' ? 'bg-primary-500 text-white' : 'bg-white dark:bg-gray-800'}`}>
                        Escape
                    </button>
                    <button onClick={() => setMode('unescape')} className={`px-6 py-2 font-medium rounded-r-lg ${mode === 'unescape' ? 'bg-primary-500 text-white' : 'bg-white dark:bg-gray-800'}`}>
                        Unescape
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <label className="font-semibold">Input</label>
                    <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === 'escape' ? 'Hello "World"\nNew line' : 'Hello \\"World\\"\\nNew line'} className="input-field min-h-[300px] font-mono text-sm" />
                    <button onClick={process} className="btn-primary w-full">
                        {mode === 'escape' ? 'Escape' : 'Unescape'}
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="font-semibold">Output</label>
                        <button onClick={copy} disabled={!output} className="text-primary-500 hover:text-primary-600 disabled:opacity-50">
                            <FiCopy size={20} />
                        </button>
                    </div>
                    <textarea value={output} readOnly placeholder="Result will appear here" className="input-field min-h-[300px] font-mono text-sm bg-gray-50 dark:bg-gray-900" />
                </div>
            </div>
        </div>
    );
}

export default BackslashEscape;
