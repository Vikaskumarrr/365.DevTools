import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function JWTDecoder() {
    const [token, setToken] = useState('');
    const [decoded, setDecoded] = useState(null);
    const [error, setError] = useState('');

    const decodeJWT = () => {
        try {
            setError('');
            const parts = token.split('.');

            if (parts.length !== 3) {
                throw new Error('Invalid JWT format. JWT should have 3 parts separated by dots.');
            }

            const header = JSON.parse(atob(parts[0]));
            const payload = JSON.parse(atob(parts[1]));

            setDecoded({
                header: JSON.stringify(header, null, 2),
                payload: JSON.stringify(payload, null, 2),
                signature: parts[2],
                headerObj: header,
                payloadObj: payload,
            });

            toast.success('JWT decoded successfully!');
        } catch (err) {
            setError(err.message);
            setDecoded(null);
            toast.error('Failed to decode JWT');
        }
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        toast.success(`${label} copied!`);
    };

    const isExpired = () => {
        if (!decoded?.payloadObj?.exp) return null;
        const expirationTime = decoded.payloadObj.exp * 1000;
        return Date.now() > expirationTime;
    };

    const getExpirationDate = () => {
        if (!decoded?.payloadObj?.exp) return null;
        return new Date(decoded.payloadObj.exp * 1000).toLocaleString();
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">JWT Decoder</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Decode and inspect JSON Web Tokens
                </p>
            </div>

            {/* Input */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">JWT Token</label>
                <textarea
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Paste your JWT token here (e.g., eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
                    className="input-field min-h-[120px] font-mono text-sm"
                />
                <div className="flex gap-2 mt-4">
                    <button onClick={decodeJWT} className="btn-primary">
                        Decode JWT
                    </button>
                    <button
                        onClick={() => {
                            setToken('');
                            setDecoded(null);
                            setError('');
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg"
                    >
                        Clear
                    </button>
                </div>
                {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}
            </div>

            {/* Decoded Output */}
            {decoded && (
                <div className="space-y-6">
                    {/* Status */}
                    {decoded.payloadObj.exp && (
                        <div className={`p-4 rounded-lg  ${isExpired()
                                ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                                : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                            }`}>
                            <div className="font-semibold mb-1">
                                {isExpired() ? '⚠️ Token Expired' : '✅ Token Valid'}
                            </div>
                            <div className="text-sm">
                                Expiration: {getExpirationDate()}
                            </div>
                        </div>
                    )}

                    {/* Header */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">Header</h3>
                            <button
                                onClick={() => copyToClipboard(decoded.header, 'Header')}
                                className="text-primary-500 hover:text-primary-600"
                            >
                                <FiCopy size={20} />
                            </button>
                        </div>
                        <pre className="bg-gray-50 dark:bg-gray-900 rounded p-4 overflow-x-auto text-sm font-mono">
                            {decoded.header}
                        </pre>
                    </div>

                    {/* Payload */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">Payload</h3>
                            <button
                                onClick={() => copyToClipboard(decoded.payload, 'Payload')}
                                className="text-primary-500 hover:text-primary-600"
                            >
                                <FiCopy size={20} />
                            </button>
                        </div>
                        <pre className="bg-gray-50 dark:bg-gray-900 rounded p-4 overflow-x-auto text-sm font-mono">
                            {decoded.payload}
                        </pre>
                    </div>

                    {/* Signature */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">Signature</h3>
                            <button
                                onClick={() => copyToClipboard(decoded.signature, 'Signature')}
                                className="text-primary-500 hover:text-primary-600"
                            >
                                <FiCopy size={20} />
                            </button>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 rounded p-4 break-all font-mono text-sm">
                            {decoded.signature}
                        </div>
                    </div>
                </div>
            )}

            {/* Info */}
            <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2">⚠️ Security Notice</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    This tool only decodes JWTs - it does not verify signatures. Never paste sensitive tokens from production environments into any online tool.
                    All processing happens locally in your browser.
                </p>
            </div>
        </div>
    );
}

export default JWTDecoder;
