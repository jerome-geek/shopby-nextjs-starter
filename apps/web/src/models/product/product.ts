import {
    AccumulationUnitType,
    BrandNameType,
    CategoryOperatorType,
    CertificationType,
    ChannelType,
    CountryCdType,
    CriterionType,
    CustomPropertiesPropType,
    CycleType,
    DayOfWeekCycleType,
    DaysOfWeekType,
    DeliveryConditionType,
    DiscountedComparisonType,
    DiscountUnitType,
    InputMatchingType,
    MappingType,
    OptionSelectType,
    optionType,
    OptionYnType,
    OrderByType,
    OrderDirectionType,
    PayType,
    ProductDirectionType,
    ProductGroupType,
    ProductSalePeriodType,
    ProductSaleStatusType,
    ProductSectionSaleStatusType,
    ProductType,
    SaleMethodType,
    SalePeriodType,
    SaleStatusType,
    SearchShippingAreaType,
    ShippingAreaType,
} from '@/models';
import { StickerInfo } from '@/models/display';
import {
    AccumulationInfo,
    AccumulationUseInfo,
    DeliveryConditionInfo,
    DeliveryFee,
    HasCoupons,
    ImageUrlType,
    Price,
    RentalInfo,
    ReservationData,
    Status,
} from '@/models/product';

export interface GetBundleProductsParams extends Omit<Paging, 'hasTotalCount'> {
    /** 배송 템플릿 번호 */
    deliveryTemplateNo: number;
    /** 옵션값 출력 여부 (default : false) (nullable) */
    hasOptionValues?: Nullable<boolean>;
    /** 브랜드/카테고리 출력 여부 (default : false) (nullable) */
    hasBrandAndCategoryValues?: Nullable<boolean>;
    productSort?: {
        /** 정렬 기준 (default : RECENT_PRODUCT) (nullable) */
        criterion?: Nullable<CriterionType>;
        /** 정렬 방법 (default : DESCDeliveryFeignClient) (nullable) */
        direction?: Nullable<ProductDirectionType>;
    };
}

export interface GetBundleProductsResponse {
    /** 페이지 수 */
    pageCount: number;
    brands: {
        /** 브랜드 명 */
        brandName: string;
        /** 브랜드 상품 개수 */
        count: number;
        /** 브랜드 번호 */
        brandNo: number;
    }[];
    depth5Categories: FlatCategory[];
    depth4Categories: FlatCategory[];
    depth3Categories: FlatCategory[];
    depth2Categories: FlatCategory[];
    depth1Categories: FlatCategory[];
    /** 검색된 상품 총 개수 */
    totalCount: number;
    multiLevelCategories: MultiLevelCategory[];
    /** 가장 낮은 가격 */
    minPrice: number;
    /** 재고 노출 여부 (false:재고 미노출 / true:재고 노출) */
    displayableStock: boolean;
    /** 가장 높은 가격 */
    maxPrice: number;
    items: ProductItem[];
}

