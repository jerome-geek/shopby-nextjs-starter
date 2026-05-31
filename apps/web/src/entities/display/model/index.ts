export * from './event';
import type {
    AllianceRefererType,
    BannerDisplayType,
    CouponSubType,
    CouponTargetType,
    CouponType,
    EventProductOrder,
    EventProgressStatusType,
    EventSaleStatusType,
    EventTopImageUrlType,
    EventUrlType,
    ImageUrlType,
    KeywordInfoType,
    NextActionType,
    OptionType,
    OrderStatusType,
    PlatformType,
    PopupPageType,
    ProductInquiryType,
    ProductSectionSaleStatusType,
    ProviderType,
    StickerInfoType,
} from '@/models';

import type { HasCoupons, Price, ReservationData } from '@/entities/product/model';
import type {
    CouponStatus,
    DateInfo,
    DiscountInfo,
    IssueConstraint,
    UseConstraint,
} from '@/models/promotion';

export interface TagValue {
    /** 상품문의 태그값명 */
    tagValueName: string;
    /** 상품문의 태그값번호 */
    tagValueNo: number;
}

export interface MyReviewableProductsParams {
    /** 조회 시작 일시, 미입력시 3개월 전 */
    startDate: string;
    /** 조회 종료 일시, 미입력시 오늘 날짜 */
    endDate: string;
    /** 상품명 */
    productName: string;
    /** 상품 번호 */
    productNo: number;
    /** 주문번호 */
    orderNo: string;
}

export interface ProductInquiry {
    /** 대댓글 경우만 전송(부모 상품문의 번호) */
    parentInquiryNo: number;
    /** 상품문의 제목(선택) */
    title: string;
    /** 상품문의 내용(필수) */
    content: string;
    /** 비밀글 여부 */
    secreted: boolean;
    /** 상품문의 유형 (Product: PRODUCT, Delivery: DELIVERY, Cancel: CANCEL, Return: RETURN, Exchange: EXCHANGE, Refund: REFUND, Other: OTHER) */
    type: ProductInquiryType;
    /** 이메일 (입력시 회원 정보의 이메일이 아닌 입력한 주소로 답변 발송) */
    email: string;
    /** 상품번호 */
    productNo: number;
}

export interface Popup {
    pageType: PopupPageType;
    targetNo?: number;
}

export interface GetEventInfoParams {
    /** 정렬조건(SALE: 판매시작일 오름차순 - default, ADMIN_SETTING: 관리자 설정 순서, BEST_SELLER: 판매순, BEST_REVIEW: 리뷰순) */
    order?: Exclude<EventProductOrder, 'PRICE'>;
    /** 품절 상품 포함 여부(default: false) */
    soldout?: boolean;
    /** 판매 상태 (보내지 않으면 프로의 경우는 판매금지를 제외한 모든 상품, 프로미엄의 경우는 판매중지/판매금지를 제외한 모든 상품이 전송됩니다.) */
    saleStatus?: EventSaleStatusType;
    /** false 인 경우 상품정보를 내려주지 않고 상품 번호만 내려줍니다.(default: true) */
    hasProductDetail?: boolean;
    /* (관리자전용) 미리보기 전용 플래그 값 추가 */
    preview?: boolean;
}

export interface Events {
    keyword?: string;
    eventTitle: string;
    categoryNos?: number;
    productNos: number;
    onlyIngStatus: boolean;
}

export interface KeywordInfo {
    /** 검색어 타입(NO - 기획전 번호, NAME - 기획전 이름, TAG - 태그, URL - 기획전 URL, ID - 기획전 ID) (default: NO) */
    type?: KeywordInfoType;
    /** 검색어 필수(기획전 번호, TAG 는 ',' 로 구분하여 다중입력) (공백없이 입력) */
    value?: string;
}

export interface PageParam {
    /** 페이지 번호 */
    number: number;
    /** 한 페이지당 노출 수 */
    size: number;
}

export interface Order {
    /** 정렬조건(REGISTER_DATE: 등록일, START_DATE: 시작일, END_DATE: 종료일) (default: REGISTER_DATE) */
    by?: 'REGISTER_DATE' | 'START_DATE' | 'END_DATE';
    /** 정렬 방식(DESC : 내림차순 / ASC : 오름차순) (default : DESC) */
    direction?: 'DESC' | 'ASC';
}

