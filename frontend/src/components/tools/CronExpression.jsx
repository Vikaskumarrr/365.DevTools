import { useState } from 'react';
import { FiCopy, FiInfo } from 'react-icons/fi';
import toast from 'react-hot-toast';

function CronExpression() {
    const [minute, setMinute] = useState('*');
    const [hour, setHour] = useState('*');
    const [day, setDay] = useState('*');
    const [month, setMonth] = useState('*');
    const [weekday, setWeekday] = useState('*');
    const [expression, setExpression] = useState('* * * * *');

    const generateExpression = () => {
        const expr = `${minute} ${hour} ${day} ${month} ${weekday}`;
        setExpression(expr);
        toast.success('Expression generated!');
    };

    const explainExpression = () => {
        const parts = expression.split(' ');
        const explanations = [];
        
        if (parts[0] === '*') explanations.push('every minute');
        else explanations.push(`at minute ${parts[0]}`);
        
        if (parts[1] === '*') explanations.push('every hour');
        else explanations.push(`at hour ${parts[1]}`);
        
        if (parts[2] === '*') explanations.push('every day');
        else explanations.push(`on day ${parts[2]}`);
        
        if (parts[3] === '*') explanations.push('every month');
        else explanations.push(`in month ${parts[3]}`);
        
        if (parts[4] === '*') explanations.push('every weekday');
        else explanations.push(`on weekday ${parts[4]}`);
        
        return 'Runs ' + explanations.join(', ');
    };

    const presets = [
        { name: 'Every minute', value: '* * * * *' },
        { name: 'Every hour', value: '0 * * * *' },
        { name: 'Every day at midnight', value: '0 0 * * *' },
        { name: 'Every Monday at 9 AM', value: '0 9 * * 1' },
        { name: 'Every 15 minutes', value: '*/15 * * * *' },
        { name: 'Every weekday at 6 PM', value: '0 18 * * 1-5' },
    ];

    const loadPreset = (value) => {
        const parts = value.split(' ');
        setMinute(parts[0]);
        setHour(parts[1]);
        setDay(parts[2]);
        setMonth(parts[3]);
        setWeekday(parts[4]);
        setExpression(value);
        toast.success('Preset loaded!');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    Cron Expression Generator
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Generate and explain cron expressions for scheduling tasks
                </p>
            </header>

            <div className="space-y-6">
                <section className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                        <FiInfo className="text-blue-600 dark:text-blue-400 mt-1" />
                        <div className="text-sm text-blue-800 dark:text-blue-200">
                            <p className="font-semibold mb-1">Cron Format:</p>
                            <p>minute (0-59) | hour (0-23) | day (1-31) | month (1-12) | weekday (0-7)</p>
                            <p className="mt-2">Use * for "every", */n for "every n", and ranges like 1-5</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="font-semibold mb-4 text-gray-900 dark:text-white">Quick Presets</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {presets.map((preset) => (
                            <button
                                key={preset.name}
                                onClick={() => loadPreset(preset.value)}
                                className="btn-secondary text-sm"
                            >
                                {preset.name}
                            </button>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="font-semibold mb-4 text-gray-900 dark:text-white">Custom Expression</h2>
                    <div className="grid grid-cols-5 gap-4">
                        <div>
                            <label htmlFor="minute" className="block text-sm font-medium mb-2">
                                Minute
                            </label>
                            <input
                                id="minute"
                                type="text"
                                value={minute}
                                onChange={(e) => setMinute(e.target.value)}
                                className="input-field"
                                placeholder="*"
                            />
                        </div>
                        <div>
                            <label htmlFor="hour" className="block text-sm font-medium mb-2">
                                Hour
                            </label>
                            <input
                                id="hour"
                                type="text"
                                value={hour}
                                onChange={(e) => setHour(e.target.value)}
                                className="input-field"
                                placeholder="*"
                            />
                        </div>
                        <div>
                            <label htmlFor="day" className="block text-sm font-medium mb-2">
                                Day
                            </label>
                            <input
                                id="day"
                                type="text"
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                className="input-field"
                                placeholder="*"
                            />
                        </div>
                        <div>
                            <label htmlFor="month" className="block text-sm font-medium mb-2">
                                Month
                            </label>
                            <input
                                id="month"
                                type="text"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                className="input-field"
                                placeholder="*"
                            />
                        </div>
                        <div>
                            <label htmlFor="weekday" className="block text-sm font-medium mb-2">
                                Weekday
                            </label>
                            <input
                                id="weekday"
                                type="text"
                                value={weekday}
                                onChange={(e) => setWeekday(e.target.value)}
                                className="input-field"
                                placeholder="*"
                            />
                        </div>
                    </div>
                    <button onClick={generateExpression} className="btn-primary w-full mt-4">
                        Generate Expression
                    </button>
                </section>

                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Generated Expression</h3>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(expression);
                                toast.success('Copied!');
                            }}
                            className="text-primary-500 hover:text-primary-600"
                            aria-label="Copy expression"
                        >
                            <FiCopy size={20} />
                        </button>
                    </div>
                    <code className="block bg-gray-50 dark:bg-gray-900 p-4 rounded font-mono text-lg">
                        {expression}
                    </code>
                    <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                        <p className="text-sm text-green-800 dark:text-green-200">
                            <strong>Explanation:</strong> {explainExpression()}
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default CronExpression;
