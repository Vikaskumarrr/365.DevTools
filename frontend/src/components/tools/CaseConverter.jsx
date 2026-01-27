import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function CaseConverter() {
    const [input, setInput] = useState('');

    const conversions = {
        'Sentence case': (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
        'lowercase': (text) => text.toLowerCase(),
        'UPPERCASE': (text) => text.toUpperCase(),
        'camelCase': (text) => text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
            index === 0 ? word.toLowerCase() : word.toUpperCase()
        ).replace(/\s+/g, ''),
        'PascalCase': (text) => text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) =>
            word.toUpperCase()
        ).replace(/\s+/g, ''),
        'snake_case': (text) => text.toLowerCase().replace(/\s+/g, '_'),
        'kebab-case': (text) => text.toLowerCase().replace(/\s+/g, '-'),
        'CONSTANT_CASE': (text) => text.toUpperCase().replace(/\s+/g, '_'),
        'Title Case': (text) => text.replace(/\b\w/g, (char) => char.toUpperCase()),
    };

    const copyToClipboard = (text, format) => {
        navigator.clipboard.writeText(text);
        toast.success(`${format} copied!`);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Case Converter</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Convert text between different case formats
                </p>
            </div>

            {/* Input */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Input Text</label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your text here..."
                    className="input-field min-h-[120px]"
                />
            </div>

            {/* Conversions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(conversions).map(([format, converter]) => {
                    const converted = input ? converter(input) : '';
                    return (
                        <div key={format} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400">
                                    {format}
                                </h3>
                                <button
                                    onClick={() => copyToClipboard(converted, format)}
                                    disabled={!converted}
                                    className="text-primary-500 hover:text-primary-600 disabled:opacity-50"
                                >
                                    <FiCopy size={16} />
                                </button>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-900 rounded p-3 min-h-[60px] font-mono text-sm break-all">
                                {converted || <span className="text-gray-400">Result will appear here</span>}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Info */}
            <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Case Formats Explained</h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li><strong>camelCase:</strong> firstName, lastName</li>
                    <li><strong>PascalCase:</strong> FirstName, LastName</li>
                    <li><strong>snake_case:</strong> first_name, last_name</li>
                    <li><strong>kebab-case:</strong> first-name, last-name</li>
                    <li><strong>CONSTANT_CASE:</strong> FIRST_NAME, LAST_NAME</li>
                </ul>
            </div>
        </div>
    );
}

export default CaseConverter;
