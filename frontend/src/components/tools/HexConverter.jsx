import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function HexConverter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('toHex');

    const textToHex = (text) => {
        return text.split('').map(char => char.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
    };

    const hexToText = (hex) => {
        const bytes = hex.split(' ').filter(b => b);
        return bytes.map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
    };

    const convert = () => {
        try {
            const result = mode === 'toHex' ? textToHex(input) : hexToText(input);
            setOutput(result);
            toast.success('Converted!');
        } catch (error) {
            toast.error('Conversion failed');
        }
    };

    const copy = () => {
        navigator.clipboard.writeText(output);
        toast.success('Copied!');
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Hex Converter</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Convert text to hexadecimal and vice versa
                </p>
            </div>

            <div className="flex justify-center mb-6">
                <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-600">
                    <button onClick={() => setMode('toHex')} className={`px-6 py-2 font-medium rounded-l-lg ${mode === 'toHex' ? 'bg-primary-500 text-white' : 'bg-white dark:bg-gray-800'}`}>
                        Text → Hex
                    </button>
                    <button onClick={() => setMode('toText')} className={`px-6 py-2 font-medium rounded-r-lg ${mode === 'toText' ? 'bg-primary-500 text-white' : 'bg-white dark:bg-gray-800'}`}>
                        Hex → Text
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <label className="font-semibold">Input</label>
                    <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === 'toHex' ? 'Hello' : '48 65 6c 6c 6f'} className="input-field min-h-[300px] font-mono text-sm" />
                    <button onClick={convert} className="btn-primary w-full">Convert</button>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="font-semibold">Output</label>
                        <button onClick={copy} disabled={!output} className="text-primary-500 hover:text-primary-600 disabled:opacity-50">
                            <FiCopy size={20} />
                        </button>
                    </div>
                    <textarea value={output} readOnly placeholder="Result will appear here" className="input-field min-h-[300px] font-mono text-sm bg-gray-50 dark:bg-gray-900" />
                </div>
            </div>
        </div>
    );
}

export default HexConverter;
