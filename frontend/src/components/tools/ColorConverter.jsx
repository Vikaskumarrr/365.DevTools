import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function ColorConverter() {
    const [color, setColor] = useState('#3B82F6');

    const hexToRGB = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    const rgbToHSL = (r, g, b) => {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    };

    const rgbToCMYK = (r, g, b) => {
        let c = 1 - (r / 255);
        let m = 1 - (g / 255);
        let y = 1 - (b / 255);
        let k = Math.min(c, m, y);

        if (k === 1) {
            c = m = y = 0;
        } else {
            c = (c - k) / (1 - k);
            m = (m - k) / (1 - k);
            y = (y - k) / (1 - k);
        }

        return {
            c: Math.round(c * 100),
            m: Math.round(m * 100),
            y: Math.round(y * 100),
            k: Math.round(k * 100)
        };
    };

    const rgb = hexToRGB(color);
    const hsl = rgb ? rgbToHSL(rgb.r, rgb.g, rgb.b) : null;
    const cmyk = rgb ? rgbToCMYK(rgb.r, rgb.g, rgb.b) : null;

    const formats = rgb ? {
        'HEX': color.toUpperCase(),
        'RGB': `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
        'RGBA': `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`,
        'HSL': `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
        'HSLA': `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 1)`,
        'CMYK': `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
        'RGB Object': `{ r: ${rgb.r}, g: ${rgb.g}, b: ${rgb.b} }`,
        'HSL Object': `{ h: ${hsl.h}, s: ${hsl.s}, l: ${hsl.l} }`,
    } : {};

    const copyFormat = (value, format) => {
        navigator.clipboard.writeText(value);
        toast.success(`${format} copied!`);
    };

    const presetColors = [
        '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
        '#000000', '#FFFFFF', '#808080', '#EF6E76', '#800080', '#FFC0CB'
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Color Converter</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Convert colors between HEX, RGB, HSL, and CMYK formats
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Color Picker */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <label className="block font-semibold mb-4">Pick a Color</label>

                        {/* Large color preview */}
                        <div
                            className="w-full h-48 rounded-lg border-4 border-gray-200 dark:border-gray-700 mb-4"
                            style={{ backgroundColor: color }}
                        />

                        {/* Color input */}
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="w-full h-16 rounded cursor-pointer"
                        />

                        {/* HEX input */}
                        <div className="mt-4">
                            <label className="block text-sm font-medium mb-2">HEX Value</label>
                            <input
                                type="text"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="input-field font-mono uppercase"
                            />
                        </div>
                    </div>

                    {/* Preset Colors */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <h3 className="font-semibold mb-4">Preset Colors</h3>
                        <div className="grid grid-cols-6 gap-2">
                            {presetColors.map((presetColor) => (
                                <button
                                    key={presetColor}
                                    onClick={() => setColor(presetColor)}
                                    className="w-full aspect-square rounded border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500 transition-colors"
                                    style={{ backgroundColor: presetColor }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Color Formats */}
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(formats).map(([format, value]) => (
                            <div key={format} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400">
                                        {format}
                                    </h3>
                                    <button
                                        onClick={() => copyFormat(value, format)}
                                        className="text-primary-500 hover:text-primary-600"
                                    >
                                        <FiCopy size={16} />
                                    </button>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-900 rounded p-3 font-mono text-sm break-all">
                                    {value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Color Formats</h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li><strong>HEX:</strong> Hexadecimal color code (#RRGGBB)</li>
                    <li><strong>RGB:</strong> Red, Green, Blue (0-255)</li>
                    <li><strong>HSL:</strong> Hue, Saturation, Lightness</li>
                    <li><strong>CMYK:</strong> Cyan, Magenta, Yellow, Black (print colors)</li>
                </ul>
            </div>
        </div>
    );
}

export default ColorConverter;
