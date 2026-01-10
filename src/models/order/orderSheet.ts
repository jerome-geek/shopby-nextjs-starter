import {
    CycleType,
    DayOfWeekCycleType,
    DaysOfWeekType,
    DeliveryConditionType,
    DeliveryPayType,
    GroupDeliveryAmtType,
    ImageUrlType,
    OptionType,
    OrderAgreementType,
    OrderTermsType,
    PayType,
    ShippingAreaType,
} from '@/models';
import {
    AddressRequest,
    AppliedCoupons,
    AvailablePayType,
    CartCoupon,
    CouponRequest,
    ForeignPartner,
    FreeGiftInfo,
    OptionInputs,
    OrdererContact,
    OrderSheetAddress,
    OrderSheetPromotionSummary,
    PaymentInfo,
    ProductCoupon,
    SellerPrivacyUsagePartner,
    ShippingAddresses,
    TradeBankAccountInfo,
} from '@/models/order';

export interface WriteOrderSheetData {
    /** 상품 쿠폰 (nullable) */
    productCoupons?: {
        /** 쿠폰 발급 번호 */
        couponIssueNo: Nullable<number>;
        /** 상품번호 */
        mallProductNo: Nullable<number>;
    }[];
    /** 쇼핑채널링-추적키 */
    trackingKey?: Nullable<string>;
    /** 장바구니 번호 리스트 (장바구니 통해서 구매한 경우 - 구매 완료 시 해당 장바구니를 삭제합니다.) (nullable) */
    cartNos?: Nullable<number[]>;
    /** 쇼핑채널링-채널타입 (nullable) */
    channelType?: Nullable<string>;
    products: {
        /** 렌탈 정보 (nullable) */
        rentalInfos?: Nullable<
            {
                /** 월 렌탈료 */
                monthlyRentalAmount: number;
                /** 렌탈 기간 */
                rentalPeriod: number;
            }[]
        >;
        /** 정기결제 배송 정보 */
        recurringPaymentDelivery?: {
            /** 정기결제 배송주기 일자 (nullable) */
            date?: Nullable<number>;
            /** 정기결제 배송주기 타입 (nullable) */
            cycleType?: Nullable<CycleType>;
            /** 배송요일 (nullable) */
            dayOfWeek?: Nullable<DayOfWeekCycleType>;
            /** 정기결제 배송주기 (nullable) */
            cycle?: Nullable<number>;
        };
        /** 추가상품이 있는 상품번호 (nullable) */
        baseProductNo?: Nullable<number>;
        /** 정기결제 종료 회차 (nullable) */
        recurringPaymentLastRound?: number;
        /** 쇼핑채널링 - 채널타입(nullable) */
        channelType?: Nullable<string>;
        /** 주문수량 */
        orderCnt: number;
        /** 소비자 입력형 옵션 (nullable) */
        optionInputs?: Omit<OptionInputs, 'inputNo'>[];
        /** 옵션번호 */
        optionNo: number;
        /** 상품번호 */
        productNo: number;
    }[];
}

export interface WriteOrderSheetResponse {
    /** 주문서번호 */
    orderSheetNo: string;
}

export interface GetOrderSheetParams {
    /** 회원주소포함여부 */
    includeMemberAddress?: boolean;
}

