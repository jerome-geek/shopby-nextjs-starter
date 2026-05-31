import { filter, map, pipe, toArray } from '@fxts/core';
import { AnimatePresence, motion } from 'motion/react';
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react';
import { useMemo, useRef, useState } from 'react';

import type { DefaultModalLayoutProps } from '@/shared/components/layout';
import * as styles from '@/features/popup/components/overlay/index.css';
import type { PopupPositionType, SizeUnitType } from '@/models';
import type { PopupInfo } from '@/models/display/popup';

interface PopupOverlayProps extends DefaultModalLayoutProps {
    popup: PopupInfo;
    onHideToday: (popup: PopupInfo) => void;
}

type ResolvedScreenType = 'FIXED' | 'FIXED_TOP' | 'WINDOW' | 'MOVE' | 'LAYER';
const FOOTER_HEIGHT_PX = 46;
type PositionPreset = {
    left: number;
    top: number;
    leftUnit: SizeUnitType;
    topUnit: SizeUnitType;
    translateX: string;
    translateY: string;
};

export const PopupOverlay = ({
    isOpen,
    close,
    unmount,
    popup,
    onHideToday,
}: PopupOverlayProps) => {
    const popupSlideInfo = popup.popupSlideInfo ?? { slideImages: [] };
    const detailInfo = popup.detailInfo;
    const resolvedScreenType = resolveScreenType(popup);
    const isDraggable = resolvedScreenType === 'MOVE';

    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const dragRef = useRef<{
        pointerId: number;
        startClientX: number;
        startClientY: number;
        originX: number;
        originY: number;
    } | null>(null);

    const slideImages = pipe(
        popupSlideInfo.slideImages ?? [],
        filter((image) => image.hasUploaded && !!image.mainImageUrl),
        toArray,
    );

    const popupPositionPreset = useMemo(
        () => resolvePopupPositionPreset(popup.popupPosition),
        [popup.popupPosition],
    );

    const popupSize = useMemo(() => {
        const width = toCssLength(
            detailInfo?.screenWidth || popup.width || 360,
            detailInfo?.screenWidthUnit ?? 'PIXEL',
        );
        const height = toCssLength(
            detailInfo?.screenHeight || popup.height || 480,
            detailInfo?.screenHeightUnit ?? 'PIXEL',
        );

        return { width, height };
    }, [detailInfo, popup.height, popup.width]);

    const containerStyle = useMemo<CSSProperties>(() => {
        const topPositionValue =
            popupPositionPreset?.top ?? detailInfo?.screenTopPosition ?? 0;
        const topUnitValue =
            popupPositionPreset?.topUnit ??
            detailInfo?.screenTopUnit ??
            'PIXEL';
        const leftPositionValue =
            popupPositionPreset?.left ?? detailInfo?.screenLeftPosition ?? 0;
        const leftUnitValue =
            popupPositionPreset?.leftUnit ??
            detailInfo?.screenLeftUnit ??
            'PIXEL';

        const top = toCssLength(topPositionValue, topUnitValue);
        const left = toCssLength(leftPositionValue, leftUnitValue);
        return {
            width: popupSize.width,
            height: `calc(${popupSize.height} + ${FOOTER_HEIGHT_PX}px)`,
            top,
            left,
            position: resolvedScreenType === 'FIXED_TOP' ? 'absolute' : 'fixed',
            backgroundColor: detailInfo?.bgColor || '#ffffff',
            cursor: isDraggable ? 'move' : 'default',
            maxWidth: '100vw',
            maxHeight: '100vh',
        };
    }, [
        detailInfo,
        isDraggable,
        popupPositionPreset,
        popupSize.height,
        popupSize.width,
        resolvedScreenType,
    ]);

    const baseTranslateX = popupPositionPreset
        ? popupPositionPreset.translateX
        : detailInfo?.screenLeftUnit === 'PERCENT'
        ? '-50%'
        : '0';
    const baseTranslateY = popupPositionPreset
        ? popupPositionPreset.translateY
        : detailInfo?.screenTopUnit === 'PERCENT'
        ? '-50%'
        : '0';

    const bodyStyle = useMemo<CSSProperties>(() => {
        return {
            height: popupSize.height,
            backgroundColor: detailInfo?.bgColor || '#ffffff',
            overflow: 'hidden',
        };
    }, [detailInfo?.bgColor, popupSize.height]);

    const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
        if (!isDraggable) {
            return;
        }

        const targetElement = event.target as HTMLElement | null;
        const isInteractiveTarget = !!targetElement?.closest(
            'button, a, input, textarea, select, [data-popup-action]',
        );

        if (isInteractiveTarget) {
            return;
        }

        dragRef.current = {
            pointerId: event.pointerId,
            startClientX: event.clientX,
            startClientY: event.clientY,
            originX: dragOffset.x,
            originY: dragOffset.y,
        };

        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
        const dragInfo = dragRef.current;

        if (
            !isDraggable ||
            !dragInfo ||
            dragInfo.pointerId !== event.pointerId
        ) {
            return;
        }

        const nextX =
            dragInfo.originX + (event.clientX - dragInfo.startClientX);
        const nextY =
            dragInfo.originY + (event.clientY - dragInfo.startClientY);

        setDragOffset({ x: nextX, y: nextY });
    };

    const handlePointerUp = (event: ReactPointerEvent<HTMLElement>) => {
        if (dragRef.current?.pointerId !== event.pointerId) {
            return;
        }

        dragRef.current = null;
        event.currentTarget.releasePointerCapture(event.pointerId);
    };

    return (
        <AnimatePresence onExitComplete={unmount}>
            {isOpen && resolvedScreenType !== 'WINDOW' && (
                <motion.section
                    className={styles.container}
                    style={containerStyle}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transformTemplate={(_, generatedTransform) => {
                        return `translate(${baseTranslateX}, ${baseTranslateY}) ${generatedTransform} translate(${dragOffset.x}px, ${dragOffset.y}px)`;
                    }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                >
                    <div
                        className={styles.body}
                        style={bodyStyle}
                        data-lenis-prevent
                    >
                        {slideImages.length > 0 ? (
                            <div className={styles.imageList}>
                                {pipe(
                                    slideImages,
                                    map((image) => (
                                        <button
                                            type='button'
                                            key={image.popupImageNo}
                                            onClick={() =>
                                                openInNewTab(image.landingUrl)
                                            }
                                        >
                                            <img
                                                src={image.mainImageUrl}
                                                alt={popup.title}
                                                className={styles.image}
                                            />
                                        </button>
                                    )),
                                    toArray,
                                )}
                            </div>
                        ) : (
                            <div
                                className={styles.content}
                                dangerouslySetInnerHTML={{
                                    __html: popup.content,
                                }}
                            />
                        )}
                    </div>

                    <footer className={styles.footer}>
                        {popup.visibleToday && (
                            <button
                                type='button'
                                className={styles.hideTodayButton}
                                data-popup-action
                                onPointerDown={(e) => {
                                    e.stopPropagation();
                                }}
                                onClick={() => {
                                    onHideToday(popup);
                                }}
                            >
                                오늘 하루 닫기
                            </button>
                        )}
                        <button
                            type='button'
                            className={styles.button}
                            data-popup-action
                            onPointerDown={(e) => {
                                e.stopPropagation();
                            }}
                            onClick={close}
                        >
                            닫기
                        </button>
                    </footer>
                </motion.section>
            )}
        </AnimatePresence>
    );
};

