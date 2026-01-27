import { useState } from 'react';
import { getPopularTools, CATEGORIES } from '../utils/toolsList';
import ToolCard from '../components/common/ToolCard';

function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const popularTools = getPopularTools();

    return (
        <div className="min-h-screen">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary-500 to-purple-600 bg-clip-text text-transparent">
                        Developer Tools That Just Work
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                        Fast, beautiful, and privacy-focused tools for developers
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <input
                            type="text"
                            placeholder="Search tools..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-field text-lg"
                        />
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <div className="text-4xl font-bold text-primary-500 mb-2">90+</div>
                        <div className="text-gray-600 dark:text-gray-400">Free Tools</div>
                    </div>
                    <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <div className="text-4xl font-bold text-primary-500 mb-2">100%</div>
                        <div className="text-gray-600 dark:text-gray-400">Privacy Focused</div>
                    </div>
                    <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <div className="text-4xl font-bold text-primary-500 mb-2">0</div>
                        <div className="text-gray-600 dark:text-gray-400">Sign-ups Required</div>
                    </div>
                </div>

                {/* Popular Tools Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">Popular Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {popularTools.slice(0, 9).map((tool) => (
                            <ToolCard key={tool.id} tool={tool} />
                        ))}
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-20 mb-12">
                    <h2 className="text-3xl font-bold mb-8 text-center">Why AntiGravity?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="text-5xl mb-4">🔒</div>
                            <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                All processing happens locally in your browser. Your data never leaves your device.
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="text-5xl mb-4">⚡</div>
                            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                No server round-trips. Everything runs instantly on your machine.
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="text-5xl mb-4">💯</div>
                            <h3 className="text-xl font-semibold mb-2">Always Free</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                No subscriptions, no hidden fees. All tools are completely free forever.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;
