import { useState } from 'react';
import { FiCopy, FiDownload } from 'react-icons/fi';
import toast from 'react-hot-toast';

function JSONToCSV() {
    const [json, setJSON] = useState('');
    const [csv, setCSV] = useState('');

    const convert = () => {
        try {
            const data = JSON.parse(json);
            if (!Array.isArray(data) || data.length === 0) {
                toast.error('JSON must be an array of objects');
                return;
            }

            const headers = Object.keys(data[0]);
            const csvRows = [headers.join(',')];

            data.forEach(obj => {
                const values = headers.map(header => {
                    const value = obj[header] || '';
                    return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
                });
                csvRows.push(values.join(','));
            });

            setCSV(csvRows.join('\n'));
            toast.success('Converted to CSV!');
        } catch (error) {
            toast.error('Invalid JSON');
        }
    };

    const copy = () => {
        navigator.clipboard.writeText(csv);
        toast.success('Copied!');
    };

    const download = () => {
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';
        a.click();
        toast.success('Downloaded!');
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">JSON to CSV Converter</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Convert JSON array to CSV format
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <label className="font-semibold">JSON Input</label>
                    <textarea
                        value={json}
                        onChange={(e) => setJSON(e.target.value)}
                        placeholder='[{"name":"John","age":25},{"name":"Jane","age":30}]'
                        className="input-field min-h-[400px] font-mono text-sm"
                    />
                    <button onClick={convert} className="btn-primary w-full">
                        Convert to CSV
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="font-semibold">CSV Output</label>
                        <div className="space-x-2">
                            <button onClick={copy} disabled={!csv} className="text-primary-500 hover:text-primary-600 disabled:opacity-50">
                                <FiCopy size={20} />
                            </button>
                            <button onClick={download} disabled={!csv} className="text-primary-500 hover:text-primary-600 disabled:opacity-50">
                                <FiDownload size={20} />
                            </button>
                        </div>
                    </div>
                    <textarea
                        value={csv}
                        readOnly
                        placeholder="CSV output will appear here"
                        className="input-field min-h-[400px] font-mono text-sm bg-gray-50 dark:bg-gray-900"
                    />
                </div>
            </div>
        </div>
    );
}

export default JSONToCSV;
