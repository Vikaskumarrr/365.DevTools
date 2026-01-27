import { useState } from 'react';
import toast from 'react-hot-toast';

function RegexTester() {
    const [pattern, setPattern] = useState('');
    const [flags, setFlags] = useState({ g: true, i: false, m: false });
    const [testString, setTestString] = useState('');
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState('');

    const testRegex = () => {
        try {
            setError('');
            const flagStr = Object.entries(flags)
                .filter(([_, v]) => v)
                .map(([k]) => k)
                .join('');

            const regex = new RegExp(pattern, flagStr);
            const found = testString.matchAll(regex);
            const results = Array.from(found);

            setMatches(results);
            toast.success(`Found ${results.length} match${results.length !== 1 ? 'es' : ''}!`);
        } catch (err) {
            setError(err.message);
            setMatches([]);
            toast.error('Invalid regex pattern');
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Regex Tester</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Test regular expressions in real-time
                </p>
            </div>

            <div className="space-y-6">
                {/* Regex Pattern */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <label className="block font-semibold mb-2">Regex Pattern</label>
                    <div className="flex gap-2 items-center mb-4">
                        <span className="text-2xl">/</span>
                        <input
                            type="text"
                            value={pattern}
                            onChange={(e) => setPattern(e.target.value)}
                            placeholder="Enter regex pattern"
                            className="input-field font-mono flex-1"
                        />
                        <span className="text-2xl">/</span>
                        <div className="flex gap-3">
                            {Object.entries(flags).map(([flag, enabled]) => (
                                <label key={flag} className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={enabled}
                                        onChange={(e) => setFlags({ ...flags, [flag]: e.target.checked })}
                                        className="mr-1"
                                    />
                                    <span className="font-mono">{flag}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
                </div>

                {/* Test String */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <label className="block font-semibold mb-2">Test String</label>
                    <textarea
                        value={testString}
                        onChange={(e) => setTestString(e.target.value)}
                        placeholder="Enter text to test against"
                        className="input-field min-h-[200px] font-mono text-sm mb-4"
                    />
                    <button onClick={testRegex} className="btn-primary">
                        Test Regex
                    </button>
                </div>

                {/* Results */}
                {matches.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <h3 className="font-semibold text-lg mb-4">
                            Matches ({matches.length})
                        </h3>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {matches.map((match, index) => (
                                <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded p-3">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium">Match {index + 1}</span>
                                        <span className="text-gray-500">Index: {match.index}</span>
                                    </div>
                                    <div className="font-mono text-sm break-all bg-green-50 dark:bg-green-900/20 p-2 rounded">
                                        {match[0]}
                                    </div>
                                    {match.length > 1 && (
                                        <div className="mt-2">
                                            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                                Capture Groups:
                                            </div>
                                            {[...match].slice(1).map((group, gi) => (
                                                <div key={gi} className="font-mono text-xs bg-blue-50 dark:bg-blue-900/20 p-1 rounded mt-1">
                                                    Group {gi + 1}: {group}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RegexTester;
