import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function JSONToXML() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const convertToXML = () => {
        try {
            const json = JSON.parse(input);
            const xml = jsonToXml(json, 'root');
            setOutput(xml);
            toast.success('Converted to XML!');
        } catch (err) {
            toast.error('Invalid JSON');
        }
    };

    const jsonToXml = (obj, rootName) => {
        let xml = `<${rootName}>`;
        for (const key in obj) {
            if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                xml += jsonToXml(obj[key], key);
            } else if (Array.isArray(obj[key])) {
                obj[key].forEach(item => {
                    xml += `<${key}>${item}</${key}>`;
                });
            } else {
                xml += `<${key}>${obj[key]}</${key}>`;
            }
        }
        xml += `</${rootName}>`;
        return xml;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">JSON to XML</h1>
                <p className="text-gray-600 dark:text-gray-400">Convert JSON to XML format</p>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <section className="space-y-4">
                    <h2 className="font-semibold text-gray-900 dark:text-white">JSON Input</h2>
                    <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='{"name": "John", "age": 30}' className="input-field min-h-[400px] font-mono text-sm" />
                    <button onClick={convertToXML} className="btn-primary w-full">Convert to XML</button>
                </section>
                <section className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-gray-900 dark:text-white">XML Output</h2>
                        <button onClick={() => { navigator.clipboard.writeText(output); toast.success('Copied!'); }} disabled={!output} className="text-primary-500 p-2"><FiCopy size={20} /></button>
                    </div>
                    <textarea value={output} readOnly className="input-field min-h-[400px] font-mono text-sm bg-gray-50 dark:bg-gray-900" />
                </section>
            </div>
        </div>
    );
}

export default JSONToXML;
