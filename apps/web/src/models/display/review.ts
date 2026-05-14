import type {
    ImageUrlType,
    OrderDirectionType,
    ReportReasonCdType,
    ReviewOrderByType,
    SearchType,
} from '@/models';
import type {
    BoardConfigType,
    BoardImageType,
    PhotoReviewDisplayType,
    ProductReviewContent,
    ProductReviewInfo,
    ReviewableProduct,
    ReviewBoardSortCriterion,
    ReviewBoardType,
    ReviewItem,
    ReviewRange,
    TagValue,
} from '@/models/display';

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

export interface GetCategoryProductReviewResponse extends ItemList<ProductReviewInfo> {
    /** 리뷰 평점 */
    rate: number;
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

export interface GetPhotoReviewListParams extends Paging {
    /** 태그값번호 */
    tagValueNos?: number[];
}

export interface GetPhotoReviewListResponse {
    /** 총 페이지수 */
    totalCount: number;
    /** 총 개수 */
    totalPage: number;
    contents: ProductReviewContent[];
}

export interface GetProductReviewListParams extends Paging {
    /** 첨부 파일 여부 ( 파일 첨부:Y, 파일 미첨부(default):N, 빈값:ALL ) */
    hasAttachmentFile?: boolean;
    order?: {
        by?: ReviewOrderByType;
        direction?: OrderDirectionType;
    };
    /** 베스트 상품평 여부 ( 우수상품평:Y , 일반상품평:N , 전체: NULL ) */
    bestReviewYn?: 'Y' | 'N' | null;
    /** 상품 정보 포함 여부 (default: true) */
    hasProductInfo?: boolean;
    /** 주문 옵션 정보 포함 여부 (default: false) */
    hasOrderedOption?: boolean;
}

export interface GetProductReviewListResponse extends ItemList<ProductReviewInfo> {
    /** 리뷰 평점 */
    rate: number;
    reviewRatingResponses: {
        /** 평점 별 개수 */
        countOfRating: number;
        /** 평점 */
        rating: number;
    }[];
}

export interface RegisterProductReviewData {
    /** 태그값 번호 */
    tagValueNos: (number | string)[];
    /** 첨부파일 url 리스트 */
    urls: string[];
    /** 상품평 평점 */
    rate: number;
    /** 상품평 선택 옵션 */
    extraJson?: string;
    /** 옵션 번호 */
    optionNo: number;
    /** 주문 옵션 번호 */
    orderOptionNo: number;
    /** 상품평 내용 */
    content: string;
}

export interface RegisterProductReviewResponse {
    reviewNo: number;
}

export interface GetReviewableOptionsParams {
    /** 주문번호 */
    orderNo: number;
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
    /** 상품평 가능 여부 (상품평 작성 불가능한 상품 여부 관계없이 구매이력이 있고 해당 구매건의 리뷰를 작성하지 않은 경우에 true 로 표기) */
    reviewable: boolean;
}

export interface GetProductReviewListV2Params extends Paging {
    /** 첨부 파일 여부 (NOTE: 문서 수정 예정) */
    hasAttachmentFile?: boolean;
    order?: {
        /** 정렬 기준 (추천순: RECOMMEND, 등록일순: REGISTER_YMDT, 평점순: RATING, 베스트리뷰순: BEST_REVIEW) */
        by: ReviewOrderByType;
        /** 정렬 순서 (default: DESC) (오름차순: ASC, 내림차순: DESC) */
        direction: OrderDirectionType;
    };
    /** 베스트 상품평 여부 ( 우수상품평:Y , 일반상품평:N , 전체: NULL - default) */
    bestReviewYn?: Nullable<'Y' | 'N'>;
    ratingRange?: {
        /** 리뷰평점 시작범위(default: null) */
        from: number;
        /** 리뷰평점 끝범위(default: null) */
        to: number;
    };
    /** 태그값번호 */
    tagValueNos?: number[];
    /** 상품 정보 포함 여부(default: true) */
    hasProductInfo?: boolean;
    /** 주문 옵션 정보 포함 여부(default: true) */
    hasOrderedOption?: boolean;
}

export interface GetProductReviewListV2Response extends ItemList<ProductReviewInfo> {
    /** 리뷰 평점 */
    rate: number;
}

export interface GetReviewCountByRatingRangeData {
    /** 리뷰평점 범위(미요청시 0.0~1.0, 1.1~2.0, 2.1-3.0, 3.1~4.0, 4.1~5.0) */
    ranges: ReviewRange[];
}

export interface GetReviewCountByRatingRangeResponse {
    /** 상품리뷰 평점 구간별 매칭 상품수 */
    summaryCount: {
        /** 리뷰평점 구간에 매칭되는 상품수 */
        count: number;
        range: ReviewRange;
    }[];
}

export interface GetProductReviewParams {
    /** 주문 옵션 정보 포함 여부(default: true) */
    hasOrderedOption?: boolean;
}

export type GetProductReviewResponse = ProductReviewInfo;

export interface UpdateProductReviewData {
    /** 태그값번호 */
    tagValueNos: (number | string)[];
    /** 첨부파일 url 리스트 */
    urls: string[];
    /** 상품평 평점 */
    rate: number;
    /** 상품평 내용 */
    content: string;
}

export type GetProductReviewCommentsParams = Paging;

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

export interface ReportProductReviewData {
    /** 신고사유(저작권 침해: COPYRIGHT , 비방: SLANDER) */
    reportReasonCd: ReportReasonCdType;
    /** 신고내용 */
    content: string;
}

export interface GetMyProductReviewsParams extends Paging {
    /** 조회 시작일(yyyy-MM-dd), 미입력시 30일 전 */
    startYmd?: string;
    /** 조회 종료일(yyyy-MM-dd), 미입력시 오늘 날짜 */
    endYmd?: string;
    /** 베스트 상품평 여부 ( 우수상품평:Y , 일반상품평:N , 전체: NULL ) */
    bestReviewYn?: 'Y' | 'N' | null;
    /** 검색어 기준 (Content: CONTENT, Product Name: PRODUCT_NAME, All: ALL) */
    searchType?: SearchType;
    /** 검색어 */
    searchKeyword?: string;
}

export interface GetMyProductReviewsResponse {
    items: ReviewItem[];
    totalCount: number;
}

export interface GetReviewableProductsParams extends Paging {
    /** 조회 시작 일시, 미입력시 3개월 전 */
    startDate?: string;
    /** 조회 종료 일시, 미입력시 오늘 날짜 */
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

export type GetReviewableProductsResponse = ItemList<ReviewableProduct>;

export interface GetReviewBoardListParams {
    sorting?: {
        /** 정렬 기준 (Total number of reviews: REVIEW_COUNT, Registered Date: REGISTER_YMDT, Review Rating: REVIEW_RATE) (default:REVIEW_COUNT) */
        sortCriterion?: ReviewBoardSortCriterion;
        /** 정렬 순서 (Ascending order: ASC, Descending order: DESC) (default:DESC) */
        ordering?: OrderDirectionType;
    };
    /** 전시 카테고리 번호 (1depthNo) */
    depth1DisplayCategoryNo?: number;
    /** 검색어 */
    keyword?: string;
    /** 페이지 번호 (default: 1) */
    pageNumber?: number;
    /** 게시판 유형 (전체상품평: ALL, 포토상품평: PHOTO, 일반상품평: REVIEW) */
    boardType: ReviewBoardType;
    /** 위젯 여부 (default : false) */
    isWidget?: boolean;
    /** 태그값번호 */
    tagValueNos?: number[];
}

export type GetReviewBoardListResponse = ItemList<{
    /** 태그값 번호 */
    tagValueNos: number[];
    /** 상품평 평균점 */
    reviewRate: number;
    /** 첨부된 이미지파일 (없는 경우 빈 배열) */
    images: string[];
    /** 베스트 리뷰 여부 */
    isBestReview: boolean;
    /** 상품평 번호 */
    reviewNo: number;
    /** 내용 */
    content: string;
    productInfo: {
        /** 상품 번호 */
        no: number;
        /** 상품 썸네일 이미지 타입 */
        thumbnailImageType: ImageUrlType;
        /** 상품 이름 */
        name: string;
        /** 영문상품명 */
        productNameEn: string;
        /** 상품 썸네일 이미지 */
        thumbnailImage: string;
        /** 상품 리뷰 개수 */
        totalReviewCount: number;
    };
    /** 등록자 정보 */
    register: {
        /** 등록자 회원 정보/ 비회원의 경우 0 */
        no: number;
        /** 등록자 이름 */
        name: string;
    };
}>;

export interface GetReviewTagsResponse {
    reviewTags: {
        /** 태그번호 */
        reviewTagNo: number;
        /** 태그명 */
        reviewTagName: string;
        /** 상품문의 태그값 정보 */
        reviewTagValues: TagValue[];
    }[];
}

export interface GetReviewsProductsParams {
    sorting?: {
        /** 정렬 기준 (Total number of reviews: REVIEW_COUNT, Registered Date: REGISTER_YMDT, Review Rating: REVIEW_RATE) (default:REVIEW_COUNT) */
        sortCriterion?: ReviewBoardSortCriterion;
        /** 정렬 순서 (Ascending order: ASC, Descending order: DESC) (default:DESC) */
        ordering?: OrderDirectionType;
    };
    /** 전시 카테고리 번호 (1depthNo) */
    depth1DisplayCategoryNo?: number;
    /** 검색어 */
    keyword?: string;
    /** 페이지 번호 (default: 1) */
    pageNumber?: number;
    /** 위젯 여부 (default : false) */
    isWidget?: boolean;
}

export type GetReviewedProductsResponse = ItemList<{
    /** 리뷰 평점 */
    reviewRate: number;
    /** 상품 대표 이미지 */
    mainImage: string;
    /** 상품평 정보 (최대 2개의 상품평이 노출되며 없는 경우 빈 리스트 조회) */
    reviews: {
        /** 베스트 상품평 여부 */
        isBestReview: boolean;
        /** 상품평 번호 */
        reviewNo: number;
        /** 상품평 첨부파일 */
        attachedImage: string;
        /** 상품평 내용 */
        content: string;
    }[];
    /**상품 대표 이미지 url 타입, (이미지: IMAGE_URL, 비디오: VIDEO_URL)} */
    mainImageUrlType: string;
    /**판매가 (할인이 적용되지 않은 가격) */
    salePrice: number;
    /**영문상품명 */
    productNameEn: string;
    /**총리뷰 갯수 */
    totalReviewCount: number;
    /**즉시할인가 적용된 판매가 */
    appliedImmediateDiscountPrice: number;
    /**상품명 */
    productName: string;
    /**상품 번호 */
    productNo: number;
}>;
