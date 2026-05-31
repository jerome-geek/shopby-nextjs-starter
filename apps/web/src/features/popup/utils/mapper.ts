import type { DesignPopup, PopupInfo } from '@/entities/display/model/popup';

const defaultPageInfos: PopupInfo['pageInfos'] = {
    mallProductInfos: [],
    eventInfos: [],
    displayCategoryInfos: [],
    pageTypes: [],
};

const defaultPopupSlideInfo: PopupInfo['popupSlideInfo'] = {
    slideSpeed: '4',
    slideMinWidth: 0,
    slideMaxWidth: 360,
    resizable: false,
    slideMinHeight: 0,
    slideDirection: 'FIXED',
    slideImages: [],
    slideCount: 'TWO_BY_ONE',
    slideMaxHeight: 480,
};

export const mapDesignPopupToPopupInfo = (
    designPopup: DesignPopup,
): PopupInfo => {
    const popupSlideInfo = designPopup.popupSlideInfo ?? defaultPopupSlideInfo;

    return {
        popupId: designPopup.popupId,
        popupNo: designPopup.popupNo,
        title: designPopup.title,
        label: designPopup.title,
        content: designPopup.content,
        visibleToday: designPopup.visibleToday,
        popupDesignType: designPopup.popupDesignType,
        popupSlideInfo,
        detailInfo: designPopup.detailInfo,
        pageInfos: defaultPageInfos,
        popupPosition: 'MIDDLE',
        endYmdt: '',
        type: 'LAYER',
        startYmdt: '',
        width: popupSlideInfo.slideMaxWidth || 360,
        height: popupSlideInfo.slideMaxHeight || 480,
        displayTypes: 'RESPONSIVE',
        mallNo: designPopup.mallNo,
    };
};
