import { SnsShareImageType } from '@/models/marketing';

export interface GetSnsShareConfigResponse {
    /** 대표 설명 */
    representativeDescription: string;
    /** 대표 이미지 */
    representativeImage: string;
    /** 트위터 공유 설정 */
    twitter: TwitterShare;
    /** 카카오 공유 설정 */
    kakao: KakaoShare;
    /** 대표 제목 */
    representativeTitle: string;
    /** SNS 공유하기 설정 여부 */
    snsShareUsed: boolean;
    /** 이미지 설정 */
    snsShareImageType: SnsShareImageType;
    /** 페이스북 공유 설정 */
    facebook: FacebookShare;
    /** 상품 URL 복사 사용 설정 */
    productUrlCopyUsed: boolean;
    /** 카카오스토리 공유 설정 */
    kakaoStory: KakaoStoryShare;
}

export interface TwitterShare {
    /** 공유 메세지 */
    shareMessage: string;
    /** 사용 여부 */
    used: boolean;
    /** 상품 상세 페이지 URL */
    url: string;
}

export interface KakaoShare {
    /** 카카오 개발자센터 script key */
    kakaoScriptKey: string;
    /** 버튼 배열 */
    buttons: KakaoButton[];
    /** 사용 여부 */
    used: boolean;
    /** 즉시할인, 상품 관련 정보 */
    commerce: KakaoCommerce;
    /** 콘텐츠 관련 정보 */
    content: KakaoContent;
}

export interface KakaoButton {
    /** 버튼 링크 */
    link: string;
    /** 버튼 텍스트 */
    title: string;
}

export interface KakaoCommerce {
    /** 즉시할인율 */
    discountRate: number;
    /** 상품 판매가 */
    regularPrice: number;
    /** 상품 즉시할인가 */
    discountPrice: number;
    /** 정액 할인 */
    fixedDiscountPrice: number;
}

export interface KakaoContent {
    /** 콘텐츠 이미지 URL */
    imageUrl: string;
    /** 콘텐츠 제목 */
    title: string;
}

export interface FacebookShare {
    /** 대표 이미지 */
    image: string;
    /** 링크 타이틀 */
    linkTitle: string;
    /** 링크 요약 */
    linkSummary: string;
    /** 사용 여부 */
    used: boolean;
}

export interface KakaoStoryShare {
    /** URL 정보 */
    urlInfo: KakaoStoryUrlInfo;
    /** 공유 본문 내용 */
    text: string;
    /** 사용 여부 */
    used: boolean;
    /** 공유할 웹 페이지 URL */
    url: string;
}

export interface KakaoStoryUrlInfo {
    /** 웹 페이지 대표 이미지 URL */
    image: string[];
    /** 설명 */
    description: string;
    /** 웹 페이지 타이틀 */
    title: string;
}
