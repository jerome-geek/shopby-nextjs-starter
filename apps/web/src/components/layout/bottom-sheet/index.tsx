import { isArray } from '@fxts/core';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { overlay, useCurrentOverlay } from 'overlay-kit';
import { Fragment, useEffect } from 'react';

import * as styles from '@/components/layout/bottom-sheet/index.css';
import { useKeyDown, useResponsive } from '@/hooks/utils';

export interface DefaultBottomSheetProps {
    overlayId?: string;
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
}

interface BottomSheetProps extends DefaultBottomSheetProps {
    type?: 'partial' | 'fullscreen';
    maxHeight?: number;
    title?: React.ReactNode;
    isCloseButton?: boolean;
    isUnmountCondition?: boolean;
    children: React.ReactNode | React.ReactNode[];
    footerButtonList?: React.ReactNode[];
    bottom?: number;
    lockTargetId?: string;
    zIndex?: number;
    contentStyle?: React.CSSProperties;
}

export const BottomSheetLayout = ({
    isOpen,
    close,
    unmount,
    type = 'partial',
    maxHeight,
    isUnmountCondition = true,
    children,
    title,
    isCloseButton = true,
    footerButtonList,
    bottom = 0,
    lockTargetId = 'bottom-sheet-content',
    zIndex,
    contentStyle,
}: BottomSheetProps) => {
    const { isMobile } = useResponsive();

    useEffect(() => {
        if (!isMobile && isUnmountCondition) {
            unmount();
        }
    }, [isMobile, isUnmountCondition, unmount]);

    const currentOverlay = useCurrentOverlay();

    useKeyDown({
        key: 'Escape',
        fn: () => {
            if (isOpen && currentOverlay) {
                overlay.close(currentOverlay);
            }
        },
    });

    const computedMaxHeight =
        type === 'fullscreen' ? '100vh' : maxHeight || '80vh';

    return (
        <AnimatePresence
            onExitComplete={() => {
                unmount();
            }}
        >
            {isOpen && (
                <motion.div
                    className={styles.dimmed}
                    variants={{
                        init: { opacity: 0 },
                        show: { opacity: 0.5 },
                        hide: { opacity: 0 },
                    }}
                    initial='init'
                    animate='show'
                    exit='hide'
                    transition={{
                        damping: 50,
                        stiffness: 500,
                        type: 'spring',
                    }}
                    onClick={close}
                    style={{
                        zIndex,
                    }}
                />
            )}

            <motion.div
                role='bottomSheet'
                aria-modal='true'
                aria-labelledby='bottom-sheet-title'
                aria-describedby='bottom-sheet-description'
                className={styles.bottomSheetContainer({ type })}
                variants={{
                    init: { opacity: 0, y: '100%' },
                    show: {
                        opacity: isOpen ? 1 : 0,
                        y: isOpen
                            ? type === 'fullscreen'
                                ? '0%'
                                : '0%'
                            : '100%',
                        visibility: isOpen ? 'visible' : 'hidden',
                    },
                    hide: { opacity: 0, y: '100%' },
                }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 50,
                }}
                initial='init'
                animate='show'
                exit='hide'
                key='bottom-sheet-container'
                style={{
                    maxHeight: computedMaxHeight,
                    bottom: bottom,
                    zIndex,
                }}
            >
                {title ? (
                    <div className={styles.bottomSheetHeaderContainer}>
                        <h4
                            id='bottom-sheet-title'
                            className={styles.bottomSheetHeader}
                        >
                            {title}
                        </h4>
                        {isCloseButton && (
                            <button onClick={close}>
                                <X size={24} />
                            </button>
                        )}
                    </div>
                ) : (
                    <button
                        type='button'
                        className={styles.noTitleCloseButton}
                        onClick={close}
                        aria-label='닫기'
                    >
                        <span />
                    </button>
                )}

                <div
                    id={lockTargetId}
                    className={styles.bottomSheetContent({
                        isHeader: !!title,
                        isFooter: !!footerButtonList,
                    })}
                    style={{ ...contentStyle }}
                >
                    {isArray(children) && children.length > 1 ? (
                        <>{children}</>
                    ) : (
                        children
                    )}
                </div>

                {footerButtonList && (
                    <div className={styles.bottomSheetFooter}>
                        {footerButtonList.map((button, index) => (
                            <Fragment key={index}>{button}</Fragment>
                        ))}
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
};
