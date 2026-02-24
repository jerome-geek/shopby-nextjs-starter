import { isArray } from '@fxts/core';
import { AnimatePresence } from 'motion/react';
import { overlay, useCurrentOverlay } from 'overlay-kit';
import { Fragment, useEffect } from 'react';

import { BottomSheetStyle as S } from '@/components/layout/bottom-sheet/index.styled';
import { useKeyDown, useResponsive } from '@/hooks/utils';

import CloseIcon from '@/assets/icons/close-modal.svg';

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
    children: React.ReactNode | React.ReactNode[];
    footerButtonList?: React.ReactNode[];
    bottom?: number;
    lockTargetId?: string;
    zIndex?: number;
    contentStyle?: React.CSSProperties;
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
    zIndex = 99,
    contentStyle,
}: BottomSheetProps) => {
    const { isMobile } = useResponsive();

    useEffect(() => {
        if (!isMobile && isUnmountCondition) {
            unmount();
        }
    }, [isMobile, isUnmountCondition]);

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
                <>
                    {/* 기본 딤드 */}
                    <S.Dimmed
                        variants={{
                            init: { opacity: 0 },
                            show: { opacity: 0.5 },
                            hide: { opacity: 0 },
                        }}
                        initial="init"
                        animate="show"
                        exit="hide"
                        onClick={close}
                        style={{
                            zIndex,
                        }}
                    />

                    {/* 추가 딤드 (겹쳐져야 할 경우) */}
                </>
            )}

            <S.BottomSheetContainer
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
                    type: 'spring',
                    stiffness: 500,
                    damping: 50,
                }}
                initial="init"
                animate="show"
                exit="hide"
                key="bottom-sheet-container"
                $type={type}
                style={{
                    maxHeight: computedMaxHeight,
                    bottom: bottom,
                    zIndex,
                }}
            >
                {title ? (
                    <S.BottomSheetHeader>
                        <h4>{title}</h4>
                        {isCloseButton && (
                            <button onClick={close}>
                                <CloseIcon />
                            </button>
                        )}
                    </S.BottomSheetHeader>
                ) : (
                    <S.NoTitleCloseButton onClick={close}>
                        <span />
                    </S.NoTitleCloseButton>
                )}

                <S.BottomSheetContent
                    id={lockTargetId}
                    $isHeader={!!title}
                    $isFooter={!!footerButtonList}
                    style={{ ...contentStyle }}
                >
                    {isArray(children) && children.length > 1 ? (
                        <>{children}</>
                    ) : (
                        children
                    )}
                </S.BottomSheetContent>

                {footerButtonList && (
                    <S.BottomSheetFooter>
                        {footerButtonList.map((button, index) => (
                            <Fragment key={index}>{button}</Fragment>
                        ))}
                    </S.BottomSheetFooter>
                )}
            </S.BottomSheetContainer>
        </AnimatePresence>
    );
};

export default BottomSheetLayout;
