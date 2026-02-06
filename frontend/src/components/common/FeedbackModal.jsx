import { useState } from 'react';
import { FiX, FiSend, FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';

function FeedbackModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: 'suggestion',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.message.trim()) {
            toast.error('Please enter a message');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Thank you for your feedback!');
                setFormData({ name: '', email: '', type: 'suggestion', message: '' });
                onClose();
            } else {
                toast.error(data.error || 'Failed to submit feedback');
            }
        } catch (error) {
            console.error('Feedback submission error:', error);
            toast.error('Failed to submit feedback. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-gray-900 rounded-2xl border border-gray-800 w-full max-w-md shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                            <FiSend className="text-white" size={18} />
                        </div>
                        <h2 className="text-xl font-bold text-white">Send Feedback</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                        disabled={isSubmitting}
                    >
                        <FiX size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            Name (optional)
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Your name"
                            disabled={isSubmitting}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            Email (optional)
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="your@email.com"
                            disabled={isSubmitting}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            Feedback Type
                        </label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            disabled={isSubmitting}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50"
                        >
                            <option value="suggestion">💡 Suggestion</option>
                            <option value="bug">🐛 Bug Report</option>
                            <option value="feature">✨ Feature Request</option>
                            <option value="other">💬 Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            Message *
                        </label>
                        <textarea
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Tell us what you think..."
                            required
                            rows={4}
                            disabled={isSubmitting}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none disabled:opacity-50"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500/50 text-white font-bold rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                        {isSubmitting ? (
                            <>
                                <FiLoader className="animate-spin" size={18} />
                                <span>Sending...</span>
                            </>
                        ) : (
                            <>
                                <FiSend size={18} />
                                <span>Send Feedback</span>
                            </>
                        )}
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                        We read every message. Thank you for helping us improve!
                    </p>
                </form>
            </div>
        </div>
    );
}

export default FeedbackModal;