export type EventOrder = 'TOP' | 'COUPONS' | 'SECTIONS';

export interface EventContent {
    /** 전시 종료일 */
    endYmdt: string;
    /** 기획전 명 */
    label: string;
    /** 전시기간 타입 */
    displayPeriodType: BannerDisplayType;
    /** 기획전 url */
    url: string;
    /** 홍보문구 */
    promotionText: string;
    /** 기획전 번호 */
    eventNo: number;
    /** 기획전 이미지 URL(PC) */
    pcImageUrl: string;
    /** 전시 시작일 */
    startYmdt: string;
    /** URL 타입 */
    urlType: EventUrlType;
    /** 진행 상태 */
    progressStatus: EventProgressStatusType;
    /** 기획전 이미지 URL(MOBILE) */
    mobileimageUrl: string;
    /** 이벤트 여부 */
    eventYn: 'Y' | 'N';
    /** 검색용 태그값 */
    tag: string;
    /** 기획전 ID */
    id: string;
}

export interface skinBanners {
    skinNo: number;
    bannerGroupCodes: string;
}

export interface EventTopInfo {
    pc: {
        type: EventTopImageUrlType;
        url: string;
    };
    mobile: { type: EventTopImageUrlType; url: string };
}

export interface EventSection {
    /** 한 행에 디스플레이 되는 이미지 개수(PC), 프론트 정책에 따라 사용하지 않아도 됨 */
    pcPerRow: number;
    /** 한 행에 디스플레이 되는 이미지 개수(MOBILE), 프론트 정책에 따라 사용하지 않아도 됨 */
    mobilePerRow: number;
    /** 이미지 URL */
    imageUrl: string;
    /** 섹션의 전시 순서 */
    displayOrder: number;
    /** 재고 노출 여부 (false:재고 미노출 / true:재고 노출) */
    displayableStock: boolean;
    /** 섹션 명 */
    label: string;
    /** 섹션 번호 */
    sectionNo: number;
}

export interface StickerInfo {
    /** 스티커 번호 */
    no?: number;
    /** 스티커 이름 */
    name: string;
    /** 스티커 라벨 */
    label: string;
    /** 스티커 타입 */
    type: StickerInfoType;
}

export interface OptionValue {
    mallProductNo: number;
    stockCnt: number;
    optionValue: string;
}

export interface EventCouponInfo {
    /** 쿠폰 발급전 이미지 */
    beforeIssueImageUrl: string;
    /** 기발급완료 이미지 */
    alreadyIssuedImageUrl: string;
    /** 기획전 사용안내 이미지 */
    guideImageUrl: string;
    /** 남은수량 부족 이미지 */
    soldOutImageUrl: string;
    /** 쿠폰 목록 */
    coupons: DownloadableCoupon[];
    /** 발급기간 만료 이미지 */
    dateExpiredImageUrl: string;
    /** 발급완료 이미지 */
    issuedImageUrl: string;
}

export interface DownloadableCoupon {
    couponNo: number;
    couponName: string;
    couponType: CouponType;
    couponTargetType: CouponTargetType;
    allianceRefererType: AllianceRefererType;
    downloadable: boolean;
    imageUrl: string;
    discountInfo: DiscountInfo;
    dateInfo: DateInfo;
    useConstraint: Omit<UseConstraint, 'limitPayTypes'>;
    issueConstraint: IssueConstraint;
    couponStatus: CouponStatus;
    couponSubType: CouponSubType;
}

// 카테고리
export interface Category {
    // 카테고리 목록(계층)
    multiLevelCategories: MultiLevelCategory[];
    // 카테고리 목록
    flatCategories: FlatCategory[];
}

// 카테고리 목록
export interface FlatCategory {
    // 1~5차 카테고리 명
    fullCategoryName: string;
    depth1CategoryNo: number;
    depth1Label: string;
    depth1DisplayOrder: number;
    depth1Icon: string;
    depth1Content: string;
    depth2CategoryNo: number;
    depth2Label: string;
    depth2DisplayOrder: number;
    depth2Icon: string;
    depth2Content: string;
    depth3CategoryNo: number;
    depth3Label: string;
    depth3DisplayOrder: number;
    depth3Icon: string;
    depth3Content: string;
    depth4CategoryNo: number;
    depth4Label: string;
    depth4DisplayOrder: number;
    depth4Icon: string;
    depth4Content: string;
    depth5CategoryNo: number;
    depth5Label: string;
    depth5DisplayOrder: number;
    depth5Icon: string;
    depth5Content: string;
}

