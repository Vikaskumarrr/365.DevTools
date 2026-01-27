import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function TextManipulator() {
    const [text, setText] = useState('');

    const operations = {
        'Remove Duplicates': (text) => {
            const lines = text.split('\n');
            return [...new Set(lines)].join('\n');
        },
        'Sort Lines A-Z': (text) => {
            return text.split('\n').sort().join('\n');
        },
        'Sort Lines Z-A': (text) => {
            return text.split('\n').sort().reverse().join('\n');
        },
        'Reverse Text': (text) => {
            return text.split('').reverse().join('');
        },
        'Reverse Lines': (text) => {
            return text.split('\n').reverse().join('\n');
        },
        'Remove Line Breaks': (text) => {
            return text.replace(/\n/g, ' ');
        },
        'Remove Extra Spaces': (text) => {
            return text.replace(/\s+/g, ' ').trim();
        },
        'Add Line Numbers': (text) => {
            return text.split('\n').map((line, i) => `${i + 1}. ${line}`).join('\n');
        },
        'Capitalize': (text) => {
            return text.toUpperCase();
        },
        'Lowercase': (text) => {
            return text.toLowerCase();
        },
    };

    const apply = (operation) => {
        const result = operations[operation](text);
        setText(result);
        toast.success(`${operation} applied!`);
    };

    const copy = () => {
        navigator.clipboard.writeText(text);
        toast.success('Copied!');
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Text Manipulator</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Various text transformation tools
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="font-semibold">Text</label>
                        <button onClick={copy} className="text-primary-500 hover:text-primary-600">
                            <FiCopy size={20} />
                        </button>
                    </div>
                    <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter your text here..." className="input-field min-h-[500px]" />
                </div>

                <div className="space-y-2">
                    <h3 className="font-semibold mb-3">Operations</h3>
                    {Object.keys(operations).map((op) => (
                        <button key={op} onClick={() => apply(op)} className="w-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-left px-4 py-2 rounded shadow-sm border border-gray-200 dark:border-gray-700 text-sm">
                            {op}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TextManipulator;
