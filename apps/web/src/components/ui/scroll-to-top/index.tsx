import { useLenis } from 'lenis/react';
import { ArrowUp, Share2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/router';
import { overlay } from 'overlay-kit';
import { useMemo, useState } from 'react';

import ShareBottomSheet from '@/components/bottom-sheet/share';
import ShareModal from '@/components/modal/share';
import * as styles from '@/components/ui/scroll-to-top/index.css';
import { PATHS } from '@/const/paths';
import { useResponsive } from '@/hooks/utils';

interface ScrollToTopProps {
    threshold?: number;
}

export const ScrollToTop = ({ threshold = 300 }: ScrollToTopProps) => {
    const router = useRouter();

    const { isMobile } = useResponsive();

    const [isVisible, setIsVisible] = useState(false);

    const isVisibleShareButton = useMemo(() => {
        const isProductDetail = router.pathname === PATHS.PRODUCTS.DETAIL;

        if (isProductDetail && isMobile) {
            return false;
        }

        return true;
    }, [isMobile, router.pathname]);

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
            return isMobile ? (
                <ShareBottomSheet {...props} />
            ) : (
                <ShareModal {...props} />
            );
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
                    {isVisibleShareButton && (
                        <li>
                            <button
                                type='button'
                                className={styles.button}
                                onClick={onShareButtonClick}
                                aria-label='공유하기'
                            >
                                <Share2 size={22} strokeWidth={1.5} />
                            </button>
                        </li>
                    )}
                    <li>
                        <button
                            type='button'
                            className={styles.button}
                            onClick={scrollToTop}
                            aria-label='최상단으로 이동'
                        >
                            <ArrowUp size={24} strokeWidth={1.5} />
                        </button>
                    </li>
                </motion.ul>
            )}
        </AnimatePresence>
    );
};
