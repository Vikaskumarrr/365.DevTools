import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function DuplicateRemover() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [caseSensitive, setCaseSensitive] = useState(true);
    const [trimLines, setTrimLines] = useState(true);
    const [stats, setStats] = useState(null);

    const removeDuplicates = () => {
        if (!input.trim()) {
            toast.error('Please enter text');
            return;
        }

        const lines = input.split('\n');
        const seen = new Set();
        const unique = [];

        lines.forEach((line) => {
            let processedLine = line;
            
            if (trimLines) {
                processedLine = line.trim();
            }

            const key = caseSensitive ? processedLine : processedLine.toLowerCase();

            if (!seen.has(key) && processedLine) {
                seen.add(key);
                unique.push(line);
            }
        });

        const result = unique.join('\n');
        setOutput(result);
        setStats({
            original: lines.length,
            unique: unique.length,
            removed: lines.length - unique.length,
        });

        toast.success(`Removed ${lines.length - unique.length} duplicate(s)!`);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    Duplicate Line Remover
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Remove duplicate lines from text
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <section className="space-y-4">
                    <h2 className="font-semibold text-gray-900 dark:text-white">Input Text</h2>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter text with duplicate lines..."
                        className="input-field min-h-[400px] font-mono text-sm"
                        aria-label="Input text"
                    />
                    
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <input
                                id="case-sensitive"
                                type="checkbox"
                                checked={caseSensitive}
                                onChange={(e) => setCaseSensitive(e.target.checked)}
                                className="w-5 h-5"
                            />
                            <label htmlFor="case-sensitive" className="font-medium">
                                Case sensitive
                            </label>
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                id="trim-lines"
                                type="checkbox"
                                checked={trimLines}
                                onChange={(e) => setTrimLines(e.target.checked)}
                                className="w-5 h-5"
                            />
                            <label htmlFor="trim-lines" className="font-medium">
                                Trim whitespace
                            </label>
                        </div>
                    </div>

                    <button onClick={removeDuplicates} className="btn-primary w-full">
                        Remove Duplicates
                    </button>
                </section>

                <section className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-gray-900 dark:text-white">
                            Output Text
                        </h2>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(output);
                                toast.success('Copied!');
                            }}
                            disabled={!output}
                            className="text-primary-500 hover:text-primary-600 disabled:opacity-50 p-2"
                            aria-label="Copy"
                        >
                            <FiCopy size={20} />
                        </button>
                    </div>
                    <textarea
                        value={output}
                        readOnly
                        className="input-field min-h-[400px] font-mono text-sm bg-gray-50 dark:bg-gray-900"
                        aria-label="Output text"
                    />
                </section>
            </div>

            {stats && (
                <section className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
                        Results
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-primary-500">{stats.original}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Original Lines</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-500">{stats.unique}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Unique Lines</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-red-500">{stats.removed}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Removed</p>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

export default DuplicateRemover;
