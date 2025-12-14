import {
    AccumulationUnitType,
    BrandNameType,
    CertificationType,
    CountryCdType,
    CriterionType,
    CustomPropertiesPropType,
    DaysOfWeekType,
    DeliveryCompanyType,
    DeliveryConditionType,
    DeliveryType,
    DiscountUnitType,
    MappingType,
    OptionYnType,
    PayType,
    ProductDirectionType,
    ProductGroupType,
    ProductSalePeriodType,
    ProductSaleStatusType,
    ProductSectionSaleStatusType,
    ProductType,
    SaleMethodType,
    SalePeriodType,
    ShippingAreaType,
    WarehouseAddressType,
} from '@/models';
import { StickerInfo } from '@/models/display';

export interface ProductsParams {
    /** 배송 템플릿 번호 */
    deliveryTemplateNo: number;
    /** 옵션값 출력 여부 (default : false) (nullable) */
    hasOptionValues?: Nullable<boolean>;
    /** 브랜드/카테고리 출력 여부 (default : false) (nullable) */
    hasBrandAndCategoryValues?: Nullable<boolean>;
    /** 한 페이지당 노출 수 (default : 30) (nullable) */
    pageSize?: Nullable<number>;
    /** 페이지 번호 (default : 1) (nullable) */
    pageNumber?: Nullable<number>;
    productSort?: {
        /** 정렬 기준 (default : RECENT_PRODUCT) (nullable) */
        criterion?: Nullable<CriterionType>;
        /** 정렬 방법 (default : DESCDeliveryFeignClient) (nullable) */
        direction?: Nullable<ProductDirectionType>;
    };
}

export interface GroupCodeParams {
    groupManagementCodes: string[];
    saleStatus?: ProductSaleStatusType;
    isSoldOut?: boolean;
}

export interface FlatCategory {
    /** 부모 카테고리 번호 */
    parentCategoryNo?: number;
    /** 전시 순서 */
    displayOrder?: number;
    /** 카테고리 상품 개수 */
    count?: number;
    /** 카테고리번호 */
    categoryNo?: number;
    /** 하위 카테고리 */
    /** 카테고리 명 */
    label?: string;
}

export interface MultiLevelCategory extends FlatCategory {
    /** 하위 카테고리 */
    childCategories: Category[];
}

