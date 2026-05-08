import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { Fragment, useEffect } from 'react';

import * as styles from '@/components/layout/modal/index.css';
import { useKeyDown, useResponsive } from '@/hooks/utils';

export interface DefaultModalLayoutProps {
    overlayId?: string;
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
}

interface ModalLayoutProps extends DefaultModalLayoutProps {
    title?: React.ReactNode;
    children: React.ReactNode;
    footerButtonList?: React.ReactNode[];
    size?: 'small' | 'medium' | 'large' | 'auto' | 'full';
    width?: string;
    height?: string;
    modalContentClass?: string;
}

export const ModalLayout = ({
    title,
    children,
    footerButtonList,
    isOpen,
    close,
    unmount,
    size = 'medium',
    width,
    height,
    modalContentClass,
}: ModalLayoutProps) => {
    const { isMobile } = useResponsive();

    useEffect(
        function unmountOnMobile() {
            if (isMobile) {
                unmount();
            }
        },
        [isMobile, unmount],
    );

    useKeyDown({
        key: 'Escape',
        fn: () => {
            if (isOpen) close();
        },
    });

    return (
        <AnimatePresence onExitComplete={unmount}>
            {isOpen && (
                <>
                    {/* 오버레이 딤드 */}
                    <motion.div
                        className={styles.dimmed}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={close}
                    />

                    {/* 모달 컨테이너 */}
                    <motion.div
                        role='dialog'
                        aria-modal='true'
                        className={styles.modalContainer({ size })}
                        style={{ width, height }}
                        initial={{
                            opacity: 0,
                            scale: 0.95,
                            x: '-50%',
                            y: '-52%',
                        }}
                        animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                        exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-52%' }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                        {/* 헤더 영역 */}
                        {title && (
                            <div className={styles.modalHeader}>
                                <h2 className={styles.modalTitle}>{title}</h2>
                                <button
                                    type='button'
                                    className={styles.closeButton}
                                    onClick={close}
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        )}

                        {/* 컨텐츠 영역 */}
                        <div
                            // class props로 추가적으로 전달 받을수 있게끔 변경
                            className={`${styles.modalContent} ${modalContentClass}`}
                            data-lenis-prevent
                            id='modal-content'
                        >
                            {children}
                        </div>

                        {/* 푸터 영역 (선택 사항) */}
                        {footerButtonList && footerButtonList.length > 0 && (
                            <div className={styles.modalFooter}>
                                {footerButtonList.map((button, index) => (
                                    <Fragment key={index}>{button}</Fragment>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
