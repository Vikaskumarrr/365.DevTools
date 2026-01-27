import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function SlugGenerator() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const generateSlug = () => {
        const slug = input
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');

        setOutput(slug);
        toast.success('Slug generated!');
    };

    const copy = () => {
        navigator.clipboard.writeText(output);
        toast.success('Copied!');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Slug Generator</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Generate URL-friendly slugs from text
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
                <div>
                    <label className="font-semibold block mb-2">Input Text</label>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="How to Create Amazing Web Apps"
                        className="input-field"
                    />
                </div>

                <button onClick={generateSlug} className="btn-primary w-full">
                    Generate Slug
                </button>

                {output && (
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="font-semibold">Generated Slug</label>
                            <button onClick={copy} className="text-primary-500 hover:text-primary-600">
                                <FiCopy size={20} />
                            </button>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 rounded p-4 font-mono text-lg">
                            {output}
                        </div>
                    </div>
                )}

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm">
                    <strong>Example:</strong> "How to Create Amazing Web Apps" → "how-to-create-amazing-web-apps"
                </div>
            </div>
        </div>
    );
}

export default SlugGenerator;