export interface ProductItem {
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
        price: number;
        name: string;
        type: string;
    };
    /** 메인 베스트 상품 여부 deprecated(더 이상 제공하지 않는 개체항목입니다) */
    // mainBestProductYn: boolean;
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
    /** 즉시할인 타입 Enum: [WON: Sum, RATE: rate] */
    immediateDiscountUnitType: DiscountUnitType;
    /** 추가상품할인 타입 Enum: [WON: Sum, RATE: rate] */
    additionDiscountUnitType: DiscountUnitType;
    /** 전시 여부 */
    frontDisplayYn: boolean;
    /** 판매 수량 (재고 미노출의 경우 -999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) */
    saleCnt: number;
    /** 상품 항목 추가 정보 */
    customProperties: CustomProperties[];
    /** 판매시작일시 */
    saleStartYmdt: string;
    /** 브랜드 한글명 */
    brandNameKo: string;
    /** 상품섹션에서 설정한 종료일 - deprecated(더 이상 제공하지 않는 개체항목입니다) */
    // sectionProductEndYmdt: string;
    /** 품절여부(true - 품절, false - 미품절) */
    isSoldOut: boolean;
    /** 성인 상품 여부 */
    adult: boolean;
    /** 상품 조합형 옵션정보 ( 옵션명은 | 라인으로 구분 ) */
    optionValues: {
        /** 옵션명 */
        optionValue: string;
        /** 재고수 */
        stockCnt: number;
        /** 상품번호 */
        productNo: number;
    }[];
    /** 전시카테고리 번호 정보 */
    displayCategoryNos: string;
    /** 판매자 관리코드 */
    productManagementCd: string;
    /** 예약판매정보 */
    reservationData: ReservationData;
    /** 배송비 타입 */
    deliveryConditionType: DeliveryConditionType;
    /** 상품섹션에서 설정한 시작일 - deprecated(더 이상 제공하지 않는 개체항목입니다) */
    // sectionProductStartYmdt: string;
    /** 적립금 */
    accumulationAmtWhenBuyConfirm: number;
    /** 배송비 조건 */
    deliveryConditionInfo: DeliveryConditionInfo;
    /** 브랜드명 타입 (NAME_KO: Korean, NAME_EN: English, NONE: none) */
    brandNameType: BrandNameType;
    /** 쿠폰 태그 deprecated(더 이상 제공하지 않는 개체항목입니다) */
    couponTag: string;
    /** 최대 쿠폰 적용 가격(default: 0) */
    maxCouponAmt: number;
    /** 상품의 상품 노출 타입 */
    productSalePeriodType: SalePeriodType;
    /** 추가할인 정률 최대 할인 금액 */
    maxDiscountAmount: number;
    /** 사용가능쿠폰 존재 여부 */
    enableCoupons: boolean;
    /** 상품유형 */
    productType: ProductType;
    /** 상품번호 */
    productNo: number;
    /** 상품 등록일 */
    registerYmdt: Date;
    /** 상품판매가 */
    salePrice: number;
    partnerNo: number;
    /** 파트너명 */
    partnerName: string;
    /** 즉시할인 시작일자 */
    immediateDiscountStartYmdt: Date;
    /** 상품조회화면 노출 여부 */
    urlDirectDisplayYn: boolean;
    /** 판매중지 시 가격대체문구 */
    contentsIfPausing: string;
    /** 배송 구분 */
    shippingArea: ShippingAreaType;
    /** 판매종료일시 */
    saleEndYmdt: Date;
    /** 판매기간유형 - deprecated(더 이상 제공하지 않는 개체항목입니다) */
    salePeriodType: string;
    /** 추가할인 최대 기준금액 */
    maxSalePrice: number;
    /** 홍보문구 */
    promotionText: string;
    /** 스티커 정보 */
    stickerInfos: StickerInfo[];
    /** 리스트 이미지 정보 */
    listImageUrlInfo: ImageUrlType[];
    /** HS CODE */
    hsCode: string;
    /** 즉시할인 종료일자 */
    immediateDiscountEndYmdt: Date;
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
    /** 검색상품번호 - deprecated(더 이상 제공하지 않는 개체항목입니다) */
    searchProductId: string;
    /** 재고 (재고 미노출의 경우 -999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) */
    stockCnt: number;
    /** 판매상태 */
    saleStatusType: ProductSectionSaleStatusType;
}

