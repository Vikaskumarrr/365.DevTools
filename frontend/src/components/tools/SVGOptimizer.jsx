import { useState } from 'react';
import { FiCopy, FiDownload } from 'react-icons/fi';
import toast from 'react-hot-toast';

function SVGOptimizer() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [stats, setStats] = useState(null);

    const optimizeSVG = () => {
        if (!input.trim()) {
            toast.error('Please enter SVG code');
            return;
        }

        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(input, 'image/svg+xml');
            const svg = doc.documentElement;

            if (svg.nodeName !== 'svg') {
                throw new Error('Invalid SVG');
            }

            // Remove comments
            removeComments(svg);

            // Remove unnecessary attributes
            removeUnnecessaryAttributes(svg);

            // Round numbers
            roundNumbers(svg);

            // Remove empty elements
            removeEmptyElements(svg);

            const serializer = new XMLSerializer();
            const optimized = serializer.serializeToString(svg);

            setOutput(optimized);
            setStats({
                original: input.length,
                optimized: optimized.length,
                saved: input.length - optimized.length,
                percentage: (((input.length - optimized.length) / input.length) * 100).toFixed(1),
            });

            toast.success('SVG optimized!');
        } catch (err) {
            toast.error('Invalid SVG: ' + err.message);
        }
    };

    const removeComments = (node) => {
        const comments = [];
        const walker = document.createTreeWalker(node, NodeFilter.SHOW_COMMENT);
        let comment;
        while ((comment = walker.nextNode())) {
            comments.push(comment);
        }
        comments.forEach((c) => c.parentNode.removeChild(c));
    };

    const removeUnnecessaryAttributes = (node) => {
        const unnecessaryAttrs = ['id', 'class', 'data-name', 'xmlns:xlink'];
        const walk = (el) => {
            if (el.nodeType === 1) {
                unnecessaryAttrs.forEach((attr) => {
                    if (el.hasAttribute(attr)) {
                        el.removeAttribute(attr);
                    }
                });
                Array.from(el.children).forEach(walk);
            }
        };
        walk(node);
    };

    const roundNumbers = (node) => {
        const walk = (el) => {
            if (el.nodeType === 1) {
                Array.from(el.attributes).forEach((attr) => {
                    const value = attr.value;
                    const rounded = value.replace(/(\d+\.\d{3,})/g, (match) =>
                        parseFloat(match).toFixed(2)
                    );
                    if (rounded !== value) {
                        attr.value = rounded;
                    }
                });
                Array.from(el.children).forEach(walk);
            }
        };
        walk(node);
    };

    const removeEmptyElements = (node) => {
        const walk = (el) => {
            if (el.nodeType === 1) {
                Array.from(el.children).forEach(walk);
                if (el.children.length === 0 && !el.textContent.trim() && el.nodeName !== 'path') {
                    el.parentNode?.removeChild(el);
                }
            }
        };
        walk(node);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        toast.success('Copied!');
    };

    const downloadSVG = () => {
        const blob = new Blob([output], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'optimized.svg';
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Downloaded!');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    SVG Optimizer
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Optimize and minify SVG files for better performance
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <section className="space-y-4">
                    <h2 className="font-semibold text-gray-900 dark:text-white">Input SVG</h2>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="<svg>...</svg>"
                        className="input-field min-h-[400px] font-mono text-sm"
                        aria-label="Input SVG"
                    />
                    <button onClick={optimizeSVG} className="btn-primary w-full">
                        Optimize SVG
                    </button>
                </section>

                <section className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-gray-900 dark:text-white">
                            Optimized SVG
                        </h2>
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
                                onClick={downloadSVG}
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
                        aria-label="Optimized SVG"
                    />
                </section>
            </div>

            {stats && (
                <section className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
                        Optimization Results
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-primary-500">{stats.original}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Original Size</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-500">{stats.optimized}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Optimized Size</p>
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

export default SVGOptimizer;
