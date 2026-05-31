import type { OrderBannerDisplayType } from '@/models';

export interface GetUnidentifiedDepositorsParams {
    /** 쇼핑몰 번호 */
    mallNo: string;
    /** 입금일 */
    depositYmd: string;
    /** 입금자명 */
    name: string;
    /** 페이지 번호 (1 이상) */
    page: string;
    /** 페이지당 노출 개수 */
    size: string;
}

export interface GetUnidentifiedDepositorsResponse {
    /** 미확인 입금자 목록 */
    contents: {
        /** 입금일 */
        depositYmd: string;
        /** 미확인입금자번호 */
        no: number;
        /** 입금은행명 */
        bank: string;
        /** 등록운영자 */
        registerAdminNo: number;
        /** 입금자명 */
        name: string;
        /** 입금금액 */
        amt: string;
        /** 등록일 */
        registerYmdt: string;
    }[];
    /** 총 개수 */
    totalCount: number;
}

export interface GetUnidentifiedDepositorsConfigResponse {
    /** 입금 금액 숨김 */
    depositAmtDisplay: boolean;
    /** pc웹 미확인 입금자 디자인 설정 - 팝업 상단 배너 */
    pcDesignPopupTopBanner: string;
    /** 리스트 노출 기간 */
    listDisplayPeriod: number;
    /** 입금 은행 숨김 */
    depositBankDisplay: boolean;
    /** 모바일웹 미확인 입금자 디자인 설정 - 메인 배너 */
    mobileDesignMainBanner: string;
    /** 연동 제한금액 */
    limitDisplayDepositAmt: number;
    /** pc웹 미확인 입금자 디자인 설정 - 메인 배너 이미지 url */
    pcDesignMainBannerImageUrl?: Nullable<string>;
    /** 배너 노출 설정 */
    bannerDisplayType: OrderBannerDisplayType;
    /** 모바일웹 미확인 입금자 디자인 설정 - 메인 배너 이미지 url */
    mobileDesignMainBannerImageUrl?: Nullable<string>;
    /** 무통장 자동입금확인 서비스 연동 */
    bankdaUse: boolean;
    /** 모바일웹 미확인 입금자 디자인 설정 - 팝업 상단 배너 */
    mobileDesignPopupTopBanner: string;
    /** pc웹 미확인 입금자 디자인 설정 - 팝업 상단 배너 이미지 url */
    pcDesignPopupTopBannerImageUrl?: Nullable<string>;
    /** 모바일웹 미확인 입금자 디자인 설정 - 팝업 상단 배너 이미지 url */
    mobileDesignPopupTopBannerImageUrl?: Nullable<string>;
    /** pc웹 미확인 입금자 디자인 설정 - 메인 배너 */
    pcDesignMainBanner: string;
}
