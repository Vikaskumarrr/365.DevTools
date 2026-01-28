import { useState } from 'react';
import { FiCopy, FiRefreshCw } from 'react-icons/fi';
import toast from 'react-hot-toast';

function PasswordGenerator() {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
    });

    const generatePassword = () => {
        let charset = '';
        if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (options.numbers) charset += '0123456789';
        if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        if (charset === '') {
            toast.error('Please select at least one option');
            return;
        }

        let newPassword = '';
        for (let i = 0; i < length; i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        setPassword(newPassword);
        toast.success('Password generated!');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        toast.success('Password copied!');
    };

    const getStrength = () => {
        if (!password) return { text: 'None', color: 'bg-gray-300', width: '0%' };
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (password.length >= 12) strength += 25;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 12.5;
        if (/[^A-Za-z0-9]/.test(password)) strength += 12.5;

        if (strength < 40) return { text: 'Weak', color: 'bg-red-500', width: '33%' };
        if (strength < 70) return { text: 'Medium', color: 'bg-yellow-500', width: '66%' };
        return { text: 'Strong', color: 'bg-green-500', width: '100%' };
    };

    const strength = getStrength();

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    Password Generator
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Create secure, random passwords instantly
                </p>
            </header>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                {/* Password Display */}
                <section className="mb-6" aria-labelledby="password-display-heading">
                    <h2 id="password-display-heading" className="sr-only">Generated Password</h2>
                    <div className="relative">
                        <label htmlFor="generated-password" className="sr-only">
                            Your generated password
                        </label>
                        <input
                            id="generated-password"
                            type="text"
                            value={password}
                            readOnly
                            placeholder="Your password will appear here"
                            className="input-field pr-20 font-mono text-lg"
                            aria-live="polite"
                            aria-atomic="true"
                        />
                        <button
                            onClick={copyToClipboard}
                            disabled={!password}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-500 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Copy password to clipboard"
                            title="Copy to clipboard"
                        >
                            <FiCopy size={24} aria-hidden="true" />
                        </button>
                    </div>

                    {/* Strength Indicator */}
                    {password && (
                        <div className="mt-4" role="status" aria-live="polite">
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Password Strength</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{strength.text}</span>
                            </div>
                            <div 
                                className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                                role="progressbar"
                                aria-valuenow={strength.width === '100%' ? 100 : strength.width === '66%' ? 66 : 33}
                                aria-valuemin="0"
                                aria-valuemax="100"
                                aria-label={`Password strength: ${strength.text}`}
                            >
                                <div
                                    className={`h-full ${strength.color} transition-all duration-300`}
                                    style={{ width: strength.width }}
                                />
                            </div>
                            <div className="sr-only">
                                Password strength is {strength.text}
                            </div>
                        </div>
                    )}
                </section>

                {/* Length Slider */}
                <section className="mb-6" aria-labelledby="length-heading">
                    <div className="flex justify-between mb-2">
                        <label htmlFor="password-length" id="length-heading" className="font-medium text-gray-900 dark:text-white">
                            Password Length
                        </label>
                        <span className="text-primary-500 font-bold" aria-live="polite">{length}</span>
                    </div>
                    <input
                        id="password-length"
                        type="range"
                        min="4"
                        max="64"
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                        className="w-full"
                        aria-valuemin="4"
                        aria-valuemax="64"
                        aria-valuenow={length}
                        aria-label={`Password length: ${length} characters`}
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>4</span>
                        <span>64</span>
                    </div>
                </section>

                {/* Options */}
                <fieldset className="space-y-3 mb-6">
                    <legend className="font-medium text-gray-900 dark:text-white mb-3">
                        Character Types
                    </legend>
                    <div className="space-y-3">
                        <label className="flex items-center space-x-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={options.uppercase}
                                onChange={(e) => setOptions({ ...options, uppercase: e.target.checked })}
                                className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500 focus:ring-2"
                                aria-describedby="uppercase-desc"
                            />
                            <span className="text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                                Uppercase Letters (A-Z)
                            </span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={options.lowercase}
                                onChange={(e) => setOptions({ ...options, lowercase: e.target.checked })}
                                className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500 focus:ring-2"
                                aria-describedby="lowercase-desc"
                            />
                            <span className="text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                                Lowercase Letters (a-z)
                            </span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={options.numbers}
                                onChange={(e) => setOptions({ ...options, numbers: e.target.checked })}
                                className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500 focus:ring-2"
                                aria-describedby="numbers-desc"
                            />
                            <span className="text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                                Numbers (0-9)
                            </span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={options.symbols}
                                onChange={(e) => setOptions({ ...options, symbols: e.target.checked })}
                                className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500 focus:ring-2"
                                aria-describedby="symbols-desc"
                            />
                            <span className="text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                                Symbols (!@#$%^&*)
                            </span>
                        </label>
                    </div>
                </fieldset>

                {/* Generate Button */}
                <button 
                    onClick={generatePassword} 
                    className="btn-primary w-full flex items-center justify-center gap-2"
                    aria-label="Generate new password"
                >
                    <FiRefreshCw size={20} aria-hidden="true" />
                    Generate Password
                </button>
            </div>
        </div>
    );
}

export default PasswordGenerator;
