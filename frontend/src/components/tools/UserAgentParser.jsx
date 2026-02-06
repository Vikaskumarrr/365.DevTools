import { useState, useEffect } from 'react';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function UserAgentParser() {
    const [userAgent, setUserAgent] = useState('');
    const [parsed, setParsed] = useState(null);

    useEffect(() => {
        setUserAgent(navigator.userAgent);
    }, []);

    const parseUserAgent = () => {
        if (!userAgent.trim()) {
            toast.error('Please enter a user agent string');
            return;
        }

        const ua = userAgent.toLowerCase();
        const info = {
            browser: 'Unknown',
            version: 'Unknown',
            os: 'Unknown',
            device: 'Desktop',
        };

        // Browser detection
        if (ua.includes('firefox')) {
            info.browser = 'Firefox';
            info.version = ua.match(/firefox\/(\d+\.\d+)/)?.[1] || 'Unknown';
        } else if (ua.includes('chrome') && !ua.includes('edg')) {
            info.browser = 'Chrome';
            info.version = ua.match(/chrome\/(\d+\.\d+)/)?.[1] || 'Unknown';
        } else if (ua.includes('safari') && !ua.includes('chrome')) {
            info.browser = 'Safari';
            info.version = ua.match(/version\/(\d+\.\d+)/)?.[1] || 'Unknown';
        } else if (ua.includes('edg')) {
            info.browser = 'Edge';
            info.version = ua.match(/edg\/(\d+\.\d+)/)?.[1] || 'Unknown';
        }

        // OS detection
        if (ua.includes('windows')) info.os = 'Windows';
        else if (ua.includes('mac')) info.os = 'macOS';
        else if (ua.includes('linux')) info.os = 'Linux';
        else if (ua.includes('android')) info.os = 'Android';
        else if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) info.os = 'iOS';

        // Device detection
        if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
            info.device = 'Mobile';
        } else if (ua.includes('tablet') || ua.includes('ipad')) {
            info.device = 'Tablet';
        }

        setParsed(info);
        toast.success('User agent parsed!');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    User Agent Parser
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Parse and analyze user agent strings
                </p>
            </header>

            <div className="space-y-6">
                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                        <label htmlFor="user-agent" className="font-medium">
                            User Agent String
                        </label>
                        <button
                            onClick={() => setUserAgent(navigator.userAgent)}
                            className="text-sm text-primary-500 hover:text-primary-600"
                        >
                            Use Current
                        </button>
                    </div>
                    <textarea
                        id="user-agent"
                        value={userAgent}
                        onChange={(e) => setUserAgent(e.target.value)}
                        placeholder="Enter user agent string..."
                        className="input-field min-h-[120px] font-mono text-sm"
                    />
                    <button onClick={parseUserAgent} className="btn-primary w-full mt-4">
                        Parse User Agent
                    </button>
                </section>

                {parsed && (
                    <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold mb-4">Parsed Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Browser</p>
                                <p className="text-lg font-semibold">{parsed.browser}</p>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Version</p>
                                <p className="text-lg font-semibold">{parsed.version}</p>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Operating System</p>
                                <p className="text-lg font-semibold">{parsed.os}</p>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Device Type</p>
                                <p className="text-lg font-semibold">{parsed.device}</p>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

export default UserAgentParser;
