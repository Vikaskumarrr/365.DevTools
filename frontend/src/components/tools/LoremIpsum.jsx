import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function LoremIpsum() {
    const [count, setCount] = useState(3);
    const [type, setType] = useState('paragraphs'); // 'paragraphs', 'sentences', 'words'
    const [output, setOutput] = useState('');

    const loremWords = [
        'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
        'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
        'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
        'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
        'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
        'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
        'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
        'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
    ];

    const generateWord = () => {
        return loremWords[Math.floor(Math.random() * loremWords.length)];
    };

    const generateSentence = () => {
        const words = Math.floor(Math.random() * 10) + 5; // 5-15 words
        let sentence = [];
        for (let i = 0; i < words; i++) {
            sentence.push(generateWord());
        }
        sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
        return sentence.join(' ') + '.';
    };

    const generateParagraph = () => {
        const sentences = Math.floor(Math.random() * 4) + 3; // 3-7 sentences
        let paragraph = [];
        for (let i = 0; i < sentences; i++) {
            paragraph.push(generateSentence());
        }
        return paragraph.join(' ');
    };

    const generate = () => {
        let result = [];

        switch (type) {
            case 'words':
                for (let i = 0; i < count; i++) {
                    result.push(generateWord());
                }
                setOutput(result.join(' '));
                break;

            case 'sentences':
                for (let i = 0; i < count; i++) {
                    result.push(generateSentence());
                }
                setOutput(result.join(' '));
                break;

            case 'paragraphs':
                for (let i = 0; i < count; i++) {
                    result.push(generateParagraph());
                }
                setOutput(result.join('\n\n'));
                break;
        }

        toast.success('Lorem ipsum generated!');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        toast.success('Copied to clipboard!');
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Lorem Ipsum Generator</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Generate placeholder text for your designs
                </p>
            </div>

            {/* Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block font-medium mb-2">Generate</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="input-field"
                        >
                            <option value="paragraphs">Paragraphs</option>
                            <option value="sentences">Sentences</option>
                            <option value="words">Words</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium mb-2">
                            Count: {count}
                        </label>
                        <input
                            type="range"
                            min="1"
                            max={type === 'words' ? 100 : type === 'sentences' ? 50 : 10}
                            value={count}
                            onChange={(e) => setCount(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                </div>

                <button onClick={generate} className="btn-primary w-full">
                    Generate Lorem Ipsum
                </button>
            </div>

            {/* Output */}
            {output && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-lg">Generated Text</h3>
                        <button
                            onClick={copyToClipboard}
                            className="text-primary-500 hover:text-primary-600"
                        >
                            <FiCopy size={20} />
                        </button>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded p-4 max-h-96 overflow-y-auto">
                        <p className="whitespace-pre-wrap leading-relaxed">{output}</p>
                    </div>
                </div>
            )}

            {/* Info */}
            <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2">What is Lorem Ipsum?</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    Lorem Ipsum is placeholder text commonly used in the graphic, print, and publishing industries
                    for previewing layouts and visual mockups. It's been the industry standard since the 1500s.
                </p>
            </div>
        </div>
    );
}

export default LoremIpsum;
