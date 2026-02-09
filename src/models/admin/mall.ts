import {
    AccumulationDisplayFormatType,
    AccumulationGivePointType,
    AuthenticationTimeType,
    AuthenticationType,
    BankTypeCode,
    BankTypeName,
    BankTypeValue,
    BoardDisplayType,
    CartEquivalentOptionUnitType,
    ClaimReasonLabelType,
    ClaimReasonType,
    ClaimStatusType,
    CountryCdType,
    CouponIssueType,
    DiscountType,
    GlobalMallCurrencyTo,
    GlobalMallLanguage,
    GlobalMallType,
    ImageDisplayType,
    IntroRedirectionType,
    KcpCode,
    MemberJoinConfigType,
    OpenIdJoinProvider,
    OrderStatusLabelType,
    OrderStatusType,
    PgType,
    ProductAccumulationBasisType,
    ProductInquiryLabelType,
    ProductInquiryType,
    ProductReviewReportLabelType,
    ProductReviewReportType,
    SupplyType,
} from '@/models';
import { ShopByPlan } from '@/models/admin';
import { Category } from '@/models/display';

export interface Grade {
    /** 적립금 자동지급 */
    reserveAutoSupplying: {
        /** 적립금 자동지급 적립금액 */
        amount: number;
        /** 적립금 자동지급 사용여부 */
        used: boolean;
        /** 적립금 자동지급 유형 (NONE: 사용 안 함, ONCE: 1회 지급, MONTHLY: 매월 지급 ) */
        type: SupplyType;
    };
    /** 회원 등급 평가 조건 */
    evaluationCondition: {
        /** 최소 구매 금액 */
        minimumPayment: number;
        /** 최소 구매 횟수 */
        minimumCount: number;
    };
    /** 회원 등급에 발급된 쿠폰 */
    coupons: {
        /** 쿠폰 발급 유형 */
        issueType: CouponIssueType;
        /** 최대 할인금액 (정률할인시) */
        maximumDiscountAmount: number;
        /** 쿠폰 이름 */
        couponName: string;
        /** 할인률 (정률할인시) */
        discountPercent: number;
        /** 할인금액 (정액할인시) */
        discountAmount: number;
        /** 쿠폰 할인 유형 */
        discountType: DiscountType;
        /** 쿠폰 번호 */
        couponNo: number;
    }[];
    /** 등급 설명 */
    description: string;
    /** 등급명 */
    label: string;
    /** 등급 사용 여부 */
    used: boolean;
    /** 등급 적립률 */
    accumulationRate: number;
    /** 적립금 혜택 */
    reserveBenefit: {
        /** 적립금 혜택 적립률 */
        reserveRate: number;
        /** 적립금 혜택 사용여부 */
        used: boolean;
    };
}

/** 쇼핑몰 정보 */
export interface Mall {
    /** 글로벌 몰 메인-서브 관계 */
    globalMallHierarchy: {
        mainMallNos: number[];
        subMallNos: number[];
    };
    globalMallType: GlobalMallType;
    globalSubMallSummaries: GlobalSubMallSummary[];
    /** 커머스 상점번호 */
    godoSno: string;
    /** 쇼핑몰명 */
    mallName: string;
    /** 인트로 페이지 설정정보 */
    introRedirection: {
        /** 인트로 페이지 PC 웹 설정정보 */
        pc: IntroRedirectionType;
        /** 인트로 페이지 모바일 웹 설정정보 */
        mobile: IntroRedirectionType;
    };
    /** 쇼핑몰 서비스 국가 */
    countryCode: CountryCdType;
    /** 쇼핑몰 생성일 */
    createdDateTime: string;
    /** 등급 */
    grades: Grade[];
    /** 서비스센터 정보 */
    serviceCenter: {
        /** 서비스센터 전화번호 */
        phoneNo: string;
        /** 서비스센터 이메일 */
        email: string;
    };
    /** 에스크로 로고정보 */
    mallNo: number;
    escrowLogo: {
        /** 로고 노출에 필요한 HTML 코드 (이니시스만 반환됨) */
        logoHtml: Nullable<string>;
        /** PG사 */
        pgType: PgType;
        /** 에스크로 이미지 노출여부 */
        exposure: boolean;
    };
    /** 접속 URL */
    url: MallUrl;
}

/** 은행 목록 */
export interface BankType {
    /** KCP 은행 관리코드 */
    kcpCode: KcpCode;
    /** 은행 코드 */
    code: BankTypeCode;
    /** 은행명 */
    name: BankTypeName;
    /** 은행 영문 관리명 */
    value: BankTypeValue;
}

