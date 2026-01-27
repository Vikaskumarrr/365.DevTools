import { motion } from 'framer-motion';
import { FiCode, FiZap, FiShield, FiHeart } from 'react-icons/fi';

function About() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] py-20 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-black mb-6 text-gray-900 dark:text-white">
                        About <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-600">365.DevTools</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Your go-to platform for free, privacy-focused developer tools that actually work.
                    </p>
                </motion.div>

                {/* Mission */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Mission</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        We believe that developers deserve access to high-quality tools without sacrificing their privacy or paying premium fees.
                        365.DevTools was created to provide a comprehensive suite of developer utilities that are:
                    </p>
                    <ul className="space-y-3 text-lg text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">✓</span>
                            <span><strong>100% Free</strong> - No hidden costs, no premium tiers</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">✓</span>
                            <span><strong>Privacy-First</strong> - All processing happens in your browser</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">✓</span>
                            <span><strong>No Sign-ups</strong> - Use any tool instantly, no account needed</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">✓</span>
                            <span><strong>Lightning Fast</strong> - Client-side processing means zero server delays</span>
                        </li>
                    </ul>
                </motion.div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {[
                        {
                            icon: <FiCode size={32} />,
                            title: '33+ Developer Tools',
                            description: 'From JSON formatters to regex testers, we have everything you need for daily development tasks.',
                        },
                        {
                            icon: <FiZap size={32} />,
                            title: 'Blazing Fast',
                            description: 'All tools run client-side in your browser. No server round-trips, no waiting.',
                        },
                        {
                            icon: <FiShield size={32} />,
                            title: 'Privacy Guaranteed',
                            description: 'Your data never leaves your browser. We literally cannot see what you\'re processing.',
                        },
                        {
                            icon: <FiHeart size={32} />,
                            title: 'Built for Developers',
                            description: 'Created by developers, for developers. We know what you need because we use these tools too.',
                        },
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                            className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
                        >
                            <div className="text-primary-500 mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="text-center bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-12 text-white"
                >
                    <h2 className="text-3xl font-bold mb-4">Ready to boost your productivity?</h2>
                    <p className="text-xl mb-6 opacity-90">
                        Start using our free tools today. No sign-up required.
                    </p>
                    <a
                        href="/"
                        className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                    >
                        Explore Tools
                    </a>
                </motion.div>
            </div>
        </div>
    );
}

export default About;
