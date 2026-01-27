import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

function GradientGenerator() {
    const [color1, setColor1] = useState('#667eea');
    const [color2, setColor2] = useState('#764ba2');
    const [angle, setAngle] = useState(90);
    const [type, setType] = useState('linear');

    const gradient = type === 'linear'
        ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
        : `radial-gradient(circle, ${color1}, ${color2})`;

    const css = `background: ${gradient};`;

    const copy = () => {
        navigator.clipboard.writeText(css);
        toast.success('CSS copied!');
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Gradient Generator</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Create beautiful CSS gradients
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div
                        className="w-full h-64 rounded-lg shadow-lg"
                        style={{ background: gradient }}
                    />

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold">CSS Code</h3>
                            <button onClick={copy} className="text-primary-500 hover:text-primary-600">
                                <FiCopy size={20} />
                            </button>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 rounded p-3 font-mono text-sm">
                            {css}
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
                    <div>
                        <label className="font-medium block mb-2">Gradient Type</label>
                        <select value={type} onChange={(e) => setType(e.target.value)} className="input-field">
                            <option value="linear">Linear</option>
                            <option value="radial">Radial</option>
                        </select>
                    </div>

                    {type === 'linear' && (
                        <div>
                            <label className="font-medium block mb-2">Angle: {angle}°</label>
                            <input
                                type="range"
                                min="0"
                                max="360"
                                value={angle}
                                onChange={(e) => setAngle(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>
                    )}

                    <div>
                        <label className="font-medium block mb-2">Color 1</label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                value={color1}
                                onChange={(e) => setColor1(e.target.value)}
                                className="w-16 h-12 rounded cursor-pointer"
                            />
                            <input
                                type="text"
                                value={color1}
                                onChange={(e) => setColor1(e.target.value)}
                                className="input-field flex-1"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="font-medium block mb-2">Color 2</label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                value={color2}
                                onChange={(e) => setColor2(e.target.value)}
                                className="w-16 h-12 rounded cursor-pointer"
                            />
                            <input
                                type="text"
                                value={color2}
                                onChange={(e) => setColor2(e.target.value)}
                                className="input-field flex-1"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GradientGenerator;