export interface GetOrderSheetResponse {
    rentalInfos?: {
        /** 월 렌탈료 */
        monthlyRentalAmount: number;
        /** 렌탈 기간 */
        rentalPeriod: number;
    }[];
    /** 합배송 그룹별 상품 목록 */
    deliveryGroups: DeliveryGroup[];
    /** 개인정보 사용 파트너 */
    sellerPrivacyUsagePartners: SellerPrivacyUsagePartner[];
    /** 적용된 쿠폰 (nullable) */
    appliedCoupons?: Nullable<{
        /** 상품 쿠폰 (nullable) */
        productCoupons: Nullable<
            {
                /** 쿠폰 발급 번호 */
                couponIssueNo?: number;
                /** 상품번호 */
                productNo: number;
            }[]
        >;
        /** 장바구니 쿠폰 발행 번호 */
        cartCouponIssueNo: number;
        /** 쿠폰 할인 코드 */
        promotionCode: string;
    }>;
    /**
     * 사용가능한 결제정보
     * 쇼핑몰에서 다양한 PG사와 계약해서 결제수단을 제공할 수 있기 때문에, payType을 기준으로 pgTypes를 내려주고 있으니 프론트에서 구현 시 내려온 pgTypes에 따라 결제모듈을 제공할 수 있습니다.
     */
    availablePayTypes: AvailablePayType[];
    /** 거래은행 정보 */
    tradeBankAccountInfos: TradeBankAccountInfo[];
    /** 유효하지 않은 상품 (nullable) */
    invalidProducts?: (boolean | string | number)[];
    freeGiftInfos?: FreeGiftInfo[];
    /** 주문자 연락처 (nullable) */
    ordererContact?: Nullable<OrdererContact>;
    /** 쿠폰, 적립금 동시 사용 차단 여부 */
    blockUseAccumulationWhenUseCoupon: boolean;
    /** 필수동의항목 */
    agreementTypes: OrderAgreementType[];
    /** 개인통관고유부호필요여부 (true: 필요, false: 불필요) */
    requireCustomsIdNumber: boolean;
    /** 배송 불가능한 국가 목록 (ISO 3166-1 alpha-2) */
    undeliverableCountries: (boolean | string | number)[];
    /** 최근 사용한 결제 수단 */
    lastPayType?: Nullable<PayType>;
    /** 프로모션 정보 요약 (nullable) */
    orderSheetPromotionSummary?: Nullable<OrderSheetPromotionSummary>;
    /** 무통장입금 거래 시 현금영수증 사용 여부 (true: 사용, false: 미사용) */
    applyCashReceiptForAccount: boolean;
    /** 필수 약관 동의 항목 리스트 */
    termsInfos: {
        /** 약관 내용 */
        contents: string;
        /** 약관명 */
        termsName: string;
        /** 필수 약관 항목 */
        termsType: OrderTermsType;
        /** 필수 여부 */
        required: boolean;
        /** 필수 약관 번호 */
        termsNo: number;
    }[];
    /** 외부결제수단정보 (nullable) */
    externalPaymentInfos?: Nullable<
        {
            /** 외부보조결제수단별 고유 키값 */
            externalPayKey: string;
            /** 외부보조결제수단별 사용 가능한 금액 (nullable) */
            availableAmt?: Nullable<number>;
            /** 외부 보조 결제수단명(노출용) */
            externalPayName: string;
        }[]
    >;
    /** 추가 약관 동의 항목 리스트 */
    customTermsInfos: {
        /** 약관 내용 */
        contents: string;
        /** 약관명 */
        termsName: string;
        /** 추가 약관 번호 */
        customTermsNo: number;
        /** 필수 여부 */
        required: boolean;
        /** 약관 영문명 */
        termsNameEng: string;
    }[];
    myPayInfo?: {
        /** 대표 색상 (3 또는 6자리의 16진수) */
        mainColor: string;
        /** 로고 이미지 사용 여부 */
        useLogo: boolean;
        /** 커스텀 css URL (몰마다 항상 동일하며, 앞에 Shop API Host를 별도로 붙여주어야 합니다.) */
        customCssUrl: string;
        /** 마이페이 간편결제 명 */
        payName: string;
        /** 로고 이미지 주소 */
        logoImageUrl: string;
        /** 약관 URL (몰마다 항상 동일하며, 앞에 Shop API Host를 별도로 붙여주어야 합니다.) */
        termsAgreeUrl: string;
    };
    /** 해외결제 결제정보 (nullable) */
    internationalPaymentInfo?: Nullable<{
        /** 환율 */
        exchangeRate: number;
        /** 환율 적용된 결제 예정 금액 */
        exchangedAmt: number;
        /** 통화코드 */
        currencyCode: string;
    }>;
    /** 배송지 */
    orderSheetAddress: OrderSheetAddress;
    /** 결제정보 */
    paymentInfo: PaymentInfo;
    /** 해외 파트너 */
    foreignPartners: ForeignPartner[];
}

