import { useState, useEffect } from 'react';
import { FiPlay, FiPause, FiSquare } from 'react-icons/fi';
import toast from 'react-hot-toast';

function TextToSpeech() {
    const [text, setText] = useState('');
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [rate, setRate] = useState(1);
    const [pitch, setPitch] = useState(1);
    const [volume, setVolume] = useState(1);
    const [speaking, setSpeaking] = useState(false);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = speechSynthesis.getVoices();
            setVoices(availableVoices);
            if (availableVoices.length > 0 && !selectedVoice) {
                setSelectedVoice(availableVoices[0]);
            }
        };

        loadVoices();
        speechSynthesis.onvoiceschanged = loadVoices;
    }, [selectedVoice]);

    const speak = () => {
        if (!text.trim()) {
            toast.error('Please enter text to speak');
            return;
        }

        if (paused) {
            speechSynthesis.resume();
            setPaused(false);
            setSpeaking(true);
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = selectedVoice;
        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.volume = volume;

        utterance.onstart = () => {
            setSpeaking(true);
            setPaused(false);
        };

        utterance.onend = () => {
            setSpeaking(false);
            setPaused(false);
        };

        utterance.onerror = () => {
            toast.error('Speech synthesis failed');
            setSpeaking(false);
            setPaused(false);
        };

        speechSynthesis.speak(utterance);
    };

    const pause = () => {
        speechSynthesis.pause();
        setPaused(true);
        setSpeaking(false);
    };

    const stop = () => {
        speechSynthesis.cancel();
        setSpeaking(false);
        setPaused(false);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    Text to Speech
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Convert text to speech audio using browser TTS
                </p>
            </header>

            <div className="space-y-6">
                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <label htmlFor="text-input" className="block font-semibold mb-3">
                        Text to Speak
                    </label>
                    <textarea
                        id="text-input"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text to convert to speech..."
                        className="input-field min-h-[200px]"
                    />
                </section>

                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <h2 className="font-semibold mb-4 text-gray-900 dark:text-white">
                        Voice Settings
                    </h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="voice-select" className="block font-medium mb-2">
                                Voice
                            </label>
                            <select
                                id="voice-select"
                                value={selectedVoice?.name || ''}
                                onChange={(e) => {
                                    const voice = voices.find((v) => v.name === e.target.value);
                                    setSelectedVoice(voice);
                                }}
                                className="input-field"
                            >
                                {voices.map((voice) => (
                                    <option key={voice.name} value={voice.name}>
                                        {voice.name} ({voice.lang})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="rate" className="block font-medium mb-2">
                                Speed: {rate}x
                            </label>
                            <input
                                id="rate"
                                type="range"
                                min="0.5"
                                max="2"
                                step="0.1"
                                value={rate}
                                onChange={(e) => setRate(parseFloat(e.target.value))}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label htmlFor="pitch" className="block font-medium mb-2">
                                Pitch: {pitch}
                            </label>
                            <input
                                id="pitch"
                                type="range"
                                min="0.5"
                                max="2"
                                step="0.1"
                                value={pitch}
                                onChange={(e) => setPitch(parseFloat(e.target.value))}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label htmlFor="volume" className="block font-medium mb-2">
                                Volume: {Math.round(volume * 100)}%
                            </label>
                            <input
                                id="volume"
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={volume}
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                className="w-full"
                            />
                        </div>
                    </div>
                </section>

                <section className="flex gap-3">
                    <button
                        onClick={speak}
                        disabled={speaking}
                        className="btn-primary flex-1 flex items-center justify-center gap-2"
                    >
                        <FiPlay />
                        {paused ? 'Resume' : 'Speak'}
                    </button>
                    <button
                        onClick={pause}
                        disabled={!speaking}
                        className="btn-secondary flex items-center justify-center gap-2"
                    >
                        <FiPause />
                        Pause
                    </button>
                    <button
                        onClick={stop}
                        disabled={!speaking && !paused}
                        className="btn-secondary flex items-center justify-center gap-2"
                    >
                        <FiSquare />
                        Stop
                    </button>
                </section>
            </div>
        </div>
    );
}

export default TextToSpeech;
