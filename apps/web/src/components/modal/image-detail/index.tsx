import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
                            scale: 0.9,
                            x: '-50%',
                            y: '-50%',
                        }}
                        animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                        exit={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
                        transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 30,
                        }}
                        data-lenis-prevent
                    >
                        <button
                            className={styles.closeBtn}
                            onClick={close}
                            aria-label='Close'
                        >
                            <X size={20} />
                        </button>
                        <img
                            src={src}
                            alt='image detail'
                            className={styles.image}
                        />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