// 카테고리 목록(계층)
export interface MultiLevelCategory {
    /** 뎁스 */
    depth: number;
    /** 자식 카테고리 */
    children: MultiLevelCategory[];
    /** 아이콘 */
    icon: string;
    /** 카테고리 번호 */
    categoryNo: number;
    /** 카테고리 명 */
    label: string;
    /** 카테고리 상세(HTML) */
    content: string;
    /** 카테고리 코드 */
    managementCode: string;
}

export interface Brand {
    brandNo: number;
    name: string;
    productCnt: number;
}

export interface RecommendedProduct {
    productNo: number;
    productName: string;
    productNameEn: string;
    promotionText: string;
    salePrice: number;
    immediateDiscountAmt: number;
    immediateDiscountUnitType: string;
    immediateDiscountStartYmdt: string;
    immediateDiscountEndYmdt: string;
    additionDiscountAmt: number;
    additionDiscountUnitType: string;
    minSalePrice: number;
    maxSalePrice: number;
    maxDiscountAmount: number;
    liked: boolean;
    likeCount: number;
    partnerName: string;
    reviewRating: number;
    totalReviewCount: number;
    deliveryConditionType: string;
    saleCnt: number;
    stockCnt: number;
    mainStockCnt: number;
    brandNo: number;
    brandName: string;
    brandNameKo: string;
    brandNameEn: string;
    brandNameType: string;
    stickerInfos: StickerInfo[];
    stickerLabels: string[];
    adult: boolean;
    productSalePeriodType: string;
    saleStartYmdt: string;
    saleEndYmdt: string;
    saleStatusType: string;
    reservationData: ReservationData;
    imageUrls: string[];
    listImageUrls: string[];
    hasCoupons: HasCoupons;
    couponTag: string;
    maxCouponAmt: number;
    couponDiscountAmt: number;
    registerYmdt: string;
    contentsIfPausing: string;
    optionValues: OptionValue[];
    displayCategoryNos: string;
    searchProductId: string;
    frontDisplayYn: boolean;
    urlDirectDisplayYn: boolean;
    productManagementCd: string;
    salePeriodType: string;
    sectionProductStartYmdt: string;
    sectionProductEndYmdt: string;
    hsCode: string;
    isSoldOut: boolean;
    groupManagementCode: string;
    groupManagementCodeName: string;
    canAddToCart: boolean;
    displayOrder: number;
    enableCoupons: boolean;
}

export interface ReviewItem {
    /** 판매자 관리 코드 */
    productManagementCd: string;
    /** 작성 플랫폼 */
    platformType: string;
    /** 내용 */
    content: string;
    /** 상품 명 */
    productName: string;
    /** 태그값번호 */
    tagValueNos: number[];
    /** 수록일 */
    updateYmdt: string;
    /** 평점 */
    rate: number;
    /** 상품평 구분 ( 일반: N , 우수: Y ) */
    bestReviewYn: string;
    /** 상품 대표 이미지 URL */
    imageUrl: string;
    /** 상품 평 번호 */
    reviewNo: number;
    /** 상품 번호 */
    productNo: number;
    /** 등록일 */
    registerYmdt: string;
    /** 블라인드 신고 수 */
    blindReportCnt: number;
    /** 브랜드 명 */
    brandName: string;
    /** 주문 번호 */
    orderNo: string;
    /** 신고 수 */
    reportCnt: number;
    /** 첨부 파일 url 리스트 (5개까지 가능) */
    fileUrls: string[];
    /** 상품 대표 이미지 URL 타입 */
    imageUrlType: ImageUrlType;
    orderedOption: OrderedOption;
    /** 외부 리뷰 작성 여부 */
    externalReview: boolean;
    /** 상품 삭제 여부 */
    isDeletedProductReview: boolean;
    /** 브랜드 영문명 */
    brandNameEn: string;
    /** 영문상품명 */
    productNameEn: string;
    /** 상품평 작성 리뷰 */
    extraJson: string;
}