export interface ProductWishItem {
    /** 그룹 관리 코드 노출명 */
    groupManagementCodeName: string;
    /** 추가할인 최소 기준금액 */
    minSalePrice: number;
    /** 그룹 관리 코드 */
    groupManagementCode: string;
    /** 상품 이미지 정보 */
    imageInfo: ImageUrlType[];
    /** 좋아요 수 */
    likeCount: number;
    /** 장바구니 사용 여부 */
    canAddToCart: boolean;
    /** 총 상품평 수 */
    totalReviewCount: number;
    /** 상품평 평균점수 */
    reviewRating: number;
    /** 좋아요 여부 (true: 좋아요 누름, false: 좋아요 안누름) */
    liked: boolean;
    /** 상품명 */
    productName: string;
    /** 적립 사용 정보 */
    accumulationUseInfo: AccumulationUseInfo;
    /** 상품 기본옵션 가격 기준으로 적용 가능한 최대 쿠폰 할인가 */
    couponDiscountAmt: number;
    /** 상품 리스트 이미지 정보 */
    listImageInfo: ImageUrlType[];
    /** 추가상품할인가 */
    additionDiscountAmt: number;
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
    /** 메인 베스트 상품 여부 */
    mainBestProductYn: boolean;
    /** 브랜드 명 */
    brandName: string;
    /** 리스트 이미지 URL */
    listImageUrls: string[];
    /** 즉시할인가 */
    immediateDiscountAmt: number;
    /** 스티커 라벨 */
    stickerLabels: string[];
    /** 쿠폰 */
    hasCoupons: HasCoupons;
    /** 즉시할인 타입 Enum: [WON: Sum, RATE: rate] */
    immediateDiscountUnitType: DiscountUnitType;
    /** 추가상품할인 타입 Enum: [WON: Sum, RATE: rate] */
    additionDiscountUnitType: DiscountUnitType;
    /** 전시 여부 */
    frontDisplayYn: boolean;
    /** 판매 수량 (재고 미노출의 경우 -999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) */
    saleCnt: number;
    /** 상품 항목 추가 정보 */
    customProperties: CustomProperties[];
    /** 판매시작일시 */
    saleStartYmdt: string;
    /** 브랜드 한글명 */
    brandNameKo: string;
    /** 상품 섹션에서 설정한 종료일 */
    sectionProductEndYmdt: string;
    /** 품절여부(true - 품절, false - 미품절) */
    isSoldOut: boolean;
    /** 성인 상품 여부 */
    adult: boolean;
    /** 상품 조합형 옵션정보 ( 옵션명은 | 라인으로 구분 ) */
    optionValues: {
        /** 옵션명 */
        optionValue: string;
        /** 재고수 */
        stockCnt: number;
        /** 상품번호 */
        mallProductNo: number;
    }[];
    /** 전시카테고리 번호 정보 */
    displayCategoryNos: string;
    /** 렌탈 정보 */
    rentalInfos: RentalInfo[];
    /** 판매자 관리코드 */
    productManagementCd: string;
    /** 예약 데이터 */
    reservationData: ReservationData;
    /** 배송비 타입 */
    deliveryConditionType: DeliveryConditionType;
    /** 상품섹션에서 설정한 시작일 */
    sectionProductStartYmdt: string;
    /** 적립금 */
    accumulationAmtWhenBuyConfirm: number;
    /** 쿠폰 태그 deprecated(더 이상 제공하지 않는 개체항목입니다) */
    couponTag: string;
    /** 최대 쿠폰 적용 가격(default: 0) */
    maxCouponAmt: number;
    /** 상품의 상품 노출 타입 */
    productSalePeriodType: ProductSalePeriodType;
    /** 추가할인 정률 최대 할인 금액 */
    maxDiscountAmount: number;
    /** 사용가능쿠폰 존재 여부 */
    enableCoupons: boolean;
    /** 상품번호 */
    productNo: number;
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
    /** 판매중지 시 가격대체문구 */
    contentsIfPausing: string;
    /** 판매종료일시 */
    saleEndYmdt: string;
    /** 상품의 상품 노출 타입 */
    salePeriodType: ProductSalePeriodType;
    /** 추가할인 최대 기준금액 */
    maxSalePrice: number;
    /** 홍보문구 */
    promotionText: string;
    /** 스티커 정보 */
    stickerInfos: StickerInfo[];
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
    /** 검색상품번호 - deprecated(더 이상 제공하지 않는 개체항목입니다) */
    searchProductId: string;
    /** 재고 (재고 미노출의 경우 -999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) */
    stockCnt: number;
    /** 판매상태 */
    saleStatusType: ProductSectionSaleStatusType;
}

export interface AccumulationInfo {
    /** 회원등급적립률 */
    rewardRateOfMemberBenefit: number;
    /** 적립금 */
    amount: number;
    /** 상품개별적립률 */
    rewardRateOfProduct: number;
}

export interface AccumulationUseInfo {
    /** 적립금 사용 가능 여부 */
    useable: boolean;
    /** 적립금 */
    accumulationInfo: {
        /** 적립금 사용 금액 단위, (AMOUNT: One, PERCENT: %) */
        unitType: AccumulationUnitType;
        /** 적립금 사용 양 */
        limitValue: number;
    };
}

export interface DeliveryConditionInfo {
    /** 배송비 요약 */
    summary: string;
    /** 수량 비례 조건에서 수량 (nullable) */
    perOrderCnt: Nullable<number>;
    /** 무료배송을 위한 최소 금액 (nullable) */
    criteria: Nullable<number>;
    /** 차등 조건 구간 (nullable) */
    deliveryFeeRanges: Nullable<
        {
            /** 해당 구간에서의 배송비 */
            deliveryAmt: number;
            /** ~미만(nullable) */
            below: number;
            /** ~이상 (nullable) */
            aboveOrEqual: number;
        }[]
    >;
    /** 차등 조건 구간 요약 (nullable) */
    rangeSummaries: Nullable<(boolean | string | number)[]>;
}

