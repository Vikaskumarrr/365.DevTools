import { useState } from 'react';
import { FiCopy, FiUpload } from 'react-icons/fi';
import toast from 'react-hot-toast';

function ColorPalette() {
    const [colors, setColors] = useState([]);
    const [baseColor, setBaseColor] = useState('#ef6e76');

    const generatePalette = () => {
        const base = hexToRgb(baseColor);
        const palette = [
            baseColor,
            rgbToHex(adjustBrightness(base, 30)),
            rgbToHex(adjustBrightness(base, -30)),
            rgbToHex(adjustSaturation(base, 20)),
            rgbToHex(adjustSaturation(base, -20)),
            rgbToHex(complementary(base)),
            rgbToHex(analogous(base, 30)),
            rgbToHex(analogous(base, -30)),
        ];
        setColors(palette);
        toast.success('Palette generated!');
    };

    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16),
              }
            : { r: 0, g: 0, b: 0 };
    };

    const rgbToHex = (rgb) => {
        const toHex = (n) => {
            const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
    };

    const adjustBrightness = (rgb, amount) => ({
        r: rgb.r + amount,
        g: rgb.g + amount,
        b: rgb.b + amount,
    });

    const adjustSaturation = (rgb, amount) => {
        const gray = (rgb.r + rgb.g + rgb.b) / 3;
        return {
            r: rgb.r + (gray - rgb.r) * (amount / 100),
            g: rgb.g + (gray - rgb.g) * (amount / 100),
            b: rgb.b + (gray - rgb.b) * (amount / 100),
        };
    };

    const complementary = (rgb) => ({
        r: 255 - rgb.r,
        g: 255 - rgb.g,
        b: 255 - rgb.b,
    });

    const analogous = (rgb, angle) => {
        const hsl = rgbToHsl(rgb);
        hsl.h = (hsl.h + angle) % 360;
        return hslToRgb(hsl);
    };

    const rgbToHsl = (rgb) => {
        const r = rgb.r / 255;
        const g = rgb.g / 255;
        const b = rgb.b / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h,
            s,
            l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
                    break;
                case g:
                    h = ((b - r) / d + 2) * 60;
                    break;
                case b:
                    h = ((r - g) / d + 4) * 60;
                    break;
            }
        }
        return { h, s, l };
    };

    const hslToRgb = (hsl) => {
        const { h, s, l } = hsl;
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
        const m = l - c / 2;
        let r, g, b;

        if (h < 60) {
            [r, g, b] = [c, x, 0];
        } else if (h < 120) {
            [r, g, b] = [x, c, 0];
        } else if (h < 180) {
            [r, g, b] = [0, c, x];
        } else if (h < 240) {
            [r, g, b] = [0, x, c];
        } else if (h < 300) {
            [r, g, b] = [x, 0, c];
        } else {
            [r, g, b] = [c, 0, x];
        }

        return {
            r: (r + m) * 255,
            g: (g + m) * 255,
            b: (b + m) * 255,
        };
    };

    const copyColor = (color) => {
        navigator.clipboard.writeText(color);
        toast.success(`Copied ${color}!`);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    Color Palette Generator
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Generate harmonious color palettes from a base color
                </p>
            </header>

            <div className="space-y-6">
                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <h2 className="font-semibold mb-4 text-gray-900 dark:text-white">Base Color</h2>
                    <div className="flex gap-4 items-end">
                        <div className="flex-1">
                            <label htmlFor="base-color" className="block font-medium mb-2">
                                Choose a color
                            </label>
                            <div className="flex gap-3">
                                <input
                                    id="base-color"
                                    type="color"
                                    value={baseColor}
                                    onChange={(e) => setBaseColor(e.target.value)}
                                    className="h-12 w-20 rounded cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={baseColor}
                                    onChange={(e) => setBaseColor(e.target.value)}
                                    className="input-field flex-1"
                                    placeholder="#ef6e76"
                                />
                            </div>
                        </div>
                        <button onClick={generatePalette} className="btn-primary">
                            Generate Palette
                        </button>
                    </div>
                </section>

                {colors.length > 0 && (
                    <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                        <h2 className="font-semibold mb-4 text-gray-900 dark:text-white">
                            Generated Palette
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {colors.map((color, index) => (
                                <div
                                    key={index}
                                    className="group relative rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform cursor-pointer"
                                    onClick={() => copyColor(color)}
                                >
                                    <div
                                        className="h-32 w-full"
                                        style={{ backgroundColor: color }}
                                    />
                                    <div className="p-3 bg-white dark:bg-gray-900">
                                        <p className="font-mono text-sm text-center">{color}</p>
                                    </div>
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center transition-all">
                                        <FiCopy className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
                            Click any color to copy its hex code
                        </p>
                    </section>
                )}

                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
                        Palette Types
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li>• <strong>Base:</strong> Your original color</li>
                        <li>• <strong>Lighter/Darker:</strong> Brightness variations</li>
                        <li>• <strong>Saturated/Desaturated:</strong> Saturation variations</li>
                        <li>• <strong>Complementary:</strong> Opposite on color wheel</li>
                        <li>• <strong>Analogous:</strong> Adjacent on color wheel</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}

export default ColorPalette;
