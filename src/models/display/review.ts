import {
    ImageUrlType,
    NextActionType,
    OptionType,
    OrderDirectionType,
    OrderStatusType,
    PlatformType,
    ProductSectionSaleStatusType,
    ProviderType,
    ReviewOrderByType,
} from '@/models';
import { Price } from '@/models/order';

export type ReviewBoardSortCriterion =
    | 'REVIEW_COUNT'
    | 'REGISTER_YMDT'
    | 'REVIEW_RATE';

export type ReviewBoardType = 'ALL' | 'PHOTO';

export type PhotoReviewDisplayType = 'FIRST_TYPE' | 'SECOND_TYPE';

export type BoardConfigType = 'CARD' | 'LIST';

export type BoardImageType = 'NONE' | 'ATTACH_IMAGE' | 'PRODUCT_IMAGE';

export interface CategoryProductReviewsParams extends Paging {
    /** 첨부파일 여부 (default : false) */
    hasAttachmentFile?: boolean;
    /** 카테고리 깊이 */
    categoryDepth: number;
    /** 카테고리 번호 */
    categoryNo: number;
    /** 상품명 */
    productName?: string;
    order: {
        by: ReviewOrderByType;
        direction: OrderDirectionType;
    };
    /** 브랜드명 */
    brandName?: string;
    /** 베스트 상품평 여부 ( 우수상품평:Y , 일반상품평:N , 전체: NULL - default) */
    bestReviewYn?: Nullable<'Y' | 'N'>;
    /** 내 상품평 보기 ( 내상품평:Y , 전체상품평:N - default ) */
    myReviewYn?: 'Y' | 'N';
    /** 주문 옵션 정보 포함 여부(default: true) */
    hasOrderedOption?: boolean;
}

export interface GetReviewListParams extends Paging {
    /** 첨부 파일 여부 ( 파일 첨부:Y, 파일 미첨부(default):N, 빈값:ALL ) */
    hasAttachmentFile?: boolean;
    /** 베스트 상품평 여부 ( 우수상품평:Y , 일반상품평:N , 전체: NULL ) */
    bestReviewYn?: 'Y' | 'N' | 'NULL';
    order?: {
        by?: ReviewOrderByType;
        direction?: OrderDirectionType;
    };
    /** 상품 정보 포함 여부 (default: true) */
    hasProductInfo?: boolean;
    /** 상품평 점수별 리뷰 수 정보 포함 여부 (default: true) */
    hasReviewSummary?: boolean;
    /** 주문 옵션 정보 포함 여부 (default: false) */
    hasOrderedOption?: boolean;
}

export interface GetReviewListV2Params extends GetReviewListParams {
    ratingRange?: ReviewRange;
    tagValueNos: string[];
}

export interface GetReviewListV2Response
    extends ItemList<Omit<ProductReviewInfo, 'givenAccumulationYn'>> {
    /** 리뷰 평점 */
    rate: number;
    reviewRatingResponses: {
        /** 평점 별 개수 */
        countOfRating: number;
        /** 평점 */
        rating: number;
    }[];
}

export interface GetProductReviewCommentsParams extends NewPaging {}

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
    // TODO: NULL이 string인지 null인지 확인 필요
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
    orderedOption: {
        /** 옵션 종류 */
        optionType: Omit<OptionType, 'PRODUCT_ONLY'>;
        /** 옵션 권장 출력값 */
        optionTitle: string;
        inputs: {
            /** 구매자 작성형 옵션(value) */
            inputValue: string;
            /** 구매자 작성형 옵션 (label) */
            inputLabel: string;
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
    };
    /**추천 수 */
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
    /** 적립금 지급 여부 */
    givenAccumulationYn: string;
    /** 상품평 작성 리뷰 */
    extraJson: string;
    /** 작성자 명 */
    registerName: string;
    /** 판매상태 */
    saleStatusType: ProductSectionSaleStatusType;
}

export interface GetProductReviewListResponse
    extends ItemList<ProductReviewInfo> {
    /** 리뷰 평점 */
    rate: number;
    reviewRatingResponses: {
        /** 평점 별 개수 */
        countOfRating: number;
        /** 평점 */
        rating: number;
    }[];
}

export interface GetCategoryProductReviewResponse
    extends ItemList<ProductReviewInfo> {
    /** 리뷰 평점 */
    rate: number;
}

export interface GetProductReviewParams {
    hasOrderedOption?: boolean;
}

export interface GetProductReviewResponse extends ProductReviewInfo {}

export interface OrderedOption {
    orderOptionNo: number;
    optionName: string;
    optionValue: string;
    addPrice: number;
    optionUsed: boolean;
    orderCnt: number;
    optionTitle: string;
    optionType: string;
    orderStatusType: string;
    inputs: Input[];
}

