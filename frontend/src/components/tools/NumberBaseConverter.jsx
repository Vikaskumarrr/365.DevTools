import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function NumberBaseConverter() {
    const [decimal, setDecimal] = useState('');
    const [binary, setBinary] = useState('');
    const [octal, setOctal] = useState('');
    const [hexadecimal, setHexadecimal] = useState('');

    const updateFromDecimal = (value) => {
        setDecimal(value);
        if (value === '') {
            setBinary('');
            setOctal('');
            setHexadecimal('');
            return;
        }
        const num = parseInt(value, 10);
        if (!isNaN(num) && num >= 0) {
            setBinary(num.toString(2));
            setOctal(num.toString(8));
            setHexadecimal(num.toString(16).toUpperCase());
        }
    };

    const updateFromBinary = (value) => {
        setBinary(value);
        if (value === '') {
            setDecimal('');
            setOctal('');
            setHexadecimal('');
            return;
        }
        const num = parseInt(value, 2);
        if (!isNaN(num)) {
            setDecimal(num.toString());
            setOctal(num.toString(8));
            setHexadecimal(num.toString(16).toUpperCase());
        }
    };

    const updateFromOctal = (value) => {
        setOctal(value);
        if (value === '') {
            setDecimal('');
            setBinary('');
            setHexadecimal('');
            return;
        }
        const num = parseInt(value, 8);
        if (!isNaN(num)) {
            setDecimal(num.toString());
            setBinary(num.toString(2));
            setHexadecimal(num.toString(16).toUpperCase());
        }
    };

    const updateFromHexadecimal = (value) => {
        setHexadecimal(value);
        if (value === '') {
            setDecimal('');
            setBinary('');
            setOctal('');
            return;
        }
        const num = parseInt(value, 16);
        if (!isNaN(num)) {
            setDecimal(num.toString());
            setBinary(num.toString(2));
            setOctal(num.toString(8));
        }
    };

    const copyValue = (value, name) => {
        navigator.clipboard.writeText(value);
        toast.success(`${name} copied!`);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    Number Base Converter
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Convert between decimal, binary, octal, and hexadecimal
                </p>
            </header>

            <div className="space-y-6">
                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="decimal" className="font-medium text-lg">
                                    Decimal (Base 10)
                                </label>
                                {decimal && (
                                    <button
                                        onClick={() => copyValue(decimal, 'Decimal')}
                                        className="text-primary-500"
                                        aria-label="Copy decimal"
                                    >
                                        <FiCopy size={18} />
                                    </button>
                                )}
                            </div>
                            <input
                                id="decimal"
                                type="text"
                                value={decimal}
                                onChange={(e) => updateFromDecimal(e.target.value)}
                                placeholder="255"
                                className="input-field text-xl font-mono"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="binary" className="font-medium text-lg">
                                    Binary (Base 2)
                                </label>
                                {binary && (
                                    <button
                                        onClick={() => copyValue(binary, 'Binary')}
                                        className="text-primary-500"
                                        aria-label="Copy binary"
                                    >
                                        <FiCopy size={18} />
                                    </button>
                                )}
                            </div>
                            <input
                                id="binary"
                                type="text"
                                value={binary}
                                onChange={(e) => updateFromBinary(e.target.value)}
                                placeholder="11111111"
                                className="input-field text-xl font-mono"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="octal" className="font-medium text-lg">
                                    Octal (Base 8)
                                </label>
                                {octal && (
                                    <button
                                        onClick={() => copyValue(octal, 'Octal')}
                                        className="text-primary-500"
                                        aria-label="Copy octal"
                                    >
                                        <FiCopy size={18} />
                                    </button>
                                )}
                            </div>
                            <input
                                id="octal"
                                type="text"
                                value={octal}
                                onChange={(e) => updateFromOctal(e.target.value)}
                                placeholder="377"
                                className="input-field text-xl font-mono"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="hexadecimal" className="font-medium text-lg">
                                    Hexadecimal (Base 16)
                                </label>
                                {hexadecimal && (
                                    <button
                                        onClick={() => copyValue(hexadecimal, 'Hexadecimal')}
                                        className="text-primary-500"
                                        aria-label="Copy hexadecimal"
                                    >
                                        <FiCopy size={18} />
                                    </button>
                                )}
                            </div>
                            <input
                                id="hexadecimal"
                                type="text"
                                value={hexadecimal}
                                onChange={(e) => updateFromHexadecimal(e.target.value.toUpperCase())}
                                placeholder="FF"
                                className="input-field text-xl font-mono"
                            />
                        </div>
                    </div>
                </section>

                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
                        Number System Guide
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                            <p className="font-medium mb-1">Binary (Base 2)</p>
                            <p className="text-gray-600 dark:text-gray-400">Uses digits: 0, 1</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                            <p className="font-medium mb-1">Octal (Base 8)</p>
                            <p className="text-gray-600 dark:text-gray-400">Uses digits: 0-7</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                            <p className="font-medium mb-1">Decimal (Base 10)</p>
                            <p className="text-gray-600 dark:text-gray-400">Uses digits: 0-9</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                            <p className="font-medium mb-1">Hexadecimal (Base 16)</p>
                            <p className="text-gray-600 dark:text-gray-400">Uses: 0-9, A-F</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default NumberBaseConverter;
