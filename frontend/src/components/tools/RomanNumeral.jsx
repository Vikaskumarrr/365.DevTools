import { useState } from 'react';
import { FiCopy, FiRefreshCw } from 'react-icons/fi';
import toast from 'react-hot-toast';

function RomanNumeral() {
    const [mode, setMode] = useState('toRoman');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const toRoman = (num) => {
        const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        const numerals = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
        let result = '';
        
        for (let i = 0; i < values.length; i++) {
            while (num >= values[i]) {
                result += numerals[i];
                num -= values[i];
            }
        }
        return result;
    };

    const fromRoman = (str) => {
        const values = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };
        let result = 0;
        
        for (let i = 0; i < str.length; i++) {
            const current = values[str[i]];
            const next = values[str[i + 1]];
            
            if (next && current < next) {
                result -= current;
            } else {
                result += current;
            }
        }
        return result;
    };

    const convert = () => {
        if (!input.trim()) {
            toast.error('Please enter a value');
            return;
        }

        try {
            if (mode === 'toRoman') {
                const num = parseInt(input);
                if (isNaN(num) || num < 1 || num > 3999) {
                    toast.error('Please enter a number between 1 and 3999');
                    return;
                }
                setOutput(toRoman(num));
            } else {
                const roman = input.toUpperCase();
                if (!/^[MDCLXVI]+$/.test(roman)) {
                    toast.error('Invalid Roman numeral');
                    return;
                }
                setOutput(fromRoman(roman).toString());
            }
            toast.success('Converted!');
        } catch (err) {
            toast.error('Conversion failed');
        }
    };

    const swap = () => {
        setMode(mode === 'toRoman' ? 'fromRoman' : 'toRoman');
        setInput(output);
        setOutput('');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    Roman Numeral Converter
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Convert between numbers and Roman numerals
                </p>
            </header>

            <div className="space-y-6">
                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-4 mb-6">
                        <button
                            onClick={() => setMode('toRoman')}
                            className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                                mode === 'toRoman'
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                        >
                            Number → Roman
                        </button>
                        <button
                            onClick={swap}
                            className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                            aria-label="Swap conversion direction"
                        >
                            <FiRefreshCw size={20} />
                        </button>
                        <button
                            onClick={() => setMode('fromRoman')}
                            className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                                mode === 'fromRoman'
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                        >
                            Roman → Number
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="input" className="block font-medium mb-2">
                                {mode === 'toRoman' ? 'Number (1-3999)' : 'Roman Numeral'}
                            </label>
                            <input
                                id="input"
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={mode === 'toRoman' ? '2024' : 'MMXXIV'}
                                className="input-field text-2xl text-center"
                            />
                        </div>

                        <button onClick={convert} className="btn-primary w-full">
                            Convert
                        </button>

                        {output && (
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="font-medium">Result</label>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(output);
                                            toast.success('Copied!');
                                        }}
                                        className="text-primary-500"
                                        aria-label="Copy result"
                                    >
                                        <FiCopy size={20} />
                                    </button>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg text-center">
                                    <p className="text-4xl font-bold text-primary-500">{output}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
                        Roman Numeral Guide
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded">
                            <p className="font-bold text-lg">I</p>
                            <p className="text-gray-600 dark:text-gray-400">1</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded">
                            <p className="font-bold text-lg">V</p>
                            <p className="text-gray-600 dark:text-gray-400">5</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded">
                            <p className="font-bold text-lg">X</p>
                            <p className="text-gray-600 dark:text-gray-400">10</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded">
                            <p className="font-bold text-lg">L</p>
                            <p className="text-gray-600 dark:text-gray-400">50</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded">
                            <p className="font-bold text-lg">C</p>
                            <p className="text-gray-600 dark:text-gray-400">100</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded">
                            <p className="font-bold text-lg">D</p>
                            <p className="text-gray-600 dark:text-gray-400">500</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded">
                            <p className="font-bold text-lg">M</p>
                            <p className="text-gray-600 dark:text-gray-400">1000</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default RomanNumeral;
