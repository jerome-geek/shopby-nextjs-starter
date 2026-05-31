import { overlay } from 'overlay-kit';
import { useCallback } from 'react';

import { OVERLAY_ID } from '@/const/overlay';
import { PopupOverlay } from '@/features/popup/components/overlay';
import { usePopupOverlays } from '@/features/popup/hooks';
import { hidePopupUntilTodayEnds } from '@/features/popup/utils/storage';
import type { PopupInfo } from '@/entities/display/model/popup';
import ShopbyAsyncBoundary from '@/shared/boundary/shopby-async-boundary';

const PopupContent = () => {
    const openPopup = useCallback((popup: PopupInfo) => {
        overlay.open(
            (props) => (
                <PopupOverlay
                    {...props}
                    popup={popup}
                    onHideToday={(targetPopup) => {
                        hidePopupUntilTodayEnds(targetPopup.popupNo);
                        props.close();
                    }}
                />
            ),
            { overlayId: `${OVERLAY_ID.POPUP_OVERLAY}-${popup.popupNo}` },
        );
    }, []);

    usePopupOverlays({ openPopup });

    return null;
};

export const Popup = () => {
    return (
        <ShopbyAsyncBoundary errorFallback={<></>}>
            <PopupContent />
        </ShopbyAsyncBoundary>
    );
};
