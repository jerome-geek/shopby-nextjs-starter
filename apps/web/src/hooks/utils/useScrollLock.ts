import { filter, pipe, some, values } from '@fxts/core';
import { useLenis } from 'lenis/react';
import { useOverlayData } from 'overlay-kit';
import { useEffect, useRef } from 'react';
import { useScrollLock as useScrollLockHook } from 'usehooks-ts';

import { OVERLAY_ID } from '@/const/overlay';

const useScrollLock = () => {
    const lenis = useLenis();

    const overlayData = useOverlayData();
    const htmlScrollbarWidthRef = useRef(0);

    const isOverlayOpen = pipe(
        overlayData,
        values,
        filter((item) => item.id !== OVERLAY_ID.TOAST),
        filter((item) => !item.id.includes(OVERLAY_ID.POPUP_OVERLAY)),
        some((item) => item.isOpen),
    );

    useScrollLockHook({
        autoLock: isOverlayOpen,
        lockTarget:
            typeof document === 'undefined'
                ? undefined
                : document.documentElement,
    });

    useEffect(
        function syncScrollbarWidth() {
            if (typeof window === 'undefined') {
                return;
            }

            const html = document.documentElement;

            const updateScrollbarWidth = () => {
                htmlScrollbarWidthRef.current = getScrollbarWidth(html);
            };

            if (!isOverlayOpen) {
                updateScrollbarWidth();
            }

            window.addEventListener('resize', updateScrollbarWidth);
            return () =>
                window.removeEventListener('resize', updateScrollbarWidth);
        },
        [isOverlayOpen],
    );

    useEffect(
        function syncScrollLockPaddingRight() {
            if (typeof document === 'undefined') {
                return;
            }

            const html = document.documentElement;
            const header = document.getElementById('header');

            if (!isOverlayOpen) {
                setPaddingRight(html, '');
                setPaddingRight(header, '');
                return;
            }

            const width = Math.max(0, htmlScrollbarWidthRef.current);
            const paddingRightValue = width > 0 ? `${width}px` : '';

            setPaddingRight(html, paddingRightValue);
            setPaddingRight(header, paddingRightValue);
        },
        [isOverlayOpen],
    );

    useEffect(() => {
        if (!lenis) {
            return;
        }

        if (isOverlayOpen) {
            lenis.stop();
            return;
        }

        lenis.start();
    }, [isOverlayOpen, lenis]);
};

export default useScrollLock;

const getScrollbarWidth = (html: HTMLElement) =>
    window.innerWidth - html.clientWidth;

const setPaddingRight = (el: HTMLElement | null, value: string) => {
    if (!el) {
        return;
    }

    el.style.paddingRight = value;
};
