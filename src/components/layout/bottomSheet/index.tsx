import { motion } from 'motion/react';
import { isArray } from '@fxts/core';
import { AnimatePresence } from 'motion/react';
import { Fragment, useEffect } from 'react';

// import NaverPayButton from '@/components/Common/Button/NaverPayButton';
// import Typography from '@/components/Common/Typography';
// import FetchBoundary from '@/components/ErrorBoundary/FetchBoundary';
// import { BottomSheetStyle as S } from '@/components/Layout/BottomSheet/index.styled';

import { useKeyDown } from '@/hooks/utils';

// import CloseIcon from '@/assets/icons/bottomsheet/close.svg';
import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';
import {
    bottomSheetContainerStyle,
    bottomSheetContentStyle,
    bottomSheetDimmedStyle,
    bottomSheetFooterStyle,
    bottomSheetHeaderStyle,
} from '@/components/layout/bottomSheet/index.style';

export interface DefaultBottomSheetProps {
    overlayId?: string;
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
}

interface BottomSheetProps extends DefaultBottomSheetProps {
    type?: 'partial' | 'fullscreen'; // UI 타입 지정
    maxHeight?: number;
    title?: React.ReactNode;
    isCloseButton?: boolean;
    isUnmountCondition?: boolean;
    children: React.ReactNode;
    footerButtonList?: React.ReactNode[];
    bottom?: number;
    lockTargetId?: string;
}

const BottomSheetLayout = ({
    overlayId,
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
}: BottomSheetProps) => {
    // const { isMobile } = useResponsive();

    // useEffect(() => {
    //     if (!isMobile && isUnmountCondition) {
    //         unmount();
    //     }
    // }, [isMobile, unmount, isUnmountCondition]);

    useKeyDown({
        key: 'Escape',
        fn: () => {
            if (isOpen) close();
        },
    });

    const computedMaxHeight =
        type === 'fullscreen' ? '100vh' : maxHeight || '80vh';

    return (
        <AnimatePresence onExitComplete={unmount}>
            {isOpen && (
                <motion.div
                    className={bottomSheetDimmedStyle}
                    variants={{
                        init: { opacity: 0 },
                        show: { opacity: 0.6 },
                        hide: { opacity: 0 },
                    }}
                    initial="init"
                    animate="show"
                    exit="hide"
                    onClick={close}
                />
            )}

            <motion.div
                className={bottomSheetContainerStyle({ type })}
                style={{
                    maxHeight: computedMaxHeight,
                    bottom: bottom,
                }}
                role="bottomSheet"
                aria-modal="true"
                aria-labelledby="bottom-sheet-title"
                aria-describedby="bottom-sheet-description"
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
                    duration: 0.3,
                    type: 'tween',
                    ease: 'easeInOut',
                }}
                initial="init"
                animate="show"
                exit="hide"
                key="bottom-sheet-container"
            >
                {title && (
                    <div className={bottomSheetHeaderStyle}>
                        {title ?? <h4>{title}</h4>}
                        {isCloseButton && (
                            <button onClick={close}>
                                {/* <CloseIcon /> */}
                            </button>
                        )}
                    </div>
                )}
                <div
                    className={bottomSheetContentStyle({
                        hasHeader: !!title,
                        hasFooter: !!footerButtonList,
                    })}
                    id={lockTargetId}
                >
                    {Array.isArray(children) && children.length > 1 ? (
                        <>{children}</>
                    ) : (
                        children
                    )}
                </div>
                {footerButtonList && (
                    <div className={bottomSheetFooterStyle}>
                        {footerButtonList.map((button, index) => (
                            <Fragment key={index}>{button}</Fragment>
                        ))}
                    </div>
                )}
                {/* {overlayId === OVERLAY_ID.OPTION_BOTTOM_SHEET && (
                    <FetchBoundary fallback={<></>} errorFallback={<></>}>
                        <NaverPayButton pageType={2} />
                    </FetchBoundary>
                )} */}
            </motion.div>
        </AnimatePresence>
    );
};

export default BottomSheetLayout;
