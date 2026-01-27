import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function HTMLEntities() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('encode');

    const encode = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };

    const decode = (text) => {
        const div = document.createElement('div');
        div.innerHTML = text;
        return div.textContent || '';
    };

    const handleProcess = () => {
        const result = mode === 'encode' ? encode(input) : decode(input);
        setOutput(result);
        toast.success(`${mode === 'encode' ? 'Encoded' : 'Decoded'} successfully!`);
    };

    const copy = () => {
        navigator.clipboard.writeText(output);
        toast.success('Copied!');
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">HTML Entities Encoder/Decoder</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Encode and decode HTML entities
                </p>
            </div>

            <div className="flex justify-center mb-6">
                <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-600">
                    <button
                        onClick={() => setMode('encode')}
                        className={`px-6 py-2 font-medium rounded-l-lg ${mode === 'encode'
                                ? 'bg-primary-500 text-white'
                                : 'bg-white dark:bg-gray-800'
                            }`}
                    >
                        Encode
                    </button>
                    <button
                        onClick={() => setMode('decode')}
                        className={`px-6 py-2 font-medium rounded-r-lg ${mode === 'decode'
                                ? 'bg-primary-500 text-white'
                                : 'bg-white dark:bg-gray-800'
                            }`}
                    >
                        Decode
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <label className="font-semibold">
                        {mode === 'encode' ? 'Text to Encode' : 'HTML to Decode'}
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={mode === 'encode' ? '<div>Hello & goodbye</div>' : '&lt;div&gt;Hello &amp; goodbye&lt;/div&gt;'}
                        className="input-field min-h-[300px] font-mono text-sm"
                    />
                    <button onClick={handleProcess} className="btn-primary w-full">
                        {mode === 'encode' ? 'Encode' : 'Decode'}
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="font-semibold">Result</label>
                        <button onClick={copy} disabled={!output} className="text-primary-500 hover:text-primary-600 disabled:opacity-50">
                            <FiCopy size={20} />
                        </button>
                    </div>
                    <textarea
                        value={output}
                        readOnly
                        placeholder="Result will appear here"
                        className="input-field min-h-[300px] font-mono text-sm bg-gray-50 dark:bg-gray-900"
                    />
                </div>
            </div>
        </div>
    );
}

export default HTMLEntities;
