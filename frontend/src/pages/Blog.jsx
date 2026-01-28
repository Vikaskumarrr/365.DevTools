import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiCalendar, FiTag, FiSearch, FiArrowRight } from 'react-icons/fi';

function Blog() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = ['All', 'Tutorial', 'Guide', 'Security', 'Design', 'Tips'];

    const blogPosts = [
        {
            id: 1,
            title: 'How to Use JSON Formatter Like a Pro',
            excerpt: 'Learn advanced techniques for formatting and validating JSON data efficiently. Master the art of working with complex JSON structures.',
            date: 'January 15, 2026',
            category: 'Tutorial',
            readTime: '5 min',
            author: 'Dev Team',
            featured: true,
        },
        {
            id: 2,
            title: '10 Must-Have Developer Tools in 2026',
            excerpt: 'Discover the essential tools every developer should have in their toolkit for maximum productivity.',
            date: 'January 10, 2026',
            category: 'Guide',
            readTime: '8 min',
            author: 'Dev Team',
            featured: true,
        },
        {
            id: 3,
            title: 'Why Privacy Matters in Developer Tools',
            excerpt: 'Understanding the importance of client-side processing and data privacy in modern development.',
            date: 'January 5, 2026',
            category: 'Security',
            readTime: '6 min',
            author: 'Security Team',
            featured: false,
        },
        {
            id: 4,
            title: 'Regex Made Easy: A Beginner\'s Guide',
            excerpt: 'Master regular expressions with our comprehensive guide and interactive tester.',
            date: 'December 28, 2025',
            category: 'Tutorial',
            readTime: '10 min',
            author: 'Dev Team',
            featured: false,
        },
        {
            id: 5,
            title: 'Best Practices for Password Security',
            excerpt: 'Learn how to create and manage secure passwords for your applications.',
            date: 'December 20, 2025',
            category: 'Security',
            readTime: '7 min',
            author: 'Security Team',
            featured: false,
        },
        {
            id: 6,
            title: 'Color Theory for Developers',
            excerpt: 'Understanding color spaces: HEX, RGB, HSL, and CMYK explained.',
            date: 'December 15, 2025',
            category: 'Design',
            readTime: '6 min',
            author: 'Design Team',
            featured: false,
        },
        {
            id: 7,
            title: 'Mastering Base64 Encoding',
            excerpt: 'Everything you need to know about Base64 encoding and decoding.',
            date: 'December 10, 2025',
            category: 'Tutorial',
            readTime: '5 min',
            author: 'Dev Team',
            featured: false,
        },
        {
            id: 8,
            title: 'API Testing Best Practices',
            excerpt: 'Learn how to effectively test REST APIs with our comprehensive guide.',
            date: 'December 5, 2025',
            category: 'Guide',
            readTime: '9 min',
            author: 'Dev Team',
            featured: false,
        },
        {
            id: 9,
            title: 'Accessibility in Web Development',
            excerpt: 'Why WCAG compliance matters and how to implement it in your projects.',
            date: 'November 30, 2025',
            category: 'Tips',
            readTime: '8 min',
            author: 'Dev Team',
            featured: false,
        },
    ];

    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredPosts = blogPosts.filter(post => post.featured);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-6xl font-black mb-4">
                        <span className="text-gray-900 dark:text-white">Developer </span>
                        <span className="text-primary-500">Blog</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                        Tutorials, guides, and insights on developer tools and best practices
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-primary-500 transition-colors"
                        />
                    </div>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-2 mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                selectedCategory === category
                                    ? 'bg-primary-500 text-white shadow-lg'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-gray-200 dark:border-gray-700'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Featured Posts */}
                {selectedCategory === 'All' && !searchQuery && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-16"
                    >
                        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                            Featured Articles
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {featuredPosts.map((post, index) => (
                                <article
                                    key={post.id}
                                    className="group relative bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-8 hover:border-primary-500 dark:hover:border-primary-500 transition-all hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                                >
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-semibold">
                                            {post.category}
                                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-500">Featured</span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1">
                                                <FiCalendar size={14} />
                                                {post.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FiClock size={14} />
                                                {post.readTime}
                                            </span>
                                        </div>
                                        <FiArrowRight className="text-primary-500 group-hover:translate-x-2 transition-transform" size={20} />
                                    </div>
                                </article>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* All Posts Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                        {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="group bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-primary-500 dark:hover:border-primary-500 transition-all hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold flex items-center gap-1">
                                        <FiTag size={12} />
                                        {post.category}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1">
                                        <FiClock size={12} />
                                        {post.readTime}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                                    {post.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-2">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
                                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                                        <FiCalendar size={12} />
                                        {post.date}
                                    </div>
                                    <FiArrowRight className="text-primary-500 group-hover:translate-x-2 transition-transform" size={18} />
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    {filteredPosts.length === 0 && (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">📝</div>
                            <p className="text-2xl text-gray-400 dark:text-gray-600">No articles found</p>
                            <p className="text-gray-500 dark:text-gray-500 mt-2">Try a different category or search term</p>
                        </div>
                    )}
                </motion.div>

                {/* Newsletter CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-12 text-center text-white relative overflow-hidden"
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                        }} />
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
                        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                            Get the latest tutorials, tips, and tool updates delivered to your inbox
                        </p>
                        <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                                aria-label="Email address"
                            />
                            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl">
                                Subscribe
                            </button>
                        </div>
                        <p className="text-sm mt-4 opacity-75">
                            Join 10,000+ developers. No spam, unsubscribe anytime.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default Blog;
