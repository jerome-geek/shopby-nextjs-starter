import {
    BannerDisplayType,
    EventProductOrder,
    EventProgressStatusType,
    EventSaleStatusType,
    EventUrlType,
    OrderDirectionType,
    ProductSaleStatusType,
} from '@/models';
import {
    EventContents,
    EventCouponInfo,
    EventSection,
    Top,
} from '@/models/display';
import { ProductItem, RentalInfo } from '@/models/product';

export type EventOrder = 'TOP' | 'COUPONS' | 'SECTIONS';

export interface Event {
    /** 기획전 번호 */
    eventNo: number;
    /** 기획전 명 */
    label: string;
    /** 기획전 url */
    url: string;
    /** url 타입 EVENT_NUMBER: Use exhibition number, DIRECT: direct URL input */
    urlType: EventUrlType;
    /** 진행 상태 EVENT_NUMBER: Use exhibition number, DIRECT: direct URL input */
    displayPeriodType: string;
    /** 전시 시작일 */
    startYmdt: string;
    /** 전시 종료일 */
    endYmdt: string;
    /** 기획전 이미지 URL(PC) */
    pcImageUrl: string;
    /** 기획전 이미지 URL(MO) */
    mobileimageUrl: string;
    /** 이벤트 홍보 문구 */
    promotionText: string;
    /** 이벤트 검색용 태그값 */
    tag: string;
    /** 이벤트 여부 */
    eventYn: string;
    /** 기획전 ID */
    id: string;
    /** 진행 상태 */
    progressStatus: EventProgressStatusType;
}
export type EventListResponse = Event[];

export interface GetEventInfoResponse {
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
    top: Top;
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

export interface SectionByEventNo {
    sections: EventSection[];
    eventNo: number;
}

export type GetSectionsByEventNosResponse = SectionByEventNo[];

export interface GetEventProductDisplaySectionParams
    extends Omit<Paging, 'hasTotalCount'> {
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
    event: EventContents;
    /** 상품 목록 */
    products: EventProduct[];
}[];

export interface EventProduct
    extends Omit<
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