export interface GetReviewBoardConfigResponse {
    /** 답글 사용 가능 여부 */
    canReply: boolean;
    /** 게시판 게시판 유형 CARD: 카드형 , LIST: 리스트 */
    boardType: BoardConfigType;
    /** 게시판 이미지 유형 NONE: 노출 안 함, ATTACH_IMAGE: 첨부파일 이미지, PRODUCT_IMAGE: 상품 대표이미지 */
    boardImageType: BoardImageType;
    /** 게시판 설명 */
    description: string;
    /** 상품평 게시판 사용 여부 */
    boardUsable: boolean;
    /** 첨부 사용 가능 여부 */
    canAttach: boolean;
    /** 게시판 추가 설정 */
    expandedReviewConfig: {
        /** 적립금 혜택 안내문구 */
        accumulationRewardNoticeText: string;
        /** 전체 상품 후기 페이지 당 게시물 수 */
        allReviewCntPerPage: number;
        /** 상품 후기 작성 안내 문구 */
        writingReviewNoticeText: string;
        /** 포토 상품 후기 모아 보기 사용 여부 */
        useGatheringPhotoReview: boolean;
        /** 상품 후기 혜택 안내문구 */
        reviewRewardNoticeText: string;
        /** 후기 추천 사용 여부 */
        useReviewRecommend: boolean;
        /** 포토 상품 후기 디스플레이 유형 설정 */
        photoReviewDisplayType: PhotoReviewDisplayType;
        /** 포토 상품 후기 페이지 당 게시물 수 */
        photoReviewCntPerPage: number;
        /** 포토 상품 후기 대체 문구 */
        noPhotoReviewText: string;
        widgetConfig: {
            /** 상품기준 후기 위젯 사용 여부 */
            productReviewWidgetUsable: boolean;
            /** 포토 후기 위젯 게시품 노출 개수 */
            photoReviewWidgetPageCount: number;
            /** 상품기준 후기 위젯 게시품 노출 개수 */
            productReviewWidgetPageCount: number;
            /** 포토 후기 위젯 사용 여부 */
            photoReviewWidgetUsable: boolean;
            /** 전체 후기 위젯 사용 여부 */
            allReviewWidgetUsable: boolean;
            /** 전체 후기 위젯 게시품 노출 개수 */
            allReviewWidgetPageCount: number;
        };
        /** 상품 기준 상품 후기 페이지 당 게시물 수 */
        productReviewCntPerPage: number;
    };
    /** 회원 작성 가능 여부 */
    memberWriteable: boolean;
    /** 비밀글 사용 가능 여부 */
    secretUsable: boolean;
    /** 게시판 명 */
    name: string;
    /** 댓글 사용 가능 여부 */
    canComment: boolean;
    /** 비회원 작성 가능 여부 */
    guestWriteable: boolean;
    /** 적립금 정보 */
    reviewAccumulationInfo: {
        /** 포토 후기 적립금액 (nullable) */
        photoReviewsAccumulation: Nullable<number>;
        /** 포토후기 적립금 글자수 (nullable) */
        photoReviewsLength: Nullable<number>;
        /** 일반 후기 적립금 글자수 (nullable) */
        reviewsLength: Nullable<number>;
        /** 적립금 사용 여부 */
        useYn: Nullable<string>;
        /** 일반 후기 적립금액 (nullable) */
        reviewsAccumulation: Nullable<number>;
    };
}

export interface GetReviewableOptionResponse {
    item: {
        /** 상품평 작성 불가능한 상품 여부 */
        nonReviewableProduct: boolean;
        /** 옵션번호 */
        mallOptionNo: number;
        /** 주문번호 */
        orderNo: string;
        /** 주문상태 */
        orderStatus: string;
        /** 주문옵션번호 */
        orderProductOptionNo: number;
    }[];
    /** 상품평 가능 여부 */
    reviewable: boolean;
}

export interface GetReviewCountByRatingRangeData {
    ranges: ReviewRange[];
}

export interface ReviewRange {
    /** 리뷰점수 시작 평점 (double) */
    from: number;
    /** 리뷰점수 끝 평점 (double) */
    to: number;
}

export interface ReviewSummaryCount {
    range: ReviewRange;
    count: number;
}

export interface GetReviewCountByRatingRangeResponse {
    summaryCount: ReviewSummaryCount[];
}

export interface GetReviewableProductsParams extends Paging {
    /** 조회 시작일(yyyy-MM-dd), 미입력시 30일 전 */
    startDate?: string;
    /** 조회 종료일(yyyy-MM-dd), 미입력시 오늘 날짜 */
    endDate?: string;
    /** 상품명 */
    productName?: string;
    /** 상품번호 */
    productNo?: number;
    /** 주문번호 */
    orderNo?: string;
    /** 구매확정만 조회 (default: false) */
    onlyBuyConfirm?: boolean;
}