export interface OrderedOption {
    /** 옵션 종류 */
    optionType: 'NORMAL_OPTION' | 'ADDITIONAL_PRODUCT';
    /** 옵션 권장 출력값 */
    optionTitle: string;
    inputs: {
        /** 구매자 작성형 옵션 (value) */
        inputLabel: string;
        /** 구매자 작성형 옵션 (label) */
        inputValue: string;
    }[];
    /** 주문 상태 */
    orderStatusType: OrderStatusType;
    /** 옵션값 */
    optionValue: string;
    /** 주문수량 */
    orderCnt: number;
    /** 옵션 추가 금액 */
    addPrice: number;
    /** 옵션명 */
    optionName: string;
    /** 옵션사용여부 */
    optionUsed: boolean;
    /** 주문 옵션 번호 */
    orderOptionNo: number;
}

export type ReviewBoardSortCriterion =
    | 'REVIEW_COUNT'
    | 'REGISTER_YMDT'
    | 'REVIEW_RATE';

export type ReviewBoardType = 'ALL' | 'PHOTO';

export type PhotoReviewDisplayType = 'FIRST_TYPE' | 'SECOND_TYPE';

export type BoardConfigType = 'CARD' | 'LIST';

export type BoardImageType = 'NONE' | 'ATTACH_IMAGE' | 'PRODUCT_IMAGE';

export interface ProductReviewInfo {
    /** 상품평 총 개수 */
    productTotalCount: number;
    /** 본인 여부 */
    myReview: boolean;
    /** 작성 플랫폼 */
    platformType: PlatformType | 'COMMON' | 'ALL';
    /** 외부 사이트 명 */
    siteName: string;
    /** 작성자 이름 */
    memberName: string;
    /** 상품평 내용 */
    content: string;
    /** 공급자 유형 */
    providerType: ProviderType;
    /** 상품명 */
    productName: string;
    /** 태그값번호 */
    tagValueNos: number[];
    /** 수정일 */
    updateYmdt: string;
    /** 베스트 상품평 여부 ( 우수상품평:Y , 일반상품평:N , 전체: NULL ) */
    bestReviewYn: 'Y' | 'N';
    /** 평점 */
    rate: number;
    /** 상품 대표 이미지 */
    imageUrl: string;
    /** 리뷰 번호 */
    reviewNo: number;
    /** 작성자 닉네임 */
    nickname: string;
    /** 회원등급 노출 설정 (null 인경우 비회원 포함 노출) */
    memberGradeDisplayInfo: Nullable<{
        /** 노출 가능한 회원 등급 정보 (isAll 이 false 일 경우에만 유효한 값) */
        nos: number[];
        /** 모든 회원 노출 여부 (true : 모든 회원 노출, false: nos 에 해당하는 회원만 노출 */
        isAll: boolean;
    }>;
    tagValues: TagValue[];
    /** 상품 번호 */
    productNo: number;
    /** 등록일 */
    registerYmdt: string;
    /** 회원 id */
    memberId: string;
    /** 브랜드 명 */
    brandName: string;
    /** 추천가능여부 */
    recommendable: boolean;
    /** 블라인드 수 */
    blindReportCnt: number;
    /** 신고 취소 여부 */
    cancelReportable: string;
    /** 외부 사이트에서 작성된 리뷰 날짜 (nullable) */
    originRegisterYmdt: Nullable<string>;
    /** 휴면 회원 여부 */
    expelled: boolean;
    /** 신고 수 */
    reportCnt: number;
    /** 첨부파일 url 리스트 */
    fileUrls: string[];
    /** 상품 이미지 URL 타입 */
    imageUrlType: ImageUrlType;
    /** 신고가능여부 */
    reportable: boolean;
    /** 회원그룹 노출 설정 (null 인경우 비회원 포함 노출) */
    memberGroupDisplayInfo: Nullable<{
        /** 노출 가능한 회원 그룹 정보 (isAll 이 false 일 경우에만 유효한 값) */
        nos: number[];
        /** 모든 회원 노출 여부 (true : 모든 회원 노출, false: nos 에 해당하는 회원만 노출) */
        isAll: boolean;
    }>;
    /** 외부 작성 여부 */
    externalReview: boolean;
    orderedOption: OrderedOption;
    /** 추천 수 */
    recommendCnt: number;
    /** 상품평의 댓글 개수 */
    commentCount: number;
    /** 외부 상품 상세 url */
    productDetailUrl: string;
    /** 상품 삭제 여부 */
    isDeletedProductReview: boolean;
    /** 상품 할인 가격 */
    productDiscountPrice: number;
    /** 브랜드 명(영문) */
    brandNameEn: string;
    /** 상품 평점 */
    productRate: number;
    /** 영문상품명 */
    productNameEn: string;
    /** 상품평 작성 리뷰 */
    extraJson: string;
    /** 작성자 명 */
    registerName: string;
    /** 판매상태 */
    saleStatusType: ProductSectionSaleStatusType;
}