/** 게시판 카테고리 */
export interface BoardsCategory {
    /** 썸네일 이미지 사용 여부 */
    thumbnailUsed: boolean;
    /** 답글 작성 가능 여부 */
    replied: boolean;
    /** 회원 작성 가능 여부 */
    memberWrite: boolean;
    /** 게시판 사용 여부 */
    used: boolean;
    /** 비밀글 작성 가능 여부 */
    secreted: boolean;
    /** 게시판 이름 */
    boardName: string;
    /** 비회원 작성 가능 여부 */
    guestWrite: boolean;
    /** 리스트 이미지 유형 */
    imageDisplayType: ImageDisplayType;
    /** 게시판 노출 유형 */
    displayType: BoardDisplayType;
    /** 카테고리 사용 여부 */
    categoryUsed: boolean;
    /** 첨부파일 사용 여부 */
    attachmentUsed: boolean;
    /** 게시판 ID (nullable) */
    boardId: string;
    /** 게시판 카테고리 정보 */
    categories: {
        /** 게시판 카테고리 번호 */
        categoryNo: number;
        /** 게시판 카테고리 명칭 */
        label: string;
    }[];
    /** 게시판 번호 */
    boardNo: number;
}

/** 쇼핑몰 기본 정보 */
export interface ServiceBasicInfo {
    /** 주소 (nullable) */
    address: Nullable<string>;
    /** 대표 이메일 (nullable) */
    representEmail: Nullable<string>;
    /** 회사명 (nullable) */
    companyName: Nullable<string>;
    /** 개인정보보호 책임자명 (nullable) */
    privacyManagerName: Nullable<string>;
    /** 지번 주소 (nullable) */
    jibunAddress: Nullable<string>;
    /** 통신판매업신고 번호 (nullable) */
    onlineMarketingBusinessDeclarationNo: Nullable<string>;
    /** 업태 (nullable) */
    businessCondition: Nullable<string>;
    /** 우편번호 (nullable) */
    zipCd: Nullable<string>;
    /** 상세주소 (nullable) */
    addressDetail: Nullable<string>;
    /** 팩스번호 (nullable) */
    faxNo: Nullable<string>;
    /** 개인정보보호 책임자 전화번호 (nullable) */
    privacyManagerPhoneNo: Nullable<string>;
    /** 사업자등록번호 (nullable) */
    businessRegistrationNo: Nullable<string>;
    /** 대표 전화번호 (nullable) */
    representPhoneNo: Nullable<string>;
    /** 업종 (nullable) */
    businessType: Nullable<string>;
    /** 샵바이 서비스 플랜명 */
    plan: ShopByPlan;
    /** 지번 상세주소 (nullable) */
    jibunAddressDetail: Nullable<string>;
    /** 대표자명 (nullable) */
    representativeName: Nullable<string>;
}

/** 쇼핑몰 계좌 정보 */
export interface BankAccountInfo {
    /** 계좌번호 (nullable) */
    bankAccount: string;
    /** 예금주명 (nullable) */
    bankDepositorName: string;
    /** 은행명 (nullable) */
    bankName: string;
    /** 은행코드 (nullable) */
    bank: string;
}

/** 회원 가입 설정 */
export interface MemberJoinConfig {
    /** email 동의 필수 여부 (nullable) */
    emailAgreement: MemberJoinConfigType;
    /** 생년월일 필수 여부 (nullable) */
    birthday: MemberJoinConfigType;
    /** 비밀번호 필수 여부 (nullable) */
    password: MemberJoinConfigType;
    /** 주소 필수 여부 (nullable) */
    address: MemberJoinConfigType;
    /** SMS 동의 필수 여부 (nullable) */
    smsAgreement: MemberJoinConfigType;
    /** 성별 필수 여부 (nullable) */
    sex: MemberJoinConfigType;
    /** 닉네임 필수 여부 (nullable) */
    nickname: MemberJoinConfigType;
    /** 회원명 필수 여부 (nullable) */
    memberName: MemberJoinConfigType;
    /** 휴대전화번호 필수 여부 (nullable) */
    mobileNo: MemberJoinConfigType;
    /** 전화번호 필수 여부 (nullable) */
    phoneNo: MemberJoinConfigType;
    /** 이메일 필수 여부 (nullable) */
    email: MemberJoinConfigType;
    /** 아이디 필수 여부 (nullable) */
    memberId: MemberJoinConfigType;
}

