import { useState, useEffect } from 'react';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function RandomGenerator() {
    const [type, setType] = useState('number');
    const [output, setOutput] = useState('');

    // Number settings
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(100);

    // String settings
    const [length, setLength] = useState(16);
    const [charset, setCharset] = useState({
        lowercase: true,
        uppercase: true,
        numbers: true,
        symbols: false
    });

    const generateNumber = () => {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        setOutput(num.toString());
        toast.success('Number generated!');
    };

    const generateString = () => {
        let chars = '';
        if (charset.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (charset.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (charset.numbers) chars += '0123456789';
        if (charset.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setOutput(result);
        toast.success('String generated!');
    };

    const generate = () => {
        type === 'number' ? generateNumber() : generateString();
    };

    const copy = () => {
        navigator.clipboard.writeText(output);
        toast.success('Copied!');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Random Generator</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Generate random numbers or strings
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
                {/* Type Selection */}
                <div>
                    <label className="block font-medium mb-2">Generate Type</label>
                    <select value={type} onChange={(e) => setType(e.target.value)} className="input-field">
                        <option value="number">Random Number</option>
                        <option value="string">Random String</option>
                    </select>
                </div>

                {/* Number Settings */}
                {type === 'number' && (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium mb-2">Minimum</label>
                            <input
                                type="number"
                                value={min}
                                onChange={(e) => setMin(Number(e.target.value))}
                                className="input-field"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-2">Maximum</label>
                            <input
                                type="number"
                                value={max}
                                onChange={(e) => setMax(Number(e.target.value))}
                                className="input-field"
                            />
                        </div>
                    </div>
                )}

                {/* String Settings */}
                {type === 'string' && (
                    <>
                        <div>
                            <label className="block font-medium mb-2">Length: {length}</label>
                            <input
                                type="range"
                                min="1"
                                max="128"
                                value={length}
                                onChange={(e) => setLength(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={charset.lowercase}
                                    onChange={(e) => setCharset({ ...charset, lowercase: e.target.checked })}
                                    className="mr-2"
                                />
                                Lowercase (a-z)
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={charset.uppercase}
                                    onChange={(e) => setCharset({ ...charset, uppercase: e.target.checked })}
                                    className="mr-2"
                                />
                                Uppercase (A-Z)
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={charset.numbers}
                                    onChange={(e) => setCharset({ ...charset, numbers: e.target.checked })}
                                    className="mr-2"
                                />
                                Numbers (0-9)
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={charset.symbols}
                                    onChange={(e) => setCharset({ ...charset, symbols: e.target.checked })}
                                    className="mr-2"
                                />
                                Symbols
                            </label>
                        </div>
                    </>
                )}

                <button onClick={generate} className="btn-primary w-full">
                    Generate
                </button>

                {output && (
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="font-semibold">Result</label>
                            <button onClick={copy} className="text-primary-500 hover:text-primary-600">
                                <FiCopy size={20} />
                            </button>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 rounded p-4 text-center text-2xl font-mono">
                            {output}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RandomGenerator;