export interface ProductReviewContent {
    /** 태그값번호  */
    tagValueNos: number[];
    /** 첨부파일 갯수 */
    attachedFileCount: number;
    /** 내용 */
    urls: string[];
    /** 상품평 번호 */
    reviewNo: number;
    /**추천수 */
    recommendCnt: number;
    /** 작성자 번호 */
    registerNo: number;
}

export interface ReviewRange {
    /** 리뷰점수 시작 평점 (double) */
    from: number;
    /** 리뷰점수 끝 평점 (double) */
    to: number;
}

export interface ReviewableProduct {
    /** 클레임 번호 */
    claimNo: number;
    /** 예약 배송 시작일 */
    reservationDeliveryYmdt: string;
    inputs: {
        /** 구매자 작성형 입력 이름 */
        inputLabel: string;
        /** 구매자 작성형 입력 값 */
        inputValue: string;
    }[];
    /** 배송상품여부 */
    deliverable: boolean;
    /** 옵션사용여부 */
    optionUsed: boolean;
    /** 상품 명 */
    productName: string;
    /** 추가 상품 번호 */
    additionalProductNo: number;
    /** 클레임 상태 */
    claimStatusType: string;
    /** 옵션형태 */
    optionType: Omit<OptionType, 'PRODUCT_ONLY'>;
    /** 해외 배송가능 여부 */
    deliveryInternationalYn: boolean;
    price: Price;
    /** 상품 이미지 URL */
    imageUrl: string;
    /** 다음에 할 수 있는 작업 */
    nextActions: {
        /** 작업 타입 */
        nextActionType: NextActionType;
        /** uri */
        uri: string;
    }[];
    /** 예약 주문 여부 (true: 예약 상품, false: 비예약 상품) */
    reservation: boolean;
    /** 환불 가능 여부 */
    refundable: boolean;
    /** 옵션 번호 */
    optionNo: number;
    /** 주문 상품 옵션 번호 */
    orderOptionNo: number;
    /** 포토 리뷰 적립금 */
    photoReviewAccumulationAmt: number;
    /** 상품 번호 */
    productNo: number;
    delivery: {
        deliveryCompanyTypeLabel: string;
        /** 택배사 타입 */
        deliveryCompanyType: string;
        /** 송장추적 URL */
        retrieveInvoiceUrl: string;
        /** 송장 번호 */
        invoiceNo: string;
    };
    /** 옵션 권장 출력값 */
    optionTitle: string;
    /** 브랜드 명 */
    brandName: string;
    /** 주문 번호 */
    orderNo: string;
    /** 주문상태 */
    orderStatusType: OrderStatusType;
    /** 옵션 값 */
    optionValue: string;
    /** 상품 이미지 URL 타입 */
    imageUrlType: ImageUrlType;
    /** 주문수량 */
    orderCnt: number;
    /** 교환 가능 여부 */
    exchangeYn: string;
    /** 적립금 */
    accumulationAmt: number;
    orderStatusDate: {
        /** 상품평작성기한(조회 시작일/종료일 미 입력 시 구매확정일로부터 90일) */
        reviewableYmdt: string;
        /** 구매확정일자 */
        buyConfirmYmdt: string;
        /** 등록일자 */
        registerYmdt: string;
    };
    /** 브랜드영문명 */
    brandNameEn: string;
    /** 상품 영문명 */
    productNameEn: string;
    /** 옵션 관리 코드 */
    optionManagementCd: string;
    /** 옵션 명 */
    optionName: string;
}
