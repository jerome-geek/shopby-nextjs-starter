import { useLenis } from 'lenis/react';
import { ArrowUp, RotateCcw } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

import * as styles from '@/components/ui/scroll-to-top/index.css';
import { useMyApp } from '@/hooks/myapp';

interface ScrollToTopProps {
    threshold?: number;
}

export const ScrollToTop = ({ threshold = 300 }: ScrollToTopProps) => {
    const [isVisible, setIsVisible] = useState(false);

    const { isMyApp } = useMyApp();

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
        <div className={styles.container}>
            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        type='button'
                        className={styles.button}
                        onClick={scrollToTop}
                        aria-label='최상단으로 이동'
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        <ArrowUp size={24} strokeWidth={1.5} />
                    </motion.button>
                )}
            </AnimatePresence>
            {isMyApp && (
                <button
                    type='button'
                    className={styles.button}
                    onClick={() => {
                        location.reload();
                    }}
                    aria-label='새로고침'
                >
                    <RotateCcw size={24} strokeWidth={1.5} />
                </button>
            )}
        </div>
    );
};
