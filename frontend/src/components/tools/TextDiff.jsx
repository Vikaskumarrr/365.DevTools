import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function TextDiff() {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [diff, setDiff] = useState([]);

    const computeDiff = () => {
        const lines1 = text1.split('\n');
        const lines2 = text2.split('\n');
        const result = [];

        const maxLines = Math.max(lines1.length, lines2.length);

        for (let i = 0; i < maxLines; i++) {
            const line1 = lines1[i] || '';
            const line2 = lines2[i] || '';

            if (line1 === line2) {
                result.push({ type: 'equal', line: line1, lineNum: i + 1 });
            } else if (!line1) {
                result.push({ type: 'added', line: line2, lineNum: i + 1 });
            } else if (!line2) {
                result.push({ type: 'removed', line: line1, lineNum: i + 1 });
            } else {
                result.push({ type: 'changed', line1, line2, lineNum: i + 1 });
            }
        }

        setDiff(result);
        toast.success('Diff computed!');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Text Diff Tool</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Compare two texts and see the differences
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                    <label className="font-semibold">Text 1 (Original)</label>
                    <textarea
                        value={text1}
                        onChange={(e) => setText1(e.target.value)}
                        placeholder="Enter first text..."
                        className="input-field min-h-[300px] font-mono text-sm"
                    />
                </div>

                <div className="space-y-4">
                    <label className="font-semibold">Text 2 (Modified)</label>
                    <textarea
                        value={text2}
                        onChange={(e) => setText2(e.target.value)}
                        placeholder="Enter second text..."
                        className="input-field min-h-[300px] font-mono text-sm"
                    />
                </div>
            </div>

            <button onClick={computeDiff} className="btn-primary w-full mb-6">
                Compare Texts
            </button>

            {diff.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <h3 className="font-semibold text-lg mb-4">Differences</h3>
                    <div className="space-y-1 font-mono text-sm max-h-96 overflow-y-auto">
                        {diff.map((item, index) => (
                            <div key={index}>
                                {item.type === 'equal' && (
                                    <div className="py-1 px-3">{item.line}</div>
                                )}
                                {item.type === 'added' && (
                                    <div className="py-1 px-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                                        + {item.line}
                                    </div>
                                )}
                                {item.type === 'removed' && (
                                    <div className="py-1 px-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200">
                                        - {item.line}
                                    </div>
                                )}
                                {item.type === 'changed' && (
                                    <>
                                        <div className="py-1 px-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200">
                                            - {item.line1}
                                        </div>
                                        <div className="py-1 px-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                                            + {item.line2}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default TextDiff;
