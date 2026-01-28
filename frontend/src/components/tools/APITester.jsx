import { useState } from 'react';
import { FiSend, FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function APITester() {
    const [url, setUrl] = useState('');
    const [method, setMethod] = useState('GET');
    const [headers, setHeaders] = useState('');
    const [body, setBody] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [statusCode, setStatusCode] = useState(null);

    const testAPI = async () => {
        if (!url.trim()) {
            toast.error('Please enter a URL');
            return;
        }

        setLoading(true);
        setResponse('');
        setStatusCode(null);

        try {
            const options = {
                method,
                headers: {}
            };

            if (headers.trim()) {
                try {
                    options.headers = JSON.parse(headers);
                } catch (e) {
                    toast.error('Invalid JSON in headers');
                    setLoading(false);
                    return;
                }
            }

            if (method !== 'GET' && method !== 'HEAD' && body.trim()) {
                options.body = body;
                if (!options.headers['Content-Type']) {
                    options.headers['Content-Type'] = 'application/json';
                }
            }

            const startTime = Date.now();
            const res = await fetch(url, options);
            const endTime = Date.now();
            const duration = endTime - startTime;

            setStatusCode(res.status);

            const contentType = res.headers.get('content-type');
            let data;

            if (contentType && contentType.includes('application/json')) {
                data = await res.json();
            } else {
                data = await res.text();
            }

            const responseData = {
                status: res.status,
                statusText: res.statusText,
                duration: `${duration}ms`,
                headers: Object.fromEntries(res.headers.entries()),
                data
            };

            setResponse(JSON.stringify(responseData, null, 2));
            toast.success('Request completed!');
        } catch (err) {
            setResponse(JSON.stringify({ error: err.message }, null, 2));
            toast.error('Request failed: ' + err.message);
        }

        setLoading(false);
    };

    const copyResponse = () => {
        navigator.clipboard.writeText(response);
        toast.success('Response copied!');
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    API Tester
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Test REST APIs with custom requests
                </p>
            </header>

            <div className="space-y-6">
                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <h2 className="font-semibold mb-4 text-gray-900 dark:text-white">Request</h2>
                    
                    <div className="flex gap-4 mb-4">
                        <select
                            value={method}
                            onChange={(e) => setMethod(e.target.value)}
                            className="input-field w-32"
                            aria-label="HTTP method"
                        >
                            <option>GET</option>
                            <option>POST</option>
                            <option>PUT</option>
                            <option>PATCH</option>
                            <option>DELETE</option>
                            <option>HEAD</option>
                            <option>OPTIONS</option>
                        </select>
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://api.example.com/endpoint"
                            className="input-field flex-1"
                            aria-label="API URL"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="headers" className="block font-medium mb-2 text-gray-900 dark:text-white">
                            Headers (JSON)
                        </label>
                        <textarea
                            id="headers"
                            value={headers}
                            onChange={(e) => setHeaders(e.target.value)}
                            placeholder='{"Content-Type": "application/json", "Authorization": "Bearer token"}'
                            className="input-field min-h-[100px] font-mono text-sm"
                        />
                    </div>

                    {method !== 'GET' && method !== 'HEAD' && (
                        <div className="mb-4">
                            <label htmlFor="body" className="block font-medium mb-2 text-gray-900 dark:text-white">
                                Request Body
                            </label>
                            <textarea
                                id="body"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                placeholder='{"key": "value"}'
                                className="input-field min-h-[150px] font-mono text-sm"
                            />
                        </div>
                    )}

                    <button
                        onClick={testAPI}
                        disabled={loading || !url}
                        className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                        <FiSend />
                        {loading ? 'Sending Request...' : 'Send Request'}
                    </button>
                </section>

                {response && (
                    <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-3">
                                <h3 className="font-semibold text-gray-900 dark:text-white">Response</h3>
                                {statusCode && (
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            statusCode >= 200 && statusCode < 300
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                                : statusCode >= 400
                                                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                        }`}
                                    >
                                        {statusCode}
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={copyResponse}
                                className="text-primary-500 hover:text-primary-600"
                                aria-label="Copy response"
                            >
                                <FiCopy size={20} />
                            </button>
                        </div>
                        <textarea
                            value={response}
                            readOnly
                            className="input-field min-h-[300px] font-mono text-sm bg-gray-50 dark:bg-gray-900"
                            aria-label="API response"
                        />
                    </section>
                )}
            </div>
        </div>
    );
}

export default APITester;
