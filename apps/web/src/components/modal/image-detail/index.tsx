import { motion } from 'motion/react';
import { AnimatePresence } from 'motion/react';

import { DefaultModalLayoutProps } from '@/components/layout';
import * as styles from '@/components/modal/image-detail/index.css';
import { useKeyDown } from '@/hooks/utils';

interface ImageDetailModalProps extends DefaultModalLayoutProps {
    src: string;
}

export const ImageDetailModal = ({
    src,
    isOpen,
    close,
    unmount,
}: ImageDetailModalProps) => {
    useKeyDown({
        key: 'Escape',
        fn: () => {
            if (isOpen) close();
        },
    });

    return (
        <AnimatePresence onExitComplete={unmount}>
            {isOpen && (
                <div key='modal-portal'>
                    <motion.div
                        className={styles.dimmed}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={close}
                    />

                    <motion.div
                        role='dialog'
                        aria-modal='true'
                        className={styles.modalContainer}
                        initial={{
                            opacity: 0,
                            scale: 0.95,
                            x: '-50%',
                            y: '-52%',
                        }}
                        animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                        exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-52%' }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        data-lenis-prevent
                    >
                        <img
                            src={src}
                            alt='image'
                            style={{
                                width: 'auto',
                                maxWidth: 'none',
                            }}
                        />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
