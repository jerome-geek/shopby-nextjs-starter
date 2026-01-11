'use client';

import { pipe, some, values } from '@fxts/core';
import { overlay, useOverlayData } from 'overlay-kit';
import { useScrollLock } from 'usehooks-ts';

import { useRouteChange } from '@/hooks/utils';

const GlobalEffects = () => {
    useRouteChange(() => {
        window.scrollTo(0, 0);
        overlay.closeAll();
    });

    const overlayData = useOverlayData();

    const isOverlayOpen = pipe(
        overlayData,
        values,
        some((item) => item.isOpen),
    );

    useScrollLock({
        autoLock: isOverlayOpen,
    });

    return null;
};

export default GlobalEffects;
