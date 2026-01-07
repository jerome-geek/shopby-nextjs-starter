import { RefObject, useRef } from 'react';

interface UseDragScrollOptions {
    /** 스크롤 속도 (기본값: 2) */
    scrollSpeed?: number;
    /** 드래그 임계값 (기본값: 5) ex) 5px 이상 이동해야 드래그로 인식 */
    dragThreshold?: number;
    /** 아이템 리스트 */
    itemRefs?: RefObject<Record<string, HTMLElement | null>>;
}

const useDragScroll = (options: UseDragScrollOptions = {}) => {
    const { scrollSpeed = 2, dragThreshold = 5, itemRefs } = options;

    const containerRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);
    const hasDraggedRef = useRef(false);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        isDraggingRef.current = true;
        hasDraggedRef.current = false;
        startXRef.current = e.pageX - container.offsetLeft;
        scrollLeftRef.current = container.scrollLeft;

        setDraggingStyles(container);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const container = containerRef.current;

        if (!isDraggingRef.current || !container) {
            return;
        }

        const currentX = e.pageX - container.offsetLeft;
        const dragDistance = calculateDragDistance(currentX, startXRef.current);

        if (shouldTriggerDrag(dragDistance, dragThreshold)) {
            hasDraggedRef.current = true;
            e.preventDefault();

            const newScrollLeft = calculateNewScrollLeft(
                scrollLeftRef.current,
                dragDistance,
                scrollSpeed,
            );
            container.scrollLeft = newScrollLeft;

            if (itemRefs) {
                disablePointerEvents(itemRefs);
            }
        }
    };

    const handleMouseUp = () => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        isDraggingRef.current = false;
        setDefaultStyles(container);

        if (itemRefs) {
            enablePointerEvents(itemRefs);
        }

        setTimeout(() => {
            hasDraggedRef.current = false;
        }, 0);
    };

    const handleMouseLeave = () => {
        handleMouseUp();
    };

    return {
        containerRef,
        hasDraggedRef,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleMouseLeave,
    };
};

export default useDragScroll;

const setDraggingStyles = (element: HTMLElement) => {
    element.style.cursor = 'grabbing';
    element.style.userSelect = 'none';
};

const setDefaultStyles = (element: HTMLElement) => {
    element.style.cursor = 'grab';
    element.style.userSelect = '';
};

const disablePointerEvents = (
    itemRefs: React.MutableRefObject<Record<string, HTMLElement | null>>,
) => {
    Object.values(itemRefs.current)
        .filter((item): item is HTMLElement => item !== null)
        .forEach((item) => {
            item.style.pointerEvents = 'none';
        });
};

const enablePointerEvents = (
    itemRefs: React.MutableRefObject<Record<string, HTMLElement | null>>,
) => {
    Object.values(itemRefs.current)
        .filter((item): item is HTMLElement => item !== null)
        .forEach((item) => {
            item.style.pointerEvents = '';
        });
};

const calculateDragDistance = (currentX: number, startX: number) => {
    return currentX - startX;
};

const calculateNewScrollLeft = (
    initialScrollLeft: number,
    dragDistance: number,
    scrollSpeed: number,
) => {
    return initialScrollLeft - dragDistance * scrollSpeed;
};

const shouldTriggerDrag = (dragDistance: number, threshold: number) => {
    return Math.abs(dragDistance) > threshold;
};
