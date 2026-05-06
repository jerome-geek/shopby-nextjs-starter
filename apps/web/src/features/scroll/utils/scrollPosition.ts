import { useLenis } from 'lenis/react';
import { type MutableRefObject } from 'react';

import {
    readScrollStorage,
    updateScrollStorage,
} from '@/features/scroll/utils/scrollStorage';

/** scrollHeight가 이 프레임 수 이상 동일하면 레이아웃이 안정됐다고 판단 */
const STABLE_FRAME_COUNT = 3;
/** 안정화 대기 제한 (~1s at 60fps) */
const MAX_WAIT_FRAMES = 60;

export type Lenis = ReturnType<typeof useLenis>;

export const saveScrollPosition = (path: string, lenis: Lenis) => {
    const scroll = lenis?.scroll ?? window.scrollY;
    updateScrollStorage(path, scroll);
};

/**
 * 뒤로가기 시 스크롤 복원.
 * 레이아웃이 안정(scrollHeight 불변)될 때까지 매 프레임 즉시 적용해
 * "top → 복원 위치 점프" 깜빡임을 방지한다.
 */
export const restoreScrollPosition = (
    path: string,
    lenis: Lenis,
    rafRef: MutableRefObject<number | null>,
) => {
    const savedScroll = readScrollStorage().positions[path];

    if (savedScroll === undefined) {
        return;
    }

    cancelRaf(rafRef);

    const applyScroll = () => {
        if (lenis) {
            lenis.resize();
            lenis.scrollTo(savedScroll, { immediate: true });
            return;
        }

        window.scrollTo({ top: savedScroll, behavior: 'auto' });
    };

    let stableFrames = 0;
    let totalFrames = 0;
    let prevScrollHeight = -1;

    const tick = () => {
        applyScroll();

        const scrollHeight = (
            document.scrollingElement ?? document.documentElement
        ).scrollHeight;
        totalFrames += 1;
        stableFrames = scrollHeight === prevScrollHeight ? stableFrames + 1 : 0;
        prevScrollHeight = scrollHeight;

        const isDone =
            stableFrames >= STABLE_FRAME_COUNT ||
            totalFrames >= MAX_WAIT_FRAMES;

        if (isDone) {
            applyScroll();
            rafRef.current = null;
        } else {
            rafRef.current = requestAnimationFrame(tick);
        }
    };

    rafRef.current = requestAnimationFrame(tick);
};

export const scrollToTop = (lenis: Lenis) => {
    if (lenis) {
        lenis.scrollTo(0, { immediate: true });
        return;
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
};

export const cancelRaf = (rafRef: MutableRefObject<number | null>) => {
    if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
    }
};
