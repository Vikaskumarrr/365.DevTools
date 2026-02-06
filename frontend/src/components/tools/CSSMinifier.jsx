import { useState } from 'react';
import { FiCopy, FiDownload } from 'react-icons/fi';
import toast from 'react-hot-toast';

function CSSMinifier() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [stats, setStats] = useState(null);

    const minifyCSS = () => {
        if (!input.trim()) {
            toast.error('Please enter CSS code');
            return;
        }

        try {
            let minified = input;

            // Remove comments
            minified = minified.replace(/\/\*[\s\S]*?\*\//g, '');

            // Remove whitespace
            minified = minified.replace(/\s+/g, ' ');

            // Remove spaces around special characters
            minified = minified.replace(/\s*([{}:;,>+~])\s*/g, '$1');

            // Remove last semicolon in blocks
            minified = minified.replace(/;}/g, '}');

            // Remove unnecessary zeros
            minified = minified.replace(/0\.(\d+)/g, '.$1');
            minified = minified.replace(/:0(px|em|rem|%|vh|vw)/g, ':0');

            // Trim
            minified = minified.trim();

            setOutput(minified);
            setStats({
                original: input.length,
                minified: minified.length,
                saved: input.length - minified.length,
                percentage: (((input.length - minified.length) / input.length) * 100).toFixed(1),
            });

            toast.success('CSS minified!');
        } catch (err) {
            toast.error('Failed to minify CSS');
        }
    };

    const beautifyCSS = () => {
        if (!input.trim()) {
            toast.error('Please enter CSS code');
            return;
        }

        try {
            let beautified = input;

            // Add newlines after braces and semicolons
            beautified = beautified.replace(/}/g, '}\n');
            beautified = beautified.replace(/{/g, ' {\n  ');
            beautified = beautified.replace(/;/g, ';\n  ');

            // Clean up extra whitespace
            beautified = beautified.replace(/\n\s*\n/g, '\n');
            beautified = beautified.replace(/  }/g, '}');

            setOutput(beautified.trim());
            toast.success('CSS beautified!');
        } catch (err) {
            toast.error('Failed to beautify CSS');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        toast.success('Copied!');
    };

    const downloadCSS = () => {
        const blob = new Blob([output], { type: 'text/css' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'styles.css';
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Downloaded!');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    CSS Minifier
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Minify and beautify CSS for production
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <section className="space-y-4">
                    <h2 className="font-semibold text-gray-900 dark:text-white">Input CSS</h2>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder=".container {&#10;  display: flex;&#10;  padding: 20px;&#10;}"
                        className="input-field min-h-[400px] font-mono text-sm"
                        aria-label="Input CSS"
                    />
                    <div className="flex gap-3">
                        <button onClick={minifyCSS} className="btn-primary flex-1">
                            Minify
                        </button>
                        <button onClick={beautifyCSS} className="btn-secondary flex-1">
                            Beautify
                        </button>
                    </div>
                </section>

                <section className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-gray-900 dark:text-white">Output CSS</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={copyToClipboard}
                                disabled={!output}
                                className="text-primary-500 hover:text-primary-600 disabled:opacity-50 p-2"
                                aria-label="Copy"
                            >
                                <FiCopy size={20} />
                            </button>
                            <button
                                onClick={downloadCSS}
                                disabled={!output}
                                className="text-primary-500 hover:text-primary-600 disabled:opacity-50 p-2"
                                aria-label="Download"
                            >
                                <FiDownload size={20} />
                            </button>
                        </div>
                    </div>
                    <textarea
                        value={output}
                        readOnly
                        className="input-field min-h-[400px] font-mono text-sm bg-gray-50 dark:bg-gray-900"
                        aria-label="Output CSS"
                    />
                </section>
            </div>

            {stats && (
                <section className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
                        Minification Results
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-primary-500">{stats.original}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Original Size</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-500">{stats.minified}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Minified Size</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-blue-500">{stats.saved}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Bytes Saved</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-purple-500">{stats.percentage}%</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Reduction</p>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

export default CSSMinifier;
