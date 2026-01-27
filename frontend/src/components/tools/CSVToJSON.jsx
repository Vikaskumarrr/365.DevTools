import { useState } from 'react';
import { FiCopy, FiDownload } from 'react-icons/fi';
import toast from 'react-hot-toast';

function CSVToJSON() {
    const [csv, setCSV] = useState('');
    const [json, setJSON] = useState('');

    const convert = () => {
        try {
            if (!csv.trim()) {
                toast.error('Please enter CSV data');
                return;
            }

            const lines = csv.trim().split('\n').filter(line => line.trim());
            if (lines.length < 2) {
                toast.error('CSV must have at least a header and one data row');
                return;
            }

            const headers = lines[0].split(',').map(h => h.trim());
            
            if (headers.length === 0 || headers.some(h => !h)) {
                toast.error('Invalid CSV headers');
                return;
            }

            const result = lines.slice(1).map(line => {
                const values = line.split(',').map(v => v.trim());
                return headers.reduce((obj, header, index) => {
                    obj[header] = values[index] || '';
                    return obj;
                }, {});
            });

            setJSON(JSON.stringify(result, null, 2));
            toast.success('Converted to JSON!');
        } catch (error) {
            toast.error('Conversion failed: ' + error.message);
        }
    };

    const copy = () => {
        navigator.clipboard.writeText(json);
        toast.success('Copied!');
    };

    const download = () => {
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        a.click();
        toast.success('Downloaded!');
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">CSV to JSON Converter</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Convert CSV data to JSON format
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <label className="font-semibold">CSV Input</label>
                    <textarea
                        value={csv}
                        onChange={(e) => setCSV(e.target.value)}
                        placeholder="name,age,city&#10;John,25,NYC&#10;Jane,30,LA"
                        className="input-field min-h-[400px] font-mono text-sm"
                    />
                    <button onClick={convert} className="btn-primary w-full">
                        Convert to JSON
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="font-semibold">JSON Output</label>
                        <div className="space-x-2">
                            <button onClick={copy} disabled={!json} className="text-primary-500 hover:text-primary-600 disabled:opacity-50">
                                <FiCopy size={20} />
                            </button>
                            <button onClick={download} disabled={!json} className="text-primary-500 hover:text-primary-600 disabled:opacity-50">
                                <FiDownload size={20} />
                            </button>
                        </div>
                    </div>
                    <textarea
                        value={json}
                        readOnly
                        placeholder="JSON output will appear here"
                        className="input-field min-h-[400px] font-mono text-sm bg-gray-50 dark:bg-gray-900"
                    />
                </div>
            </div>
        </div>
    );
}

export default CSVToJSON;
