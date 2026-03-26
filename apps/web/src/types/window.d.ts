import { KakaoSDK } from '@/types/kakao';
import { PlatformType } from '@/models';
import { CartList, OrderDetailResponse } from '@/models/order';
import { ProductDetailResponse } from '@/models/product';

// 모듈 형식으로 선언하여 TypeScript 충돌 방지
export {};

declare global {
    interface Window {
        ShopbyExternalScript: any;
        sb: {
            getPlatform?: () => PlatformType;
            /** 회원정보 조회 API */
            profile?: any;
            /** 상품 상세 조회 API */
            product?: ProductDetailResponse;
            /** 상품 검색 API */
            searchedProduct?: any;
            /** 카테고리 조회하기 API */
            currentCategory?: any;
            /** 상품 디자인 섹션 조회 API */
            displaySection?: any;
            /** 회원 장바구니 조회 API, 회원 장바구니 조회 API */
            // TODO: CartList Type으로 변경
            cart?: CartList;
            /** 주문서 조회 API */
            orderSheet?: any;
            /** 회원 주문 조회 API, 비회원 주문 조회 API */
            order?: OrderDetailResponse;
            /** 1:1문의 진행 중 인 내역 조회 API */
            profileInquiriesProgress?: any;
            /** 1:1문의 답변 완료 내역 조회 API */
            profileInquiriesAnswered?: any;
            /** 상품문의 진행 중 인 목록 조회 API */
            profileProductInquiriesProgress?: any;
            /** 상품문의 답변완료 목록 조회 API */
            profileProductInquiresAnswered?: any;
            /** 내 상품평 작성 가능 목록 조회하기 API */
            profileProductReviewable?: any;
            /** 내 상품평 목록 조회하기 API */
            profileProductReviewed?: any;
            /** 주문 상태별 주문 옵션별 수량 조회하기 API */
            profileOrdersSummaryStatus?: any;
        };
        Kakao: KakaoSDK;
        NCPPay: {
            setConfiguration: (config: {
                /** shopby에서 발급받은 clientId */
                clientId: string;
                /** 결과를 리턴받을 url */
                confirmUrl: string;
                /** 'PC or MOBILE_WEB or AOS or IOS' */
                platform: string;
                /** Oauth2 인증 방식을 사용시 인증 헤더 구분 값 */
                shopbyAuthorization?: string;
                /** 'KRW' or 'USD' or 'JPY' or 'CNY' */
                currency: Currency;
                /** 'KO' or 'EN' or 'JA' or 'ZH' */
                language: Language;
                /** Oauth 인증 방식을 사용시 인증 헤더 구분 값 */
                accessToken?: string;
            }) => void;
            reservation: (
                paymentData: any,
                callback?: (response: any) => void,
                errorCallback?: (error: ShopByErrorResponse) => void,
            ) => void;
            requestNaverPayOrder: (
                paymentData: any,
                callback: (error: ShopByErrorResponse) => void,
            ) => void;
            requestNaverPayWishList: (
                paymentData: any,
                callback?: (error: ShopByErrorResponse) => void,
            ) => void;
        };
        shopbyStatistics: any;
        naver: any;
        crema: any;
        cremaAsyncInit?: () => void;
        GeekSearch: {
            setRankingKeyword: (
                appToken: string,
                keyword: string,
            ) => Promise<void>;
        };
        digitalData: {
            userInfo: {
                user_id: string;
                login_check: 'Y' | 'N';
                adult_check: 'Y' | 'N';
                sign_up_type: string | null;
            };
        };
        byapps_api_call?: (
            type:
                | 'showSettings'
                | 'showNews'
                | 'shopCoupon'
                | 'shopPush'
                | 'shareUrl'
                | 'hideBottomMenu'
                | 'showBottomMenu'
                | 'checkNewMessage',
            callback?: (...args: any) => void,
        ) => void;
        myapp: {
            helpers: {
                isMyApp: () => boolean;
                isOpenedAsCustomTab: () => boolean;
                getShopScheme: () => string;
            };
            banner: {
                create: (config: any) => HTMLElement | null;
                getBannerCloseHandler: (banner: HTMLElement) => () => void;
            };
            handler?: {
                send: (data: { key: string; option?: any; meta?: any }) => void;
            };
            init: () => void;
            utils: {
                setLocalStorage: (key: string, value: string) => void;
                getLocalStorage: (key: string) => string;
            };
            constants: {
                PKG_NAME: string;
                LOGIN: string;
                LOGINVIEW: string;
                LOGOUT: string;
                REFRESH_TOKEN_EXPIRED: string;
                PASSWORD_MODIFIED: string;
                SHOW_SETTING: string;
                INIT_LOGIN_INFO: string;
            };
        };
        insertMyappProductBanner?: () => void;
        UAParser: () => {
            device: {
                type: string;
            };
        };
    }
}
