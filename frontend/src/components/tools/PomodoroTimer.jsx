import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function PomodoroTimer() {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('work'); // 'work' or 'break'

    useEffect(() => {
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        // Timer completed
                        setIsActive(false);
                        toast.success(`${mode === 'work' ? 'Work' : 'Break'} session completed!`);
                        // Auto-switch modes
                        if (mode === 'work') {
                            setMode('break');
                            setMinutes(5);
                        } else {
                            setMode('work');
                            setMinutes(25);
                        }
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, minutes, seconds, mode]);

    const toggle = () => setIsActive(!isActive);

    const reset = () => {
        setIsActive(false);
        setMinutes(mode === 'work' ? 25 : 5);
        setSeconds(0);
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        setIsActive(false);
        setMinutes(newMode === 'work' ? 25 : 5);
        setSeconds(0);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Pomodoro Timer</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Focus timer for productivity
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12">
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => switchMode('work')}
                        className={`px-6 py-2 rounded-lg font-medium ${mode === 'work' ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                    >
                        Work (25 min)
                    </button>
                    <button
                        onClick={() => switchMode('break')}
                        className={`px-6 py-2 rounded-lg font-medium ${mode === 'break' ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                    >
                        Break (5 min)
                    </button>
                </div>

                <div className="text-center mb-8">
                    <div className="text-8xl font-bold mb-4">
                        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </div>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        {mode === 'work' ? 'Work Session' : 'Break Time'}
                    </p>
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={toggle}
                        className="btn-primary px-8 py-3 text-lg"
                    >
                        {isActive ? 'Pause' : 'Start'}
                    </button>
                    <button
                        onClick={reset}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-8 py-3 rounded-lg text-lg"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PomodoroTimer;
