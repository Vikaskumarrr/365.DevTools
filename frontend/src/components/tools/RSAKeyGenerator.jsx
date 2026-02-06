import { useState } from 'react';
import { FiCopy, FiLock } from 'react-icons/fi';
import toast from 'react-hot-toast';

function RSAKeyGenerator() {
    const [keySize, setKeySize] = useState(2048);
    const [publicKey, setPublicKey] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [loading, setLoading] = useState(false);

    const generateKeys = async () => {
        setLoading(true);
        try {
            const keyPair = await crypto.subtle.generateKey(
                {
                    name: 'RSA-OAEP',
                    modulusLength: keySize,
                    publicExponent: new Uint8Array([1, 0, 1]),
                    hash: 'SHA-256',
                },
                true,
                ['encrypt', 'decrypt']
            );

            const publicKeyData = await crypto.subtle.exportKey('spki', keyPair.publicKey);
            const privateKeyData = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey);

            const publicKeyPem = formatPEM(publicKeyData, 'PUBLIC KEY');
            const privateKeyPem = formatPEM(privateKeyData, 'PRIVATE KEY');

            setPublicKey(publicKeyPem);
            setPrivateKey(privateKeyPem);
            toast.success('RSA key pair generated!');
        } catch (err) {
            toast.error('Failed to generate keys: ' + err.message);
        }
        setLoading(false);
    };

    const formatPEM = (keyData, type) => {
        const base64 = btoa(String.fromCharCode(...new Uint8Array(keyData)));
        const formatted = base64.match(/.{1,64}/g).join('\n');
        return `-----BEGIN ${type}-----\n${formatted}\n-----END ${type}-----`;
    };

    const copyKey = (key, type) => {
        navigator.clipboard.writeText(key);
        toast.success(`${type} copied!`);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    RSA Key Generator
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Generate RSA public/private key pairs for encryption
                </p>
            </header>

            <div className="space-y-6">
                <section className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                        <FiLock className="text-yellow-600 dark:text-yellow-400 mt-1" />
                        <div className="text-sm text-yellow-800 dark:text-yellow-200">
                            <p className="font-semibold mb-1">Security Warning:</p>
                            <p>Never share your private key. Store it securely and use it only on trusted systems. Keys generated here are created in your browser and never sent to any server.</p>
                        </div>
                    </div>
                </section>

                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <h2 className="font-semibold mb-4 text-gray-900 dark:text-white">Generate Keys</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="key-size" className="block font-medium mb-2">
                                Key Size: {keySize} bits
                            </label>
                            <select
                                id="key-size"
                                value={keySize}
                                onChange={(e) => setKeySize(parseInt(e.target.value))}
                                className="input-field"
                            >
                                <option value={1024}>1024 bits (Fast, Less Secure)</option>
                                <option value={2048}>2048 bits (Recommended)</option>
                                <option value={4096}>4096 bits (Most Secure, Slower)</option>
                            </select>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Larger keys are more secure but slower to generate
                            </p>
                        </div>

                        <button
                            onClick={generateKeys}
                            disabled={loading}
                            className="btn-primary w-full"
                        >
                            {loading ? 'Generating Keys...' : 'Generate RSA Key Pair'}
                        </button>
                    </div>
                </section>

                {publicKey && (
                    <>
                        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                    Public Key
                                </h3>
                                <button
                                    onClick={() => copyKey(publicKey, 'Public key')}
                                    className="text-primary-500 hover:text-primary-600"
                                    aria-label="Copy public key"
                                >
                                    <FiCopy size={20} />
                                </button>
                            </div>
                            <textarea
                                value={publicKey}
                                readOnly
                                className="input-field min-h-[200px] font-mono text-xs bg-gray-50 dark:bg-gray-900"
                                aria-label="Public key"
                            />
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                ✓ Safe to share - Use this for encryption
                            </p>
                        </section>

                        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-red-200 dark:border-red-800">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                    Private Key
                                </h3>
                                <button
                                    onClick={() => copyKey(privateKey, 'Private key')}
                                    className="text-primary-500 hover:text-primary-600"
                                    aria-label="Copy private key"
                                >
                                    <FiCopy size={20} />
                                </button>
                            </div>
                            <textarea
                                value={privateKey}
                                readOnly
                                className="input-field min-h-[300px] font-mono text-xs bg-gray-50 dark:bg-gray-900"
                                aria-label="Private key"
                            />
                            <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                                ⚠ Keep secret - Never share this key
                            </p>
                        </section>
                    </>
                )}

                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Common Uses</h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li>• SSH authentication</li>
                        <li>• SSL/TLS certificates</li>
                        <li>• Digital signatures</li>
                        <li>• Secure data encryption</li>
                        <li>• API authentication</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}

export default RSAKeyGenerator;
