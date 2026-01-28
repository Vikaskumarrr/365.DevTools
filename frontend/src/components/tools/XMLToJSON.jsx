import { useState } from 'react';
import { FiCopy, FiRefreshCw } from 'react-icons/fi';
import toast from 'react-hot-toast';

function XMLToJSON() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const convertToJSON = () => {
        if (!input.trim()) {
            toast.error('Please enter XML to convert');
            return;
        }

        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(input, 'text/xml');
            
            const parserError = xmlDoc.querySelector('parsererror');
            if (parserError) {
                throw new Error('Invalid XML');
            }
            
            const json = xmlToJson(xmlDoc.documentElement);
            setOutput(JSON.stringify(json, null, 2));
            toast.success('Converted to JSON!');
        } catch (err) {
            toast.error('Invalid XML: ' + err.message);
        }
    };

    const xmlToJson = (xml) => {
        const obj = {};
        
        if (xml.nodeType === 1) {
            if (xml.attributes.length > 0) {
                obj['@attributes'] = {};
                for (let j = 0; j < xml.attributes.length; j++) {
                    const attribute = xml.attributes.item(j);
                    obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType === 3) {
            return xml.nodeValue;
        }
        
        if (xml.hasChildNodes()) {
            for (let i = 0; i < xml.childNodes.length; i++) {
                const item = xml.childNodes.item(i);
                const nodeName = item.nodeName;
                
                if (nodeName === '#text') {
                    const text = item.nodeValue.trim();
                    if (text) {
                        return text;
                    }
                    continue;
                }
                
                if (typeof obj[nodeName] === 'undefined') {
                    obj[nodeName] = xmlToJson(item);
                } else {
                    if (!Array.isArray(obj[nodeName])) {
                        const old = obj[nodeName];
                        obj[nodeName] = [old];
                    }
                    obj[nodeName].push(xmlToJson(item));
                }
            }
        }
        return obj;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        toast.success('Copied to clipboard!');
    };

    const clearAll = () => {
        setInput('');
        setOutput('');
        toast.success('Cleared!');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    XML to JSON Converter
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Convert XML documents to JSON format
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <section className="space-y-4" aria-labelledby="xml-input-heading">
                    <h2 id="xml-input-heading" className="font-semibold text-gray-900 dark:text-white">
                        XML Input
                    </h2>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="<root>&#10;  <name>John Doe</name>&#10;  <age>30</age>&#10;</root>"
                        className="input-field min-h-[400px] font-mono text-sm"
                        aria-label="XML input"
                    />
                    <div className="flex gap-3">
                        <button onClick={convertToJSON} className="btn-primary flex-1">
                            Convert to JSON
                        </button>
                        <button
                            onClick={clearAll}
                            className="btn-secondary"
                            aria-label="Clear all"
                        >
                            <FiRefreshCw size={20} />
                        </button>
                    </div>
                </section>

                <section className="space-y-4" aria-labelledby="json-output-heading">
                    <div className="flex justify-between items-center">
                        <h2 id="json-output-heading" className="font-semibold text-gray-900 dark:text-white">
                            JSON Output
                        </h2>
                        <button
                            onClick={copyToClipboard}
                            disabled={!output}
                            className="text-primary-500 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed p-2"
                            aria-label="Copy to clipboard"
                        >
                            <FiCopy size={20} />
                        </button>
                    </div>
                    <textarea
                        value={output}
                        readOnly
                        className="input-field min-h-[400px] font-mono text-sm bg-gray-50 dark:bg-gray-900"
                        aria-label="JSON output"
                    />
                </section>
            </div>
        </div>
    );
}

export default XMLToJSON;
