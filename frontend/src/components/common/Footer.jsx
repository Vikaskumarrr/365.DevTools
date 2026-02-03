import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiMail } from 'react-icons/fi';

function Footer() {
    return (
        <footer className="bg-white dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-gray-900">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <img
                                src="/logo.png"
                                alt="365.DevTools Logo"
                                className="w-10 h-10"
                            />
                            <span className="text-xl font-bold text-gray-900 dark:text-white">365.DevTools</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            33+ free developer tools. Fast , private , secure and always free.
                        </p>
                    </div>

                    {/* Popular Tools */}
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Popular Tools</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/tools/json-formatter" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">JSON Formatter</Link></li>
                            <li><Link to="/tools/password-generator" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">Password Generator</Link></li>
                            <li><Link to="/tools/qr-generator" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">QR Code Generator</Link></li>
                            <li><Link to="/tools/hash-generator" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">Hash Generator</Link></li>
                            <li><Link to="/tools/Currency Convertor" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">Currency Convertor</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">About</Link></li>
                            <li><Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">Blog</Link></li>
                            <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">Contact Us</a></li>
                        </ul>
                    </div>


                    {/* Connect */}
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors" aria-label="GitHub">
                                <FiGithub size={24} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors" aria-label="Twitter">
                                <FiTwitter size={24} />
                            </a>
                            <a href="mailto:contact@365devtools.com" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors" aria-label="Email">
                                <FiMail size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        © {new Date().getFullYear()} 365.DevTools. Built with ❤️ for developers.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
