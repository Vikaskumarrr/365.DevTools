import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function Base64Encoder() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('encode'); // 'encode' or 'decode'
    const [error, setError] = useState('');

    const handleEncode = () => {
        try {
            const encoded = btoa(input);
            setOutput(encoded);
            setError('');
            toast.success('Encoded successfully!');
        } catch (error) {
            setError('Encoding failed. Please check your input.');
            setOutput('');
            toast.error('Encoding failed');
        }
    };

    const handleDecode = () => {
        try {
            const decoded = atob(input);
            setOutput(decoded);
            setError('');
            toast.success('Decoded successfully!');
        } catch (error) {
            setError('Invalid Base64 string. Please check your input.');
            setOutput('');
            toast.error('Invalid Base64 string');
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
        setError('');
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    Base64 Encoder/Decoder
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Encode and decode Base64 strings instantly
                </p>
            </header>

            {/* Mode Toggle */}
            <div className="flex justify-center mb-6" role="group" aria-label="Select encoding mode">
                <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-600">
                    <button
                        onClick={() => {
                            setMode('encode');
                            setError('');
                            setOutput('');
                        }}
                        className={`px-6 py-2 font-medium rounded-l-lg transition-colors ${mode === 'encode'
                                ? 'bg-primary-500 text-white'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                        aria-pressed={mode === 'encode'}
                        aria-label="Encode mode"
                    >
                        Encode
                    </button>
                    <button
                        onClick={() => {
                            setMode('decode');
                            setError('');
                            setOutput('');
                        }}
                        className={`px-6 py-2 font-medium rounded-r-lg transition-colors ${mode === 'decode'
                                ? 'bg-primary-500 text-white'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                        aria-pressed={mode === 'decode'}
                        aria-label="Decode mode"
                    >
                        Decode
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input */}
                <section className="space-y-4" aria-labelledby="input-heading">
                    <h2 id="input-heading" className="font-semibold text-gray-900 dark:text-white">
                        {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
                    </h2>
                    <label htmlFor="base64-input" className="sr-only">
                        {mode === 'encode' ? 'Enter text to encode' : 'Enter Base64 string to decode'}
                    </label>
                    <textarea
                        id="base64-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={
                            mode === 'encode' ? 'Enter text here...' : 'Enter Base64 string here...'
                        }
                        className="input-field min-h-[300px] font-mono text-sm"
                        aria-describedby={error ? "base64-error" : undefined}
                        aria-invalid={error ? "true" : "false"}
                    />
                    <div className="flex gap-2">
                        <button 
                            onClick={handleProcess} 
                            className="btn-primary flex-1"
                            disabled={!input.trim()}
                        >
                            {mode === 'encode' ? 'Encode' : 'Decode'}
                        </button>
                        <button
                            onClick={clear}
                            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!input && !output}
                            aria-label="Clear all input and output"
                        >
                            Clear
                        </button>
                    </div>
                </section>

                {/* Output */}
                <section className="space-y-4" aria-labelledby="output-heading">
                    <div className="flex justify-between items-center">
                        <h2 id="output-heading" className="font-semibold text-gray-900 dark:text-white">
                            {mode === 'encode' ? 'Encoded Base64' : 'Decoded Text'}
                        </h2>
                        <button
                            onClick={copyToClipboard}
                            disabled={!output}
                            className="text-primary-500 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label={`Copy ${mode === 'encode' ? 'encoded' : 'decoded'} result to clipboard`}
                            title="Copy to clipboard"
                        >
                            <FiCopy size={20} aria-hidden="true" />
                        </button>
                    </div>
                    {error && (
                        <div 
                            id="base64-error" 
                            role="alert" 
                            aria-live="assertive"
                            className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3"
                        >
                            <strong>Error:</strong> {error}
                        </div>
                    )}
                    <label htmlFor="base64-output" className="sr-only">
                        {mode === 'encode' ? 'Encoded Base64 result' : 'Decoded text result'}
                    </label>
                    <textarea
                        id="base64-output"
                        value={output}
                        readOnly
                        placeholder="Result will appear here"
                        className="input-field min-h-[300px] font-mono text-sm bg-gray-50 dark:bg-gray-900"
                        aria-live="polite"
                    />
                    {output && (
                        <div className="sr-only" aria-live="polite" aria-atomic="true">
                            {mode === 'encode' ? 'Text encoded' : 'Base64 decoded'} successfully. {output.length} characters.
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

export default Base64Encoder;
