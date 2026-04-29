import { filter, map, pipe, takeRight, toArray } from '@fxts/core';
import { useLenis } from 'lenis/react';
import { useRouter } from 'next/router';
import { type MutableRefObject, useEffect, useRef } from 'react';

const SCROLL_STORAGE_KEY = 'route-scroll-positions';
const RESTORE_SCROLL_FRAME_COUNT = 3;
const MAX_SCROLL_ENTRIES = 10;

type ScrollStorage = {
    positions: Record<string, number>;
    order: string[];
};

const useRouteScroll = () => {
    const router = useRouter();
    const isHistoryNavigationRef = useRef(false);
    const restoreAnimationFrameRef = useRef<number | null>(null);

    const lenis = useLenis();

    useEffect(() => {
        router.beforePopState(() => {
            isHistoryNavigationRef.current = true;
            return true;
        });

        return () => {
            router.beforePopState(() => true);
        };
    }, [router]);

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
    const scroll = lenis?.scroll ?? window.scrollY;
    const nextStorage = pipeScrollStorage(readScrollStorage(), path, scroll);
    writeScrollStorage(nextStorage);
};

const restoreScrollPosition = (
    path: string,
    lenis: ReturnType<typeof useLenis>,
    restoreAnimationFrameRef: MutableRefObject<number | null>,
) => {
    const storage = readScrollStorage();
    const savedScroll = storage.positions[path];

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
    restoreAnimationFrameRef: MutableRefObject<number | null>,
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

const pipeScrollStorage = (
    storage: ScrollStorage,
    path: string,
    scroll: number,
): ScrollStorage =>
    pipe(
        storage,
        (currentStorage) => setScrollPosition(currentStorage, path, scroll),
        (currentStorage) => appendScrollOrder(currentStorage, path),
        limitScrollStorageEntries,
    );

const setScrollPosition = (
    storage: ScrollStorage,
    path: string,
    scroll: number,
): ScrollStorage => ({
    ...storage,
    positions: {
        ...storage.positions,
        [path]: scroll,
    },
});

const appendScrollOrder = (
    storage: ScrollStorage,
    path: string,
): ScrollStorage => ({
    ...storage,
    order: pipe(
        storage.order,
        filter((item) => item !== path),
        toArray,
        (order) => [...order, path],
    ),
});

const limitScrollStorageEntries = (storage: ScrollStorage) => {
    const nextOrder = pipe(
        storage.order,
        takeRight(MAX_SCROLL_ENTRIES),
        toArray,
    );
    const nextPositions = Object.fromEntries(
        pipe(
            nextOrder,
            map((key) => {
                const value = storage.positions[key];

                return value === undefined ? null : ([key, value] as const);
            }),
            filter((entry) => entry !== null),
            toArray,
        ),
    );

    return {
        positions: nextPositions,
        order: nextOrder,
    };
};

const readScrollStorage = (): ScrollStorage => {
    const stored = sessionStorage.getItem(SCROLL_STORAGE_KEY);

    if (!stored) {
        return { positions: {}, order: [] };
    }

    try {
        const parsed = JSON.parse(stored) as unknown;

        if (
            parsed &&
            typeof parsed === 'object' &&
            'positions' in parsed &&
            'order' in parsed
        ) {
            const typed = parsed as ScrollStorage;
            return {
                positions: typed.positions ?? {},
                order: Array.isArray(typed.order) ? typed.order : [],
            };
        }

        return { positions: {}, order: [] };
    } catch {
        return { positions: {}, order: [] };
    }
};

const writeScrollStorage = (storage: ScrollStorage) => {
    try {
        sessionStorage.setItem(SCROLL_STORAGE_KEY, JSON.stringify(storage));
    } catch (error) {
        console.error(error);
    }
};
