import {
    AccumulationUnitType,
    BrandNameType,
    CustomPropertiesPropType,
    DeliveryConditionType,
    DiscountUnitType,
    ProductSalePeriodType,
    ProductSectionSaleStatusType,
    ProductType,
} from '@/models';
import { StickerInfo } from '@/models/display';
import {
    AccumulationInfo,
    DeliveryConditionInfo,
    HasCoupons,
    ImageUrlType,
    OptionValue,
    ProductWishItem,
    RentalInfo,
    ReservationData,
} from '.';

interface RecentProductParams {
    /** 상품 번호 리스트 (e.g. [10000001]) */
    mallProductNos: number[];
    /** 품절상품 포함 여부(default : true) */
    soldout: boolean;
    /** 옵션 값 포함 여부 (default: false) */
    hasOptionValues: boolean;
    /** 최대쿠폰 할인가격 포함여부(default: false) */
    hasMaxCouponAmt: boolean;
}

export type GetGuestRecentViewProductsParams = Omit<
    RecentProductParams,
    'hasMaxCouponAmt'
>;

export interface GetLikeBrandsParams extends Omit<Paging, 'hasTotalCount'> {
    /** 브랜드 번호 */
    displayBrandNo?: number;
}

export interface BrandItem {
    /** 부가 브랜드명 */
    subBrandName: string;
    /** 브랜드 depth */
    depth: number;
    /** 전시브랜드 번호 */
    displayBrandNo: number;
    /** 브랜드 상세 설명 */
    detailContents: string;
    /** 브랜드 설명 */
    description: string;
    /** 브랜드 이미지 또는 브랜드 관련 동영상 url */
    displayAreaContentUrl: string;
    /** 몰 번호 */
    mallNo: number;
    /** 메인 브랜드명 */
    mainBrandName: string;
    /** 추가 정보 */
    extraInfo: string;
}

export type GetLikeBrandsResponse = ItemList<BrandItem>;

export interface GetLikeProductsParams extends Paging {
    /** 최대쿠폰 할인가격 포함여부 */
    hasMaxCouponAmt?: boolean;
}

export interface GetLikeProductsResponse extends ItemList<ProductWishItem> {
    /**
     * 재고 노출 여부 (false:재고 미노출 / true:재고 노출)
     * false로 재고를 숨김처리 한 경우,
     * 1. 재고 관련 필드는(실제 재고가 있더라도) -999로 고정으로 리턴하며 실재고 값은 따로 내려주지 않아 조회 불가합니다.
     * 2. 실재고가 0인 경우에만 0으로 응답합니다.
     *  만약 재고 숨김처리 시, front에서 [-999]로 표시되도록 처리되고 있는게 있다면 재고노출여부(displayableStock)를 기준으로 수정 작업이 필요합니다.
     *  만약 재고 숨김처리 시, front에서 [품절]로 표시되도록 처리되고 있는게 있다면 재고/예약재고값을 기준이 아닌, 품절상태(isSoldOut)값을 기준으로 처리되도록 수정 작업이 필요합니다.
     */
    displayableStock: boolean;
}

export interface UpdateProductsLikeOldData {
    /** 상품 번호 리스트 (배열) */
    productNos: number[];
}

export type UpdateProductsLikeOldResponse = {
    /** 결과 */
    result: boolean;
    /** 상품 번호 */
    productNo: number;
}[];

export interface GetRecentViewProductsParams
    extends Omit<RecentProductParams, 'mallProductNos'> {
    /** 페이지 번호(default: 1) */
    pageNumber?: number;
    /** 한 페이지당 노출 수(default: 50) */
    pageSize?: number;
}

export type GetRecentViewProductsResponse = RecentViewProductsContents[];