export interface GetCalculatedOrderSheetData {
    /** 주소 */
    addressRequest: Partial<AddressRequest>;
    /** 쿠폰 */
    couponRequest?: CouponRequest;
    /** 적립금 사용액 */
    accumulationUseAmt: number;
    /** 복수 배송지 정보 */
    shippingAddresses: ShippingAddresses[];
    /** 외부결제수단정보 (nullable) */
    externalPayInfos?: Nullable<(boolean | string | number)[]>;
}

export interface GetCalculatedOrderSheetResponse {
    /** 합배송 그룹별 상품 목록 */
    deliveryGroups: DeliveryGroup[];
    /** 적용된 쿠폰 */
    appliedCoupons: AppliedCoupons;
    /** 사용가능한 결제정보 - 쇼핑몰에서 다양한 PG사와 계약해서 결제수단을 제공할 수 있기 때문에, payType을 기준으로 pgTypes를 내려주고 있으니 프론트에서 구현 시 내려온 pgTypes에 따라 결제모듈을 제공할 수 있습니다. */
    availablePayTypes: PayType[];
    /** 합배송 그룹별 상품 목록 */
    freeGiftInfos?: FreeGiftInfo[];
    /** 해외결제 결제정보 (nullable) */
    internationalPaymentInfo?: Nullable<{
        /** 환율 */
        exchangeRate: number;
        /** 환율 적용된 결제 예정 금액 */
        exchangedAmt: number;
        /** 통화코드 */
        currencyCode: string;
    }>;
    /** 결제정보 */
    paymentInfo: PaymentInfo;
}

export interface GetAppliedCouponPriceData {
    /** 상품 쿠폰 (nullable) */
    productCoupons: {
        /** 쿠폰 발급 번호 */
        couponIssueNo: number;
        /** 상품번호 */
        productNo: number;
    }[];
    /** 장바구니 쿠폰 발행 번호 */
    cartCouponIssueNo: number;
    /** 쿠폰 할인 코드 */
    promotionCode: string;
    /** 쇼핑채널링-채널타입 */
    channelType?: string;
}

interface Product {
    /** 상품 쿠폰 */
    productCoupons: ProductCoupon[];
    /** 구매금액(구매가 * 주문수량) */
    buyAmt: number;
    /** 상품플러스쿠폰 (nullable) */
    productPlusCoupons: Nullable<ProductCoupon[]>;
    /** 브랜드명 */
    brandName: string;
    /** 옵션 요약 정보 */
    mainOption: string;
    /** 총구매수량 */
    totalOrderCnt: number;
    /** 옵션개수 */
    optionCnt: number;
    /** 사용불가 상품 쿠폰 (nullable) */
    invalidProductCoupons?: Nullable<
        {
            /** 쿠폰 지급 불가 이유 */
            reason: string;
            /** 쿠폰명 */
            couponName: string;
            /** 쿠폰 발급 번호 */
            couponIssueNo: number;
            /** 쿠폰 번호 */
            couponNo: number;
        }[]
    >;
    /** 상품쿠폰할인금액 */
    productCouponDiscountAmt: number;
    /** 상품명 */
    productName: string;
    /** 상품번호 */
    productNo: number;
}

