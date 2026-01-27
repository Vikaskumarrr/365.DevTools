import { useState } from 'react';

function UnitConverter() {
    const [value, setValue] = useState('');
    const [fromUnit, setFromUnit] = useState('meters');
    const [toUnit, setToUnit] = useState('feet');
    const [category, setCategory] = useState('length');

    const units = {
        length: {
            meters: 1,
            kilometers: 0.001,
            feet: 3.28084,
            miles: 0.000621371,
            inches: 39.3701,
            centimeters: 100,
        },
        weight: {
            kilograms: 1,
            grams: 1000,
            pounds: 2.20462,
            ounces: 35.274,
        },
        temperature: {
            celsius: 'C',
            fahrenheit: 'F',
            kelvin: 'K',
        },
    };

    const convert = () => {
        if (!value) return '';

        if (category === 'temperature') {
            let result = Number(value);
            if (fromUnit === 'celsius' && toUnit === 'fahrenheit') result = (result * 9 / 5) + 32;
            else if (fromUnit === 'celsius' && toUnit === 'kelvin') result = result + 273.15;
            else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') result = (result - 32) * 5 / 9;
            else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') result = (result - 32) * 5 / 9 + 273.15;
            else if (fromUnit === 'kelvin' && toUnit === 'celsius') result = result - 273.15;
            else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') result = (result - 273.15) * 9 / 5 + 32;
            return result.toFixed(2);
        }

        const base = Number(value) / units[category][fromUnit];
        return (base * units[category][toUnit]).toFixed(4);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Unit Converter</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Convert between different units
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
                <div>
                    <label className="font-medium block mb-2">Category</label>
                    <select
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            setFromUnit(Object.keys(units[e.target.value])[0]);
                            setToUnit(Object.keys(units[e.target.value])[1]);
                        }}
                        className="input-field"
                    >
                        <option value="length">Length</option>
                        <option value="weight">Weight</option>
                        <option value="temperature">Temperature</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="font-medium block mb-2">From</label>
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Enter value"
                            className="input-field mb-2"
                        />
                        <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="input-field">
                            {Object.keys(units[category]).map((unit) => (
                                <option key={unit} value={unit}>{unit}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="font-medium block mb-2">To</label>
                        <div className="input-field bg-gray-50 dark:bg-gray-900 h-12 flex items-center text-2xl font-bold">
                            {convert() || '0'}
                        </div>
                        <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="input-field mt-2">
                            {Object.keys(units[category]).map((unit) => (
                                <option key={unit} value={unit}>{unit}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UnitConverter;
