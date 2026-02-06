import { useState } from 'react';
import { FiCopy, FiEye } from 'react-icons/fi';
import toast from 'react-hot-toast';

function MarkdownToHTML() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [showPreview, setShowPreview] = useState(false);

    const convertToHTML = () => {
        if (!input.trim()) {
            toast.error('Please enter Markdown');
            return;
        }

        try {
            const html = markdownToHTML(input);
            setOutput(html);
            toast.success('Converted to HTML!');
        } catch (err) {
            toast.error('Conversion failed');
        }
    };

    const markdownToHTML = (markdown) => {
        let html = markdown;

        // Headers
        html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>');
        html = html.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>');
        html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
        html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
        html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
        html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');

        // Bold
        html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

        // Italic
        html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
        html = html.replace(/_(.+?)_/g, '<em>$1</em>');

        // Code
        html = html.replace(/`(.+?)`/g, '<code>$1</code>');

        // Links
        html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');

        // Lists
        html = html.replace(/^\-\s+(.+)$/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

        // Paragraphs
        html = html.replace(/^(?!<[hul]|<\/[hul])(.+)$/gm, '<p>$1</p>');

        return html;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    Markdown to HTML
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Convert Markdown to HTML format
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <section className="space-y-4">
                    <h2 className="font-semibold text-gray-900 dark:text-white">
                        Markdown Input
                    </h2>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="# Hello&#10;**Bold text**"
                        className="input-field min-h-[400px] font-mono text-sm"
                        aria-label="Markdown input"
                    />
                    <button onClick={convertToHTML} className="btn-primary w-full">
                        Convert to HTML
                    </button>
                </section>

                <section className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-gray-900 dark:text-white">
                            HTML Output
                        </h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowPreview(!showPreview)}
                                className="text-primary-500 hover:text-primary-600 p-2"
                                aria-label="Toggle preview"
                            >
                                <FiEye size={20} />
                            </button>
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
                    </div>
                    {showPreview ? (
                        <div
                            className="input-field min-h-[400px] prose dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: output }}
                        />
                    ) : (
                        <textarea
                            value={output}
                            readOnly
                            className="input-field min-h-[400px] font-mono text-sm bg-gray-50 dark:bg-gray-900"
                            aria-label="HTML output"
                        />
                    )}
                </section>
            </div>
        </div>
    );
}

export default MarkdownToHTML;