export interface ProductBaseInfo {
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
    /** URL로만 접근 여부 (Y : URL로만 접근 전용, N : 일반) */
    urlDirectDisplayYn: OptionYnType;
    certifications: CertificationType[];
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

export interface ProductShippingInfo {
    /** 배송 설정 */
    shippingConfig: {
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
    };
    /** 배송 가능 여부 */
    shippingAvailable: boolean;
}

export interface ProductStock {
    /** 구매 수량 (재고 미노출의 경우 -999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) */
    saleCnt: number;
    /** 대표 남은 수량(옵션의 추가금이 0인 재고의 합/재고 미노출의 경우 -999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) */
    mainStockCnt: number;
    /** 남은 수량 (재고 미노출의 경우 -999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) */
    stockCnt: number;
}

export interface ProductDeliveryDate {
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

export interface ProductLimitations {
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
// TO CHECK: optional 타입인지 확인
export interface ProductCounter {
    /** 내 상품문의 카운트(accessToken 없을 시, 0) */
    myInquiryCnt?: number;
    /** 상품문의 카운트 */
    inquiryCnt?: number;
    /** 좋아요 수 */
    likeCnt?: number;
    /** 상품평 카운트 */
    reviewCnt?: number;
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

export interface ProductDetailResponse {
    /** 렌탈 정보 (옵션이 없는 상품의 경우 조회, 옵션이 있는 상품의 경우 옵션 조회 API(/products/{productNo}/options) 에서 렌탈 정보 조회 가능) */
    rentalInfos: RentalInfo[];
    /** 예약판매정보 */
    reservationData: ReservationData;
    /** 상품 기본 정보 */
    baseInfo: ProductBaseInfo;
    /** 그룹관리코드 노출명 */
    groupManagementCodeName: Nullable<string>;
    /** 배송 관련 정보 */
    shippingInfo: ProductShippingInfo;
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
    categories: DisplayCategory[];
    /** 재고정보 */
    stock: ProductStock;
    /** 기간 */
    deliveryDate: ProductDeliveryDate;
    /** 브랜드 정보 */
    brand: Brand;
    /** 구매제한 */
    limitations: ProductLimitations;
    /** 상품평 평균점 */
    reviewRate: number;
    /** 메인 베스트 상품 여부 */
    mainBestProductYn: boolean;
    /** 정기 결제 정보 (해당 값이 null로 오느냐에 따라서 정기결제상품인지 아닌지 여부를 판단) */
    regularDelivery: Nullable<{
        /** 정기 결제 즉시 할인 정보 (nullable) */
        discount: Nullable<{
            /** 즉시 할인 단위 (AMOUNT: One, PERCENT: %) */
            type: AccumulationUnitType;
            /** 즉시 할인 금액/율 */
            value: number;
        }>;
    }>;
    /** 상품 카운트 정보 */
    counter: ProductCounter;
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

export interface GetBestReviewProductsParams extends Paging {
    filter?: {
        /** 서비스에 계약된 모든 쇼핑몰 조회 여부 (default: false) */
        familyMalls?: boolean;
    };
    /** 카테고리 번호(여러개 일 경우 항목 추가) */
    categoryNos?: number[];
    /** 클라이언트 키 */
    clientKey?: number;
    /** 목록에 옵션 value 포함 여부(default: false) */
    hasOptionValues?: boolean;
}

export interface GetBestReviewProductsResponse {
    /** 페이지 수 */
    pageCount: number;
    /** 재고 노출 여부 (false:재고 미노출 / true:재고 노출) */
    displayableStock: boolean;
    /** 총 개수 */
    totalCount: number;
    items: ReviewProductItem[];
}

export interface ReviewProductItem {
    /** 그룹관리코드 노출명 */
    groupManagementCodeName: string;
    /** 리뷰 번호 */
    recentReviewNo: number;
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
    /** 리뷰 수 */
    recentReviewCnt: number;
    /** 좋아요 여부 */
    liked: boolean;
    /** 상품명 */
    productName: string;
    /** 적립금 사용 정보 */
    accumulationUseInfo: AccumulationUseInfo;
    /** 리뷰 평균점 */
    recentReviewRating: number;
    /** 최대 쿠폰 적용 가격 */
    couponDiscountAmt: number;
    /** 리뷰 내용 */
    reviewContent: string;
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
    immediateDiscountUnitType: string;
    /** 추가상품할인 타입 */
    additionDiscountUnitType: string;
    /** 전시 여부 */
    frontDisplayYn: boolean;
    /** 판매 수량 */
    saleCnt: number;
    /** 상품 항목 추가 정보 */
    customProperties: CustomProperties[];
    /** 판매시작일시 */
    saleStartYmdt: string;
    /** 브랜드 한글 명 */
    brandNameKo: string;
    /** 품절여부 */
    isSoldOut: boolean;
    /** 성인 상품 여부 */
    adult: boolean;
    optionValues: {
        /** 옵션명 */
        optionValue: string;
        /** 재고 */
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
    /** 최대 쿠폰 적용 가격 */
    maxCouponAmt: number;
    /** 상품의 상품 노출 타입 */
    productSalePeriodType: ProductSalePeriodType;
    /** 추가할인 정률 최대 할인 금액 */
    maxDiscountAmount: number;
    /** 사용가능쿠폰 존재 여부 */
    enableCoupons: boolean;
    /** 상품유형 */
    productType: ProductType;
    /** 상품번호 */
    productNo: number;
    /** 상품 유효기간 */
    expirationDate: string;
    /** 상품 등록일 */
    registerYmdt: string;
    /** 쿠폰 할인 타입 */
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
    /** 추가할인 최대 기준금액 */
    maxSalePrice: number;
    /** 홍보문구 */
    promotionText: string;
    /** 스티커 정보 */
    stickerInfos: StickerInfo[];
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
    /** 대표 옵션 재고 */
    mainStockCnt: number;
    /** 영문 상품명 */
    productNameEn: string;
    /** 재고 */
    stockCnt: number;
    /** 판매상태 */
    saleStatusType: ProductSectionSaleStatusType;
}

export interface GetProductsShippingInfoParams {
    /** 상품 번호 */
    productNos: number[];
}

export interface ProductShippingInfo {
    /** 배송 불가 국가 정보 */
    undeliverableCountries: CountryCdType[];
    /** 배송 정보 */
    deliveryFee: DeliveryFee;
    /** 배송 관련 정보 */
    shippingInfo: {
        /** 배송 설정 */
        shippingConfig: {
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
        };
        /** 배송 가능 여부 */
        shippingAvailable: boolean;
    };
    /** 상품번호 */
    productNo: number;
}

export type GetProductsShippingInfoResponse = ProductShippingInfo[];

export interface GetProductDetailParams {
    /** 인입 채널 유형(NAVER_EP, DANAWA, ENURI, WONDER, COOCHA, FACEBOOK 또는 사용자 설정) */
    channelType?: ChannelType;
    /* (관리자전용) 미리보기 전용 플래그 값 추가 */
    preview?: boolean;
}

export interface GetGroupManagementCodesData {
    /** 그룹관리코드 */
    groupManagementCodes: string[];
    /** 품절상품 포함 여부(true: 품절상품 포함, false: 품절상품 비포함 - default) (nullable) */
    isSoldOut?: Nullable<string>;
    /** 판매 상태 (전체 판매 상태 조회: ALL_CONDITIONS, 판매대기와 판매중 상품 조회: READY_ONSALE, 판매중 상품만 조회: ONSALE - default, 예약판매중인 상품과 판매중인 상품만 조회: RESERVATION_AND_ONSALE) (nullable) */
    saleStatus?: Nullable<SaleStatusType>;
}

export type GroupManagementCodeResponse = GroupManagementCode[];

export interface GroupManagementCode {
    /** 그룹관리코드 노출 설명 */
    groupManagementCodeDescription: string;
    /** 그룹관리코드 노출명 */
    groupManagementCodeName: string;
    /** 그룹관리코드 */
    groupManagementCode: string;
    /** 그룹관리 상품 */
    groupManagementMappingProducts: GroupManagementMappingProduct[];
}

/** 그룹관리 상품 */
export interface GroupManagementMappingProduct {
    /** 옵션 타입 */
    optionType: optionType;
    /** 미성년자 구매가능 여부 */
    isMinorPurchase: boolean;
    /** 옵션 사용 여부 */
    hasOption: boolean;
    /** 상품 이미지 URL (메인이미지 포함) */
    imageUrls: string[];
    /** 옵션정보 */
    options: {
        /** 옵션명(조합형일 경우 |로 구분해주세요) */
        name: string;
        /** 옵션번호 */
        optionNo: number;
        /** 옵션값(조합형일 경우 |로 구분해주세요) */
        value: string;
        /** 임시 품절 여부 */
        forcedSoldOut: boolean;
    }[];
    /** 메인 상품이미지 */
    mainImageUrl: string;
    /** 상품명 */
    productName: string;
    /** 상품번호 */
    productNo: number;
}

export interface GetProductPublicInfoParams {
    /** 상품 번호 */
    productNos: number[];
}

export type GetProductPublicInfoResponse = {
    /** 공개용 기본정보 */
    publicInfo: {
        /** 제조일자 (없을 경우 null) (nullable) */
        manufactureYmdt: string;
    };
    /** 상품번호 */
    productNo: number;
}[];

export interface GetProductsInfoByProductNosData {
    /** 옵션값 포함여부(default: false) */
    hasOptionValues?: boolean;
    /** 상품 번호 목록 */
    productNos: number[];
}

export interface GetProductsInfoByProductNosResponse {
    /** 유효하지 않은 상품 번호 */
    invalidProductNos: number[];
    /** 상품 목록 */
    products: SearchByProduct[];
}

export interface SearchByProduct {
    /** 상품 기본 정보 */
    baseInfo: {
        /** 그룹관리코드 노출명 */
        groupManagementCodeName: string;
        /** 그룹관리코드 */
        groupManagementCode: string;
        /** 좋아요 수 */
        likeCount: number;
        /** 장바구니 가능 여부 */
        canAddToCart: boolean;
        /** 총 리뷰 수 */
        totalReviewCount: number;
        /** 상품평 평균점수 */
        reviewRating: number;
        /** 좋아요 여부 */
        liked: boolean;
        /** 상품명 */
        productName: string;
        /** 적립금 사용 정보 */
        accumulationUseInfo: AccumulationUseInfo;
        /** 최대 쿠폰 적용 가격(default: 0) */
        couponDiscountAmt: number;
        /** 상품 이미지URL 정보 */
        imageUrlInfo: ImageUrlType[];
        /** 브랜드 번호 */
        brandNo: number;
        /** 브랜드 명 */
        brandName: string;
        /** 리스트 이미지 URL */
        listImageUrls: string[];
        /** 스티커 라벨(배열) */
        stickerLabels: string[];
        /** 쿠폰여부 */
        hasCoupons: HasCoupons;
        /** 판매 수량 (재고 미노출의 경우 -999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) */
        saleCnt: number;
        /** 브랜드 한글명 */
        brandNameKo: string;
        /** 판매시작일시 */
        saleStartYmdt: string;
        /** 성인 상품 여부 */
        adult: boolean;
        /** 전시카테고리 번호 정보 */
        displayCategoryNos: string;
        /** 렌탈 정보 */
        rentalInfos: RentalInfo[];
        /** 판매자 관리코드 */
        productManagementCd: string;
        /** 예약판매정보 */
        reservationData: ReservationData;
        /** 적립금 */
        accumulationAmtWhenBuyConfirm: number;
        /** 브랜드명 타입 */
        brandNameType: BrandNameType;
        /** 최대 쿠폰 적용 가격(default: 0) */
        maxCouponAmt: number;
        /** 사용가능쿠폰 존재 여부 */
        enableCoupons: boolean;
        /** 상품유형 */
        productType: ProductType;
        /** 상품번호 */
        productNo: number;
        /** 쿠폰 할인 타입 (nullable) */
        couponDiscountUnitType: Nullable<DiscountUnitType>;
        /** 상품 등록일 */
        registerYmdt: string;
        /** 파트너명 */
        partnerName: string;
        /** 상품조회화면 노출 여부 */
        urlDirectDisplayYn: boolean;
        /** 판매중지 시 가격대체문구 */
        contentsIfPausing: string;
        /** 판매종료일시 */
        saleEndYmdt: string;
        /** 홍보문구 */
        promotionText: string;
        /** 판매기간 타입 */
        salePeriodType: ProductSaleStatusType;
        /** 스티커 정보 */
        stickerInfos: StickerInfo[];
        /** 상품 리스트 이미지 정보 */
        listImageUrlInfo: ImageUrlType;
        /** HS CODE */
        hsCode: string;
        /** 상품 이미지URL */
        imageUrls: string[];
        /** 브랜드 영문 명 */
        brandNameEn: string;
        /** 적립금 정보 */
        accumulationInfo: AccumulationInfo;
        /** 대표 옵션 재고(재고 미노출의 경우 - 999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) */
        mainStockCnt: number;
        /** 영문 상품명 */
        productNameEn: string;
        /** 재고(재고 미노출의 경우 - 999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) */
        stockCnt: number;
    };
    /** 상품 항목 추가 정보 */
    customProperties: CustomProperties[];
    /** 배송정보 */
    deliveryFee: {
        /** 배송비 타입 */
        deliveryConditionType: DeliveryConditionType;
        /** 배송비 (고정배송비, 조건부 배송비인 경우) */
        deliveryAmt: number;
    };
    price: Omit<
        Price,
        | 'accumulationAmtWhenBuyConfirm'
        | 'contentsIfPausing'
        | 'accumulationRate'
        | 'accumulationRateOfMember'
        | 'maxCouponAmt'
        | 'couponDiscountAmt'
        | 'maxDiscountAmount'
        | 'photoReviewAccumulationAmt'
    >;
    /** 배송 구분 */
    shippingArea: ShippingAreaType;
    /** 옵션 정보 */
    optionValues: {
        /** 옵션명 */
        optionValue: string;
        /** 재고 (재고 미노출의 경우 -999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) */
        stockCnt: number;
        /** 옵션번호 */
        optionNo: number;
        /** 상품번호 */
        productNo: number;
    }[];
    /** 상품 상태 */
    status: Status;
}

export interface ExtraInfo {
    /** 상품 번호 */
    productNo: number;
    /** 추가정보 */
    extraInfo: string;
}

export interface GetChangeableRegularDeliveryProductsParams {
    /** 페이지 번호 (default : 1) (nullable) */
    page?: number;
    /** 한 페이지당 노출 수 (default : 10) (nullable) */
    size?: number;
    /** 상품 번호 */
    productNos: number[];
}

export interface GetChangeableRegularDeliveryProductsResponse {
    recurringDeliveryProductViews: {
        /** 옵션 여부 */
        optionYn: 'Y' | 'N';
        /** 즉시 할인 정보 단위 */
        immediateDiscountType: 'AMOUNT';
        /** 요일 단위 배송 주기 */
        dayOfWeekCycles: ('MONDAY' | 'TUESDAY' | 'FRIDAY')[];
        /** 월/주 단위 배송 주기 */
        deliveryCycleTypes: ('WEEK' | 'MONTH')[];
        /** 상품 판매가(할인 적용 전) */
        salePrice: number;
        /** 판매 상태 Enum: [ READY: 판매대기, ONSALE: 판매중, FINISHED: 판매종료, STOP: 판매중지, PROHIBITION: 판매금지 ] */
        saleStatus: 'READY' | 'ONSALE' | 'FINISHED' | 'STOP' | 'PROHIBITION';
        /** 즉시 할인 양 */
        immediateDiscountAmount: number;
        /** 전시 카테고리 번호 */
        displayCategoryNo: number;
        /** 상품명 */
        productName: string;
        /** 상품 판매가(할인 적용) */
        discountedPrice: number;
        /** 상품 이미지 URL */
        imageUrl: string;
        /** 품절 여부 */
        isSoldOut: boolean;
        /** 주 단위 배송 주기 */
        weekDeliveryCycles: number[];
        /** 즉시 할인가 */
        appliedImmediateDiscountPrice: number;
        /** 상품 번호 */
        productNo: number;
        /** 월 단위 배송 주기 */
        monthDeliveryCycles: number[];
    }[];
    /** 검색한 페이지 */
    totalPage: number;
    /** 총 개수 */
    totalCount: number;
}

export interface RequestRestockNotificationData {
    /** 개인정보 수집 동의여부 (true:개인정보 수집 동의 ,false:개인정보 수집 비동의 - default) */
    privacyInfoAgreement: boolean;
    /** 옵션번호  */
    optionNos: number[];
    /** 휴대폰번호: -(하이픈) 제외 */
    phone: string;
    /** 신청자명 */
    name: string;
}

export interface ProductSearchParams extends Paging {
    filter?: {
        /** 판매가 - 즉시할인 - 추가상품할인이 적용된 "최종 할인가격", between검색일 경우 입력값 2개 필요(다수 정보는 항목 추가 필요) */
        discountedPrices?: number[];
        /** 검색어(여러 검색어일 경우 space 로 구분 AND 연산) */
        keywords?: string;
        /** 결과내 검색(결과 내 검색의 검색어 space 구분 AND 연산) */
        keywordInResult?: string;
        /** 최종 할인가격 검색 조건 */
        discountedComparison?: DiscountedComparisonType;
        /** 배송비 타입 */
        deliveryConditionType?: DeliveryConditionType;
        /** 판매 상태 (판매중 상품만 조회: ONSALE - default) */
        saleStatus?: SaleStatusType;
        /** 품절 상품 포함 여부(default: false) */
        soldout?: boolean;
        /** 총 상품평 수 포함 여부(default: false, false 설정 시 무조건 0) */
        totalReviewCount?: boolean;
        /** 서비스에 계약된 모든 쇼핑몰 조회 여부 (default: false) */
        familyMalls?: boolean;
        /** 판매자관리코드 같은 상품 검색 */
        productManagementCd?: string;
        /** 조회시 제외할 상품번호 */
        excludeMallProductNo?: number;
        /** 조회할 상품번호 */
        includeMallProductNo?: number;
        /** 전시안함 카테고리 포함여부 - 전시카테고리 하위뎁스중 하나라도 전시안함인 경우 결과값에 포함되지 않습니다.(default : false) */
        includeNonDisplayableCategory?: boolean;
        customProperties?: {
            /** 조회할 상품항목추가정보 번호 */
            propNos: string;
            /** 조회할 상품항목추가정보 값 */
            propValueNos: string;
            /** 상품항목추가정보 조회 조건 (AND: 모두 만족하는 상품만 조회, OR: 하나라도 포함되는 상품 조회) */
            propOperator: CategoryOperatorType;
        };
        /** 조회할 스티커번호 */
        stickerNos?: number[];
        /** 상품평 최소 범위 조회 조건 */
        minReviewRating?: number;
        /** 상품평 최대 범위 조회 조건 */
        maxReviewRating?: number;
        /** 판매중지 상품을 포함할지 여부를 선택할 수 있습니다.(default: false) */
        includeStopProducts?: boolean;
        /** 상품명 부분 일치 검색 활성화 여부를 선택할 수 있습니다. 키워드가 2자 이상이어야 활성화 됩니다. */
        includeLikeSearch?: boolean;
    };
    order?: {
        /** 정렬 방법 (POPULAR:판매인기순 (DEFAULT) */
        by?: OrderByType;
        /** 정렬기준(default : DESC) */
        direction?: OrderDirectionType;
        /** 품절상품 뒤로 배치 여부(default = false) */
        soldoutPlaceEnd?: boolean;
    };
    /** 전시 카테고리 번호(여러개 일 경우 항목 추가) */
    categoryNos?: number[];
    /** 제외할 전시 카테고리 번호(여러개 일 경우 항목 추가, 번호에 속한 모든 하위 카테고리 제외) */
    excludeCategoryNos?: string;
    /** 전시카테고리 검색 조건 (AND : 모두다 포함, OR : 한개라도 포함), default: OR */
    categoryOperator?: CategoryOperatorType;
    /** 브랜드 번호(여러개 일 경우 항목 추가) */
    brandNos?: string[];
    /** 파트너 번호(상품 공급업체 번호, 여러개 일 경우 항목 추가) */
    partnerNos?: number;
    /** 클라이언트 키 */
    clientKey?: string;
    /** 세일 상품만 조회 여부(default: false) */
    onlySaleProduct?: boolean;
    /** 목록에 최대 할인 쿠폰 가격 포함 여부(default: false) */
    hasMaxCouponAmt?: boolean;
    /** 목록에 옵션 value 포함 여부(default: false) */
    hasOptionValues?: boolean;
    /** summary 정보 포함 여부(deprecated, 제공 안함) */
    includeSummaryInfo?: boolean;
    /** 배송 구분 (Enum: [ PARTNER: Partner Shipping, MALL: Mall Shipping ]) */
    shippingAreaType?: SearchShippingAreaType;
    /** 유효일자 */
    expirationDate?: string;
    /** 상품 그룹관리코드 */
    groupManagementCode?: string;
}

export interface RecurringDeliveryProductView {
    /** 옵션 여부 */
    optionYn: OptionYnType;
    /** 즉시 할인 정보 단위 */
    immediateDiscountType: string;
    /** 요일 단위 배송 주기 */
    dayOfWeekCycles: DayOfWeekCycleType[];
    /** 월/주 단위 배송 주기 */
    deliveryCycleTypes: CycleType[];
    /** 상품 판매가 */
    salePrice: number;
    /** 즉시 할인 양 */
    immediateDiscountAmount: number;
    /** 전시 카테고리 번호 */
    displayCategoryNo: number;
    /** 상품명 */
    productName: string;
    /** 상품 판매가(할인 적용) */
    discountedPrice: number;
    /** 상품 이미지 URL */
    imageUrl: string;
    /** 상품 품절 여부 */
    isSoldOut: boolean;
    /** 주 단위 배송 주기 */
    weekDeliveryCycles: number[];
    /** 즉시 할인가 */
    appliedImmediateDiscountPrice: number;
    /** 상품 번호 */
    productNo: number;
    /** 월 단위 배송 주기 */
    monthDeliveryCycles: number[];
}

export interface GetBestSellerProductsParams extends Paging {
    /** 서비스에 계약된 모든 쇼핑몰 조회 여부 (default: false) */
    filter?: {
        familyMalls?: boolean;
    };
    /** 카테고리 번호(여러개 일 경우 항목 추가) */
    categoryNos?: number[];
    /** 목록에 옵션 value 포함 여부(default: false) */
    hasOptionValues?: boolean;
}

export interface GetBestSellerProductsResponse {
    /** 페이지 수 */
    pageCount: number;
    /** 재고 노출 여부 (false:재고 미노출 / true:재고 노출) */
    displayableStock: boolean;
    /** 총 개수 */
    totalCount: number;
    items: BestSellerProductItem[];
}

export interface BestSellerProductItem {
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
    accumulationUseInfo: AccumulationUseInfo;
    /** 최대 쿠폰 적용 금액 */
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
    immediateDiscountUnitType: string;
    /** 추가상품할인 타입 */
    additionDiscountUnitType: string;
    /** 전시 여부 */
    frontDisplayYn: boolean;
    /** 판매 수량 */
    saleCnt: number;
    /** 상품 항목 추가 정보 */
    customProperties: CustomProperties[];
    /** 판매시작일시 */
    saleStartYmdt: string;
    /** 브랜드 한글 명 */
    brandNameKo: string;
    /** 품절여부 */
    isSoldOut: boolean;
    /** 성인 상품 여부 */
    adult: boolean;
    /** 상품 조합형 옵션정보 ( 옵션명은 | 라인으로 구분 ) */
    optionValues: {
        /** 옵션명 */
        optionValue: string;
        /** 재고 */
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
    /** 해당 상품의 옵션을 여러개 구매할 경우 받을 수 있는 최대한의 쿠폰할인 금액 */
    maxCouponAmt: number;
    /** 상품의 상품 노출 타입 */
    productSalePeriodType: string;
    /** 추가할인 정률 최대 할인 금액 */
    maxDiscountAmount: number;
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
    /** 판매중지 시 가격대체문구 */
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
    listImageUrlInfo: ImageUrlType;
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
    /** 대표 옵션 재고 */
    mainStockCnt: number;
    /** 영문 상품명 */
    productNameEn: string;
    /** 재고 */
    stockCnt: number;
    /** 판매상태 */
    saleStatusType: ProductSectionSaleStatusType;
}

export type GetProductSearchSummaryParams = Pick<
    ProductSearchParams,
    | 'filter'
    | 'categoryNos'
    | 'excludeCategoryNos'
    | 'categoryOperator'
    | 'brandNos'
    | 'partnerNos'
    | 'onlySaleProduct'
    | 'shippingAreaType'
>;

export interface GetRegularDeliveryProductsByProductNos {
    /** 상품 번호 */
    productNos: number[];
}

export type GetRegularDeliveryProductsResponse = {
    /** 즉시 할인된 금액 */
    discountedPrice: number;
    /** 즉시 할인 정보 */
    discount: {
        /** 즉시 할인 정보 단위 */
        type: string;
        /** 즉시 할인 양 */
        value: number;
    };
    /** 몰번호 */
    mallNo: number;
    /** 상품 번호 */
    productNo: number;
}[];

export interface GetKeywordsByProductNoParams {
    /** 상품 번호 */
    productNos: number[];
}

export type GetKeywordsByProductNoResponse = {
    /** 검색어 */
    keywords: string[];
    /** 상품번호 */
    productNo: number;
}[];

export interface ChildrenCategory {
    /** 부모 카테고리 번호 */
    parentCategoryNo: number;
    /** 전시 순서 */
    displayOrder: number;
    /** 카테고리 상품 개수 */
    count: number;
    /** 카테고리번호 */
    categoryNo: number;
    /** 카테고리 명 */
    label: string;
    /** 하위 카테고리 */
    childCategories: ChildrenCategory[];
}

export interface GetProductSearchSummaryResponse {
    brands: {
        /** 브랜드이름 */
        brandName: string;
        /** 브랜드 한글명 */
        brandNameKo: string;
        /** 브랜드 상품 수 */
        count: number;
        /** 브랜드 영문명 */
        brandNameEn: string;
        /** 브랜드명 타입 (NAME_KO: Korean, NAME_EN: English, NONE: none) */
        brandNameType: string;
        /** 브랜드번호 */
        brandNo: number;
    }[];
    depth4Categories: ChildrenCategory[];
    depth3Categories: ChildrenCategory[];
    depth2Categories: ChildrenCategory[];
    /** 총 개수 */
    totalCount: number;
    /** 상품추가항목 */
    customProperties: {
        propValues: {
            /** 추가항목값 번호 */
            propValueNo: number;
            /** 추가항목값 */
            propValue: string;
        }[];
        /** 추가 항목 타입, Enum: [ STRING: 문자열, COLOR: 컬러 ] */
        propType: CustomPropertiesPropType;
        /** 상품 항목명 */
        propName: string;
        /** 상품 항목명 번호 */
        propNo: number;
    }[];
    multiLevelCategories: {
        /** 부모 카테고리 번호 */
        parentCategoryNo: number;
        /** 전시 순서 */
        displayOrder: number;
        /** 카테고리 상품 개수 */
        count: number;
        /** 카테고리번호 */
        categoryNo: number;
        /** 하위 카테고리 */
        childCategories: ChildrenCategory[];
        /** 카테고리 명 */
        label: string;
    }[];
    /** 최소 가격 */
    minPrice: number;
    depth1Categories: ChildrenCategory[];
    /** 재고 노출 여부 (false:재고 미노출 / true:재고 노출) */
    displayableStock: boolean;
    /** 최대 가격 */
    maxPrice: number;
    clickUrlPrefix: {
        /** 인자 값 */
        param: string;
        /** url */
        url: string;
    };
    depth5Categories: ChildrenCategory[];
}

export type GetProductDisplayCategoriesResponse = {
    /** 마지막 전시카테고리 이름 (항상 최하위 뎁스 카테고리 정보와 매칭됩니다) */
    depth5Name: string;
    /** 첫번째 전시카테고리 번호 */
    depth1No: number;
    /** 전시카테고리 전체 이름 */
    fullCategoryName: string;
    /** 세번째 전시카테고리 이름 */
    depth3Name: string;
    /** 두번째 전시카테고리 이름 */
    depth2Name: string;
    /** 네번째 전시카테고리 이름 */
    depth4Name: string;
    /** 두번째 전시카테고리 번호 */
    depth2No: number;
    /** 첫번째 전시카테고리 이름 */
    depth1Name: string;
    /** 세번째 전시카테고리 번호 */
    depth3No: number;
    /** 네번째 전시카테고리 번호 */
    depth4No: number;
    /** 마지막 뎁스의 전시카테고리 번호 (항상 최하위 뎁스 카테고리 정보와 매칭됩니다) */
    depth5No: number;
}[];

export type GetPriorityPurchasableRightResponse = {
    /** 회원이 구매가능한 최대개수 */
    purchaseCnt: number;
    /** 상품구매가능 시작일 */
    purchaseStartAt: string;
    /** 상품구매가능 종료일 */
    purchaseEndAt: string;
    /** 구매권한번호 */
    permissionNo: number;
    /** 옵션번호 */
    optionNo: number;
    /** 회원이 구매권한을 통해 구매한 개수 */
    purchasedCnt: number;
}[];

export interface RelatedProductInfo {
    /** 성인인증 필요 여부 */
    requiresAgeVerification: boolean;
    /** 즉시할인액 */
    immediateDiscountAmt: number;
    /** 추가할인 타입 */
    additionalDiscountUnitType: DiscountUnitType;
    /** 판매가 */
    salePrice: number;
    /** 즉시할인 시작일자 (nullable) */
    immediateDiscountStartYmdt: Nullable<string>;
    /** 즉시할인 타입 */
    immediateDiscountUnitType: string;
    /** 이미지 URL 타입 */
    imageUrlType: string;
    /** 가격대체문구 (nullable) */
    contentsIfPausing: Nullable<string>;
    /** 장바구니 사용 여부 */
    canAddToCart: boolean;
    /** 상품명 */
    productName: string;
    /** 추가할인액 */
    additionalDiscountAmt: number;
    /** 즉시할인 종료일자 (nullable) */
    immediateDiscountEndYmdt: Nullable<string>;
    /** 이미지 URL */
    imageUrl: string;
    /** 영문상품명 (nullable) */
    productNameEn: Nullable<string>;
    /** 스티커 */
    stickers: StickerInfo[];
    /** 상품 번호 */
    productNo: number;
}

export type GetRelatedProductsResponse = RelatedProductInfo[];

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

export interface GetShortUrlResponse {
    /** 단축URL */
    url: string;
}

export interface ProductsSearchResponse {
    /** 페이지 수 */
    pageCount: number;
    /** 재고 노출 여부 (false:재고 미노출 / true:재고 노출)
        false로 재고를 숨김처리 한 경우,
        재고 관련 필드는(실제 재고가 있더라도) -999로 고정으로 리턴하며 실재고 값은 따로 내려주지 않아 조회 불가합니다.
        실재고가 0인 경우에만 0으로 응답합니다.
        만약 재고 숨김처리 시, front에서 [-999]로 표시되도록 처리되고 있는게 있다면 재고노출여부(displayableStock)를 기준으로 수정 작업이 필요합니다.
        만약 재고 숨김처리 시, front에서 [품절]로 표시되도록 처리되고 있는게 있다면 재고/예약재고값을 기준이 아닌, 품절상태(isSoldOut)값을 기준으로 처리되도록 수정 작업이 필요합니다.
     */
    displayableStock: boolean;
    /** 총 개수 */
    totalCount: number;
    clickUrlPrefix: {
        /** 인자 값 */
        param: string;
        /** url */
        url: string;
    };
    /** 상품 목록 */
    items: SearchProductItem[];
}

export interface FlatCategory {
    /** 부모 카테고리 번호 */
    parentCategoryNo: number;
    /** 전시 순서 */
    displayOrder: number;
    /** 카테고리 상품 개수 */
    count: number;
    /** 카테고리번호 */
    categoryNo: number;
    /** 카테고리 명 */
    label: string;
}

export interface MultiLevelCategory extends FlatCategory {
    /** 하위 카테고리 */
    childCategories: Category[];
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
export interface DisplayCategory extends Category {
    /** 대표 전시 카테고리 여부 */
    representativeYn: 'Y' | 'N';
}

export interface ProductItem {
    /** 추가할인 최소 기준금액 (nullable) */
    minSalePrice: Nullable<number>;
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
    accumulationUseInfo: AccumulationUseInfo;
    /** 최대 쿠폰 적용 가격(default: 0) */
    couponDiscountAmt: number;
    /** 상품조회화면 노출 여부 */
    urlDirectDisplayable: boolean;
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
    /** 즉시할인 타입 Enum: [WON: Sum, RATE: rate] */
    immediateDiscountUnitType: 'WON' | 'RATE';
    /** 추가상품할인 타입 Enum: [WON: Sum, RATE: rate] */
    additionDiscountUnitType: 'WON' | 'RATE';
    /** 판매 수량 (재고 미노출의 경우 -999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) */
    saleCnt: number;
    /** 상품 항목 추가 정보 */
    customProperties: CustomProperties[];
    /** 판매시작일시 */
    saleStartYmdt: string;
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
        /** 옵션번호 */
        optionNo: number;
        /** 상품번호 */
        mallProductNo: number;
    }[];
    /** 전시카테고리 번호 정보 */
    displayCategoryNos: string;
    /** 판매자 관리코드 */
    productManagementCd: string;
    /** 예약판매정보 */
    reservationData: ReservationData;
    /** 배송비 타입 */
    deliveryConditionType: DeliveryConditionType;
    /** 최대 쿠폰 적용 가격(default: 0) */
    maxCouponAmt: number;
    /** 판매기간유형 (nullable) REGULAR: 상시 판매, PERIOD: 기간지정 판매 */
    productSalePeriodType: Nullable<'REGULAR' | 'PERIOD'>;
    /** 추가할인 정률 최대 할인 금액 (nullable) */
    maxDiscountAmount: Nullable<number>;
    /** 사용가능쿠폰 존재 여부 */
    enableCoupons: boolean;
    /** 전시 노출 여부 */
    frontDisplayable: boolean;
    /** 상품번호 */
    productNo: number;
    /** 등록일 */
    registerYmdt: string;
    /** 쿠폰 할인 타입 (nullable) */
    couponDiscountUnitType: Nullable<'WON' | 'RATE'>;
    /** 상품판매가 */
    salePrice: number;
    /** 파트너명 */
    partnerName: string;
    /** 즉시할인 시작일자 */
    immediateDiscountStartYmdt: string;
    /** 판매중지 시 가격대체문구 */
    contentsIfPausing: Nullable<string>;
    /** 판매종료일시 */
    saleEndYmdt: string;
    /** 추가할인 최대 기준금액 */
    maxSalePrice: Nullable<number>;
    /** 홍보문구 */
    promotionText: string;
    /** 스티커 정보 */
    stickerInfos: StickerInfo[];
    /** 리스트 이미지 정보 */
    listImageUrlInfo: ImageUrlType[];
    /** 즉시할인 종료일자 */
    immediateDiscountEndYmdt: string;
    /** 상품 이미지 URL */
    imageUrls: string[];
    /** 브랜드 영문 명 */
    brandNameEn: string;
    /** 대표 옵션 재고 (재고 미노출의 경우 -999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) */
    mainStockCnt: number;
    /** 영문 상품명 */
    productNameEn: string;
    /** 재고 (재고 미노출의 경우 -999 재고 미노출 설정일때 실재고가 없는 경우, 0으로 표기) */
    stockCnt: number;
    /** 판매상태 */
    saleStatusType: ProductSectionSaleStatusType;
}

export interface SearchProductItem
    extends Omit<ProductItem, 'urlDirectDisplayable' | 'frontDisplayable'> {
    /** 그룹관리코드 노출명 */
    groupManagementCodeName: string;
    /** 그룹관리코드 */
    groupManagementCode: string;
    /** 전시 여부 */
    frontDisplayYn: boolean;
    /** 브랜드 한글명 */
    brandNameKo: string;
    /** 렌탈 정보 */
    rentalInfos: RentalInfo[];
    /** 적립금 */
    accumulationAmtWhenBuyConfirm: number;
    /** 배송비 조건 */
    deliveryConditionInfo: DeliveryConditionInfo;
    /** 브랜드명 타입 (NAME_KO: 한글, NAME_EN: 영문, NONE: 없음) */
    brandNameType: BrandNameType;
    /** 파트너번호 */
    partnerNo: number;
    /** 상품유형 */
    productType: ProductType;
    /** 상품 유효기간 (nullable) */
    expirationDate: Nullable<string>;
    /** 상품조회화면 노출 여부 */
    urlDirectDisplayYn: boolean;
    /** 배송 구분 (PARTNER_SHIPPING_AREA: 파트너물류센터 출고, MALL_SHIPPING_AREA: 쇼핑몰물류센터 출고) */
    shippingArea: ShippingAreaType;
    /** HS CODE */
    hsCode: string;
    /** 적립금 정보 */
    accumulationInfo: AccumulationInfo;
}

export interface GetProductExtraInfoParams {
    /** 상품 번호 */
    productNos: number[];
}

export type GetProductExtraInfoResponse = ExtraInfo[];

export interface GetFavoriteKeywordsParams {
    /** 사이즈 */
    size?: number;
}

export type GetFavoriteKeywordsResponse = string[];

export interface GetPublicInfoParams {
    /** 상품 번호 */
    productNos: string;
}

export type GetPublicInfoResponse = PublicInfo[];

export interface PublicInfo {
    /** 공개용 기본정보 */
    publicInfo: {
        /** 제조일자 (없을 경우 null) (nullable) */
        manufactureYmdt: Nullable<any>;
    };
    /** 상품번호 */
    productNo: number;
}

export interface GetRegularDeliveryProductsParams {
    /** 페이지 번호 (default : 1) (nullable) */
    page?: number;
    /** 한 페이지당 노출 수 (default : 10) (nullable) */
    size?: number;
    /** 전시 카테고리 번호 정보 (nullable) */
    displayCategoryNos?: string;
}

export interface CustomProperties {
    /** 항목 복수선택여부 (true: 복수개 선택가능, false: 1개만 선택가능) */
    isMultipleSelection: boolean;
    /** 상품 항목 값 번호 */
    propValueNo: number;
    /** 추가 항목 타입, Enum: [ STRING: 문자열, COLOR: 컬러 ] */
    propType: CustomPropertiesPropType;
    /** 상품 항목 값 */
    propValue: string;
    /** 상품 항목명 */
    propName: string;
    /** 상품 항목명 번호 */
    propNo: number;
}

export interface SearchRegularDeliveryProductsParams {
    /** 상품 번호 */
    productNos: number[];
}

export interface SearchRegularDeliveryProduct {
    /** 즉시 할인된 금액 */
    discountedPrice: number;
    /** 즉시 할인 정보 */
    discount: {
        /** 즉시 할인 정보 단위 */
        type: string;
        /** 즉시 할인 양 */
        value: number;
    };
    /** 몰번호 */
    mallNo: number;
    /** 상품 번호 */
    productNo: number;
}

export type SearchRegularDeliveryProductsParamsResponse =
    SearchRegularDeliveryProduct[];

export interface GetExtraProductsResponse {
    /** 추가상품 정보 */
    extraProducts: ExtraProduct[];
    /** 추가상품명 */
    extraProductTitle: string;
}

export interface ExtraProduct {
    /** 추가상품의 결제수단정보 */
    paymentMeans: PayType;
    /** 추가상품의 가격관련 정보 */
    price: {
        /** 추가상품의 판매가 */
        salePrice: number;
        /** 추가상품의 즉시할인정보 */
        immediateDiscountInfo: {
            /** 추가상품의 즉시할인금액 */
            discountAmt: number;
            /** 추가상품의 즉시할인 시작시간 */
            startDateTime: string;
            /** 추가상품의 즉시할인 종료시간 */
            endDateTime: string;
        };
        /** 추가상품의 쿠폰할인정보 */
        couponDiscountInfo: {
            /** 추가상품의 최대 쿠폰할인금액 */
            maxCouponAmt: number;
            /** 추가상품의 쿠폰할인금액 */
            couponDiscountAmt: number;
        };
        /** 추가상품의 추가할인정보 */
        additionalDiscountInfo: {
            /** 추가상품의 추가할인금액 */
            discountAmt: number;
            /** 추가상품의 추가할인 시작일 */
            startDateTime: string;
            /** 추가상품의 추가할인 종료일 */
            endDateTime: string;
        };
    };
    /** 추가상품의 미성년자구매가능여부 */
    minorPurchaseYn: string;
    /** 추가상품의 이미지 */
    imageUrl: string;
    /** 추가상품의 옵션정보 */
    optionInfo: {
        /** 추가상품의 옵션타입 */
        optionType: optionType;
        /** 분리형 옵션 */
        multiOptions: {
            /** 필수 옵션 여부 */
            isRequiredOption: boolean;
            children: {
                /** 할인적용가 */
                buyPrice: number;
                /** 필수 옵션 여부 */
                isRequiredOption: boolean;
                /** 예약재고수량 */
                reservationStockCnt: number;
                /** 옵션판매타입(AVAILABLE, SOLD_OUT) */
                saleType: string;
                /** 옵션값 */
                optionValue: string;
                /** 추가금액 */
                addPrice: number;
                /** 재고수량 */
                stockCnt: number;
                /** 옵션번호 */
                optionNo: number;
                /** 옵션명 */
                optionName: string;
                /** 품절노출 세팅 여부 */
                forcedSoldOut: boolean;
            }[];
            /** 옵션값 */
            optionValue: string;
            /** 옵션명 */
            optionName: string;
        }[];
        /** 일체형 옵션 */
        flatOptions: {
            /** 필수 옵션 여부 */
            isRequiredOption: boolean;
            /** 할인적용가 */
            buyPrice: number;
            /** 예약재고수량 */
            reservationStockCnt: number;
            /** 옵션판매타입 */
            saleType: string;
            /** 옵션값 */
            optionValue: string;
            /** 추가금액 */
            addPrice: number;
            /** 재고수량 */
            stockCnt: number;
            /** 옵션번호 */
            optionNo: number;
            /** 옵션명 */
            optionName: string;
            /** 품절노출 세팅 여부 */
            forcedSoldOut: boolean;
        }[];
        /** 구매자 작성형 정보(텍스트 옵션 내 기입문장) */
        inputs: {
            /** 매칭타입 */
            inputMatchingType: InputMatchingType;
            /** 텍스트 옵션 입력 문구 */
            inputLabel: string;
            /** 필수 여부 */
            required: boolean;
            /** 텍스트 옵션 번호 */
            inputNo: number;
        }[];
        /** 추가상품의 선택옵션타입 */
        optionSelectType: OptionSelectType;
    };
    /** 재고노출여부 */
    displayableStock: boolean;
    /** 추가상품의 상품명 */
    productName: string;
    /** 추가상품의 상품번호 */
    productNo: number;
    /** 추가상품의 구매제한 */
    limitations: {
        /** 추가상품의 환불불가 타입 */
        nonRefundTypes: (boolean | string | number)[];
        /** 추가상품의 최소구매수량 */
        minBuyCnt: number;
        /** 추가상품의 1회당 최대 구매 수량 */
        maxBuyTimeCnt: number;
        /** 추가상품의 최대구매수량 기간 제한 - 기간 */
        maxBuyDays: number;
        /** 추가상품의 최대구매수량 기간 제한 - 제한 수량 */
        maxBuyPeriodCnt: number;
        /** 추가상품의 인당 최대구매수량 */
        maxBuyPersonCnt: number;
        /** 추가상품의 환불가능여부 */
        refundable: boolean;
        /** 추가상품의 네이버페이 가능여부 */
        naverPayHandling: boolean;
        /** 추가상품의 회원전용여부 */
        memberOnly: boolean;
        /** 추가상품의 장바구니 가능여부 */
        canAddToCart: boolean;
    };
}
