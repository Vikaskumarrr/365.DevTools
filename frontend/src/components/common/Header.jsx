import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg" />
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                            365.DevTools
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className="text-gray-700 dark:text-gray-300 hover:text-primary-500 font-medium transition-colors"
                        >
                            Tools
                        </Link>
                        <Link
                            to="/blog"
                            className="text-gray-700 dark:text-gray-300 hover:text-primary-500 font-medium transition-colors"
                        >
                            Blog
                        </Link>
                        <Link
                            to="/about"
                            className="text-gray-700 dark:text-gray-300 hover:text-primary-500 font-medium transition-colors"
                        >
                            About
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-gray-700 dark:text-gray-300"
                    >
                        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 space-y-2">
                        <Link
                            to="/"
                            className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-500"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Tools
                        </Link>
                        <Link
                            to="/blog"
                            className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-500"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Blog
                        </Link>
                        <Link
                            to="/about"
                            className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-500"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;
