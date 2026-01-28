import { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed right-4 bottom-4 z-40 w-12 h-12 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg transition-all hover:scale-110 focus:scale-110 flex items-center justify-center group"
            aria-label="Scroll to top of page"
            title="Scroll to top"
        >
            <FiArrowUp size={20} className="group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
        </button>
    );
}

export default ScrollToTop;
