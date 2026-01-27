import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function MarkdownEditor() {
    const [markdown, setMarkdown] = useState('# Hello World\n\nStart writing **markdown** here...\n\n- List item 1\n- List item 2\n\n```javascript\nconst hello = "world";\n```');

    const copyMarkdown = () => {
        navigator.clipboard.writeText(markdown);
        toast.success('Markdown copied!');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Markdown Editor</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Write and preview Markdown in real-time
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Editor */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="font-semibold">Markdown Input</label>
                        <button
                            onClick={copyMarkdown}
                            className="text-primary-500 hover:text-primary-600"
                        >
                            <FiCopy size={20} />
                        </button>
                    </div>
                    <textarea
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        className="input-field min-h-[600px] font-mono text-sm"
                    />
                </div>

                {/* Preview */}
                <div className="space-y-4">
                    <label className="font-semibold">Preview</label>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 min-h-[600px] overflow-auto prose dark:prose-invert max-w-none">
                        <ReactMarkdown>{markdown}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MarkdownEditor;
