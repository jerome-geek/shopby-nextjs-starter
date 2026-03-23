import { ArrowUp, Share2 } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLenis } from 'lenis/react';

import * as styles from '@/components/ui/scroll-to-top/index.css';
import { overlay } from 'overlay-kit';
import ShareDialog from '@/components/ui/dialog/share';

interface ScrollToTopProps {
    threshold?: number;
}

export default function ScrollToTop({ threshold = 300 }: ScrollToTopProps) {
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

    const onShareButtonClick = () => {
        overlay.open((props) => {
            return <ShareDialog {...props} />;
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.ul
                    className={styles.container}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                    <li>
                        <button
                            type="button"
                            className={styles.button}
                            onClick={onShareButtonClick}
                            aria-label="공유하기"
                        >
                            <Share2 size={24} strokeWidth={1.5} />
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className={styles.button}
                            onClick={scrollToTop}
                            aria-label="최상단으로 이동"
                        >
                            <ArrowUp size={24} strokeWidth={1.5} />
                        </button>
                    </li>
                </motion.ul>
            )}
        </AnimatePresence>
    );
}
