import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FiSun, FiMoon, FiSearch, FiGithub } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

function Header() {
    const { isDark, toggleTheme } = useTheme();
    const [searchFocused, setSearchFocused] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-gray-900">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl group-hover:scale-110 transition-transform flex items-center justify-center text-white font-bold shadow-lg">
                            3
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                            365.DevTools
                        </span>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <div className="hidden md:block flex-1 max-w-md mx-8">
                        <div className={`relative transition-all ${searchFocused ? 'scale-105' : ''}`}>
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search..."
                                onFocus={() => setSearchFocused(true)}
                                onBlur={() => setSearchFocused(false)}
                                className="w-full pl-10 pr-16 py-2 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            />
                            <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded">
                                ⌘K
                            </kbd>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center space-x-1">
                        <Link
                            to="/"
                            className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 font-medium transition-colors"
                        >
                            Tools
                        </Link>
                        <Link
                            to="/blog"
                            className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 font-medium transition-colors"
                        >
                            Blog
                        </Link>
                        <Link
                            to="/about"
                            className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 font-medium transition-colors hidden sm:block"
                        >
                            About
                        </Link>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="ml-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {isDark ? (
                                <FiSun className="w-5 h-5 text-accent-500" />
                            ) : (
                                <FiMoon className="w-5 h-5 text-gray-700" />
                            )}
                        </button>

                        {/* GitHub Link */}
                        <a
                            href="https://github.com/Vikaskumarrr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                            aria-label="GitHub"
                        >
                            <FiGithub className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
