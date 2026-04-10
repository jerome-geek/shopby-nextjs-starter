import { motion } from 'motion/react';
import { AnimatePresence } from 'motion/react';
import { useRef, useEffect } from 'react';

export interface DefaultDialogLayoutProps {
    overlayId?: string;
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
}

export interface DialogLayoutProps extends DefaultDialogLayoutProps {
    className?: string;
    children: React.ReactNode;
}

export const DialogLayout: React.FC<DialogLayoutProps> = ({
    isOpen,
    close,
    unmount,
    children,
    className,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                close();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, close]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const contentClasses =
        'relative w-full min-w-90 rounded-3xl bg-white  dark:bg-gray-900';

    return (
        <AnimatePresence onExitComplete={unmount}>
            {isOpen && (
                <motion.div
                    className='fixed inset-0 h-full w-full bg-gray-700/50 backdrop-blur-[1px] z-99999'
                    variants={{
                        init: { opacity: 0 },
                        show: { opacity: 0.6 },
                        hide: { opacity: 0 },
                    }}
                    initial='init'
                    animate='show'
                    exit='hide'
                    onClick={() => {
                        console.log(1);
                        close();
                    }}
                ></motion.div>
            )}

            {isOpen && (
                <motion.div
                    className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  overflow-y-auto modal z-99999'
                    role='modal'
                    aria-modal='true'
                    aria-labelledby='modal-title'
                    aria-describedby='modal-description'
                    key='modal-container'
                    variants={{
                        init: { opacity: 0, x: '0%', y: '-5%' },
                        show: {
                            opacity: isOpen ? 1 : 0,
                            x: '0%',
                            y: isOpen ? '0%' : '-5%',
                            visibility: isOpen ? 'visible' : 'hidden',
                        },
                        hide: { opacity: 0, x: '0%', y: '-5%' },
                    }}
                    initial='init'
                    animate='show'
                    exit='hide'
                >
                    <div
                        ref={modalRef}
                        className={`${contentClasses}  ${className}`}
                    >
                        <div>{children}</div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
