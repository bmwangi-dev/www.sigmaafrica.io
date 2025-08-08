import { Pointer } from 'lucide-react';
import { useEffect, useState } from 'react';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
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

    return (
        isVisible && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 z-50 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:cursor-pointer transition duration-300"
                style={{
                    background: 'linear-gradient(135deg, #fea300)',
                }}
                aria-label="Back to top"
            >
                <svg
                    className="w-4 h-4"
                    fill="white"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 01.707.293l5 5a1 1 0 11-1.414 1.414L11 6.414V17a1 1 0 11-2 0V6.414L5.707 9.707A1 1 0 114.293 8.293l5-5A1 1 0 0110 3z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        )
    );
};

export default BackToTop;
