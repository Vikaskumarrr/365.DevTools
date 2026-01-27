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

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Hash Generator</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Generate MD5, SHA-1, SHA-256, and SHA-512 hashes
                </p>
            </div>

            <div className="space-y-6">
                {/* Input */}
                <div>
                    <label className="block font-semibold mb-2">Text to Hash</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter text here..."
                        className="input-field min-h-[100px]"
                    />
                    <button onClick={generateHashes} className="btn-primary mt-4">
                        Generate Hashes
                    </button>
                </div>

                {/* Hash Results */}
                <div className="space-y-4">
                    {Object.entries(hashes).map(([type, hash]) => (
                        <div key={type} className="bg-white dark:bg-gray-800 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-semibold text-lg uppercase">{type}</h3>
                                {hash && (
                                    <button
                                        onClick={() => copyHash(hash, type)}
                                        className="text-primary-500 hover:text-primary-600"
                                    >
                                        <FiCopy size={20} />
                                    </button>
                                )}
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-900 rounded p-3 font-mono text-sm break-all">
                                {hash || 'Hash will appear here'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HashGenerator;
