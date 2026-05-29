interface LinkObject {
    /** 웹 URL */
    webUrl?: string;
    /** 모바일 웹 URL */
    mobileWebUrl?: string;
    /**  Android 앱 실행 시 전달할 파라미터 */
    androidExecutionParams?: string;
    /** iOS 앱 실행 시 전달할 파라미터 */
    iosExecutionParams?: string;
}

interface ItemContentObject {
    /** 프로필 텍스트 */
    profileText: string;
    /** 프로필 이미지 URL */
    profileImageUrl: string;
    /** 이미지 아이템 제목 */
    titleImageText: string;
    /** 이미지 아이템 이미지 URL */
    titleImageUrl: string;
    /** 이미지 아이템 카테고리 */
    titleImageCategory: string;
    /** 아이템 정보 (최대: 5개) */
    items: {
        /** 아이템 이름 */
        item: string;
        /** 아이템 가격 */
        itemOp: string;
    }[];
    /** 요약 정보 */
    sum: string;
    /** 합산 가격 */
    sumOp: string;
}

interface DefaultFeedSettings {
    /** 메시지 템플릿 타입, feed로 고정 */
    objectType: 'feed';
    /** 메시지 콘텐츠 */
    content: {
        /** 제목 */
        title: string;
        /** 이미지 URL */
        imageUrl: string;
        /** 바로가기 URL */
        link: LinkObject;
        /** 이미지 너비 (단위: Pixel) */
        imageWidth?: number;
        /** 이미지 높이 (단위: Pixel) */
        imageHeight?: number;
        /** 설명 */
        description?: string;
    };
    /** 아이템 콘텐츠 */
    itemContent?: ItemContentObject;
    /** 소셜 정보 */
    social?: {
        /** 좋아요 수 */
        likeCount?: number;
        /** 댓글 수 */
        commentCount?: number;
        /** 공유 수 */
        sharedCount?: number;
        /** 조회 수 */
        viewCount?: number;
        /** 구독자 수 */
        subscriberCount?: number;
    };
    /** 버튼 문구 */
    buttonTitle?: string;
    /** 메시지 하단 버튼 */
    buttons?: {
        /** 버튼 문구 */
        title: string;
        /** 바로가기 URL */
        link: LinkObject;
    }[];
    /** 카카오톡 미설치 시, 설치 페이지 이동 여부 */
    installTalk?: boolean;
    /** 카카오톡 공유 전송 성공 알림에 포함할 키와 값 */
    serverCallbackArgs?: {} | string;
}

interface DefaultCommerceSettings {
    /** 메시지 템플릿 타입, commerce로 고정 */
    objectType: 'commerce';
    /** 메시지 콘텐츠 */
    content: {
        /** 제목 */
        title: string;
        /** 이미지 URL */
        imageUrl: string;
        /** 바로가기 URL */
        link: LinkObject;
        /** 이미지 너비 (단위: Pixel) */
        imageWidth?: number;
        /** 이미지 높이 (단위: Pixel) */
        imageHeight?: number;
        /** 설명 */
        description?: string;
    };
    /** 가격 정보 */
    commerce: {
        /** 정가 */
        regularPrice: number;
        /** 할인율 */
        discountRate?: number;
        /** 할인 가격 */
        discountPrice?: number;
        /** 정액 할인 가격 */
        fixedDiscountPrice?: number;
        /** 상품명 */
        productName?: string;
        /** 통화 단위 (기본: '원') */
        currencyUnit?: string;
        /** 통화 단위 위치 (0: 가격 뒤, 1: 가격 앞) */
        currencyUnitPosition?: 0 | 1;
    };
    /** 버튼 문구 */
    buttonTitle?: string;
    /** 메시지 하단 버튼 */
    buttons?: {
        title: string;
        link: LinkObject;
    }[];
    /** 카카오톡 미설치 시, 설치 페이지 이동 여부 */
    installTalk?: boolean;
    /** 카카오톡 공유 전송 성공 알림에 포함할 키와 값 */
    serverCallbackArgs?: {} | string;
}

export type KakaoShareSettings = DefaultFeedSettings | DefaultCommerceSettings;

export interface KakaoSDK {
    init: (key: string) => void;
    isInitialized: () => boolean;
    Share: {
        sendDefault: (settings: KakaoShareSettings) => void;
    };
}
