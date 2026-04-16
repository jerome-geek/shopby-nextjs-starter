import type {
    BannerDisplayType,
    EventProductOrder,
    EventProgressStatusType,
    EventSaleStatusType,
    EventUrlType,
    KeywordInfoType,
    KeywordType,
    OrderDirectionType,
    ProductSaleStatusType,
} from '@/models';
import type {
    EventContent,
    EventCouponInfo,
    EventOrder,
    EventSection,
    EventTopInfo,
} from '@/models/display';
import type { ProductItem, RentalInfo } from '@/models/product';

export interface GetEventsParams {
    /** 검색어 (태그 명) */
    keyword: string;
    /** 전시 카테고리 번호로 검색 */
    categoryNos: number[];
}

export interface GetEventsResponse {
    /** 총 이벤트 수 */
    totalCount: number;
    /** 총 페이지 수 */
    totalPage: number;
    contents: EventContent[];
}

export interface GetEventsV2Params {
    keywordInfo?: {
        /** 검색어 타입(NO - 기획전 번호, NAME - 기획전 이름, TAG - 태그, URL - 기획전 URL, ID - 기획전 ID) (default: NO) */
        type?: KeywordInfoType;
        /** 검색어 필수(기획전 번호, TAG 는 ',' 로 구분하여 다중입력) (공백없이 입력) */
        value?: string;
    };
    page: {
        /** 페이지 번호 */
        number: number;
        /** 한 페이지당 노출 수 */
        size: number;
    };
    /** 전시 카테고리 번호로 검색 */
    categoryNos?: number[];
    /** 이벤트 여부 - Y or N (default : null) */
    eventYn?: 'Y' | 'N';
    /** 진행상태 (ING - 진행중, READY - 진행예정, END - 진행종료, ALL - 모두 포함) (default: ING, 공백없이 입력) */
    progressStatus?: EventProgressStatusType;
    order?: {
        /** 정렬조건(REGISTER_DATE: 등록일, START_DATE: 시작일, END_DATE: 종료일) (default: REGISTER_DATE) */
        by: 'REGISTER_DATE' | 'START_DATE' | 'END_DATE';
        /** 정렬 방식(DESC : 내림차순 / ASC : 오름차순) (default : DESC) */
        direction: 'DESC' | 'ASC';
    };
}

export interface GetClosedEventsParams extends Paging {
    /** 태그 검색 */
    keyword: string;
    /** 이벤트명 검색 */
    eventTitle: string;
}

export type GetClosedEventsResponse = ItemList<Omit<Event, 'progressStatus'>>;

export interface GetEventsByProductNosParams {
    /** 상품 번호 */
    productNos: number[];
    /** 전시 카테고리 번호로 검색 */
    categoryNos?: number[];
}

export type GetEventsByProductNosResponse = Event[];

export interface SearchEventsByName {
    /** 검색어 (기획전 명) */
    keyword: string;
    /** 전시 카테고리 번호로 검색 */
    categoryNos?: number[];
    /** 진행중인 기획전만 검색 (default: false) */
    onlyIngStatus?: boolean;
}

export type SearchEventsByNameResponse = EventContent[];

export interface SearchEventsByEventNosParams {
    /** 조회 대상 기획전번호 목록("," 구분, 최소 1, 최대 10) */
    eventNos: number[];
    /** 기획전별 조회 대상 상품 개수, 최소 1, 최대 10(DEFAULT) */
    countPerEvent?: string;
    /** 품절 상품 포함 여부(DEFAULT: false) */
    soldout?: boolean;
    /** 판매 상태 */
    saleStatus?: EventSaleStatusType;
}

export type SearchEventsByEventNosResponse = {
    /** 기획전 정보 */
    event: EventContent;
    /** 상품 목록 */
    products: EventProduct[];
}[];

export interface SearchEventsByProgressParams {
    /** 검색어 (키워드 타입에 따라 태그 or 기획전명) */
    keyword: string;
    /** 검색어 타입 (TAG, NAME / default: 모두 포함) */
    keywordType?: KeywordType;
    /** 전시 카테고리 번호로 검색 */
    categoryNos?: string[];
    /** 진행상태 (ING - 진행중, READY - 진행예정, END - 진행종료, ALL / default: ING) (공백없이 입력) */
    progressStatus?: EventProgressStatusType;
}

export type SearchEventsByProgressResponse = EventContent[];

export type GetSectionsByEventNosResponse = {
    sections: EventSection[];
    eventNo: number;
}[];

export type GetEventsByProductNoResponse = EventContent[];

export interface GetEventParams extends Preview {
    /** 비로그인 고객의 상품 내 발급가능 쿠폰노출(default: false) */
    includeNonMemberCoupon?: boolean;
    /** 기획전 미리보기 여부(default: false) */
    preview?: boolean;
}

export interface GetEventResponse {
    /** 쿠폰 정보 */
    coupon: EventCouponInfo;
    /** 섹션 정보 */
    section: EventSection[];
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
    top: EventTopInfo;
    /** 기획전 이미지 URL(MOBILE) */
    mobileimageUrl: string;
    /** 쿠폰, 상단 노출 정보 정렬순서(배열 순서대로 프론트에서 노출, 몰마다 정책이 다를수 있음) */
    orders: EventOrder[];
    /** 이벤트 여부 */
    eventYn: 'Y' | 'N';
    /** 검색용 태그값 */
    tag: string;
    /** 기획전 ID */
    id: string;
    /** 카테고리 번호(배열) */
    categoryNos: number[];
}

export interface GetEventByIdParams {
    /** 비로그인 고객의 상품 내 발급가능 쿠폰노출(default: false) */
    includeNonMemberCoupon?: boolean;
    /** 기획전 미리보기 여부(default: false) */
    preview: boolean;
}

export interface GetEventProductDisplaySectionParams extends Omit<
    Paging,
    'hasTotalCount'
> {
    /** 정렬조건 (SALE: 판매시작일 오름차순 - default, ADMIN_SETTING: 관리자 설정 순서, BEST_SELLER: 판매순, BEST_REVIEW: 리뷰순, PRICE: 가격순) */
    order?: EventProductOrder;
    /** 정렬 순서 */
    direction?: OrderDirectionType;
    /** 품절 상품 포함 여부(default: false) */
    soldout?: boolean;
    /** 판매 상태 */
    saleStatus?: Omit<ProductSaleStatusType, 'ALL_CONDITIONS'>;
    /** 판매중지 상품 포함 여부(default: false) */
    includeStopProduct?: boolean;
    /** 기획전 미리보기 여부(default: false) */
    preview?: boolean;
}

export interface GetEventProductDisplaySectionResponse {
    /** 전체 상품 개수 */
    totalCount: number;
    /** 상품진열 번호 */
    sectionNo: number;
    /** 상품목록, hasProductDetail 이 false 경우 empty list */
    products: EventProduct[];
}

export interface EventProduct extends Omit<
    ProductItem,
    | 'deliveryConditionInfo'
    | 'productType'
    | 'shippingArea'
    | 'accumulationAmtWhenBuyConfirm'
> {
    /** 상품 유효기간 */
    expirationYmdt: string;
    unitPriceInfo: {
        /** 단위가격 */
        price: number;
        /** 단위명 */
        name: string;
        /** 단위유형 */
        type: string;
    };
    rentalInfos: RentalInfo[];
    /** 상품섹션에서 설정한 시작일 */
    sectionProductStartYmdt: string;
    /** 상품섹션에서 설정한 종료일 */
    sectionProductEndYmdt: string;
}
