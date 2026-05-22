import dayjs from 'dayjs';

const POPUP_STORAGE_PREFIX = 'shopby-popup-hidden-until:';

const getPopupStorageKey = (popupNo: number) => {
    return `${POPUP_STORAGE_PREFIX}${popupNo}`;
};

const getTodayBoundary = () => {
    return dayjs().endOf('day').toISOString();
};

const getHiddenUntil = (popupNo: number) => {
    if (typeof window === 'undefined') {
        return null;
    }

    return localStorage.getItem(getPopupStorageKey(popupNo));
};

export const isPopupHiddenToday = (popupNo: number) => {
    const hiddenUntil = getHiddenUntil(popupNo);

    if (!hiddenUntil) {
        return false;
    }

    return dayjs(hiddenUntil).isAfter(dayjs());
};

export const hidePopupUntilTodayEnds = (popupNo: number) => {
    if (typeof window === 'undefined') {
        return;
    }

    localStorage.setItem(getPopupStorageKey(popupNo), getTodayBoundary());
};