export interface GetAppliedCouponPriceResponse {
    /** 주문서번호 */
    orderSheetNo: string;
    /** buyAmt[장바구니 금액] = totalStandardAmt[최종상품금액] - totalImmediateDiscountAmt[즉시할인가] - totalAdditionalDiscountAmt[추가할인가] - productCouponAmt[상품쿠폰할인금액] */
    cartAmt: number;
    /** 배송비 */
    deliveryAmt: number;
    /** 장바구니쿠폰할인금액 */
    cartCouponDiscountAmt: number;
    /** 장바구니 쿠폰 */
    cartCoupons: CartCoupon[];
    /** 상품쿠폰할인금액 */
    productCouponDiscountAmt: number;
    /** 상품 정보 */
    products: Product[];
}

export interface GetMaximumAppliedCouponPriceData {
    /** 외부 주문 유입 경로 (nullable) */
    channelType?: Nullable<string>;
}

export interface GetMaximumAppliedCouponPriceResponse {
    /** 주문서번호 */
    orderSheetNo: string;
    /** buyAmt[장바구니 금액] = totalStandardAmt[최종상품금액] - totalImmediateDiscountAmt[즉시할인가] - totalAdditionalDiscountAmt[추가할인가] - productCouponAmt[상품쿠폰할인금액] */
    cartAmt: number;
    /** 배송비 */
    deliveryAmt: number;
    /** 장바구니쿠폰할인금액 */
    cartCouponDiscountAmt: number;
    /** 장바구니 쿠폰 */
    cartCoupons: CartCoupon[];
    /** 상품쿠폰할인금액 */
    productCouponDiscountAmt: number;
    /** 상품 정보 */
    products: Product[];
}

export interface CouponApplyData {
    /** 상품 쿠폰 (nullable) */
    productCoupons?: Nullable<
        {
            /** 쿠폰 발급 번호 */
            couponIssueNo?: Nullable<number>;
            /** 상품번호 */
            productNo: number;
        }[]
    >;
    /** 장바구니 쿠폰 발행 번호 */
    cartCouponIssueNo: number;
    /** 쿠폰 할인 코드 */
    promotionCode: string;
    /** 쇼핑채널링-채널타입 */
    channelType?: Nullable<string>;
}

export interface CouponApplyResponse {
    /** 합배송 그룹별 상품 목록 */
    deliveryGroups: DeliveryGroup[];
    /** 적용된 쿠폰 */
    appliedCoupons: OrderSheetAppliedCoupons;
    /** 사용가능한 결제정보 - 쇼핑몰에서 다양한 PG사와 계약해서 결제수단을 제공할 수 있기 때문에, payType을 기준으로 pgTypes를 내려주고 있으니 프론트에서 구현 시 내려온 pgTypes에 따라 결제모듈을 제공할 수 있습니다. */
    availablePayTypes: PayType[];
    freeGiftInfos?: OrderSheetFreeGiftInfo[];
    /** 해외결제 결제정보 (nullable) */
    internationalPaymentInfo?: {
        /** 환율 */
        exchangeRate: number;
        /** 환율 적용된 결제 예정 금액 */
        exchangedAmt: number;
        /** 통화코드 */
        currencyCode: string;
    };
    /** 결제정보 */
    paymentInfo: PaymentInfo;
}

/**상품 쿠폰 */
export interface OrderSheetProductCoupon {
    /** 쿠폰 적용 여부 */
    couponApplied: boolean;
    /** 쿠폰 발급 번호 */
    couponIssueNo: number;
    /** 상품번호 */
    productNo: number;
}

/** 적용된 쿠폰 */
export interface OrderSheetAppliedCoupons {
    /** 상품 쿠폰 (nullable) */
    productCoupons: Nullable<OrderSheetProductCoupon[]>;
    /** 장바구니 쿠폰 발행 번호 */
    cartCouponIssueNo: number;
    /** 장바구니 쿠폰 적용 여부 */
    cartCouponApplied: boolean;
    /** 쿠폰 할인 코드 */
    promotionCode: string;
}

