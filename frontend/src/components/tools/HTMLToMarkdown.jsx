import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function HTMLToMarkdown() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const convertToMarkdown = () => {
        if (!input.trim()) {
            toast.error('Please enter HTML');
            return;
        }

        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(input, 'text/html');
            const markdown = htmlToMarkdown(doc.body);
            setOutput(markdown);
            toast.success('Converted to Markdown!');
        } catch (err) {
            toast.error('Conversion failed');
        }
    };

    const htmlToMarkdown = (node) => {
        let result = '';

        node.childNodes.forEach((child) => {
            if (child.nodeType === Node.TEXT_NODE) {
                result += child.textContent;
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                const tag = child.tagName.toLowerCase();
                const text = child.textContent;

                switch (tag) {
                    case 'h1':
                        result += `# ${text}\n\n`;
                        break;
                    case 'h2':
                        result += `## ${text}\n\n`;
                        break;
                    case 'h3':
                        result += `### ${text}\n\n`;
                        break;
                    case 'h4':
                        result += `#### ${text}\n\n`;
                        break;
                    case 'h5':
                        result += `##### ${text}\n\n`;
                        break;
                    case 'h6':
                        result += `###### ${text}\n\n`;
                        break;
                    case 'p':
                        result += `${htmlToMarkdown(child)}\n\n`;
                        break;
                    case 'strong':
                    case 'b':
                        result += `**${text}**`;
                        break;
                    case 'em':
                    case 'i':
                        result += `*${text}*`;
                        break;
                    case 'a':
                        result += `[${text}](${child.getAttribute('href')})`;
                        break;
                    case 'code':
                        result += `\`${text}\``;
                        break;
                    case 'pre':
                        result += `\`\`\`\n${text}\n\`\`\`\n\n`;
                        break;
                    case 'ul':
                    case 'ol':
                        child.querySelectorAll('li').forEach((li, i) => {
                            const prefix = tag === 'ul' ? '-' : `${i + 1}.`;
                            result += `${prefix} ${li.textContent}\n`;
                        });
                        result += '\n';
                        break;
                    case 'br':
                        result += '\n';
                        break;
                    default:
                        result += htmlToMarkdown(child);
                }
            }
        });

        return result;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    HTML to Markdown
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Convert HTML to Markdown format
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <section className="space-y-4">
                    <h2 className="font-semibold text-gray-900 dark:text-white">HTML Input</h2>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="<h1>Hello</h1><p>World</p>"
                        className="input-field min-h-[400px] font-mono text-sm"
                        aria-label="HTML input"
                    />
                    <button onClick={convertToMarkdown} className="btn-primary w-full">
                        Convert to Markdown
                    </button>
                </section>

                <section className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-gray-900 dark:text-white">
                            Markdown Output
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
                        aria-label="Markdown output"
                    />
                </section>
            </div>
        </div>
    );
}

export default HTMLToMarkdown;
