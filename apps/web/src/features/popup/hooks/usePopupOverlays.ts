import { filter, map, pipe, toArray, uniqBy } from '@fxts/core';
import { useRouter } from 'next/router';
import { overlay } from 'overlay-kit';
import { useEffect, useMemo, useRef } from 'react';

import { getPlatform } from '@/api/core/utils';
import { OVERLAY_ID } from '@/const/overlay';
import { PATHS } from '@/const/paths';
import {
    isPopupHiddenToday,
    mapDesignPopupToPopupInfo,
} from '@/features/popup/utils';
import useEvent from '@/hooks/query/display/event/useEvent';
import useAllPopupList from '@/hooks/query/display/popup/useAllPopupList';
import useDesignPopupList from '@/hooks/query/display/popup/useDesignPopupList';
import type { PopupInfo } from '@/models/display/popup';

interface UsePopupOverlaysParams {
    openPopup: (popup: PopupInfo) => void;
}

export const usePopupOverlays = ({ openPopup }: UsePopupOverlaysParams) => {
    const openedPopupNosRef = useRef<Set<number>>(new Set());
    const router = useRouter();

    const pageType = useMemo(() => {
        if (PATHS.MAIN === router.pathname) {
            return 'MAIN';
        }
        if (PATHS.PRODUCTS.DETAIL === router.pathname) {
            return 'PRODUCT';
        }
        if (PATHS.PRODUCTS.LIST === router.pathname) {
            return 'CATEGORY';
        }
        if (PATHS.EVENTS.DETAIL === router.pathname) {
            return 'EVENT';
        }
        return undefined;
    }, [router.pathname]);

    const eventNo = Number(router.query.eventNoOrId) || 0;
    const eventKey = router.query.eventNoOrId as string;

    const { data: eventData } = useEvent({
        eventKey,
        options: {
            enabled: !!eventKey && pageType === 'EVENT',
        },
    });

    const targetNo = useMemo(() => {
        if (pageType === 'PRODUCT') {
            return Number(router.query.productNo) || undefined;
        }

        if (pageType === 'EVENT') {
            return eventNo || eventData?.eventNo || undefined;
        }
        return undefined;
    }, [pageType, router.query.productNo, eventNo, eventData]);

    const designPopupData = useMemo(
        () => getDesignPopupData(router.asPath),
        [router.asPath],
    );

    const { data: allPopups = [] } = useAllPopupList({
        params: {
            pageType,
            targetNo,
        },
        platform: getPlatform(),
        options: {
            enabled: !!pageType,
        },
    });

    const { data: designPopups = [] } = useDesignPopupList({
        data: designPopupData,
        platform: getPlatform(),
    });

    const popupList = useMemo(() => {
        return pipe(
            [
                ...allPopups,
                ...pipe(designPopups, map(mapDesignPopupToPopupInfo), toArray),
            ],
            uniqBy((popup) => popup.popupNo),
            toArray,
        );
    }, [allPopups, designPopups]);

    const displayPopups = useMemo(() => {
        return pipe(
            popupList,
            filter((popup) => !isWindowPopup(popup)),
            filter((popup) => !isPopupHiddenToday(popup.popupNo)),
            toArray,
        );
    }, [popupList]);

    const pathname = router.asPath.split('?')?.[0];

    useEffect(
        function openPopupEffect() {
            pipe(
                displayPopups,
                filter(
                    (popup) => !openedPopupNosRef.current.has(popup.popupNo),
                ),
                map((popup) => {
                    openedPopupNosRef.current.add(popup.popupNo);
                    openPopup(popup);
                }),
                toArray,
            );
        },
        [displayPopups, openPopup],
    );

    useEffect(
        function closePopupEffect() {
            const openedPopupNos = openedPopupNosRef.current;

            return () => {
                pipe(
                    openedPopupNos,
                    map((popupNo) => {
                        overlay.close(getOverlayId(popupNo));
                        openedPopupNos.delete(popupNo);
                    }),
                    toArray,
                );
            };
        },
        [pathname],
    );

    return {
        getOverlayId,
    };
};

const getOverlayId = (popupNo: number) => {
    return `${OVERLAY_ID.POPUP_OVERLAY}-${popupNo}`;
};

const getDesignPopupData = (asPath: string) => {
    const [displayUrl, queryString] = asPath.split('?');
    const query = new URLSearchParams(queryString ?? '');

    return {
        displayUrl,
        parameter: query.toString() || undefined,
        popupId: query.get('popupId') ?? undefined,
    };
};

const isWindowPopup = (popup: PopupInfo) => {
    return popup.type === 'WINDOW' || popup.detailInfo?.screenType === 'WINDOW';
};