export interface OrderSheetFreeGiftInfo {
    /** 선택 개수 설정. freeGiftOptionCountType이 SELECT인 경우 전달 (nullable) */
    freeGiftOptionCount: Nullable<number>;
    freeGifts: OrderSheetFreeGift[];
    /** 지급 시작 일시 */
    giveStartYmdt: string;
    /** 사은품 지급조건 번호 */
    freeGiftConditionNo: number;
    /** 지급 종료 일시 */
    giveEndYmdt: string;
    /** 지급옵션 수량 타입 */
    freeGiftOptionCountType: 'ALL' | 'SELECT';
    /** 지급조건명 */
    giveConditionName: string;
}

export interface OrderSheetFreeGift {
    /** 옵션번호 */
    mallOptionNo: number;
    /** 옵션값 */
    optionValue: string;
    /** 옵션명 */
    optionName: string;
    /** 상품번호 */
    mallProductNo?: Nullable<number>;
    /** 상품 이미지 URL */
    mallProductMainImageUrl: string;
    /** 상품명 */
    productName: string;
}

/** 배송그룹 */
export interface DeliveryGroup {
    /** 파트너번호 */
    partnerNo: number;
    /** 배송비착불여부 */
    deliveryPayType: DeliveryPayType;
    /** 배송 조건 */
    deliveryCondition: DeliveryCondition;
    /** 배송비 */
    deliveryAmt: number;
    /** 배송 템플릿 그룹 이름 (nullable) */
    deliveryTemplateGroupName?: Nullable<string>;
    /** 파트너명 */
    partnerName: string;
    /** 주문상품 */
    orderProducts: OrderProduct[];
    /** 배송 템플릿 그룹 번호 (nullable) */
    deliveryTemplateGroupNo?: Nullable<number>;
    /** 배송 템플릿 이름 (nullable) */
    deliveryTemplateName?: Nullable<string>;
    /** 배송 템플릿 번호 (nullable) */
    deliveryTemplateNo?: Nullable<number>;
}

/** 배송 조건 */
export interface DeliveryCondition {
    /** 배송조건 */
    deliveryConditionType: DeliveryConditionType;
    /** 조건부 배송비의 기준값(9,800원 미만 배송비 2,500원일때 aboveDeliveryAmt는 9800) */
    aboveDeliveryAmt: number;
    /** 배송비(조건에 의해 계산되어진) */
    deliveryAmt: number;
    /** 묶음배송조건 */
    groupDeliveryAmtType: GroupDeliveryAmtType;
    /** 반품배송비 */
    returnDeliveryAmt: number;
    /** 조건부 배송비 미달 시 배송비(9,800원 미만 배송비 2,500원일때 baseDeliveryAmt는 2,500) */
    baseDeliveryAmt: number;
    /** 추가배송비(조건에 의해 계산되어진) */
    remoteDeliveryAmt: number;
}

/** 주문상품 */
export interface OrderProduct {
    /** 추가상품여부 */
    extraProductOnly: boolean;
    /** 교환가능여부 (API 문서 상에는 없지만 실제로 값은 넘어옴) */
    exchangeable: boolean;
    /** 구매금액 합 */
    buyAmt: number;
    /** 취소가능여부 (API 문서 상에는 없지만 실제로 값은 넘어옴) */
    cancelable: boolean;
    /** 브랜드 명 */
    brandName: string;
    /** 쿠폰 사용 가능 여부 */
    couponUsable: boolean;
    /** 배송구분 */
    shippingAreaType: ShippingAreaType;
    /** 배송가능여부 */
    deliverable: boolean;
    /** 이미지 타입 */
    imageUrlType: ImageUrlType;
    /** 카테고리 명 */
    categoryName: string;
    /** 옵션사용여부 */
    optionUsed: boolean;
    /** 찜상품 여부 */
    liked: boolean;
    /** 상품명 */
    productName: string;
    /** 적립금 사용 가능 여부 */
    accumulationUsable: boolean;
    /** 추가상품 */
    additionalProducts: (boolean | string | number)[];
    /** 상품 url */
    imageUrl: string;
    /** 브랜드 영문명 */
    brandNameEn: string;
    /** 표준 카테고리 번호 */
    categoryNo: number;
    /** 상품 영문명 */
    productNameEn: string;
    /** 주문 상품 옵션 */
    orderProductOptions: OrderProductOption[];
    /** 배송 예정일 */
    deliveryDate: DeliveryDate;
    /** 전시 카테고리 번호 목록 */
    categoryNos: (boolean | string | number)[];
    /** 브랜드 번호 */
    brandNo: number;
    /** 해외직배송여부 */
    deliveryInternational: boolean;
    /** 상품번호 */
    productNo: number;
}