const openInNewTab = (url: string) => {
    if (!url) {
        return;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
};

const toCssLength = (value: number, unit: string) => {
    return `${value}${unit === 'PERCENT' ? '%' : 'px'}`;
};

const resolveScreenType = (popup: PopupInfo): ResolvedScreenType => {
    if (popup.type === 'MOVE') {
        return 'MOVE';
    }

    if (popup.type === 'WINDOW') {
        return 'WINDOW';
    }

    const screenType = popup.detailInfo?.screenType as string | undefined;

    if (screenType === 'MOVE') {
        return 'MOVE';
    }

    if (
        screenType === 'FIXED' ||
        screenType === 'FIXED_TOP' ||
        screenType === 'WINDOW'
    ) {
        return screenType;
    }

    if (screenType === 'LAYER') {
        return 'LAYER';
    }

    return 'FIXED';
};

const resolvePopupPositionPreset = (
    popupPosition: PopupPositionType,
): PositionPreset | null => {
    switch (popupPosition) {
        case 'MIDDLE':
            return toPositionPreset(50, 50, '-50%', '-50%');
        case 'LEFT':
            return toPositionPreset(10, 50, '0', '-50%');
        case 'RIGHT':
            return toPositionPreset(90, 50, '-100%', '-50%');
        case 'MIDDLE_TOP':
            return toPositionPreset(50, 10, '-50%', '0');
        case 'LEFT_TOP':
            return toPositionPreset(10, 10, '0', '0');
        case 'RIGHT_TOP':
            return toPositionPreset(90, 10, '-100%', '0');
        case 'MIDDLE_BOTTOM':
            return toPositionPreset(50, 90, '-50%', '-100%');
        case 'LEFT_BOTTOM':
            return toPositionPreset(10, 90, '0', '-100%');
        case 'RIGHT_BOTTOM':
            return toPositionPreset(90, 90, '-100%', '-100%');
        default:
            return null;
    }
};

const toPositionPreset = (
    left: number,
    top: number,
    translateX: string,
    translateY: string,
): PositionPreset => {
    return {
        left,
        top,
        leftUnit: 'PERCENT',
        topUnit: 'PERCENT',
        translateX,
        translateY,
    };
};
