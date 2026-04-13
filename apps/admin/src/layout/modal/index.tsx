import { motion } from 'motion/react';
import { AnimatePresence } from 'motion/react';
import { useEffect, type ReactNode } from 'react';
import clsx from 'clsx';

import { ReactComponent as CloseThickIcon } from '@/icons/close-thick.svg?react';

export interface DefaultModalLayoutProps {
    overlayId?: string;
    isOpen: boolean;
    isCloseButton?: boolean;
    close: () => void;
    unmount: () => void;
}

export interface ModalLayoutProps extends DefaultModalLayoutProps {
    className?: string;
    children: React.ReactNode;
    title?: ReactNode;
    subtitle?: ReactNode;
    footer?: ReactNode;
}

export const ModalLayout: React.FC<ModalLayoutProps> = ({
    isOpen,
    close,
    unmount,
    children,
    className,
    isCloseButton = true,
    title,
    subtitle,
    footer,
}) => {
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

    return (
        <AnimatePresence onExitComplete={unmount}>
            {isOpen && (
                <motion.div
                    key='modal-dimmed'
                    className='fixed inset-0 z-99999 h-full w-full bg-gray-700/50'
                    variants={{
                        init: { opacity: 0 },
                        show: { opacity: 0.6 },
                        hide: { opacity: 0 },
                    }}
                    initial='init'
                    animate='show'
                    exit='hide'
                    onClick={close}
                ></motion.div>
            )}

            {isOpen && (
                <motion.div
                    className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  overflow-y-auto modal z-99999'
                    role='modal'
                    aria-modal='true'
                    key='modal-container'
                    variants={{
                        init: { opacity: 0, y: '-5%' },
                        show: {
                            opacity: 1,
                            y: '0%',
                        },
                        hide: { opacity: 0, y: '-5%' },
                    }}
                    initial='init'
                    animate='show'
                    exit='hide'
                >
                    <div
                        className={clsx(
                            'relative flex min-w-100 w-full flex-col rounded-3xl bg-white dark:bg-gray-900',
                            className,
                        )}
                    >
                        {!!title && (
                            <div className='flex items-start justify-between px-6 pt-6 pb-4'>
                                <div className='flex flex-col gap-1'>
                                    <h3
                                        id='modal-title'
                                        className='text-base font-semibold text-[#101828] leading-6 dark:text-gray-100'
                                    >
                                        {title}
                                    </h3>
                                    {!!subtitle && (
                                        <p
                                            id='modal-description'
                                            className='text-xs font-normal text-[#6a7282] leading-5 dark:text-gray-400'
                                        >
                                            {subtitle}
                                        </p>
                                    )}
                                </div>

                                {isCloseButton && (
                                    <button
                                        type='button'
                                        onClick={close}
                                        className='ml-4 flex h-6 w-6 shrink-0 items-center justify-center text-[#6a7282] transition-colors hover:text-[#101828] dark:text-gray-400 dark:hover:text-white'
                                        aria-label='닫기'
                                    >
                                        <CloseThickIcon className='h-4 w-4 text-inherit' />
                                    </button>
                                )}
                            </div>
                        )}

                        <div className='min-h-0 max-h-[520px] flex-1 overflow-y-auto px-6 my-6'>
                            {children}
                        </div>

                        {!!footer && (
                            <div className='flex shrink-0 items-center justify-end gap-2 border-t border-[#e5e7eb] px-6 py-4 dark:border-gray-700'>
                                {footer}
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