/** 옵션 */
export interface OrderProductOption {
    recurringPaymentDelivery?: {
        /** 정기결제 배송주기 일자 (nullable) */
        date?: Nullable<number>;
        /** 정기결제 배송주기 타입 (nullable) */
        cycleType?: Nullable<CycleType>;
        /** 배송요일 (nullable) */
        dayOfWeek?: Nullable<DayOfWeekCycleType>;
        /** 정기결제 첫 배송 예정일 (nullable) */
        firstRecurringDate?: Nullable<string>;
        /** 정기결제 배송주기 (nullable) */
        cycle?: Nullable<number>;
    };
    /** 예약주문 상품 배송시작예정일 */
    reservationDeliveryYmdt: string;
    /** 구매확정시 예상 적립금 */
    accumulationAmtWhenBuyConfirm: number;
    /** 유효성 정보 */
    validInfo: ValidInfo;
    /** 추가상품 여부 */
    isExtraProduct: boolean;
    /** 옵션형태 */
    optionType: OptionType;
    /** 추가상품이 있는 상품번호 (nullable) */
    baseProductNo?: Nullable<number>;
    /** 구매확정 시 회원에 대한 적립률(회원등급/그룹 중 큰 값)^|0 */
    accumulationRateForMemberWhenBuyConfirm: number;
    /** 정기결제 사은품 정보 */
    recurringPaymentGiftCondition: RecurringPaymentGiftCondition;
    /** 가격 정보 */
    price: {
        /** 구매금액(구매가 * 주문수량) */
        buyAmt: number;
        /** 추가할인 금액 */
        additionalDiscountAmt: number;
        /** 즉시할인 금액 */
        immediateDiscountAmt: number;
        /** 상품판매가 */
        salePrice: number;
        /** 정상금액(상품판매가 + 옵션추가금액) * 주문수량 */
        standardAmt: number;
        /** 옵션가격(추가금액) */
        addPrice: number;
    };
    /** 상품 이미지 URL */
    imageUrl: string;
    /** 세트옵션 */
    setOptions: SetOption[];
    /** 예약주문여부 (true: 예약주문상품, false: 일반상품) */
    reservation: boolean;
    /** 옵션번호 */
    optionNo: number;
    /** 상품번호 */
    productNo: number;
    /** 구매확정 시 회원에 대한 적립금(회원등급/그룹 중 큰 값) */
    accumulationAmtForMemberWhenBuyConfirm: number;
    /** 옵션권장출력값 */
    optionTitle: string;
    /** 정기결제 사은품 목록 (nullable) */
    recurringPaymentGifts?: Nullable<
        {
            /** 정기결제 사은품 이미지 URL */
            imageUrl: string;
            /** 정기결제 사은품 옵션값 */
            optionValue: string;
            /** 정기결제 사은품 옵션명 */
            optionName: string;
            /** 정기결제 사은품 옵션 번호 */
            optionNo: number;
            /** 정기결제 사은품 상품명 */
            productName: string;
            /** 정기결제 사은품 상품 번호 */
            productNo: number;
        }[]
    >;
    /** 옵션값 */
    optionValue: string;
    /** 주문수량 */
    orderCnt: number;
    /** 소비자 입력형 옵션 (nullable) */
    optionInputs?: OptionInputs[];
    /** 품절여부(true:품절 false:구매가능) */
    soldOut: boolean;
    /** 추가상품의 본상품명 (nullable) */
    baseProductName?: Nullable<string>;
    /** 구매확정 시 상품에 대한 적립률 */
    accumulationRateForProductWhenBuyConfirm: number;
    /** 구매확정 시 상품에 대한 적립금 */
    accumulationAmtForProductWhenBuyConfirm: number;
    /** 재고 개수 */
    stockCnt: number;
    /** 옵션명 */
    optionName: string;
    /** 판매자 관리코드 (nullable) */
    optionManagementCd?: Nullable<string>;
}