/** 적립금 설정 정보 */
export interface AccumulationConfig {
    /** 적립금 만료 알림 사용여부 */
    useExpireNotification: boolean;
    /** 회원가입 적립금 사용여부 */
    useSignUpAccumulation: boolean;
    /** 운영자 메모 */
    adminMemo: string;
    /** 적립금 단위 */
    accumulationUnit: string;
    /** 적립금 지급 시점 */
    accumulationGivePoint: AccumulationGivePointType;
    /** 적립금 기본 적립률 */
    accumulationRate: number;
    /** 적립금 사용 최대 적립금 제한 여부 */
    limitMaxRate: boolean;
    /** 적립금 사용 최소 상품금액 제한 여부 */
    limitMinProductPrice: boolean;
    /** 적립금 사용 최소 적립금 */
    accumulationUseMinPrice: number;
    /** 적립금 노출 설정 */
    accumulationDisplayFormatType: AccumulationDisplayFormatType;
    /** 상품평 적립금 상세정보 */
    reviewsAccumulationDetail: {
        /** 포토 상품평 적립금 (nullable) */
        photoReviewsAccumulation: number;
        /** 포토 상품평 글자수 (nullable */
        photoReviewsLength: number;
        /** 상품평 글자수 (nullable */
        reviewsLength: number;
        /** 상품평 적립금 (nullable) */
        reviewsAccumulation: number;
    };
    /** 적립금 만료 알림 시점 (day 기준) */
    expireNotificationPoint: number;
    /** 적립금 유효기간 (month 기준) */
    accumulationValidPeriod: number;
    /** 생일 적립금 사용 여부 */
    useBirthdayAccumulation: boolean;
    /** 생일 적립금 지급 금액 */
    birthdayAccumulation: number;
    /** 상품 적립 사용여부 */
    useProductAccumulation: boolean;
    /** 적립금 사용 최대비율 (FIXME: 샵바이 문서 잘못된 것 같음) */
    excludingReservePayAccumulation: boolean;
    /** 적립금 사용 최소 적립금 제한 여부 */
    limitMinPrice: boolean;
    /** 적립금 사용 최소 상품금액 */
    accumulationUseMinProductPrice: number;
    /** 회원가입 적립금 */
    signUpAccumulation: number;
    /** 적립금 사용 최대비율 */
    accumulationUseMaxRate: number;
    /** 상품평 적립금 사용여부 */
    useReviewsAccumulation: boolean;
    /** 상품 금액 기준 설정 */
    productAccumulationBasisType: Nullable<ProductAccumulationBasisType>;
    /** 적립금명 */
    accumulationName: string;
    /** 쿠폰할인 결제시 적립금 지급 제외여부 */
    excludingReservePayCoupon: boolean;
    /** 회원 적립 사용여부 */
    useMemberAccumulation: boolean;
}

/** 장바구니 설정 */
export interface CartConfig {
    /** 최대 보관 일수 (nullable) */
    storagePeriod: number;
    /** 장바구니 상품 추가 타입 */
    cartEquivalentOptionUnitType: CartEquivalentOptionUnitType;
    /** 무제한 보관 설정 (nullable) */
    storagePeriodNoLimit: boolean;
    /** 장바구니 보관 최대 수량 */
    storageMaxQuantity: number;
}

/** 쇼핑몰 회원 인증 수단 */
export interface MallJoinConfig {
    /** 쇼핑몰 회원 인증 수단 */
    authenticationType: AuthenticationType;
    /** 쇼핑몰 회원 인증 */
    authenticationTimeType: AuthenticationTimeType;
}

/** 오픈아이디 설정 정보 */
export interface OpenIdJoinConfig {
    /** 오픈아이디 회원인증 수단 */
    authenticationType: AuthenticationType;
    /** 오픈아이디 회원인증 시점 */
    authenticationTimeType: AuthenticationTimeType;
    /** 지원하는 오픈아이디 */
    providers: OpenIdJoinProvider[];
}

/** 외부 서비스 설정 */
export interface ExternalServiceConfig {
    kakaoMap: {
        /** 카카오맵 경도 (nullable) */
        kakaoMapLongitude: string;
        /** 카카오맵 위도 (nullable) */
        kakaoMapLatitude: string;
        /** 카카오맵 Appkey (nullable) */
        kakaoMapKey: string;
    };
    /** 구글 통계 추적 ID (nullable) */
    googleAnalytics: string;
    /** 외부스크립트 사용여부 (nullable) */
    useScript: boolean;
    /** 네이버 웹마스터 Appkey (nullable) */
    naverWebmaster: string;
}