export interface RecentViewProductsContents {
    /** 그룹관리코드 노출명 */
    groupManagementCodeName: string;
    /** 추가할인 최소 기준금액 */
    minSalePrice: number;
    /** 그룹관리코드 */
    groupManagementCode: string;
    /** 좋아요 수 */
    likeCount: number;
    /** 장바구니 사용 여부 */
    canAddToCart: boolean;
    /** 총 리뷰 수 */
    totalReviewCount: number;
    /** 상품평 평균점 */
    reviewRating: number;
    /** 좋아요 여부 */
    liked: boolean;
    /** 상품명 */
    productName: string;
    /** 적립금 사용 정보 */
    accumulationUseInfo: {
        /** 적립금 사용 가능 여부 - true(가능), false(불가능) */
        usable: boolean;
        /** 적립금 사용 한도율 */
        accumulationInfo: {
            /** 적립금 사용 금액 단위, (AMOUNT: One, PERCENT: %) */
            unitType: AccumulationUnitType;
            /** 적립금 사용 양 */
            limitValue: number;
        };
    };
    /** 최대 쿠폰 적용 가격(default: 0) */
    couponDiscountAmt: number;
    /** 추가상품할인가 */
    additionDiscountAmt: number;
    /** 상품 이미지 정보 */
    imageUrlInfo: ImageUrlType[];
    /** 브랜드 번호 */
    brandNo: number;
    /** 단위별 가격 */
    unitPrice: {
        /** 단위가격 */
        price: number;
        /** 단위명 */
        name: string;
        /** 단위유형 */
        type: string;
    };
    /** 브랜드 명 */
    brandName: string;
    /** 리스트 이미지 URL */
    listImageUrls: string[];
    /** 즉시할인가 */
    immediateDiscountAmt: number;
    /** 스티커 라벨(배열) */
    stickerLabels: string[];
    /** 쿠폰여부 */
    hasCoupons: HasCoupons;
    /** 즉시할인 타입 */
    immediateDiscountUnitType: DiscountUnitType;
    /** 추가상품할인 타입 */
    additionDiscountUnitType: DiscountUnitType;
    /** 전시 여부 */
    frontDisplayYn: boolean;
    /** 판매 수량 (재고 미노출의 경우 -999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) */
    saleCnt: number;
    /** 상품 항목 추가 정보 */
    customProperties: {
        /** 항목 복수선택여부 (true: 복수개 선택가능, false: 1개만 선택가능) */
        isMultipleSelection: boolean;
        /** 상품 항목 값 번호 */
        propValueNo: number;
        /** 추가 항목 타입 */
        propType: CustomPropertiesPropType;
        /** 상품 항목 값 */
        propValue: string;
        /** 상품 항목명 */
        propName: string;
        /** 상품 항목명 번호 */
        propNo: number;
    }[];
    /** 판매시작일시 */
    saleStartYmdt: string;
    /** 브랜드 한글 명 */
    brandNameKo: string;
    /** 품절여부 (true-품절O, false-품절X) */
    isSoldOut: boolean;
    /** 성인 상품 여부 */
    adult: boolean;
    /** 상품 조합형 옵션정보 ( 옵션명은 | 라인으로 구분 ) */
    optionValues: OptionValue[];
    /** 전시카테고리 번호 정보 */
    displayCategoryNos: string;
    /** 렌탈 정보 */
    rentalInfos: RentalInfo;
    /** 판매자 관리코드 */
    productManagementCd: string;
    /** 예약판매정보 */
    reservationData: ReservationData;
    /** 배송비 타입 */
    deliveryConditionType: DeliveryConditionType;
    /** 적립금 */
    accumulationAmtWhenBuyConfirm: number;
    /** 배송비 조건 */
    deliveryConditionInfo: DeliveryConditionInfo;
    /** 브랜드명 타입 */
    brandNameType: BrandNameType;
    /** 파트너번호 */
    partnerNo: number;
    /** 해당 상품의 옵션을 여러개 구매할 경우 받을 수 있는 최대한의 쿠폰할인 금액 (default: 0) */
    maxCouponAmt: number;
    /** 상품의 상품 노출 타입 */
    productSalePeriodType: ProductSalePeriodType;
    /** 추가할인 정률 최대 할인 금액 */
    maxDiscountAmount: number;
    /** 최근본 상품 날짜 */
    recentlyViewedYmdt: string;
    /** 사용가능쿠폰 존재 여부 */
    enableCoupons: boolean;
    /** 상품유형 */
    productType: ProductType;
    /** 상품번호 */
    productNo: number;
    /** 상품 유효기간 (nullable) */
    expirationDate: Nullable<string>;
    /** 상품 등록일 */
    registerYmdt: string;
    /** 쿠폰 할인 타입 (nullable) */
    couponDiscountUnitType: Nullable<DiscountUnitType>;
    /** 상품판매가 */
    salePrice: number;
    /** 파트너명 */
    partnerName: string;
    /** 즉시할인 시작일자 */
    immediateDiscountStartYmdt: string;
    /** 상품조회화면 노출 여부 */
    urlDirectDisplayYn: boolean;
    /** 가격대체문구 */
    contentsIfPausing: string;
    /** 판매종료일시 */
    saleEndYmdt: string;
    /** 추가할인 최대 기준금액 */
    maxSalePrice: number;
    /** 홍보문구 */
    promotionText: string;
    /** 스티커 정보 */
    stickerInfos: StickerInfo[];
    /** 상품 리스트 이미지 정보 */
    listImageUrlInfo: ImageUrlType[];
    /** HS CODE */
    hsCode: string;
    /** 즉시할인 종료일자 */
    immediateDiscountEndYmdt: string;
    /** 상품 이미지 URL */
    imageUrls: string[];
    /** 브랜드 영문 명 */
    brandNameEn: string;
    /** 적립금 정보 */
    accumulationInfo: AccumulationInfo;
    /** 대표 옵션 재고 (재고 미노출의 경우 -999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) */
    mainStockCnt: number;
    /** 영문 상품명 */
    productNameEn: string;
    /** 재고 노출 여부 (false:재고 미노출 / true:재고 노출) */
    displayableStock: boolean;
    /** 재고 (재고 미노출의 경우 -999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) */
    stockCnt: number;
    /** 판매상태 [ READY: 판매대기, ONSALE: 판매중, FINISHED: 판매종료, STOP: 판매중지, PROHIBITION: 판매금지 ] */
    saleStatusType: ProductSectionSaleStatusType;
}

