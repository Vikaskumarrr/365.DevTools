import { motion } from 'framer-motion';

function Blog() {
    const blogPosts = [
        {
            id: 1,
            title: 'How to Use JSON Formatter Like a Pro',
            excerpt: 'Learn advanced techniques for formatting and validating JSON data efficiently.',
            date: 'January 15, 2026',
            category: 'Tutorial',
            readTime: '5 min read',
        },
        {
            id: 2,
            title: '10 Must-Have Developer Tools in 2026',
            excerpt: 'Discover the essential tools every developer should have in their toolkit.',
            date: 'January 10, 2026',
            category: 'Guide',
            readTime: '8 min read',
        },
        {
            id: 3,
            title: 'Why Privacy Matters in Developer Tools',
            excerpt: 'Understanding the importance of client-side processing and data privacy.',
            date: 'January 5, 2026',
            category: 'Security',
            readTime: '6 min read',
        },
        {
            id: 4,
            title: 'Regex Made Easy: A Beginner\'s Guide',
            excerpt: 'Master regular expressions with our comprehensive guide and interactive tester.',
            date: 'December 28, 2025',
            category: 'Tutorial',
            readTime: '10 min read',
        },
        {
            id: 5,
            title: 'Best Practices for Password Security',
            excerpt: 'Learn how to create and manage secure passwords for your applications.',
            date: 'December 20, 2025',
            category: 'Security',
            readTime: '7 min read',
        },
        {
            id: 6,
            title: 'Color Theory for Developers',
            excerpt: 'Understanding color spaces: HEX, RGB, HSL, and CMYK explained.',
            date: 'December 15, 2025',
            category: 'Design',
            readTime: '6 min read',
        },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] py-20 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-black mb-6 text-gray-900 dark:text-white">
                        Developer <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Blog</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Tutorials, guides, and insights on developer tools and best practices.
                    </p>
                </motion.div>

                {/* Blog Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow cursor-pointer group"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                                        {post.category}
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{post.readTime}</span>
                                </div>

                                <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                                    {post.title}
                                </h2>

                                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500 dark:text-gray-500">{post.date}</span>
                                    <span className="text-blue-500 group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Newsletter CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-12 text-center text-white"
                >
                    <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                    <p className="text-xl mb-6 opacity-90">
                        Get the latest tutorials and tips delivered to your inbox.
                    </p>
                    <div className="max-w-md mx-auto flex gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default Blog;
