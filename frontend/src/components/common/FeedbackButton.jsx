import { useState } from 'react';
import { FiMessageSquare } from 'react-icons/fi';
import FeedbackModal from './FeedbackModal';

function FeedbackButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed left-4 bottom-4 z-40 flex items-center space-x-2 px-4 py-3 bg-gray-900 hover:bg-gray-800 border border-gray-700 text-white rounded-full shadow-lg transition-all hover:scale-105"
            >
                <FiMessageSquare size={18} />
                <span className="font-medium">Feedback</span>
            </button>

            <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}

export default FeedbackButton;