export interface GetMallResponse {
    /** 회원 가입 설정 */
    memberJoinConfig: MemberJoinConfig;
    /** 1:1문의 유형 목록 */
    inquiryType: InquiryType[];
    /** 쇼핑몰 계좌 정보 */
    bankAccountInfo: BankAccountInfo;
    /** 은행 목록 */
    bankType: BankType[];
    /** 주문상태 목록 */
    orderStatusType: {
        /** 주문상태 명칭 */
        label: OrderStatusLabelType;
        /** 주문상태 값 */
        value: OrderStatusType;
    }[];
    /** 쇼핑몰 정보 */
    mall: Mall;
    /** 클레임 사유 목록 */
    claimReasonType: {
        /** 클레임 사유 명칭 */
        label: ClaimReasonLabelType;
        /** 클레임 사유 값 */
        value: ClaimReasonType;
    }[];
    /** 쇼핑몰 기본정보 */
    serviceBasicInfo: ServiceBasicInfo;
    /** 공정거래 로고 정보 */
    termsConfig: {
        /** 공정거래 로고 사용 여부 (nullable) */
        fairLogoUsed: Nullable<boolean>;
        /** 공정거래 로고 이미지 URL (nullable) */
        fairLogoUrl: Nullable<string>;
    };
    /** 오픈아이디 설정 정보 */
    openIdJoinConfig: OpenIdJoinConfig;
    /** 외부 서비스 설정 */
    externalServiceConfig: ExternalServiceConfig;
    /** 클레임상태 목록 */
    claimStatusType: {
        /** 클레임상태 명칭 */
        label: string;
        /** 클레임상태 값 */
        value: ClaimStatusType;
    }[];
    /** 장바구니 설정 */
    cartConfig: CartConfig;
    /** 상품평 신고 유형 목록 */
    productReviewReportType: {
        /** 상품평 신고 유형 명칭 */
        label: ProductReviewReportLabelType;
        /** 상품평 신고 유형 값 */
        value: ProductReviewReportType;
    }[];
    /** 상품문의 유형 목록 */
    productInquiryType: {
        /** 상품문의 유형 명칭 */
        label: ProductInquiryLabelType;
        /** 상품문의 유형 */
        value: ProductInquiryType;
    }[];
    /** 쇼핑몰 회원 인증 수단 */
    mallJoinConfig: MallJoinConfig;
    /** 적립금 설정 정보 */
    accumulationConfig: AccumulationConfig;
    /** 카테고리 정보 */
    categories: Category;
    /** 인스타그램 사용여부 */
    instagramUsed: boolean;
    /** 쇼핑몰 계좌 정보 목록 */
    bankAccountInfos: BankAccountInfo[];
    /** 게시판 카테고리 목록 */
    boardsCategories: BoardsCategory[];
}

export interface GetMallInternationalizationSettingsResponse {
    /** 다국어 설정 */
    languages: GlobalMallLanguage[];
    /** 통화 설정 */
    currencies: Currency[];
}

export type GetMallPartnersResponse = {
    /** 파트너 번호 */
    partnerNo: number;
    /** 대표자명 (nullable) */
    ownerName: Nullable<string>;
    /** FAX 번호 (nullable) */
    faxNo: Nullable<string>;
    /** 판매자명 (nullable) */
    partnerName: Nullable<string>;
    /** 사업장 주소 */
    officeAddressLabel: string;
    /** 상호명 (nullable) */
    companyName: Nullable<string>;
    /** 사업자 번호 (nullable) */
    businessRegistrationNo: Nullable<string>;
    /** 통신판매신고번호 (nullable) */
    onlineMarketingBusinessDeclarationNo: Nullable<string>;
    /** 대표 이메일 (nullable) */
    email: Nullable<string>;
    /** 대표번호 (nullable) */
    phoneNo: Nullable<string>;
}[];

export interface GetSslInfoResponse {
    /** 디바이스타입 */
    deviceType: string;
    /** 도메인 */
    domain: string;
    /** 몰번호 */
    mallNo: number;
    /** 보안서버 인증서 씰 스크립트 (nullable) */
    trustSeal: Nullable<string>;
}

export interface InquiryType {
    /** 1:1문의 유형 설명 */
    inquiryTypeDescription: string;
    /** 1:1문의 유형 번호 */
    inquiryTypeNo: number;
    /** 1:1문의 유형 이름 */
    inquiryTypeName: string;
}

export interface GlobalSubMallSummary {
    mallNo: number;
    i18Config: I18nConfig;
    url: MallUrl;
}

export interface MallUrl {
    /** PC 접속 URL */
    pc: string;
    /** 안드로이드 마켓 URL */
    android: string;
    /** 모바일웹 접속 URL */
    mobile: string;
    /** 앱스토어 URL */
    ios: string;
}

export interface I18nConfig {
    languages: GlobalMallLanguage[];
    /** 글로벌 서브몰 화폐/통화 설정 */
    currencies: Currency[];
}

export interface Currency {
    exchangeTo: GlobalMallCurrencyTo;
    exchangeRate: number;
}
