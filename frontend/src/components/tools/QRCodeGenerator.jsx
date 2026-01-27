import { useState, useRef } from 'react';
import QRCode from 'qrcode';
import { FiDownload } from 'react-icons/fi';
import toast from 'react-hot-toast';

function QRCodeGenerator() {
    const [text, setText] = useState('');
    const [qrCode, setQrCode] = useState('');
    const [size, setSize] = useState(300);
    const [bgColor, setBgColor] = useState('#ffffff');
    const [fgColor, setFgColor] = useState('#000000');
    const canvasRef = useRef(null);

    const generateQR = async () => {
        if (!text) {
            toast.error('Please enter text or URL');
            return;
        }

        try {
            const qrDataUrl = await QRCode.toDataURL(text, {
                width: size,
                margin: 2,
                color: {
                    dark: fgColor,
                    light: bgColor,
                },
            });
            setQrCode(qrDataUrl);
            toast.success('QR code generated!');
        } catch (error) {
            toast.error('Failed to generate QR code');
        }
    };

    const downloadQR = () => {
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = qrCode;
        link.click();
        toast.success('Downloaded!');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">QR Code Generator</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Generate QR codes for URLs, text, and more
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Settings */}
                <div className="space-y-6">
                    <div>
                        <label className="block font-semibold mb-2">Text or URL</label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Enter text or URL..."
                            className="input-field min-h-[100px]"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-2">Size: {size}px</label>
                        <input
                            type="range"
                            min="200"
                            max="600"
                            value={size}
                            onChange={(e) => setSize(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold mb-2">Foreground</label>
                            <input
                                type="color"
                                value={fgColor}
                                onChange={(e) => setFgColor(e.target.value)}
                                className="w-full h-12 rounded cursor-pointer"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold mb-2">Background</label>
                            <input
                                type="color"
                                value={bgColor}
                                onChange={(e) => setBgColor(e.target.value)}
                                className="w-full h-12 rounded cursor-pointer"
                            />
                        </div>
                    </div>

                    <button onClick={generateQR} className="btn-primary w-full">
                        Generate QR Code
                    </button>
                </div>

                {/* Preview */}
                <div className="flex flex-col items-center justify-center">
                    {qrCode ? (
                        <div className="space-y-4">
                            <img
                                src={qrCode}
                                alt="QR Code"
                                className="border-4 border-gray-200 dark:border-gray-700 rounded-lg"
                            />
                            <button
                                onClick={downloadQR}
                                className="btn-primary w-full flex items-center justify-center gap-2"
                            >
                                <FiDownload size={20} />
                                Download QR Code
                            </button>
                        </div>
                    ) : (
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-12 text-center">
                            <p className="text-gray-500 dark:text-gray-400">
                                QR code will appear here
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default QRCodeGenerator;
