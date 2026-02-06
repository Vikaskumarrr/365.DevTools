import { useState } from 'react';
import toast from 'react-hot-toast';

function BarcodeGenerator() {
    const [text, setText] = useState('');
    const [barcode, setBarcode] = useState('');

    const generateBarcode = () => {
        if (!text.trim()) {
            toast.error('Please enter text');
            return;
        }

        // Simple barcode representation (for demo)
        const encoded = text.split('').map((char) => {
            const code = char.charCodeAt(0).toString(2).padStart(8, '0');
            return code.split('').map((bit) => (bit === '1' ? '█' : '▌')).join('');
        }).join(' ');

        setBarcode(encoded);
        toast.success('Barcode generated!');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    Barcode Generator
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Generate barcode representations
                </p>
            </header>

            <div className="space-y-6">
                <section className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        <strong>Note:</strong> This is a simplified barcode representation. For production use, integrate a library like JsBarcode or react-barcode.
                    </p>
                </section>

                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <label htmlFor="text" className="block font-medium mb-2">
                        Text to Encode
                    </label>
                    <input
                        id="text"
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text or numbers"
                        className="input-field"
                    />
                    <button onClick={generateBarcode} className="btn-primary w-full mt-4">
                        Generate Barcode
                    </button>
                </section>

                {barcode && (
                    <section className="bg-white dark:bg-gray-800 rounded-lg p-8 border-2 border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold mb-4 text-center">Generated Barcode</h3>
                        <div className="bg-white p-8 rounded-lg flex items-center justify-center">
                            <div className="font-mono text-2xl tracking-wider break-all">
                                {barcode}
                            </div>
                        </div>
                        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                            {text}
                        </p>
                    </section>
                )}
            </div>
        </div>
    );
}

export default BarcodeGenerator;