export interface ReservationData {
    /** 예약판매 배송시작일 */
    reservationDeliveryYmdt: Date;
    /** 예약판매 재고수량(재고 미노출의 경우 - 999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) */
    reservationStockCnt: number;
    /** 예약판매 종료일 */
    reservationEndYmdt: Date;
    /** 예약판매 시작일 */
    reservationStartYmdt: Date;
}

export interface CustomProperties {
    /** 항목 복수선택여부 (true: 복수개 선택가능, false: 1개만 선택가능) */
    isMultipleSelection: boolean;
    /** 상품 항목 값 번호 */
    propValueNo: number;
    /** 추가 항목 타입, Enum: [ STRING: 문자열, COLOR: 컬러 ] */
    propertyType: CustomPropertiesPropType;
    /** 상품 항목 값 */
    propValue: string;
    /** 상품 항목명 */
    propName: string;
    /** 상품 항목명 번호 */
    propNo: number;
}

export interface HasCoupons {
    /** 상품쿠폰 여부 */
    product: boolean;
    /** 파트너쿠폰 여부 */
    partner: boolean;
    /** 기획전쿠폰 여부 */
    event: boolean;
    /** 카테고리쿠폰 여부 */
    category: boolean;
    /** 브랜드쿠폰 여부 */
    brand: boolean;
}

export interface ProductDetailResponse {
    /** 렌탈 정보 (옵션이 없는 상품의 경우 조회, 옵션이 있는 상품의 경우 옵션 조회 API(/products/{productNo}/options) 에서 렌탈 정보 조회 가능) */
    rentalInfos: RentalInfo[];
    /** 예약판매정보 */
    reservationData: ReservationData;
    /** 상품 기본 정보 */
    baseInfo: BaseInfo;
    /** 그룹관리코드 노출명 */
    groupManagementCodeName: Nullable<string>;
    /** 배송 관련 정보 */
    shippingInfo: ShippingInfo;
    /** 배송 안내 */
    deliveryGuide: Nullable<string>;
    /** 그룹관리코드 */
    groupManagementCode: Nullable<string>;
    /** 관련 상품 번호 */
    relatedProductNos: number[];
    /** 좋아요 여부(accessToken 없을 시 false) */
    liked: boolean;
    /** 사입 위탁 구분 값 (PURCHASE: purchase, CONSIGNMENT: Consignment) */
    saleMethodType: SaleMethodType;
    /** 교환 안내 */
    exchangeGuide: Nullable<string>;
    /** 환불 안내 */
    refundGuide: Nullable<string>;
    /** 가격정보 */
    price: Price;
    /** 리뷰 작성 가능 여부 */
    reviewAvailable: boolean;
    /** 카테고리 목록 */
    categories: Category[];
    /** 재고정보 */
    stock: Stock;
    /** 기간 */
    deliveryDate: DeliveryDate;
    /** 브랜드 정보 */
    brand: Brand;
    /** 구매제한 */
    limitations: Limitations;
    /** 상품평 평균점 */
    reviewRate: number;
    /** 메인 베스트 상품 여부 */
    mainBestProductYn: boolean;
    /** 정기 결제 정보 (해당 값이 null로 오느냐에 따라서 정기결제상품인지 아닌지 여부를 판단) */
    regularDelivery: Nullable<RegularDelivery>;
    /** 상품 카운트 정보 */
    counter: Counter;
    /** 파트너사 공지 */
    partnerNotice: {
        /** 제목 */
        title: string;
        /** 내용 */
        content: string;
    };
    /** AS 안내 */
    afterServiceGuide: Nullable<string>;
    /** 배송정보 */
    deliveryFee: DeliveryFee;
    /** 판매자 정보 */
    partner: Partner;
    /** 주류 통신판매 명령 위임고시 */
    liquorDelegationGuide: Nullable<string>;
    /** 재고 노출 여부 (false:재고 미노출 / true:재고 노출) */
    displayableStock: boolean;
    /** 상품 상태 */
    status: Status;
}

