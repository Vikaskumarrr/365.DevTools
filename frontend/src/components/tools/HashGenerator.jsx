import { useState } from 'react';
import CryptoJS from 'crypto-js';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function HashGenerator() {
    const [input, setInput] = useState('');
    const [hashes, setHashes] = useState({
        md5: '',
        sha1: '',
        sha256: '',
        sha512: '',
    });

    const generateHashes = () => {
        if (!input) {
            toast.error('Please enter text');
            return;
        }

        setHashes({
            md5: CryptoJS.MD5(input).toString(),
            sha1: CryptoJS.SHA1(input).toString(),
            sha256: CryptoJS.SHA256(input).toString(),
            sha512: CryptoJS.SHA512(input).toString(),
        });

        toast.success('Hashes generated!');
    };

    const copyHash = (hash, type) => {
        navigator.clipboard.writeText(hash);
        toast.success(`${type.toUpperCase()} copied!`);
    };

    const clear = () => {
        setInput('');
        setHashes({
            md5: '',
            sha1: '',
            sha256: '',
            sha512: '',
        });
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    Hash Generator
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Generate MD5, SHA-1, SHA-256, and SHA-512 hashes
                </p>
            </header>

            <div className="space-y-6">
                {/* Input */}
                <section aria-labelledby="input-heading">
                    <label htmlFor="hash-input" id="input-heading" className="block font-semibold mb-2 text-gray-900 dark:text-white">
                        Text to Hash
                    </label>
                    <textarea
                        id="hash-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter text here..."
                        className="input-field min-h-[100px]"
                        aria-describedby="hash-help"
                    />
                    <p id="hash-help" className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Enter any text to generate cryptographic hashes
                    </p>
                    <div className="flex gap-2 mt-4">
                        <button 
                            onClick={generateHashes} 
                            className="btn-primary"
                            disabled={!input.trim()}
                        >
                            Generate Hashes
                        </button>
                        <button
                            onClick={clear}
                            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!input && !hashes.md5}
                            aria-label="Clear input and all hashes"
                        >
                            Clear
                        </button>
                    </div>
                </section>

                {/* Hash Results */}
                <section aria-labelledby="results-heading">
                    <h2 id="results-heading" className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
                        Generated Hashes
                    </h2>
                    <div className="space-y-4">
                        {Object.entries(hashes).map(([type, hash]) => (
                            <article 
                                key={type} 
                                className="bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-gray-200 dark:border-gray-700"
                                aria-labelledby={`hash-${type}-title`}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h3 id={`hash-${type}-title`} className="font-semibold text-lg uppercase text-gray-900 dark:text-white">
                                        {type}
                                        {type === 'md5' || type === 'sha1' ? (
                                            <span className="ml-2 text-xs font-normal text-orange-500 dark:text-orange-400">
                                                (Not recommended for security)
                                            </span>
                                        ) : null}
                                    </h3>
                                    {hash && (
                                        <button
                                            onClick={() => copyHash(hash, type)}
                                            className="text-primary-500 hover:text-primary-600 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            aria-label={`Copy ${type.toUpperCase()} hash to clipboard`}
                                            title="Copy to clipboard"
                                        >
                                            <FiCopy size={20} aria-hidden="true" />
                                        </button>
                                    )}
                                </div>
                                <div 
                                    className="bg-gray-50 dark:bg-gray-900 rounded p-3 font-mono text-sm break-all"
                                    role="textbox"
                                    aria-readonly="true"
                                    aria-label={`${type.toUpperCase()} hash value`}
                                >
                                    {hash || 'Hash will appear here'}
                                </div>
                            </article>
                        ))}
                    </div>
                    {hashes.md5 && (
                        <div className="sr-only" aria-live="polite" aria-atomic="true">
                            All hashes generated successfully
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

export default HashGenerator;