/** 배송 예정일 */
export interface DeliveryDate {
    /** 기간 */
    period: {
        /** 배송일지정 가능한 시작일^|YYYY-MM-DD hh:mm:ss */
        startYmdt: Nullable<string>;
        /** 배송일지정 가능한 종료일 */
        endYmdt: Nullable<string>;
    };
    /** 요일 */
    daysOfWeek: Nullable<DaysOfWeekType[]>;
    /** 주문일 기준 */
    daysAfterPurchase: Nullable<number>;
}

/** 유효성 정보 */
export interface ValidInfo {
    /** 유효 여부(true: 유효, false: 유효하지 않음) */
    valid: boolean;
    /** @deprecated(더 이상 제공하지 않는 개체항목입니다) */
    validYn: 'Y' | 'N';
    /** 에러코드 */
    errorCode: {
        /** code^|PPVE0001 */
        code: string;
        /** simpleCode^|PPVE0001 */
        simpleCode: string;
    };
    /** 유효성 실패 사유 메세지^|재고없음 */
    message: string;
    /** 주문수량변경 가능 여부 (true:변경가능 false:변경불가능)^|false */
    orderCntChangeable: boolean;
}

/** 정기결제 사은품 정보 */
export interface RecurringPaymentGiftCondition {
    /** 지급 종료 일시 (nullable) */
    giftEndDateTime?: Nullable<string>;
    /** 지급 회차 번호 리스트 (nullable) */
    giftCycleNumber?: Nullable<(boolean | string | number)[]>;
    /** 지급 회차 조건 타입 (nullable) */
    giftCycleConditionType?: Nullable<'NONE' | 'MULTIPLE' | 'CUSTOM'>;
    /** 지급 옵션 수량 타입 (nullable) */
    giftOptionQuantityType?: Nullable<'ALL' | 'SELECTABLE'>;
    /** 사은품 지급 조건 (nullable) */
    giftConditionName?: Nullable<string>;
    /** 지급 시작 일시 (nullable) */
    giftStartDateTime?: Nullable<string>;
    /** 선택 가능한 사은품 수량 (nullable) */
    selectableGiftQuantity?: Nullable<number>;
    /** 지급 회차 배수 (nullable) */
    giftCycleMultiple?: Nullable<number>;
}

/** 주문 상품 옵션 */
export interface SetOption {
    /** 옵션사용여부 */
    usesOption: boolean;
    /** 옵션번호 */
    mallOptionNo: number;
    /** 상품관리코드 (nullable) */
    productManagementCd?: Nullable<string>;
    /** 옵션 */
    optionValue: string;
    /** 구매수 */
    count: number;
    /** 옵션가격 */
    optionPrice: number;
    /** sku (nullable) */
    sku?: Nullable<string>;
    /** 옵션명 */
    optionName: string;
    /** 옵션관리코드 (nullable) */
    optionManagementCd?: Nullable<string>;
    /** 상품번호 */
    mallProductNo?: number;
    /** 재고번호 */
    stockNo: number;
    /** 상품명 */
    productName: string;
}
