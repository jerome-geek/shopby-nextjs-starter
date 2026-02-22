import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import * as styles from '@/components/ui/ScrollToTop/index.css';

interface ScrollToTopProps {
    threshold?: number;
}

export default function ScrollToTop({ threshold = 300 }: ScrollToTopProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > threshold) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        // 초기화
        toggleVisibility();

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, [threshold]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    type="button"
                    className={styles.scrollToTopButton}
                    onClick={scrollToTop}
                    aria-label="최상단으로 이동"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                    <ArrowUp size={24} strokeWidth={1.5} />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
