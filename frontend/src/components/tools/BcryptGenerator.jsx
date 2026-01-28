import { useState } from 'react';
import { FiCopy, FiLock } from 'react-icons/fi';
import toast from 'react-hot-toast';

function BcryptGenerator() {
    const [password, setPassword] = useState('');
    const [hash, setHash] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [verifyHash, setVerifyHash] = useState('');
    const [verifyResult, setVerifyResult] = useState(null);
    const [rounds, setRounds] = useState(10);

    // Simple bcrypt-like hash simulation (for demo purposes)
    // In production, use a proper bcrypt library
    const generateHash = async () => {
        if (!password) {
            toast.error('Please enter a password');
            return;
        }

        try {
            // Simulate bcrypt hash generation
            const salt = Array.from({ length: 22 }, () =>
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789./'.charAt(
                    Math.floor(Math.random() * 64)
                )
            ).join('');

            const encoder = new TextEncoder();
            const data = encoder.encode(password + salt + rounds);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

            const bcryptHash = `$2b$${rounds.toString().padStart(2, '0')}$${salt}${hashHex.substring(0, 31)}`;
            setHash(bcryptHash);
            toast.success('Hash generated!');
        } catch (err) {
            toast.error('Failed to generate hash');
        }
    };

    const verifyPasswordHash = async () => {
        if (!verifyPassword || !verifyHash) {
            toast.error('Please enter both password and hash');
            return;
        }

        // Simple verification simulation
        const isValid = verifyHash.startsWith('$2b$') && verifyHash.length > 50;
        setVerifyResult(isValid);
        
        if (isValid) {
            toast.success('Hash format is valid');
        } else {
            toast.error('Invalid hash format');
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    Bcrypt Generator
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Generate and verify bcrypt password hashes
                </p>
            </header>

            <div className="space-y-8">
                <section className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                        <FiLock className="text-yellow-600 dark:text-yellow-400 mt-1" />
                        <div className="text-sm text-yellow-800 dark:text-yellow-200">
                            <p className="font-semibold mb-1">Security Note:</p>
                            <p>This is a demonstration tool. For production use, implement bcrypt on the server-side using a proper library like bcryptjs or bcrypt.</p>
                        </div>
                    </div>
                </section>

                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <h2 className="font-semibold mb-4 text-gray-900 dark:text-white">Generate Hash</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="password" className="block font-medium mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password to hash"
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label htmlFor="rounds" className="block font-medium mb-2">
                                Salt Rounds: {rounds}
                            </label>
                            <input
                                id="rounds"
                                type="range"
                                min="4"
                                max="15"
                                value={rounds}
                                onChange={(e) => setRounds(parseInt(e.target.value))}
                                className="w-full"
                            />
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Higher rounds = more secure but slower (recommended: 10-12)
                            </p>
                        </div>

                        <button onClick={generateHash} className="btn-primary w-full">
                            Generate Bcrypt Hash
                        </button>

                        {hash && (
                            <div className="mt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="font-medium">Generated Hash</label>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(hash);
                                            toast.success('Copied!');
                                        }}
                                        className="text-primary-500"
                                        aria-label="Copy hash"
                                    >
                                        <FiCopy size={18} />
                                    </button>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded font-mono text-sm break-all">
                                    {hash}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <h2 className="font-semibold mb-4 text-gray-900 dark:text-white">Verify Hash</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="verify-password" className="block font-medium mb-2">
                                Password
                            </label>
                            <input
                                id="verify-password"
                                type="password"
                                value={verifyPassword}
                                onChange={(e) => setVerifyPassword(e.target.value)}
                                placeholder="Enter password to verify"
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label htmlFor="verify-hash" className="block font-medium mb-2">
                                Bcrypt Hash
                            </label>
                            <textarea
                                id="verify-hash"
                                value={verifyHash}
                                onChange={(e) => setVerifyHash(e.target.value)}
                                placeholder="$2b$10$..."
                                className="input-field min-h-[100px] font-mono text-sm"
                            />
                        </div>

                        <button onClick={verifyPasswordHash} className="btn-primary w-full">
                            Verify Password
                        </button>

                        {verifyResult !== null && (
                            <div
                                className={`p-4 rounded-lg ${
                                    verifyResult
                                        ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                                        : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                                }`}
                            >
                                <p
                                    className={`font-medium ${
                                        verifyResult
                                            ? 'text-green-800 dark:text-green-200'
                                            : 'text-red-800 dark:text-red-200'
                                    }`}
                                >
                                    {verifyResult ? '✓ Valid hash format' : '✗ Invalid hash format'}
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default BcryptGenerator;
