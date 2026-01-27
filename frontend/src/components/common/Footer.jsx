import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiMail } from 'react-icons/fi';

function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg" />
                            <span className="text-xl font-bold">AntiGravity</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            100+ free developer tools. Fast, private, and always free.
                        </p>
                    </div>

                    {/* Tools */}
                    <div>
                        <h3 className="font-semibold mb-4">Popular Tools</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/tools/json-formatter" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                                    JSON Formatter
                                </Link>
                            </li>
                            <li>
                                <Link to="/tools/password-generator" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                                    Password Generator
                                </Link>
                            </li>
                            <li>
                                <Link to="/tools/qr-generator" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                                    QR Code Generator
                                </Link>
                            </li>
                            <li>
                                <Link to="/tools/hash-generator" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                                    Hash Generator
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="font-semibold mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
                            >
                                <FiGithub size={24} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
                            >
                                <FiTwitter size={24} />
                            </a>
                            <a
                                href="mailto:contact@antigravity.com"
                                className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
                            >
                                <FiMail size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        © {new Date().getFullYear()} AntiGravity. Built with ❤️ for developers.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
