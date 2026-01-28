import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function BoxShadowGenerator() {
    const [horizontal, setHorizontal] = useState(0);
    const [vertical, setVertical] = useState(4);
    const [blur, setBlur] = useState(6);
    const [spread, setSpread] = useState(0);
    const [color, setColor] = useState('#000000');
    const [opacity, setOpacity] = useState(0.3);
    const [inset, setInset] = useState(false);

    const generateCSS = () => {
        const rgba = hexToRgba(color, opacity);
        return `box-shadow: ${inset ? 'inset ' : ''}${horizontal}px ${vertical}px ${blur}px ${spread}px ${rgba};`;
    };

    const hexToRgba = (hex, alpha) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const copyCSS = () => {
        navigator.clipboard.writeText(generateCSS());
        toast.success('CSS copied!');
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    Box Shadow Generator
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Create CSS box shadows visually
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section className="space-y-6">
                    <h2 className="font-semibold text-gray-900 dark:text-white">Controls</h2>
                    
                    <div>
                        <label htmlFor="horizontal" className="block font-medium mb-2">
                            Horizontal Offset: {horizontal}px
                        </label>
                        <input
                            id="horizontal"
                            type="range"
                            min="-50"
                            max="50"
                            value={horizontal}
                            onChange={(e) => setHorizontal(parseInt(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label htmlFor="vertical" className="block font-medium mb-2">
                            Vertical Offset: {vertical}px
                        </label>
                        <input
                            id="vertical"
                            type="range"
                            min="-50"
                            max="50"
                            value={vertical}
                            onChange={(e) => setVertical(parseInt(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label htmlFor="blur" className="block font-medium mb-2">
                            Blur Radius: {blur}px
                        </label>
                        <input
                            id="blur"
                            type="range"
                            min="0"
                            max="100"
                            value={blur}
                            onChange={(e) => setBlur(parseInt(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label htmlFor="spread" className="block font-medium mb-2">
                            Spread Radius: {spread}px
                        </label>
                        <input
                            id="spread"
                            type="range"
                            min="-50"
                            max="50"
                            value={spread}
                            onChange={(e) => setSpread(parseInt(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label htmlFor="opacity" className="block font-medium mb-2">
                            Opacity: {opacity}
                        </label>
                        <input
                            id="opacity"
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={opacity}
                            onChange={(e) => setOpacity(parseFloat(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label htmlFor="color" className="block font-medium mb-2">
                            Shadow Color
                        </label>
                        <div className="flex gap-3">
                            <input
                                id="color"
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="h-12 w-20 rounded cursor-pointer"
                            />
                            <input
                                type="text"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="input-field flex-1"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            id="inset"
                            type="checkbox"
                            checked={inset}
                            onChange={(e) => setInset(e.target.checked)}
                            className="w-5 h-5"
                        />
                        <label htmlFor="inset" className="font-medium">
                            Inset Shadow
                        </label>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="font-semibold text-gray-900 dark:text-white">Preview</h2>
                    
                    <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-12 flex items-center justify-center min-h-[400px]">
                        <div
                            className="w-48 h-48 bg-white dark:bg-gray-800 rounded-lg"
                            style={{ boxShadow: generateCSS().replace('box-shadow: ', '').replace(';', '') }}
                        />
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-semibold">CSS Code</h3>
                            <button
                                onClick={copyCSS}
                                className="text-primary-500 hover:text-primary-600"
                                aria-label="Copy CSS"
                            >
                                <FiCopy size={20} />
                            </button>
                        </div>
                        <code className="block bg-gray-50 dark:bg-gray-900 p-4 rounded font-mono text-sm break-all">
                            {generateCSS()}
                        </code>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default BoxShadowGenerator;
