import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function HMACGenerator() {
    const [message, setMessage] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [algorithm, setAlgorithm] = useState('SHA-256');
    const [hmac, setHmac] = useState('');

    const generateHMAC = async () => {
        if (!message || !secretKey) {
            toast.error('Please enter both message and secret key');
            return;
        }

        try {
            const encoder = new TextEncoder();
            const keyData = encoder.encode(secretKey);
            const messageData = encoder.encode(message);

            const cryptoKey = await crypto.subtle.importKey(
                'raw',
                keyData,
                { name: 'HMAC', hash: algorithm },
                false,
                ['sign']
            );

            const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
            const hashArray = Array.from(new Uint8Array(signature));
            const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

            setHmac(hashHex);
            toast.success('HMAC generated!');
        } catch (err) {
            toast.error('Failed to generate HMAC: ' + err.message);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(hmac);
        toast.success('Copied to clipboard!');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    HMAC Generator
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Generate HMAC (Hash-based Message Authentication Code) signatures
                </p>
            </header>

            <div className="space-y-6">
                <section className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>What is HMAC?</strong> HMAC is a cryptographic hash function used to verify data integrity and authenticity using a secret key.
                    </p>
                </section>

                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="message" className="block font-medium mb-2 text-gray-900 dark:text-white">
                                Message
                            </label>
                            <textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Enter message to sign"
                                className="input-field min-h-[150px]"
                            />
                        </div>

                        <div>
                            <label htmlFor="secret-key" className="block font-medium mb-2 text-gray-900 dark:text-white">
                                Secret Key
                            </label>
                            <input
                                id="secret-key"
                                type="password"
                                value={secretKey}
                                onChange={(e) => setSecretKey(e.target.value)}
                                placeholder="Enter secret key"
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label htmlFor="algorithm" className="block font-medium mb-2 text-gray-900 dark:text-white">
                                Algorithm
                            </label>
                            <select
                                id="algorithm"
                                value={algorithm}
                                onChange={(e) => setAlgorithm(e.target.value)}
                                className="input-field"
                            >
                                <option value="SHA-1">HMAC-SHA1</option>
                                <option value="SHA-256">HMAC-SHA256</option>
                                <option value="SHA-384">HMAC-SHA384</option>
                                <option value="SHA-512">HMAC-SHA512</option>
                            </select>
                        </div>

                        <button onClick={generateHMAC} className="btn-primary w-full">
                            Generate HMAC
                        </button>

                        {hmac && (
                            <div className="mt-6">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="font-medium text-gray-900 dark:text-white">
                                        HMAC Signature
                                    </label>
                                    <button
                                        onClick={copyToClipboard}
                                        className="text-primary-500 hover:text-primary-600"
                                        aria-label="Copy HMAC"
                                    >
                                        <FiCopy size={20} />
                                    </button>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded font-mono text-sm break-all">
                                    {hmac}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                    Length: {hmac.length} characters
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Common Use Cases</h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li>• API request signing and authentication</li>
                        <li>• Webhook payload verification</li>
                        <li>• Message integrity verification</li>
                        <li>• JWT token signing</li>
                        <li>• Secure cookie signing</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}

export default HMACGenerator;