export interface RegisterRecentViewProductData {
    /** 상품 번호 */
    productNo: number;
}

export interface DeleteRecentViewProductsParams {
    /** 상품 번호 */
    productNo: number;
}

export interface ProductLikeItem {
    /** 상품 번호 */
    productNo: number;
    /** 좋아요 설정 상태(Y: 좋아요 설정한 상태, N: 좋아요 해제한 상태) */
    like: 'Y' | 'N';
}

export interface BrandLikeItem {
    /** 브랜드 번호 */
    displayBrandNo: number;
    /** 좋아요 설정/해제(Y: 설정, N: 해제) */
    likeYn: 'Y' | 'N';
}

export interface ToggleLikeBrandsData {
    items: BrandLikeItem[];
}

export interface GetLikeBrandsCountParams {
    /** 브랜드 번호 */
    displayBrandNos: number[];
    sort?: {
        /** 정렬 기준(default : DISPLAY_BRAND_NO) (DISPLAY_BRAND_NO: 브랜드 번호, LIKE_COUNT: 좋아요 수) */
        criterion?: 'DISPLAY_BRAND_NO' | 'LIKE_COUNT';
        /** 정렬 방식(default : DESC) (ASC: Ascending order, DESC: Descending order) */
        direction?: 'ASC' | 'DESC';
    };
}

export type GetLikeBrandsCountResponse = {
    /** 브랜드 번호 */
    displayBrandNo: number;
    /** 좋아요 수 */
    likeCount: number;
}[];

export interface GetMemberLikeBrandListParams {
    /** 브랜드 번호 */
    displayBrandNos?: number[];
}

export interface GetMemberLikeBrandListResponse {
    items: BrandItem[];
}

export interface UpdateProductsLikeData {
    items: ProductLikeItem[];
}

export type UpdateProductsLikeResponse = ProductLikeItem[];

export interface GetLikeProductsCountResponse {
    /** 좋아요 수 */
    likedCount: number;
}
