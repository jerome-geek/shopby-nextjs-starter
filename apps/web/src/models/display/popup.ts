import type {
    BrowserTargetType,
    PlatformType,
    PopupDesignType,
    PopupPageType,
    PopupPositionType,
    PopupScreenType,
    PopupType,
    SizeUnitType,
} from '@/models';

export type SlideSpeed = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type SlideDirection = 'FIXED' | 'RIGHT' | 'LEFT' | 'UP' | 'DOWN';

type SlideCountType =
    | 'TWO_BY_ONE'
    | 'THREE_BY_ONE'
    | 'FOUR_BY_ONE'
    | 'TWO_BY_TWO'
    | 'THREE_BY_TWO'
    | 'FOUR_BY_TWO';

export interface DesignPopupData {
    /** 노출 URL - 현재 접속 경로 (도메인 제외) */
    displayUrl?: string;
    /** 팝업ID (nullable) */
    parameter?: string;
    /** 파라미터 - 현재 접속한 경로의 파라미터가 존재할 경우 (urlencoded UTF-8) (nullable) */
    popupId?: string;
}

export interface DesignPopup {
    /** 팝업 아이디 */
    popupId: string;
    popupSlideInfo: PopupSlideInfo;
    detailInfo: PopupDetailInfo;
    /** 팝업 번호 */
    popupNo: number;
    /** 팝업 제목 */
    title: string;
    /** 몰 번호 */
    mallNo: number;
    /** 팝업 내용 - 일반 팝업에만 해당 */
    content: string;
    /** 오늘 하루 보이지 않음 여부 */
    visibleToday: boolean;
    /** 팝업 종류 */
    popupDesignType: PopupDesignType;
}

export type GetDesignPopupResponse = DesignPopup[];

export interface GetAllPopupParams {
    /** 팝업 노출 페이지 추가가 가능하므로 여지를 남겨둠 */
    pageType?: PopupPageType | string;
    targetNo?: number;
}

export interface PopupInfo {
    pageInfos: PageInfos;
    /** 팝업 노출 위치 */
    popupPosition: PopupPositionType;
    detailInfo: PopupDetailInfo;
    /** 팝업 번호 */
    popupNo: number;
    /** 전시 종료일 */
    endYmdt: string;
    /** 팝업명 */
    label: string;
    /** 팝업 타입 */
    type: PopupType;
    /** 팝업명 */
    title: string;
    /** 팝업 내용 */
    content: string;
    /** 오늘 하루 보이지 않음 여부 */
    visibleToday: boolean;
    /** 팝업 종류 (NORMAL: Normal Popup, MULTI: Multi Popup) */
    popupDesignType: PopupDesignType;
    /** 전시 시작일 */
    startYmdt: string;
    popupSlideInfo: PopupSlideInfo;
    /** 팝업 가로 사이즈(단위: px) */
    width: number;
    /** 노출 범위 */
    displayTypes: PlatformType;
    /** 몰 번호 */
    mallNo: number;
    /** 팝업 세로 사이즈(단위: px) */
    height: number;
    /** 팝업 아이디 */
    popupId: string;
}

export type GetAllPopupResponse = PopupInfo[];

interface PageInfos {
    /** 팝업 페이지 - 상품 번호 리스트 (example: []) */
    mallProductInfos: number[];
    /** 팝업 페이지 - 기획전 번호 리스트 (example: []) */
    eventInfos: number[];
    /** 팝업 페이지 - 전시카테고리 번호 리스트 (example: []) */
    displayCategoryInfos: {
        /** 팝업 페이지 - 전시카테고리번호 뎁스 */
        depth: number;
        /** 팝업 페이지 - 전시카테고리 번호 */
        displayCategoryNo: number;
    }[];
    /** 팝업 페이지 타입 리스트 (example: [MAIN]) */
    pageTypes: PopupPageType[];
}

interface PopupDetailInfo {
    /** 팝업 넓이 단위 - 일반 팝업에만 해당 */
    screenWidthUnit: SizeUnitType;
    /** 팝업 넓이 - 일반 팝업에만 해당 */
    screenWidth: number;
    /** 팝업 배경 색상 - 일반 팝업에만 해당 */
    bgColor: string;
    /** 브라우저 넓이(width)에 content에 포함된 이미지 사이즈를 맞춤 - 일반 팝업에만 해당 */
    resizable: boolean;
    /** 공통 - 팝업 노출 위치 (상단 여백) - 단위 : px */
    screenTopPosition: number;
    /** 팝업 높이 - 일반 팝업에만 해당 */
    screenHeight: number;
    /** 공통 - 팝업 창 종류 */
    screenType: PopupScreenType;
    /** 공통 - 팝업 노출 위치 (좌측 여백) - 단위 : px */
    screenLeftPosition: number;
    /** 팝업 높이 단위 - 일반 팝업에만 해당 */
    screenHeightUnit: SizeUnitType;
    /** 팝업 노출 위치 단위 - 일반 팝업에만 해당 */
    screenLeftUnit: SizeUnitType;
    /** 팝업 노출 위치 단위 - 일반 팝업에만 해당 */
    screenTopUnit: SizeUnitType;
}

interface PopupSlideInfo {
    /** 팝업 슬라이드 - 이미지 이동속도 (4 - default) */
    slideSpeed: SlideSpeed;
    /** 팝업 슬라이드 - 최소 크기(가로) */
    slideMinWidth: number;
    /** 팝업 슬라이드 - 최대 크기(가로) */
    slideMaxWidth: number;
    /** 팝업 슬라이드 - 크기에 맞게 이미지를 맞춤 여부 */
    resizable: boolean;
    /** 팝업 슬라이드 - 최소크기(세로) */
    slideMinHeight: number;
    /** 이미지 이동방법 (FIXED: Do not move, RIGHT: Move right to left, LEFT: Move left to right, UP: Move from bottom to top, DOWN: Move from top to bottom) */
    slideDirection: SlideDirection;
    slideImages: {
        /** 팝업 슬라이드 - 마우스 레이오버 썸네일 경로 (마우스 올릴 시, 보이는 이미지) */
        thumbImageUrlOnOver: string;
        /** 팝업 슬라이드 - 이미지 클릭 창 타겟 (SELF: Current Window, BLANK: New window) */
        openLocationTarget: Exclude<BrowserTargetType, 'REF_URL'>;
        /** 팝업 슬라이드 - 이미지 등록 여부 */
        hasUploaded: boolean;
        /** 팝업 슬라이드 - 이미지 번호 */
        popupImageNo: number;
        /** 팝업 슬라이드 - 이미지 클릭 URL */
        landingUrl: string;
        /** 팝업 슬라이드 - 큰 이미지 경로 */
        mainImageUrl: string;
        /** 팝업 슬라이드 - 썸네일 경로 */
        thumbImageUrl: string;
    }[];
    /** 팝업 슬라이드 - 슬라이드 이미지 개수 유형 (TWO_BY_ONE: 2x1, THREE_BY_ONE: 3x1, FOUR_BY_ONE: 4x1, TWO_BY_TWO: 2x2, THREE_BY_TWO: 3x2, FOUR_BY_TWO: 4x2) */
    slideCount: SlideCountType;
    /** 팝업 슬라이드 - 최대 크기(세로) */
    slideMaxHeight: number;
}

export interface GetPopupsByIdParams {
    /** 페이지 유형 */
    pageType?: PopupPageType;
    /** 페이지 번호 (페이지 유형에 따른 페이지 번호) */
    targetNo?: number;
}