export interface RegularDelivery {
    /** 정기 결제 즉시 할인 정보 (nullable) */
    discount: Nullable<{
        /** 즉시 할인 단위 (AMOUNT: One, PERCENT: %) */
        type: AccumulationUnitType;
        /** 즉시 할인 금액/율 */
        value: number;
    }>;
}

export interface Brand {
    /** 브랜드명 유형 */
    nameType: 'NAME_KO' | 'NAME_EN' | 'NONE';
    /** 브랜드명 */
    name: string;
    nameKo: string;
    /** 영문 브랜드명 */
    nameEn: string;
    /** 브랜드번호 */
    brandNo: number;
    /** 브랜드 로고 이미지 URL */
    logoImageUrl: string;
}

/** 상품 이미지URL 타입(ImageUrlKeys) */
type ImageUrlKeys = 'imageUrlType' | 'type';

/**
 * NOTE: 상품 쪽에서는 키 값을 type으로 사용하고, 기획전에서는 키 값을 imageUrlType으로 사용
 * 상품: https://docs.shopby.co.kr/?url.primaryName=product/#/Product/get-products-search
 * 기획전: https://docs.shopby.co.kr/?url.primaryName=display/#/Event/get-event-section-products
 */
export interface ImageUrlType
    extends Record<ImageUrlKeys, 'IMAGE_URL' | 'VIDEO_URL'> {
    /** 상품 이미지URL */
    url: string;
}

export interface BaseInfo {
    /** 판매자관리코드 */
    productManagementCd: string;
    /** 원산지(기타 직접입력, 수입사등 표기) */
    placeOriginEtcLabel: string;
    /** 상품유형 */
    productClassType: ProductType;
    /** 상품정보고시 (JSON.stringify) */
    dutyInfo: string;
    /** 쿠폰 적용 가능 여부 (Y : 쿠폰 적용 가능, N : 쿠폰 적용 불가) */
    couponUseYn: OptionYnType;
    /** 상품설명HTML 상단 */
    contentHeader: string;
    /** 옵션이미지상세보기여부 */
    optionImageViewable: boolean;
    /** 상품설명HTML 본문 */
    content: string;
    /** 상품명 */
    productName: string;
    /** 미성년자 구매 가능 여부 (Y : 미성년자 구매 가능, N : 미성년자 구매 불가) */
    minorPurchaseYn: OptionYnType;
    /** 판매자 특이사항/고객안내사항 */
    deliveryCustomerInfo: string;
    /** 상품 이미지URL 타입 */
    imageUrlInfo: ImageUrlType[];
    /** 적립금 사용 한도율 (nullable) */
    accumulationUseLimitInfo: Nullable<{
        /** 적립금 사용 금액 단위, (AMOUNT: One, PERCENT: %) */
        unitType: string;
        /** 적립금 사용 양 */
        limitValue: number;
    }>;
    /** 상품번호 */
    productNo: number;
    /** 상품항목추가 관리 정보 */
    customPropertise: {
        /** 상품 항목 값 번호 */
        propValueNo?: number;
        /** 항목 복수선택여부 (Y: 복수개 선택가능, N: 1개만 선택가능) */
        multipleSelectionYn?: OptionYnType;
        /** 추가 항목 타입, Enum: [ STRING: 문자열, COLOR: 컬러 ] */
        propType?: CustomPropertiesPropType;
        /** 상품 항목 값 */
        propValue?: string;
        /** 상품 항목명 */
        propName?: string;
        /** 상품 항목명 번호 */
        propNo?: number;
    }[];
    /** 재입고 알림 사용 가능 여부 - true(사용가능), false(불가능) */
    usableRestockNoti: boolean;
    /** 유효일자 */
    expirationYmdt: string;
    /** 상품 등록일 */
    registerYmdt: string;
    /** 상품설명HTML 하단 */
    contentFooter: string;
    /** 인증 타입 (TARGET: 인증대상, NOT_TARGET: 인증대상아님, DETAIL_PAGE: 상세페이지 별도표기) */
    certificationType: CertificationType;
    /** 제조일자 */
    manufactureYmdt: string;
    /** 적립금 사용 여부 (Y:사용가능 , N:사용불가능) */
    accumulationUseYn: OptionYnType;
    /** 스티커 라벨(배열) */
    stickerLabels: string[];
    certifications: Certification[];
    /** 판매종료일시 */
    saleEndYmdt: string;
    /** 홍보문구 */
    promotionText: string;
    /** 판매기간 타입 */
    salePeriodType: SalePeriodType;
    /** 스티커 정보 */
    stickerInfos: StickerInfo[];
    /** 결제수단 설정 정보 */
    paymentMeans: PayType;
    /** HS CODE */
    hsCode: string;
    /** 상품군 (DELIVERY: Delivery Group, SERVICE: Service Product Group) */
    productGroup: ProductGroupType;
    /** 판매시작일시 */
    saleStartYmdt: string;
    /** 상품 이미지URL */
    imageUrls: string[];
    /** 상품등록유형 */
    mappingType: MappingType;
    /** 원산지 */
    placeOriginLabel: string;
    /** 영문 상품명 */
    productNameEn: string;
    /** 구매 안내 */
    purchaseGuide: string;
}

