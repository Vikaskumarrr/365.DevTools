import { useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

function CreditCardValidator() {
    const [cardNumber, setCardNumber] = useState('');
    const [result, setResult] = useState(null);

    const validateCard = () => {
        if (!cardNumber.trim()) {
            toast.error('Please enter a card number');
            return;
        }

        const cleaned = cardNumber.replace(/\s/g, '');
        
        if (!/^\d+$/.test(cleaned)) {
            setResult({ valid: false, message: 'Card number must contain only digits' });
            toast.error('Invalid format');
            return;
        }

        const isValid = luhnCheck(cleaned);
        const cardType = getCardType(cleaned);

        setResult({
            valid: isValid,
            type: cardType,
            length: cleaned.length,
            message: isValid ? 'Valid card number' : 'Invalid card number (Luhn check failed)',
        });

        if (isValid) {
            toast.success('Valid card number!');
        } else {
            toast.error('Invalid card number');
        }
    };

    const luhnCheck = (num) => {
        let sum = 0;
        let isEven = false;

        for (let i = num.length - 1; i >= 0; i--) {
            let digit = parseInt(num[i]);

            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            isEven = !isEven;
        }

        return sum % 10 === 0;
    };

    const getCardType = (num) => {
        if (/^4/.test(num)) return 'Visa';
        if (/^5[1-5]/.test(num)) return 'Mastercard';
        if (/^3[47]/.test(num)) return 'American Express';
        if (/^6(?:011|5)/.test(num)) return 'Discover';
        return 'Unknown';
    };

    const formatCardNumber = (value) => {
        const cleaned = value.replace(/\s/g, '');
        const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
        return formatted;
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    Credit Card Validator
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Validate credit card numbers using Luhn algorithm
                </p>
            </header>

            <div className="space-y-6">
                <section className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        <strong>Security Note:</strong> This tool validates card number format only. Never enter real card details on untrusted websites.
                    </p>
                </section>

                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <label htmlFor="card-number" className="block font-medium mb-2">
                        Card Number
                    </label>
                    <input
                        id="card-number"
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        placeholder="4532 1234 5678 9010"
                        className="input-field text-xl font-mono"
                        maxLength="19"
                    />
                    <button onClick={validateCard} className="btn-primary w-full mt-4">
                        Validate Card
                    </button>
                </section>

                {result && (
                    <section className={`rounded-lg p-6 border-2 ${
                        result.valid
                            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                            : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                    }`}>
                        <div className="flex items-center gap-3 mb-4">
                            {result.valid ? (
                                <FiCheck className="text-green-600 dark:text-green-400" size={24} />
                            ) : (
                                <FiX className="text-red-600 dark:text-red-400" size={24} />
                            )}
                            <h3 className={`font-semibold ${
                                result.valid
                                    ? 'text-green-900 dark:text-green-100'
                                    : 'text-red-900 dark:text-red-100'
                            }`}>
                                {result.message}
                            </h3>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className={result.valid ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}>
                                    Card Type:
                                </span>
                                <span className="font-medium">{result.type}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className={result.valid ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}>
                                    Length:
                                </span>
                                <span className="font-medium">{result.length} digits</span>
                            </div>
                        </div>
                    </section>
                )}

                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold mb-3">Test Card Numbers</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        These are valid test numbers for development:
                    </p>
                    <div className="space-y-2 text-sm font-mono">
                        <p>Visa: 4532 1234 5678 9010</p>
                        <p>Mastercard: 5425 2334 3010 9903</p>
                        <p>Amex: 3782 822463 10005</p>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default CreditCardValidator;
