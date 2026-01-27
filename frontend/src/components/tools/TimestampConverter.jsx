import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function TimestampConverter() {
    const [timestamp, setTimestamp] = useState(Date.now());
    const [dateInput, setDateInput] = useState('');
    const [mode, setMode] = useState('toDate'); // 'toDate' or 'toTimestamp'

    const currentDate = new Date(timestamp);

    const timestampToDate = (ts) => {
        const numTs = Number(ts);
        
        // Handle invalid timestamps
        if (isNaN(numTs)) {
            return {
                iso: 'Invalid timestamp',
                utc: 'Invalid timestamp',
                local: 'Invalid timestamp',
                date: 'Invalid timestamp',
                time: 'Invalid timestamp',
            };
        }

        // Auto-detect if timestamp is in seconds or milliseconds
        const timestamp = numTs < 10000000000 ? numTs * 1000 : numTs;
        const date = new Date(timestamp);
        
        // Check if date is valid
        if (isNaN(date.getTime())) {
            return {
                iso: 'Invalid timestamp',
                utc: 'Invalid timestamp',
                local: 'Invalid timestamp',
                date: 'Invalid timestamp',
                time: 'Invalid timestamp',
            };
        }

        return {
            iso: date.toISOString(),
            utc: date.toUTCString(),
            local: date.toLocaleString(),
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString(),
        };
    };

    const dateToTimestamp = (dateStr) => {
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) {
                toast.error('Invalid date format');
                return null;
            }
            return {
                milliseconds: date.getTime(),
                seconds: Math.floor(date.getTime() / 1000),
            };
        } catch (error) {
            toast.error('Invalid date');
            return null;
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!');
    };

    const useCurrentTime = () => {
        setTimestamp(Date.now());
        toast.success('Updated to current time');
    };

    const converted = mode === 'toDate' ? timestampToDate(timestamp) : dateToTimestamp(dateInput);

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Timestamp Converter</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Convert Unix timestamps to human-readable dates and vice versa
                </p>
            </div>

            {/* Mode Toggle */}
            <div className="flex justify-center mb-6">
                <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-600">
                    <button
                        onClick={() => setMode('toDate')}
                        className={`px-6 py-2 font-medium rounded-l-lg ${mode === 'toDate'
                                ? 'bg-primary-500 text-white'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                            }`}
                    >
                        Timestamp → Date
                    </button>
                    <button
                        onClick={() => setMode('toTimestamp')}
                        className={`px-6 py-2 font-medium rounded-r-lg ${mode === 'toTimestamp'
                                ? 'bg-primary-500 text-white'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                            }`}
                    >
                        Date → Timestamp
                    </button>
                </div>
            </div>

            {mode === 'toDate' ? (
                // Timestamp to Date Mode
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <div className="mb-4">
                            <label className="block font-semibold mb-2">Unix Timestamp</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    value={timestamp}
                                    onChange={(e) => setTimestamp(e.target.value)}
                                    className="input-field font-mono"
                                    placeholder="1640000000000"
                                />
                                <button
                                    onClick={useCurrentTime}
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg whitespace-nowrap"
                                >
                                    Now
                                </button>
                            </div>
                        </div>

                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Supports both seconds and milliseconds
                        </div>

                        {/* Results */}
                        <div className="space-y-3">
                            {Object.entries(converted).map(([format, value]) => (
                                <div key={format} className="bg-gray-50 dark:bg-gray-900 rounded p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-semibold text-sm uppercase text-gray-600 dark:text-gray-400">
                                            {format}
                                        </h3>
                                        <button
                                            onClick={() => copyToClipboard(value)}
                                            className="text-primary-500 hover:text-primary-600"
                                        >
                                            <FiCopy size={16} />
                                        </button>
                                    </div>
                                    <div className="font-mono text-sm">{value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                // Date to Timestamp Mode
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <div className="mb-6">
                            <label className="block font-semibold mb-2">Date/Time Input</label>
                            <input
                                type="datetime-local"
                                value={dateInput}
                                onChange={(e) => setDateInput(e.target.value)}
                                className="input-field"
                            />
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                Or enter any valid date string (e.g., "2024-01-01", "Jan 1, 2024")
                            </div>
                        </div>

                        {converted && (
                            <div className="space-y-3">
                                <div className="bg-gray-50 dark:bg-gray-900 rounded p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-semibold text-sm uppercase text-gray-600 dark:text-gray-400">
                                            Milliseconds
                                        </h3>
                                        <button
                                            onClick={() => copyToClipboard(converted.milliseconds.toString())}
                                            className="text-primary-500 hover:text-primary-600"
                                        >
                                            <FiCopy size={16} />
                                        </button>
                                    </div>
                                    <div className="font-mono text-sm">{converted.milliseconds}</div>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-900 rounded p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-semibold text-sm uppercase text-gray-600 dark:text-gray-400">
                                            Seconds
                                        </h3>
                                        <button
                                            onClick={() => copyToClipboard(converted.seconds.toString())}
                                            className="text-primary-500 hover:text-primary-600"
                                        >
                                            <FiCopy size={16} />
                                        </button>
                                    </div>
                                    <div className="font-mono text-sm">{converted.seconds}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default TimestampConverter;
