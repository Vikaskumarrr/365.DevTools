import { useState } from 'react';
import toast from 'react-hot-toast';

function IPLookup() {
    const [ip, setIp] = useState('');
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    const lookupIP = async () => {
        if (!ip.trim()) {
            toast.error('Please enter an IP address');
            return;
        }

        setLoading(true);
        try {
            // Demo data - in production, use an API like ipapi.co or ip-api.com
            const demoData = {
                ip: ip,
                city: 'San Francisco',
                region: 'California',
                country: 'United States',
                timezone: 'America/Los_Angeles',
                isp: 'Example ISP',
            };
            
            setTimeout(() => {
                setInfo(demoData);
                setLoading(false);
                toast.success('IP information retrieved!');
            }, 500);
        } catch (err) {
            toast.error('Failed to lookup IP');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    IP Address Lookup
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Get information about IP addresses
                </p>
            </header>

            <div className="space-y-6">
                <section className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        <strong>Note:</strong> This shows demo data. For production, use an IP geolocation API.
                    </p>
                </section>

                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <label htmlFor="ip" className="block font-medium mb-2">
                        IP Address
                    </label>
                    <div className="flex gap-3">
                        <input
                            id="ip"
                            type="text"
                            value={ip}
                            onChange={(e) => setIp(e.target.value)}
                            placeholder="8.8.8.8"
                            className="input-field flex-1"
                        />
                        <button
                            onClick={lookupIP}
                            disabled={loading}
                            className="btn-primary"
                        >
                            {loading ? 'Looking up...' : 'Lookup'}
                        </button>
                    </div>
                </section>

                {info && (
                    <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold mb-4">IP Information</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                <span className="text-gray-600 dark:text-gray-400">IP Address</span>
                                <span className="font-medium">{info.ip}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                <span className="text-gray-600 dark:text-gray-400">City</span>
                                <span className="font-medium">{info.city}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                <span className="text-gray-600 dark:text-gray-400">Region</span>
                                <span className="font-medium">{info.region}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                <span className="text-gray-600 dark:text-gray-400">Country</span>
                                <span className="font-medium">{info.country}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                <span className="text-gray-600 dark:text-gray-400">Timezone</span>
                                <span className="font-medium">{info.timezone}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-gray-600 dark:text-gray-400">ISP</span>
                                <span className="font-medium">{info.isp}</span>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

export default IPLookup;
