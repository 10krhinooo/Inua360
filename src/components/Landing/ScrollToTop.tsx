import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 500) {
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
            className="fixed bottom-8 right-8 z-50 rounded-full bg-[#F07B20] p-4 text-white shadow-2xl transition-all hover:bg-[#d96a1a] hover:scale-110 active:scale-95 border-2 border-white/20 backdrop-blur-sm"
            aria-label="Scroll to top"
        >
            <ChevronUp size={24} />
        </button>
    );
};

export default ScrollToTop;