export interface Certification {
    /** 인증일자 */
    date: string;
    /** 인증유형번호 */
    no: number;
    /** 인증번호 */
    code: string;
    /** 인증기관 */
    organization: string;
    /** 인증유형 */
    type: string;
    /** 인증상호 */
    target: string;
}

export interface DeliveryDate {
    period: {
        /** 시작일 */
        startYmdt: string;
        /** 종료일 */
        endYmdt: string;
    };
    /** 요일 */
    daysOfWeek: DaysOfWeekType;
    /** 주문일 기준 */
    daysAfterPurchase: Nullable<number>;
}

export interface Stock {
    /** 구매 수량 (재고 미노출의 경우 -999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) */
    saleCnt: number;
    /** 대표 남은 수량(옵션의 추가금이 0인 재고의 합/재고 미노출의 경우 -999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) */
    mainStockCnt: number;
    /** 남은 수량 (재고 미노출의 경우 -999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) */
    stockCnt: number;
}

/** 가격 정보 */
export interface Price {
    /** 단위가격 */
    unitPrice: Nullable<number>;
    /** 즉시할인가 */
    immediateDiscountAmt: number;
    /** 단위명 */
    unitName: Nullable<string>;
    /** 구매 확정시 예상 적립금 */
    accumulationAmtWhenBuyConfirm: number;
    /** 상품판매가 */
    salePrice: number;
    /** 추가할인 최소 기준금액 */
    minSalePrice: Nullable<number>;
    /** 즉시할인 시작일자 */
    immediateDiscountStartYmdt: Nullable<string>;
    /** 즉시할인 타입 (WON: Sum, RATE: rate) */
    immediateDiscountUnitType: DiscountUnitType;
    /** 판매중지 시 가격대체문구 */
    contentsIfPausing: Nullable<string>;
    /** 적립률(%) */
    accumulationRate: Nullable<number>;
    /** 추가상품할인 타입 (WON: Sum, RATE: rate) */
    additionDiscountUnitType: DiscountUnitType;
    /** 추가상품 할인( 원 / % ) additionDiscountUnitType 에따라 달라진다. */
    additionDiscountValue: Nullable<number>;
    /** 회원등급에 따른 적립률(%) */
    accumulationRateOfMember: Nullable<number>;
    /** 단위유형 // TODO: literal type 추가 */
    unitNameType: string;
    /** 최대 추가할인 금액 */
    maxAdditionDiscountAmt: Nullable<number>;
    /** 추가할인 최대 기준금액 */
    maxSalePrice: Nullable<number>;
    /** 해당 상품의 옵션을 여러개 구매할 경우 받을 수 있는 최대한의 쿠폰할인 금액 */
    maxCouponAmt: number;
    /** 상품 기본옵션 가격기준으로 적용 가능한 최대 쿠폰 할인가 */
    couponDiscountAmt: number;
    /** 즉시할인 종료일자 */
    immediateDiscountEndYmdt: Nullable<string>;
    /** 추가할인 정률 최대 할인 금액 */
    maxDiscountAmount: Nullable<number>;
    /** 추가상품할인가 */
    additionDiscountAmt: number;
    /** 포토리뷰적립금 */
    photoReviewAccumulationAmt: Nullable<number>;
    /** 쿠폰 할인 타입 (nullable) */
    couponDiscountUnitType: Nullable<DiscountUnitType>;
}

