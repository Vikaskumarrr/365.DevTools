import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiZap, FiLock, FiUsers, FiStar } from 'react-icons/fi';
import { toolsList, getPopularTools, CATEGORIES } from '../utils/toolsList';
import BlurText from '../components/effects/BlurText';
import Particles from '../components/effects/Particles';
import GlareHover from '../components/effects/GlareHover';

function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(CATEGORIES.ALL);
    const [filteredTools, setFilteredTools] = useState(toolsList);
    const [recentlyUsed, setRecentlyUsed] = useState([]);

    useEffect(() => {
        // Load recently used tools from localStorage
        const recent = JSON.parse(localStorage.getItem('recentlyUsed') || '[]');
        setRecentlyUsed(recent.slice(0, 6)); // Show max 6
        //hello
    }, []);

    useEffect(() => {
        let tools = toolsList;

        // Filter by category
        if (selectedCategory !== CATEGORIES.ALL) {
            tools = tools.filter(tool => tool.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery) {
            tools = tools.filter(tool =>
                tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredTools(tools);
    }, [searchQuery, selectedCategory]);

    const popularTools = getPopularTools();

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white">
            {/* Hero Section */}
            <section className="relative pt-20 pb-16 px-4 overflow-hidden">
                {/* Particle Background */}
                <div className="absolute inset-0 opacity-30">
                    <Particles
                        particleColors={['#EF6E76', '#EF6E76', '#ffffff']}
                        particleCount={150}
                        particleSpread={3}
                        speed={0.15}
                        particleBaseSize={100}
                        moveParticlesOnHover={true}
                        alphaParticles={true}
                        disableRotation={false}
                        pixelRatio={1}
                    />
                </div>

                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-transparent dark:from-primary-500/10 pointer-events-none" />

                <div className="max-w-6xl mx-auto text-center relative z-10">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-500/10 dark:bg-primary-500/20 border border-primary-500/20 rounded-full mb-6"
                    >
                        <FiZap className="text-primary-600" size={16} />
                        <span className="text-sm font-medium text-primary-700 dark:text-primary-400">
                            33+ Free Tools • Private • Secure • No Signup
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <BlurText
                            text="Daily Developer Tools"
                            delay={40}
                            animateBy="words"
                            direction="top"
                            className="text-5xl md:text-7xl font-black mb-3 leading-tight text-gray-900 dark:text-white"
                        />
                        <BlurText
                            text="That Just Work"
                            delay={80}
                            animateBy="words"
                            direction="bottom"
                            onAnimationComplete={() => console.log('Hero animation complete!')}
                            className="text-5xl md:text-7xl font-black leading-tight text-primary-500"
                        />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto"
                    >
                        Fast , Beautiful , Secure and Privacy-focused tools for developers, Designers, and everyone. Everything runs in your browser.
                    </motion.p>

                    {/* Quick Access Tools */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-3 mb-12"
                    >
                        {popularTools.slice(0, 6).map((tool) => (
                            <Link
                                key={tool.id}
                                to={tool.path}
                                className="group px-4 py-2 bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-lg hover:shadow-primary-500/20 flex items-center space-x-2 text-gray-900 dark:text-white relative overflow-hidden"
                            >
                                {/* Glossy effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <span className="relative z-10 text-xl group-hover:scale-110 transition-transform duration-300">{tool.icon}</span>
                                <span className="relative z-10 group-hover:text-primary-500 transition-colors duration-300">{tool.name}</span>
                            </Link>
                        ))}
                    </motion.div>

                    {/* Features Grid */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
                    >
                        {[
                            { icon: <FiZap />, title: 'Lightning Fast', desc: 'All tools run locally in your browser' },
                            { icon: <FiLock />, title: '100% Private', desc: 'Your data never leaves your device' },
                            { icon: <FiUsers />, title: 'Built for Everyone', desc: 'Simple enough for anyone, powerful for pros' },
                            { icon: <FiStar />, title: 'Always Free', desc: 'No accounts, no limits' },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="group p-6 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-2xl text-center transition-all duration-300 hover:border-primary-500 dark:hover:border-primary-500 hover:-translate-y-1 hover:shadow-lg">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500/10 to-accent-500/10 dark:from-primary-500/20 dark:to-accent-500/20 text-primary-600 dark:text-primary-400 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors duration-300">{feature.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Recently Used */}
            {recentlyUsed.length > 0 && (
                <section className="px-4 pb-12">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Recently Used</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recentlyUsed.map((tool) => (
                                <Link key={tool.id} to={tool.path}>
                                    <div className="group p-6 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-2xl transition-all duration-300 hover:border-primary-500 dark:hover:border-primary-500 hover:-translate-y-1 hover:shadow-lg">
                                        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{tool.icon}</div>
                                        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors duration-300">
                                            {tool.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Popular Tools Section */}
            <section className="px-4 pb-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold mb-2">
                            <span className="text-primary-500">Popular</span>{' '}
                            <span className="text-gray-900 dark:text-white">Tools</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {filteredTools.length} tools available
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {Object.values(CATEGORIES).map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                    ? 'bg-primary-500 text-white shadow-lg'
                                    : 'bg-white dark:bg-black text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 border border-gray-300 dark:border-gray-800 hover:border-primary-500'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Tools Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTools.map((tool, index) => (
                            <motion.div
                                key={tool.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <Link
                                    to={tool.path}
                                    onClick={() => {
                                        // Save to recently used
                                        const recent = JSON.parse(localStorage.getItem('recentlyUsed') || '[]');
                                        const filtered = recent.filter(t => t.id !== tool.id);
                                        filtered.unshift(tool);
                                        localStorage.setItem('recentlyUsed', JSON.stringify(filtered.slice(0, 10)));
                                    }}
                                >
                                    <GlareHover
                                        glareColor="#EF6E76"
                                        glareOpacity={0.15}
                                        glareAngle={-30}
                                        glareSize={250}
                                        transitionDuration={600}
                                        playOnce={false}
                                    >
                                        <div className="group h-full p-6 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-2xl transition-all duration-300 hover:border-primary-500 dark:hover:border-primary-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/10">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="text-3xl group-hover:scale-110 transition-transform duration-300">{tool.icon}</div>
                                                {tool.popular && (
                                                    <span className="flex items-center space-x-1 text-xs font-semibold px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 group-hover:scale-105 transition-transform duration-300">
                                                        <FiStar size={12} />
                                                        <span>Popular</span>
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors duration-300">
                                                {tool.name}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{tool.description}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500 dark:text-gray-500 font-medium">{tool.category}</span>
                                                <span className="text-primary-500 text-2xl group-hover:translate-x-2 transition-all duration-300 font-bold">→</span>
                                            </div>
                                        </div>
                                    </GlareHover>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {filteredTools.length === 0 && (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">🔍</div>
                            <p className="text-2xl text-gray-400">No tools found</p>
                            <p className="text-gray-500 mt-2">Try a different category</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Home;
