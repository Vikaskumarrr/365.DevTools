import { useState } from 'react';
import toast from 'react-hot-toast';

function CurrencyConverter() {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [result, setResult] = useState('');

    // Static exchange rates (in production, fetch from API)
    const rates = {
        USD: 1,
        EUR: 0.92,
        GBP: 0.79,
        JPY: 149.50,
        CNY: 7.24,
        INR: 83.12,
        CAD: 1.36,
        AUD: 1.53,
    };

    const convert = () => {
        if (!amount || isNaN(amount)) {
            toast.error('Please enter a valid amount');
            return;
        }

        const amountInUSD = parseFloat(amount) / rates[fromCurrency];
        const convertedAmount = amountInUSD * rates[toCurrency];
        setResult(convertedAmount.toFixed(2));
        toast.success('Converted!');
    };

    const swap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        if (result) {
            setAmount(result);
            setResult('');
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    Currency Converter
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Convert between major world currencies
                </p>
            </header>

            <div className="space-y-6">
                <section className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        <strong>Note:</strong> Exchange rates are static for demonstration. In production, use a live API like exchangerate-api.com
                    </p>
                </section>

                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="amount" className="block font-medium mb-2">
                                Amount
                            </label>
                            <input
                                id="amount"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="100"
                                className="input-field text-2xl"
                                step="0.01"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="from" className="block font-medium mb-2">
                                    From
                                </label>
                                <select
                                    id="from"
                                    value={fromCurrency}
                                    onChange={(e) => setFromCurrency(e.target.value)}
                                    className="input-field"
                                >
                                    {Object.keys(rates).map((currency) => (
                                        <option key={currency} value={currency}>
                                            {currency}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="to" className="block font-medium mb-2">
                                    To
                                </label>
                                <select
                                    id="to"
                                    value={toCurrency}
                                    onChange={(e) => setToCurrency(e.target.value)}
                                    className="input-field"
                                >
                                    {Object.keys(rates).map((currency) => (
                                        <option key={currency} value={currency}>
                                            {currency}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={convert} className="btn-primary flex-1">
                                Convert
                            </button>
                            <button onClick={swap} className="btn-secondary">
                                Swap
                            </button>
                        </div>

                        {result && (
                            <div className="bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-200 dark:border-primary-800 rounded-lg p-6 text-center">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    Result
                                </p>
                                <p className="text-4xl font-bold text-primary-500">
                                    {result} {toCurrency}
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default CurrencyConverter;