export interface GetMyReviewListResponse
    extends ItemList<
        Omit<
            ProductReviewInfo,
            | 'nickname'
            | 'registerName'
            | 'myReview'
            | 'recommendable'
            | 'expelled'
            | 'memberId'
        >
    > {
    orderNo: string;
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

export interface GetReviewedProductParams {
    sorting?: {
        /** 정렬 기준 (Total number of reviews: REVIEW_COUNT, Registered Date: REGISTER_YMDT, Review Rating: REVIEW_RATE) (default:REVIEW_COUNT) */
        sortCriterion?: ReviewBoardSortCriterion;
        /** 정렬 순서 (Ascending order: ASC, Descending order: DESC) (default:DESC) */
        ordering?: OrderDirectionType;
    };
    depth1DisplayCategoryNo?: number;
    keyword?: string;
    pageNumber?: number;
    isWidget?: boolean;
    tagValueNos?: number[];
}

export interface GetPhotoReviewListParams extends Paging {
    tagValueNos?: number[];
}

export interface GetPhotoReviewListResponse {
    totalCount: number;
    totalPage: number;
    contents: Content[];
    lastId: string;
}

export interface Content {
    reviewNo: number;
    urls: string[];
    attachedFileCount: number;
    registerNo: number;
    recommendCnt: number;
}

export interface GetReviewBoardListParams extends GetReviewedProductParams {
    boardType: ReviewBoardType;
}

export interface GetReviewBoardListResponse {
    items: {
        /** 태그값 번호 */
        tagValueNos: number;
        /** 상품평 평균점 */
        reviewRate: number;
        /** 상품평 번호 */
        reviewNo: number;
        /** 내용 */
        content: string;
        /** 첨부된 이미지파일 (없는 경우 빈 배열) */
        images: string[];
        register: {
            /** 등록자 회원 정보/ 비회원의 경우 0 */
            no: number;
            /** 등록자 이름 */
            name: string;
        };
        productInfo: {
            /** 상품 번호 */
            no: number;
            /** 상품 이름 */
            name: string;
            /** 상품 썸네일 이미지 */
            thumbnailImage: string;
            /** 상품 썸네일 이미지 타입 */
            thumbnailImageType: ImageUrlType;
            /** 상품 리뷰 개수 */
            totalReviewCount: number;
            /** 영문상품명 */
            productNameEn: string;
        };
        isBestReview: boolean;
    }[];
    totalCount: number;
}

interface Review {
    reviewNo: number;
    content: string;
    isBestReview: boolean;
    attachedImage: string;
}

export interface GetReviewTagsResponse {
    reviewTags: ReviewTag[];
}

export interface ReviewTag {
    /** 태그번호 */
    reviewTagNo: number;
    /** 태그명 */
    reviewTagName: string;
    reviewTagValues: TagValue[];
}

export interface TagValue {
    /** 상품문의 태그값명 */
    tagValueName: string;
    /** 상품문의 태그값번호 */
    tagValueNo: number;
}

export interface GetReviewedProductsResponse {
    items: {
        /** 상품평 정보 (최대 2개의 상품평이 노출되며 없는 경우 빈 리스트 조회) */
        reviews: Review[];
        /** 상품 번호 */
        productNo: number;
        /** 상품명 */
        productName: string;
        /** 영문 상품명 */
        productNameEn: string;
        /** 즉시할인가 적용된 판매가 */
        appliedImmediateDiscountPrice: number;
        /** 판매가 */
        salePrice: number;
        /** 상품 대표 이미지 url */
        mainImage: string;
        /** 상품 대표 이미지 url 타입 */
        mainImageUrlType: ImageUrlType;
        /** 총 리뷰 갯수 */
        totalReviewCount: number;
        /** 리뷰 평점 */
        reviewRate: number;
    }[];
    totalCount: number;
}

export interface GetReviewableProductsResponse
    extends ItemList<ReviewableProduct> {}

export interface GetMyProductReviewsResponse {
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

export interface GetProductReviewCommentResponse {
    contents: {
        /** 댓글 번호 */
        commentNo: number;
        /** 수정일 */
        modifyYdmt: string;
        /** 어드민 작성 여부 */
        isAdmin: boolean;
        /** 내용 */
        content: string;
        /** 등록자 번호 */
        registerNo: number;
        /** 등록일 */
        registerYmdt: string;
    }[];
    /** 총 페이지수 */
    totalPage: number;
    /** 총 개수 */
    totalCount: number;
}
