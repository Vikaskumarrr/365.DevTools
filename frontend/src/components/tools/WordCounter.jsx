import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function WordCounter() {
    const [text, setText] = useState('');

    const stats = {
        characters: text.length,
        charactersNoSpaces: text.replace(/\s/g, '').length,
        words: text.trim() === '' ? 0 : text.trim().split(/\s+/).length,
        sentences: text.split(/[.!?]+/).filter(s => s.trim() !== '').length,
        paragraphs: text.split(/\n\n+/).filter(p => p.trim() !== '').length,
        lines: text.split('\n').filter(l => l.trim() !== '').length,
        readingTime: Math.ceil((text.trim().split(/\s+/).length || 0) / 200), // 200 words per minute
        speakingTime: Math.ceil((text.trim().split(/\s+/).length || 0) / 150), // 150 words per minute
    };

    const copyStats = () => {
        const statsText = `
Characters: ${stats.characters}
Characters (no spaces): ${stats.charactersNoSpaces}
Words: ${stats.words}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}
Lines: ${stats.lines}
Reading time: ${stats.readingTime} min
Speaking time: ${stats.speakingTime} min
    `.trim();
        navigator.clipboard.writeText(statsText);
        toast.success('Stats copied!');
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Word Counter</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Count words, characters, sentences, and estimate reading time
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Input */}
                <div className="lg:col-span-2 space-y-4">
                    <label className="block font-semibold">Enter your text</label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Start typing or paste your text here..."
                        className="input-field min-h-[500px]"
                    />
                </div>

                {/* Stats */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">Statistics</h3>
                        <button
                            onClick={copyStats}
                            className="text-primary-500 hover:text-primary-600 text-sm"
                        >
                            <FiCopy size={16} />
                        </button>
                    </div>

                    <div className="space-y-3">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                            <div className="text-3xl font-bold text-primary-500">{stats.words}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Words</div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                            <div className="text-3xl font-bold text-primary-500">{stats.characters}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Characters</div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                            <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                                {stats.charactersNoSpaces}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Characters (no spaces)</div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                            <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                                {stats.sentences}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Sentences</div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                            <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                                {stats.paragraphs}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Paragraphs</div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                            <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                                {stats.lines}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Lines</div>
                        </div>

                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                            <div className="text-xl font-bold text-green-700 dark:text-green-400">
                                {stats.readingTime} min
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Reading time</div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                            <div className="text-xl font-bold text-blue-700 dark:text-blue-400">
                                {stats.speakingTime} min
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Speaking time</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WordCounter;
