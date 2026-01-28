import { useState } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import toast from 'react-hot-toast';

function JSONDiff() {
    const [json1, setJson1] = useState('');
    const [json2, setJson2] = useState('');
    const [diff, setDiff] = useState([]);

    const compareJSON = () => {
        if (!json1.trim() || !json2.trim()) {
            toast.error('Please enter both JSON objects');
            return;
        }

        try {
            const obj1 = JSON.parse(json1);
            const obj2 = JSON.parse(json2);
            const differences = findDifferences(obj1, obj2);
            setDiff(differences);
            
            if (differences.length === 0) {
                toast.success('JSON objects are identical!');
            } else {
                toast.success(`Found ${differences.length} difference(s)`);
            }
        } catch (err) {
            toast.error('Invalid JSON: ' + err.message);
        }
    };

    const findDifferences = (obj1, obj2, path = '') => {
        const differences = [];

        const allKeys = new Set([...Object.keys(obj1 || {}), ...Object.keys(obj2 || {})]);

        allKeys.forEach((key) => {
            const currentPath = path ? `${path}.${key}` : key;
            const val1 = obj1?.[key];
            const val2 = obj2?.[key];

            if (!(key in obj1)) {
                differences.push({
                    path: currentPath,
                    type: 'added',
                    value: val2
                });
            } else if (!(key in obj2)) {
                differences.push({
                    path: currentPath,
                    type: 'removed',
                    value: val1
                });
            } else if (typeof val1 === 'object' && typeof val2 === 'object' && val1 !== null && val2 !== null) {
                differences.push(...findDifferences(val1, val2, currentPath));
            } else if (val1 !== val2) {
                differences.push({
                    path: currentPath,
                    type: 'modified',
                    oldValue: val1,
                    newValue: val2
                });
            }
        });

        return differences;
    };

    const clearAll = () => {
        setJson1('');
        setJson2('');
        setDiff([]);
        toast.success('Cleared!');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    JSON Diff Checker
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Compare two JSON objects and find differences
                </p>
            </header>

            <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <section>
                        <h2 className="font-semibold mb-3 text-gray-900 dark:text-white">
                            JSON Object 1
                        </h2>
                        <textarea
                            value={json1}
                            onChange={(e) => setJson1(e.target.value)}
                            placeholder='{"name": "John", "age": 30}'
                            className="input-field min-h-[300px] font-mono text-sm"
                            aria-label="First JSON object"
                        />
                    </section>

                    <section>
                        <h2 className="font-semibold mb-3 text-gray-900 dark:text-white">
                            JSON Object 2
                        </h2>
                        <textarea
                            value={json2}
                            onChange={(e) => setJson2(e.target.value)}
                            placeholder='{"name": "Jane", "age": 25}'
                            className="input-field min-h-[300px] font-mono text-sm"
                            aria-label="Second JSON object"
                        />
                    </section>
                </div>

                <div className="flex gap-3">
                    <button onClick={compareJSON} className="btn-primary flex-1">
                        Compare JSON
                    </button>
                    <button
                        onClick={clearAll}
                        className="btn-secondary"
                        aria-label="Clear all"
                    >
                        <FiRefreshCw size={20} />
                    </button>
                </div>

                {diff.length > 0 && (
                    <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
                            Differences Found: {diff.length}
                        </h3>
                        <div className="space-y-3">
                            {diff.map((item, index) => (
                                <div
                                    key={index}
                                    className={`p-4 rounded-lg border-l-4 ${
                                        item.type === 'added'
                                            ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                                            : item.type === 'removed'
                                            ? 'bg-red-50 dark:bg-red-900/20 border-red-500'
                                            : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500'
                                    }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-medium ${
                                                item.type === 'added'
                                                    ? 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200'
                                                    : item.type === 'removed'
                                                    ? 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200'
                                                    : 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200'
                                            }`}
                                        >
                                            {item.type.toUpperCase()}
                                        </span>
                                        <div className="flex-1">
                                            <p className="font-mono text-sm font-semibold mb-1">
                                                {item.path}
                                            </p>
                                            {item.type === 'modified' ? (
                                                <div className="text-sm">
                                                    <p className="text-red-600 dark:text-red-400">
                                                        - {JSON.stringify(item.oldValue)}
                                                    </p>
                                                    <p className="text-green-600 dark:text-green-400">
                                                        + {JSON.stringify(item.newValue)}
                                                    </p>
                                                </div>
                                            ) : (
                                                <p className="text-sm font-mono">
                                                    {JSON.stringify(item.value)}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {diff.length === 0 && json1 && json2 && (
                    <section className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                        <p className="text-green-800 dark:text-green-200 font-medium">
                            ✓ JSON objects are identical
                        </p>
                    </section>
                )}
            </div>
        </div>
    );
}

export default JSONDiff;
