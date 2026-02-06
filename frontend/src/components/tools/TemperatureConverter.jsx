import { useState } from 'react';
import toast from 'react-hot-toast';

function TemperatureConverter() {
    const [celsius, setCelsius] = useState('');
    const [fahrenheit, setFahrenheit] = useState('');
    const [kelvin, setKelvin] = useState('');

    const updateFromCelsius = (value) => {
        setCelsius(value);
        if (value === '') {
            setFahrenheit('');
            setKelvin('');
            return;
        }
        const c = parseFloat(value);
        if (!isNaN(c)) {
            setFahrenheit(((c * 9) / 5 + 32).toFixed(2));
            setKelvin((c + 273.15).toFixed(2));
        }
    };

    const updateFromFahrenheit = (value) => {
        setFahrenheit(value);
        if (value === '') {
            setCelsius('');
            setKelvin('');
            return;
        }
        const f = parseFloat(value);
        if (!isNaN(f)) {
            const c = ((f - 32) * 5) / 9;
            setCelsius(c.toFixed(2));
            setKelvin((c + 273.15).toFixed(2));
        }
    };

    const updateFromKelvin = (value) => {
        setKelvin(value);
        if (value === '') {
            setCelsius('');
            setFahrenheit('');
            return;
        }
        const k = parseFloat(value);
        if (!isNaN(k)) {
            const c = k - 273.15;
            setCelsius(c.toFixed(2));
            setFahrenheit(((c * 9) / 5 + 32).toFixed(2));
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    Temperature Converter
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Convert between Celsius, Fahrenheit, and Kelvin
                </p>
            </header>

            <div className="space-y-6">
                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="celsius" className="block font-medium mb-2 text-lg">
                                Celsius (°C)
                            </label>
                            <input
                                id="celsius"
                                type="number"
                                value={celsius}
                                onChange={(e) => updateFromCelsius(e.target.value)}
                                placeholder="0"
                                className="input-field text-2xl text-center"
                                step="0.01"
                            />
                        </div>

                        <div>
                            <label htmlFor="fahrenheit" className="block font-medium mb-2 text-lg">
                                Fahrenheit (°F)
                            </label>
                            <input
                                id="fahrenheit"
                                type="number"
                                value={fahrenheit}
                                onChange={(e) => updateFromFahrenheit(e.target.value)}
                                placeholder="32"
                                className="input-field text-2xl text-center"
                                step="0.01"
                            />
                        </div>

                        <div>
                            <label htmlFor="kelvin" className="block font-medium mb-2 text-lg">
                                Kelvin (K)
                            </label>
                            <input
                                id="kelvin"
                                type="number"
                                value={kelvin}
                                onChange={(e) => updateFromKelvin(e.target.value)}
                                placeholder="273.15"
                                className="input-field text-2xl text-center"
                                step="0.01"
                            />
                        </div>
                    </div>
                </section>

                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
                        Common Temperatures
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                            <p className="font-medium">Water Freezing Point</p>
                            <p className="text-gray-600 dark:text-gray-400">0°C = 32°F = 273.15K</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                            <p className="font-medium">Water Boiling Point</p>
                            <p className="text-gray-600 dark:text-gray-400">100°C = 212°F = 373.15K</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                            <p className="font-medium">Room Temperature</p>
                            <p className="text-gray-600 dark:text-gray-400">20°C = 68°F = 293.15K</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                            <p className="font-medium">Body Temperature</p>
                            <p className="text-gray-600 dark:text-gray-400">37°C = 98.6°F = 310.15K</p>
                        </div>
                    </div>
                </section>

                <section className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
                        Conversion Formulas
                    </h3>
                    <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                        <li>• °F = (°C × 9/5) + 32</li>
                        <li>• °C = (°F - 32) × 5/9</li>
                        <li>• K = °C + 273.15</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}

export default TemperatureConverter;