export interface DeliveryFee {
    /** 배송비타입 */
    deliveryConditionType: DeliveryConditionType;
    /** 조건부 배송비의 기준값 */
    aboveDeliveryAmt: number;
    /** 택배사명 */
    deliveryCompanyTypeLabel: DeliveryCompanyType;
    /** 배송유형 */
    deliveryType: DeliveryType;
    /** 택배사 */
    deliveryCompanyType: DeliveryConditionType;
    /** 배송비템플릿 요약 */
    defaultDeliveryConditionLabel: string;
    /** 지역별 추가 배송비 상세 */
    remoteDeliveryAreaFees: {
        /** 추가 배송비 지역 */
        address: string;
        /** 추가배송비 */
        extraDeliveryAmt: number;
    }[];
    /** 구간 배송비인경우 배송비에대한 요약 */
    deliveryAmtLabels: string[];
    /** 배송비 (고정배송비, 조건부 배송비인 경우) */
    deliveryAmt: number;
    /** 배송비 선/착불 여부 */
    deliveryPrePayment: boolean;
    /** 배송비조건 상세 */
    deliveryConditionDetails: {
        /** 배송비 */
        deliveryAmt: number;
        /** 가격 미만 */
        below: number;
        /** 가격 이상 */
        aboveOrEqual: number;
    }[];
    /** 수량 비례인 경우 개당 개수 */
    perOrderCnt: number;
    /** 판매자 특이사항/고객안내사항 */
    deliveryCustomerInfo: string;
    /** 반품배송비 */
    returnDeliveryAmt: number;
    /** 반품/교환지 */
    returnWarehouse: ReturnWarehouse;
    /** 상품 중량 */
    totalWeight: number;
    /** 고정배송비 */
    deliveryTemplateName: string;
}

/** 반품/교환지 */
export interface ReturnWarehouse {
    /** 해외창고 국가 구분 */
    warehouseAddressType: WarehouseAddressType;
    /** 해당 반품지 파트너 번호 */
    partnerNo: number;
    /** 주소 */
    addressStr: string;
    /** 해당 반품지 주소 */
    address: string;
    /** 기본출고지 Y/N */
    defaultReleaseWarehouseYn: OptionYnType;
    /** 국가코드 */
    countryCd: CountryCdType;
    /** 기본반품지 Y/N */
    defaultReturnWarehouseYn: OptionYnType;
    /** 해당 반품지 상세주소 */
    detailAddress: string;
    /** 우편번호 */
    zipCd: string;
    /** 반품/교환지 이름 */
    warehouseName: string;
    /** 반품/교환지 번호 */
    warehouseNo: number;
}

export interface Limitations {
    /** 주문환불불가 목록 */
    nonRefundTypes: Nullable<(boolean | string | number)[]>;
    /** 최소구매수량 */
    minBuyCnt: number;
    /** 1회최대구매수량 */
    maxBuyTimeCnt: number;
    /** 최대구매기간(일) */
    maxBuyDays: number;
    /** 최대구매기간(수량) */
    maxBuyPeriodCnt: number;
    /** 1인최대구매수량 */
    maxBuyPersonCnt: number;
    /** 환불가능여부 */
    refundable: boolean;
    /** 네이버페이 결제 가능여부 */
    naverPayHandling: boolean;
    /** 비회원구매여부(true : 가입한 회원만 구매 가능) */
    memberOnly: boolean;
    /** 장바구니 가능 여부 */
    canAddToCart: boolean;
}

/** 상품 카운트 정보 */
export interface Counter {
    /** 내 상품문의 카운트(accessToken 없을 시, 0) */
    myInquiryCnt?: number;
    /** 상품문의 카운트 */
    inquiryCnt?: number;
    /** 좋아요 수 */
    likeCnt?: number;
    /** 상품평 카운트 */
    reviewCnt?: number;
}

export interface Category {
    /** 세부 카테고리 정보 */
    categories: {
        /** 뎁스 */
        depth: number;
        /** 카테고리 번호 */
        categoryNo: number;
        /** 카테고리 명 */
        label: string;
    }[];
    /** 전체 카테고리 명 */
    fullCategoryLabel: string;
}

