import { useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';

function ContrastChecker() {
    const [foreground, setForeground] = useState('#000000');
    const [background, setBackground] = useState('#ffffff');
    const [ratio, setRatio] = useState(21);

    const getLuminance = (hex) => {
        const rgb = parseInt(hex.slice(1), 16);
        const r = ((rgb >> 16) & 0xff) / 255;
        const g = ((rgb >> 8) & 0xff) / 255;
        const b = (rgb & 0xff) / 255;
        
        const [rs, gs, bs] = [r, g, b].map(c => 
            c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
        );
        
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const calculateContrast = () => {
        const l1 = getLuminance(foreground);
        const l2 = getLuminance(background);
        const lighter = Math.max(l1, l2);
        const darker = Math.min(l1, l2);
        const contrastRatio = (lighter + 0.05) / (darker + 0.05);
        setRatio(contrastRatio.toFixed(2));
    };

    useState(() => {
        calculateContrast();
    }, [foreground, background]);

    const passesAA = ratio >= 4.5;
    const passesAAA = ratio >= 7;
    const passesAALarge = ratio >= 3;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Contrast Checker</h1>
                <p className="text-gray-600 dark:text-gray-400">Check WCAG color contrast ratios</p>
            </header>

            <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-semibold mb-2">Foreground Color</label>
                        <div className="flex gap-2">
                            <input type="color" value={foreground} onChange={(e) => { setForeground(e.target.value); calculateContrast(); }} className="w-20 h-12 rounded cursor-pointer" />
                            <input type="text" value={foreground} onChange={(e) => { setForeground(e.target.value); calculateContrast(); }} className="input-field flex-1" />
                        </div>
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">Background Color</label>
                        <div className="flex gap-2">
                            <input type="color" value={background} onChange={(e) => { setBackground(e.target.value); calculateContrast(); }} className="w-20 h-12 rounded cursor-pointer" />
                            <input type="text" value={background} onChange={(e) => { setBackground(e.target.value); calculateContrast(); }} className="input-field flex-1" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border-2 border-gray-200 dark:border-gray-700">
                    <div className="text-center mb-6">
                        <div className="text-6xl font-bold mb-2">{ratio}:1</div>
                        <p className="text-gray-600 dark:text-gray-400">Contrast Ratio</p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded bg-gray-50 dark:bg-gray-900">
                            <span>WCAG AA (Normal Text)</span>
                            {passesAA ? <FiCheck className="text-green-500" size={24} /> : <FiX className="text-red-500" size={24} />}
                        </div>
                        <div className="flex items-center justify-between p-3 rounded bg-gray-50 dark:bg-gray-900">
                            <span>WCAG AA (Large Text)</span>
                            {passesAALarge ? <FiCheck className="text-green-500" size={24} /> : <FiX className="text-red-500" size={24} />}
                        </div>
                        <div className="flex items-center justify-between p-3 rounded bg-gray-50 dark:bg-gray-900">
                            <span>WCAG AAA</span>
                            {passesAAA ? <FiCheck className="text-green-500" size={24} /> : <FiX className="text-red-500" size={24} />}
                        </div>
                    </div>
                </div>

                <div className="p-8 rounded-lg" style={{ backgroundColor: background, color: foreground }}>
                    <h3 className="text-2xl font-bold mb-2">Preview Text</h3>
                    <p className="text-lg">This is how your text will look with the selected colors.</p>
                    <p className="text-sm mt-2">Small text example for testing readability.</p>
                </div>
            </div>
        </div>
    );
}

export default ContrastChecker;
