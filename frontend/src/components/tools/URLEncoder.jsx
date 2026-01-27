import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function URLEncoder() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('encode'); // 'encode' or 'decode'

    const handleEncode = () => {
        try {
            const encoded = encodeURIComponent(input);
            setOutput(encoded);
            toast.success('URL encoded successfully!');
        } catch (error) {
            toast.error('Encoding failed');
        }
    };

    const handleDecode = () => {
        try {
            const decoded = decodeURIComponent(input);
            setOutput(decoded);
            toast.success('URL decoded successfully!');
        } catch (error) {
            toast.error('Invalid URL encoding');
        }
    };

    const handleProcess = () => {
        if (mode === 'encode') {
            handleEncode();
        } else {
            handleDecode();
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        toast.success('Copied to clipboard!');
    };

    const clear = () => {
        setInput('');
        setOutput('');
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">URL Encoder/Decoder</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Encode and decode URL strings safely
                </p>
            </div>

            {/* Mode Toggle */}
            <div className="flex justify-center mb-6">
                <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-600">
                    <button
                        onClick={() => setMode('encode')}
                        className={`px-6 py-2 font-medium rounded-l-lg ${mode === 'encode'
                                ? 'bg-primary-500 text-white'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                            }`}
                    >
                        Encode
                    </button>
                    <button
                        onClick={() => setMode('decode')}
                        className={`px-6 py-2 font-medium rounded-r-lg ${mode === 'decode'
                                ? 'bg-primary-500 text-white'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                            }`}
                    >
                        Decode
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input */}
                <div className="space-y-4">
                    <label className="font-semibold">
                        {mode === 'encode' ? 'Text to Encode' : 'URL to Decode'}
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={
                            mode === 'encode' ? 'Enter text here...' : 'Enter encoded URL here...'
                        }
                        className="input-field min-h-[300px] font-mono text-sm"
                    />
                    <div className="flex gap-2">
                        <button onClick={handleProcess} className="btn-primary flex-1">
                            {mode === 'encode' ? 'Encode' : 'Decode'}
                        </button>
                        <button
                            onClick={clear}
                            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg"
                        >
                            Clear
                        </button>
                    </div>
                </div>

                {/* Output */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="font-semibold">
                            {mode === 'encode' ? 'Encoded URL' : 'Decoded Text'}
                        </label>
                        <button
                            onClick={copyToClipboard}
                            disabled={!output}
                            className="text-primary-500 hover:text-primary-600 disabled:opacity-50"
                        >
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

export default URLEncoder;
