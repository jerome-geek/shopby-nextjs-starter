import { useLenis } from 'lenis/react';
import { useOverlayData } from 'overlay-kit';
import { useEffect } from 'react';
import { useScrollLock as useScrollLockHook } from 'usehooks-ts';
import { filter, pipe, some, values } from '@fxts/core';

import { OVERLAY_ID } from '@/const/overlay';

const useScrollLock = () => {
    const overlayData = useOverlayData();

    const isOverlayOpen = pipe(
        overlayData,
        values,
        filter((item) => item.id !== OVERLAY_ID.TOAST),
        some((item) => item.isOpen),
    );

    useScrollLockHook({
        autoLock: isOverlayOpen,
        lockTarget:
            typeof document === 'undefined'
                ? undefined
                : document.documentElement,
    });

    const lenis = useLenis();

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
