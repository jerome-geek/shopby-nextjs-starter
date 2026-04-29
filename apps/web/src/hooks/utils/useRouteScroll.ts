import { useLenis } from 'lenis/react';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

const SCROLL_STORAGE_KEY = 'route-scroll-positions';
const RESTORE_SCROLL_FRAME_COUNT = 3;

const useRouteScroll = () => {
    const router = useRouter();
    const isHistoryNavigationRef = useRef(false);
    const restoreAnimationFrameRef = useRef<number | null>(null);

    const lenis = useLenis();

    useEffect(() => {
        const handlePopState = () => {
            isHistoryNavigationRef.current = true;
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    useEffect(() => {
        const handleRouteChangeStart = () => {
            saveScrollPosition(router.asPath, lenis);
        };

        const handleRouteChangeComplete = (url: string) => {
            if (isHistoryNavigationRef.current) {
                isHistoryNavigationRef.current = false;
                restoreScrollPosition(url, lenis, restoreAnimationFrameRef);
                return;
            }

            scrollToTop(lenis);
        };

        router.events.on('routeChangeStart', handleRouteChangeStart);
        router.events.on('routeChangeComplete', handleRouteChangeComplete);

        return () => {
            cancelRestoreAnimation(restoreAnimationFrameRef);
            router.events.off('routeChangeStart', handleRouteChangeStart);
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
        };
    }, [lenis, router]);

    return null;
};

export default useRouteScroll;

const saveScrollPosition = (
    path: string,
    lenis: ReturnType<typeof useLenis>,
) => {
    const scrollPositions = getScrollPositions();
    scrollPositions[path] = lenis?.scroll ?? window.scrollY;
    sessionStorage.setItem(SCROLL_STORAGE_KEY, JSON.stringify(scrollPositions));
};

const restoreScrollPosition = (
    path: string,
    lenis: ReturnType<typeof useLenis>,
    restoreAnimationFrameRef: React.MutableRefObject<number | null>,
) => {
    const scrollPositions = getScrollPositions();
    const savedScroll = scrollPositions[path];

    if (savedScroll === undefined) {
        return;
    }

    cancelRestoreAnimation(restoreAnimationFrameRef);

    let frame = 0;

    const restore = () => {
        if (lenis) {
            lenis.resize();
            lenis.scrollTo(savedScroll, { immediate: true });
        } else {
            window.scrollTo({ top: savedScroll, behavior: 'auto' });
        }

        frame += 1;

        if (frame < RESTORE_SCROLL_FRAME_COUNT) {
            restoreAnimationFrameRef.current = requestAnimationFrame(restore);
            return;
        }

        restoreAnimationFrameRef.current = null;
    };

    restoreAnimationFrameRef.current = requestAnimationFrame(restore);
};

const cancelRestoreAnimation = (
    restoreAnimationFrameRef: React.MutableRefObject<number | null>,
) => {
    if (restoreAnimationFrameRef.current === null) {
        return;
    }

    cancelAnimationFrame(restoreAnimationFrameRef.current);
    restoreAnimationFrameRef.current = null;
};

const scrollToTop = (lenis: ReturnType<typeof useLenis>) => {
    if (lenis) {
        lenis.scrollTo(0, { immediate: true });
        return;
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
};

const getScrollPositions = (): Record<string, number> => {
    const stored = sessionStorage.getItem(SCROLL_STORAGE_KEY);

    if (!stored) {
        return {};
    }

    try {
        return JSON.parse(stored) as Record<string, number>;
    } catch {
        return {};
    }
};
