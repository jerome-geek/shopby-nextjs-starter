import { last } from '@fxts/core';
import { useLenis } from 'lenis/react';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import { MODAL_QUERY_KEY } from '@/const/modal';
import {
    cancelRaf,
    restoreScrollPosition,
    saveScrollPosition,
    scrollToTop,
} from '@/features/scroll/utils/scrollPosition';
import { readScrollStorage } from '@/features/scroll/utils/scrollStorage';

const useRouteScroll = () => {
    const router = useRouter();
    const lenis = useLenis();
    const isHistoryNavRef = useRef(false);
    const rafRef = useRef<number | null>(null);
    const committedPathRef = useRef(router.asPath);

    useEffect(
        function trackingCommittedPath() {
            committedPathRef.current = router.asPath;
        },
        [router.asPath],
    );

    useEffect(
        function disableDefaultScrollRestore() {
            if (
                typeof window !== 'undefined' &&
                'scrollRestoration' in history
            ) {
                history.scrollRestoration = 'manual';
            }

            router.beforePopState(() => {
                isHistoryNavRef.current = true;
                return true;
            });

            return () => {
                router.beforePopState(() => true);
            };
        },
        [router],
    );

    useEffect(
        function handleRouteChange() {
            const onStart = () => {
                cancelRaf(rafRef);
                saveScrollPosition(committedPathRef.current, lenis);
            };

            const onComplete = (url: string) => {
                if (isHistoryNavRef.current) {
                    isHistoryNavRef.current = false;
                    restoreScrollPosition(url, lenis, rafRef);
                    return;
                }

                // NOTE: 모달 전환이면 스크롤 초기화 생략
                let prevPath = '';
                try {
                    prevPath = last(readScrollStorage().order) ?? '';
                } catch (e) {
                    console.error(e);
                }

                const isModalTransition =
                    url.includes(MODAL_QUERY_KEY) ||
                    prevPath.includes(MODAL_QUERY_KEY);

                if (isModalTransition) {
                    return;
                }

                scrollToTop(lenis);
            };

            router.events.on('routeChangeStart', onStart);
            router.events.on('routeChangeComplete', onComplete);

            return () => {
                router.events.off('routeChangeStart', onStart);
                router.events.off('routeChangeComplete', onComplete);
            };
        },
        [lenis, router],
    );

    return null;
};

export default useRouteScroll;
