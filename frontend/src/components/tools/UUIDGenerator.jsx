import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FiCopy, FiRefreshCw } from 'react-icons/fi';
import toast from 'react-hot-toast';

function UUIDGenerator() {
    const [uuids, setUuids] = useState([]);
    const [count, setCount] = useState(1);
    const [version, setVersion] = useState('v4');
    const [uppercase, setUppercase] = useState(false);

    useEffect(() => {
        generateUUIDs();
    }, []);

    const generateUUIDs = () => {
        const newUUIDs = [];
        for (let i = 0; i < count; i++) {
            let uuid = uuidv4();
            if (uppercase) uuid = uuid.toUpperCase();
            newUUIDs.push(uuid);
        }
        setUuids(newUUIDs);
        toast.success(`Generated ${count} UUID${count > 1 ? 's' : ''}!`);
    };

    const copyUUID = (uuid) => {
        navigator.clipboard.writeText(uuid);
        toast.success('UUID copied!');
    };

    const copyAll = () => {
        navigator.clipboard.writeText(uuids.join('\n'));
        toast.success('All UUIDs copied!');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">UUID Generator</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Generate random UUIDs/GUIDs instantly
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block font-medium mb-2">
                            Number of UUIDs: {count}
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={count}
                            onChange={(e) => setCount(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={uppercase}
                                onChange={(e) => setUppercase(e.target.checked)}
                                className="w-5 h-5"
                            />
                            <span>Uppercase</span>
                        </label>
                    </div>
                </div>

                {/* Generate Button */}
                <button
                    onClick={generateUUIDs}
                    className="btn-primary w-full flex items-center justify-center gap-2 mb-6"
                >
                    <FiRefreshCw size={20} />
                    Generate UUIDs
                </button>

                {/* Results */}
                {uuids.length > 0 && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg">Generated UUIDs</h3>
                            <button onClick={copyAll} className="text-primary-500 hover:text-primary-600 text-sm">
                                Copy All
                            </button>
                        </div>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {uuids.map((uuid, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 rounded p-3 font-mono text-sm"
                                >
                                    <span className="break-all">{uuid}</span>
                                    <button
                                        onClick={() => copyUUID(uuid)}
                                        className="ml-4 text-primary-500 hover:text-primary-600 flex-shrink-0"
                                    >
                                        <FiCopy size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2">What is a UUID?</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    A UUID (Universally Unique Identifier) is a 128-bit number used to identify information in computer systems.
                    The probability of generating a duplicate UUID is extremely low, making them ideal for distributed systems.
                </p>
            </div>
        </div>
    );
}

export default UUIDGenerator;
