import { Link } from 'react-router-dom';
import { FiSun, FiMoon, FiGithub } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import CommandPalette from './CommandPalette';

function Header() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-gray-900">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <img
                            src="/logo.png"
                            alt="365.DevTools Logo"
                            className="w-14 h-14 group-hover:scale-110 transition-transform"
                        />
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                            365.DevTools
                        </span>
                    </Link>

                    {/* Command Palette Search */}
                    <div className="flex-1 max-w-md mx-8">
                        <CommandPalette />
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
                            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                            aria-pressed={isDark}
                        >
                            {isDark ? (
                                <FiSun className="w-5 h-5 text-accent-500" aria-hidden="true" />
                            ) : (
                                <FiMoon className="w-5 h-5 text-gray-700" aria-hidden="true" />
                            )}
                        </button>

                        {/* GitHub Link */}
                        <a
                            href="https://github.com/Vikaskumarrr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                            aria-label="View source code on GitHub (opens in new tab)"
                        >
                            <FiGithub className="w-5 h-5 text-gray-700 dark:text-gray-300" aria-hidden="true" />
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
