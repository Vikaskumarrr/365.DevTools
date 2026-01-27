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
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Password Generator</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Create secure, random passwords instantly
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                {/* Password Display */}
                <div className="mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            value={password}
                            readOnly
                            placeholder="Your password will appear here"
                            className="input-field pr-20 font-mono text-lg"
                        />
                        <button
                            onClick={copyToClipboard}
                            disabled={!password}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-500 hover:text-primary-600 disabled:opacity-50"
                        >
                            <FiCopy size={24} />
                        </button>
                    </div>

                    {/* Strength Indicator */}
                    {password && (
                        <div className="mt-4">
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium">Password Strength</span>
                                <span className="text-sm font-medium">{strength.text}</span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${strength.color} transition-all duration-300`}
                                    style={{ width: strength.width }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Length Slider */}
                <div className="mb-6">
                    <div className="flex justify-between mb-2">
                        <label className="font-medium">Password Length</label>
                        <span className="text-primary-500 font-bold">{length}</span>
                    </div>
                    <input
                        type="range"
                        min="4"
                        max="64"
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                        className="w-full"
                    />
                </div>

                {/* Options */}
                <div className="space-y-3 mb-6">
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={options.uppercase}
                            onChange={(e) => setOptions({ ...options, uppercase: e.target.checked })}
                            className="w-5 h-5"
                        />
                        <span>Uppercase Letters (A-Z)</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={options.lowercase}
                            onChange={(e) => setOptions({ ...options, lowercase: e.target.checked })}
                            className="w-5 h-5"
                        />
                        <span>Lowercase Letters (a-z)</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={options.numbers}
                            onChange={(e) => setOptions({ ...options, numbers: e.target.checked })}
                            className="w-5 h-5"
                        />
                        <span>Numbers (0-9)</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={options.symbols}
                            onChange={(e) => setOptions({ ...options, symbols: e.target.checked })}
                            className="w-5 h-5"
                        />
                        <span>Symbols (!@#$%^&*)</span>
                    </label>
                </div>

                {/* Generate Button */}
                <button onClick={generatePassword} className="btn-primary w-full flex items-center justify-center gap-2">
                    <FiRefreshCw size={20} />
                    Generate Password
                </button>
            </div>
        </div>
    );
}

export default PasswordGenerator;