export interface Partner {
    /** 파트너번호 */
    partnerNo: number;
    /** 대표자명 */
    ownerName: string;
    /** FAX번호 */
    faxNo: string;
    /** 판매자명 */
    partnerName: string;
    /** 사업장 주소 */
    officeAddressLabel: string;
    /** 상호명 */
    companyName: string;
    /** 사업자번호 */
    businessRegistrationNo: string;
    /** 통신판매신고번호 */
    onlineMarketingBusinessDeclarationNo: string;
    /** 대표 이메일 */
    email: string;
    /** 대표번호 */
    phoneNo: string;
}

export interface Status {
    /** 상품 타입 (DEFAULT: General product, EVENT: Event Product, OFFLINE: Offline product, RENTAL: Rental Product) */
    productClassType: ProductType;
    /** 전시여부 */
    display: boolean;
    /** 품절여부 */
    soldout: boolean;
    /** 판매상태 ( READY: Ready for sale, ONSALE: on sale, FINISHED: Sales Ended, STOP: Sale Stopped, PROHIBITION: Sell prohibited) */
    saleStatusType: ProductSectionSaleStatusType;
}

export interface ShippingInfo {
    /** 배송 설정 */
    shippingConfig: ShippingConfig;
    /** 배송 가능 여부 */
    shippingAvailable: boolean;
}

export interface ShippingConfig {
    /** 배송 템플릿 번호 */
    templateNo: number;
    /** 배송지 파트너 번호 */
    shippingAreaPartnerNo: number;
    /** 출고 유형(배송 구분) */
    shippingAreaType: ShippingAreaType;
    /** 해외 배송 여부 (true: 해외 배송, false:국내 배송) */
    internationalShippingAvailable: boolean;
    /** 묶음배송 가능여부 (true: 묶음 배송 가능, false: 묶음 배송 불가능) */
    combinable: boolean;
}

/** 렌탈 정보 (옵션이 없는 상품의 경우 조회, 옵션이 있는 상품의 경우 옵션 조회 API(/products/{productNo}/options) 에서 렌탈 정보 조회 가능) */
export interface RentalInfo {
    /**  월 렌탈 금액 */
    monthlyRentalAmount: number;
    /** 렌탈 기간 */
    rentalPeriod: number;
    /** 서비스 가능 최저 신용 등급 */
    creditRating: number;
}

export interface RelatedProductInfo {
    /** 성인인증 필요 여부 */
    requiresAgeVerification: boolean;
    /** 즉시할인액 */
    immediateDiscountAmt: number;
    /** 추가할인 타입 */
    additionalDiscountUnitType: DiscountUnitType;
    /** 판매가 */
    salePrice: number;
    /** 즉시할인 시작일자 */
    immediateDiscountStartYmdt: string;
    /** 즉시할인 타입 */
    immediateDiscountUnitType: string;
    /** 이미지 URL 타입 */
    imageUrlType: string;
    /** 장바구니 사용 여부 */
    canAddToCart: boolean;
    /** 상품명 */
    productName: string;
    /** 추가할인액 */
    additionalDiscountAmt: number;
    /** 즉시할인 종료일자 */
    immediateDiscountEndYmdt: string;
    /** 이미지 URL */
    imageUrl: string;
    /** 영문상품명 */
    productNameEn: string;
    /** 스티커 */
    stickers: StickerInfo[];
    /** 상품 번호 */
    productNo: number;
}

export type RelatedProductResponse = RelatedProductInfo[];

export interface GetStandardCategoryResponse {
    /** 첫번쩨 표준카테고리 번호 */
    depth1No: number;
    /** 표준카테고리 전체 이름 */
    fullCategoryName: string;
    /** 두번째 표준카테고리 번호 */
    depth2No: number;
    /** 세번째 표준카테고리 번호 */
    depth3No: number;
    /** 마지막 표준카테고리 번호 (최하위 뎁스로 만약 뎁스가 4개가 아니더라도 마지막의 뎁스 번호로 인식 */
    depth4No: number;
}

export interface OptionValue {
    /** 옵션명 */
    optionValue?: string;
    /** 재고 (재고 미노출의 경우 -999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) */
    stockCnt?: number;
    /** 상품번호 */
    mallProductNo?: number;
}
