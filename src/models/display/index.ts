import {
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
    KeywordInfoType,
    KeywordType,
    OptionType,
    OrderStatusType,
    PlatformType,
    PopupPageType,
    ProductInquiryType,
    ProviderType,
    ReportReasonCdType,
    SearchType,
    StickerInfoType,
} from '@/models';
import { HasCoupons, ReservationData } from '@/models/product';
import {
    CouponStatus,
    DateInfo,
    DiscountInfo,
    IssueConstraint,
    UseConstraint,
} from '@/models/promotion';

export interface ProductReviewData {
    /** 옵션 번호 */
    optionNo: number;
    /** 주문 옵션 번호 */
    orderOptionNo: number;
    /** 상품평 내용 */
    content: string;
    /** 상품평 평점 */
    rate: number;
    /** 첨부파일 url 리스트 */
    urls: string[];
    /** 상품평 선택 옵션 */
    extraJson?: string;
    /** 태그값 번호 */
    tagValueNos: (number | string)[];
}

export interface UpdateProductReviewData {
    content: string;
    rate: number;
    urls: string[];
    tagValueNos: (number | string)[];
}

export interface ReportProductReviewData {
    reportReasonCd: ReportReasonCdType;
    content: string;
}

export interface MyProductReviewsParams {
    /** 조회 시작일(yyyy-MM-dd), 미입력시 30일 전 */
    startYmd: string;
    /** 조회 종료일(yyyy-MM-dd), 미입력시 오늘 날짜 */
    endYmd?: string;
    /** 베스트 상품평 여부 ( 우수상품평:Y , 일반상품평:N , 전체: NULL ) */
    bestReviewYn?: 'Y' | 'N';
    /** 검색어 기준 (Content: CONTENT, Product Name: PRODUCT_NAME, All: ALL) */
    searchType?: SearchType;
    /** 검색어 */
    searchKeyword?: string;
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

export interface GetEventByIdParams {
    /** 비로그인 고객의 상품 내 발급가능 쿠폰노출(default: false) */
    includeNonMemberCoupon?: boolean;
    /** 기획전 미리보기 여부(default: false) */
    preview: boolean;
}

export interface Events {
    keyword?: string;
    eventTitle: string;
    categoryNos?: number;
    productNos: number;
    onlyIngStatus: boolean;
}

export interface EventsByProgressParams {
    /** 검색어 (키워드 타입에 따라 태그 or 기획전명) */
    keyword: string;
    /** 검색어 타입 (TAG, NAME / default: 모두 포함) */
    keywordType?: KeywordType;
    /** 전시 카테고리 번호로 검색 */
    categoryNos?: string[];
    /** 진행상태 (ING - 진행중, READY - 진행예정, END - 진행종료, ALL / default: ING) (공백없이 입력) */
    progressStatus?: EventProgressStatusType;
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

export interface GetEventsParams {
    keywordInfo?: KeywordInfo;
    page: PageParam;
    /** 전시 카테고리 번호로 검색 */
    categoryNos?: number;
    /** 이벤트 여부 - Y or N (default : null) */
    eventYn?: 'Y' | 'N';
    /** 진행상태 */
    progressStatus?: EventProgressStatusType;
    order?: Order;
}

export interface GetEventsResponse {
    /** 총 이벤트 수 */
    totalCount: number;
    /** 총 페이지 수 */
    totalPage: number;
    contents: EventContents[];
}

export interface EventContents {
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

export type GetClosedEventsResponse = ItemList<
    Omit<EventContents, 'progressStatus'>
>;

export interface skinBanners {
    skinNo: number;
    bannerGroupCodes: string;
}

export interface GetEventParams extends Preview {
    /** 비로그인 고객의 상품 내 발급가능 쿠폰노출(default: false) */
    includeNonMemberCoupon?: boolean;
    preview?: boolean;
}

export interface Top {
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
    no: number;
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

export interface GetReviewResponse {
    items: ReviewItem[];
    totalCount: number;
}

export interface ReviewItem {
    reviewNo: number;
    productNo: number;
    productName: string;
    brandName: string;
    imageUrl: string;
    rate: number;
    orderedOption: OrderedOption;
    registerYmdt: string;
    updateYmdt: string;
    recommendCnt: number;
    reportCnt: number;
    blindReportCnt: number;
    orderNo: string;
    brandNameEn: string;
    productManagementCd: string;
    platformType: string;
    isDeletedProductReview: boolean;
    extraJson: string;
    bestReviewYn: string;
    fileUrls: string[];
    externalReview: boolean;
    content: string;
}

export interface OrderedOption {
    orderOptionNo: number;
    optionName: string;
    optionValue: string;
    addPrice: number;
    optionUsed: boolean;
    orderCnt: number;
    optionTitle: string;
    optionType: string;
    inputs: Input[];
}

export interface Input {
    inputLabel: string;
    inputValue: string;
}

export interface GetProductReviewsItem {
    /** 상품평 총 개수 */
    productTotalCount: number;
    /** 본인 여부 */
    myReview: boolean;
    /** 작성 플랫폼 */
    platformType: PlatformType;
    /** 작성자 이름 */
    memberName: string;
    /** 상품평 내용 */
    content: string;
    providerType: ProviderType;
    /** 상품명 */
    productName: string;
    /** 수정일 */
    updateYmdt: string;
    /** 상품평 구분 (일반: N, 우수: Y) */
    bestReviewYn: 'Y' | 'N';
    /** 평점 */
    rate: number;
    /** 상품 대표 이미지 */
    imageUrl: string;
    /** 리뷰 번호 */
    reviewNo: number;
    /** 작성자 닉네임 */
    nickname: string;
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
    /** 휴면 회원 여부 */
    expelled: boolean;
    /** 신고 수 */
    reportCnt: number;
    /** 첨부파일 url 리스트 */
    fileUrls: string[];
    /** 신고가능여부 */
    reportable: boolean;
    /** 외부 작성 여부 */
    externalReview: boolean;
    orderedOption: {
        /** 옵션 종류 */
        optionType: Exclude<OptionType, 'PRODUCT_ONLY'>;
        /** 옵션 권장 출력값 */
        optionTitle: string;
        inputs: Input[];
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
    };
    /** 추천 수 */
    recommendCnt: number;
    /** 상품평의 댓글 개수 */
    commentCount: number;
    /** 상품 삭제 여부 */
    isDeletedProductReview: boolean;
    /** 상품 할인 가격 */
    productDiscountPrice: number;
    /** 브랜드 명(영문) */
    brandNameEn: string;
    /** 상품 평점 */
    productRate: number;
    /** 적립금 지급 여부 */
    givenAccumulationYn: 'Y' | 'N';
    /** 상품평 작성 리뷰 */
    extraJson: string;
    /** 작성자 명 */
    registerName: string;
}

export interface GetProductReviewsResponse
    extends ItemList<GetProductReviewsItem> {
    /** 리뷰 평점 */
    rate: number;
    reviewRatingResponses: {
        /** 평점 별 개수 */
        countOfRating: number;
        /** 평점 */
        rating: number;
    }[];
}
