import { useLenis } from 'lenis/react';
import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

import * as styles from '@/components/ui/scroll-to-top/index.css';

interface ScrollToTopProps {
    threshold?: number;
}

export const ScrollToTop = ({ threshold = 300 }: ScrollToTopProps) => {
    const [isVisible, setIsVisible] = useState(false);

    const lenis = useLenis(({ scroll }) => {
        if (scroll > threshold) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    });

    const scrollToTop = () => {
        if (lenis) {
            lenis.scrollTo(0, { duration: 1.2 });
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={styles.container}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                    <button
                        type='button'
                        className={styles.button}
                        onClick={scrollToTop}
                        aria-label='최상단으로 이동'
                    >
                        <ArrowUp size={24} strokeWidth={1.5} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
