import type {
    AdditionalPayType,
    BankType,
    ClaimReasonType,
    ClaimStatusType,
    ClaimType,
    CountryCdType,
    DeliveryCompanyType,
    ImageUrlType,
    OptionType,
    OrderStatusLabelType,
    OrderStatusType,
    PayType,
    PgType,
    ResponsibleObjectType,
    ReturnWayType,
    ShippingAreaType,
} from '@/models';
import type {
    DeliveryAmtInfo,
    NextAction,
    OrderStatusDate,
    ProductAmtInfo,
} from '@/models/order';

/** 계좌정보 */
export interface BankAccountInfo {
    /** 계좌번호 (nullable) */
    bankAccount?: Nullable<string>;
    /** 예금주명 (nullable) */
    bankDepositorName?: Nullable<string>;
    /** 은행 코드 (nullable) */
    bank?: Nullable<BankType>;
    /** 은행명 (nullable) */
    bankName?: Nullable<string>;
}

/** 환불 계좌 정보 */
export interface RefundAccountData {
    /** 계좌소유자명 (nullable) */
    depositorName?: Nullable<string>;
    /** 은행 코드 (nullable) */
    bank?: Nullable<BankType>;
    /** 계좌번호 (nullable) */
    account?: Nullable<string>;
}

/** 주문상품옵션정보 */
export interface ClaimedProductOption {
    /** 취소/반품할 제품수량 */
    productCnt: number;
    /** 주문 상품 옵선 번호 */
    orderProductOptionNo: number;
}

/** 교환할 옵션 */
export interface ExchangeOption {
    /** 입력값들 */
    inputTexts: {
        /** 구매자 작성형 입력 값 (nullable) */
        inputValue?: Nullable<string>;
        /** 구매자 작성형 입력 이름 (nullable) */
        inputLabel?: Nullable<string>;
    }[];
    /** 교환상품수량 */
    orderCnt: number;
    /** 교환상품의 선택된 몰 옵션번호 */
    optionNo: number;
    /** 교환상품의 몰상품번호 */
    productNo: number;
    /** 교환상품의 추가상품 번호 */
    additionalProductNo: number;
}

export interface CancelOptionsData {
    /** 상세사유 */
    claimReasonDetail: string;
    /** 귀책 - responsibleObjectType이 null이면 ClaimReasonType에 매핑되는 귀책 적용 (CHANGE_MIND, CANCEL_BEFORE_PAY, OTHERS_BUYER -> BUYER / DEFECTIVE_PRODUCT, WRONG_DELIVERY, OUT_OF_STOCK_SYSTEM, WRONG_PRODUCT_DETAIL, DELAY_DELIVERY, OUT_OF_STOCK, OTHERS_SELLER -> SELLER) (nullable)^|BUYER */
    responsibleObjectType?: Nullable<ResponsibleObjectType>;
    /** 클레임타입 */
    claimType: ClaimType;
    /** 주문상품옵션정보 */
    claimedProductOptions: ClaimedProductOption[];
    /** 환불계좌정보 저장 여부(true일 경우 bankAccountInfo 필수) */
    saveBankAccountInfo: boolean;
    /** 계좌정보 (nullable) */
    bankAccountInfo?: Nullable<BankAccountInfo>;
    /** 클레임사유 */
    claimReasonType: ClaimReasonType;
    /** 즉시환불여부(기본 값: true)(주문상태가 결제완료인 옵션인 경우 즉시환불 가능) */
    refundsImmediately: boolean;
}

export interface ReturnSingleOptionData {
    /** 상세사유 */
    claimReasonDetail?: Nullable<string>;
    /** 귀책 */
    responsibleObjectType?: Nullable<ResponsibleObjectType>;
    /** 클레임타입 */
    claimType: ClaimType;
    /** 환불계좌정보 저장 여부 */
    saveBankAccountInfo: boolean;
    /** 계좌정보 */
    bankAccountInfo?: BankAccountInfo;
    /** 취소/반품할 제품수량 */
    productCnt: number;
    /** 클레임사유 */
    claimReasonType: ClaimReasonType;
    /** 반품상품 수거방법 */
    returnWayType?: ReturnWayType;
    /** 택배사타입 */
    deliveryCompanyType?: Nullable<DeliveryCompanyType>;
    /** 반품/교환 이미지 첨부파일 url 리스트 */
    claimImageUrls?: Nullable<string[]>;
    /** 송장번호 */
    invoiceNo?: Nullable<string>;
    /** 반품 주소(배송상품인 경우 필수, 배송안함상품인 경우 null 가능) */
    returnAddress?: Nullable<ReturnOrExchangeAddress>;
}

export interface EstimatedRefundPriceData {
    /** 귀책 - responsibleObjectType이 null이면 ClaimReasonType에 매핑되는 귀책 적용 (CHANGE_MIND, CANCEL_BEFORE_PAY, OTHERS_BUYER -> BUYER / DEFECTIVE_PRODUCT, WRONG_DELIVERY, OUT_OF_STOCK_SYSTEM, WRONG_PRODUCT_DETAIL, DELAY_DELIVERY, OUT_OF_STOCK, OTHERS_SELLER -> SELLER) (nullable)*/
    responsibleObjectType?: Nullable<ResponsibleObjectType>;
    /** 주문상품옵션정보 */
    claimedProductOptions: ClaimedProductOption[];
    /** 클레임타입 */
    claimType: ClaimType;
    /** 취소/반품할 제품수량 */
    productCnt: number;
    /** 클레임사유 */
    claimReasonType: ClaimReasonType;
    /** 반품상품 수거방법 (nullable) */
    returnWayType?: ReturnWayType;
}

export interface ExchangeRequest {
    exchangeAddress?: Nullable<ClaimAddress>;
    exchangeOption: ExchangeOption;
}

/** 유저 클레임 (nullable) */
export interface MemberClaim {
    /** 클레임사유상세 */
    claimReasonDetail: Nullable<string>;
    /** 취소/반품상품상품들 */
    claimedOptions: ClaimedOption[];
    /** 클레임타입 */
    claimType: ClaimType;
    /** 클레임번호 */
    claimNo: number;
    /** 주문번호 */
    orderNo: string;
    /** 클레임사유 */
    claimReasonType: ClaimReasonType;
    /** 주문일자 */
    orderYmdt: string;
    /** 클레임신청일시 */
    claimYmdt: string;
    /** 클레임금액정보 */
    claimPriceInfo: Nullable<ClaimPriceInfo>;
}

/** 취소/반품 상품 */
export interface ClaimedOption {
    /** 사은품 여부 */
    isFreeGift: boolean;
    /** 구매자 작성형 옵션 */
    inputs: {
        /** 구매자 작성형 입력 값(nullable) */
        inputValue: Nullable<string>;
        /** 구매자 작성형 입력 이름 (nullable) */
        inputLabel: Nullable<string>;
    }[];
    /** 배송상품여부 */
    deliverable: boolean;
    /** 옵션사용여부 */
    optionUsed: boolean;
    /** 상품명 */
    productName: string;
    /** 클레임상태(한글) (nullable) */
    claimStatusTypeLabel?: Nullable<OrderStatusLabelType>;
    /** 추가상품번호 */
    additionalProductNo: number;
    /** 옵션형태(PRODUCT_ONLY:옵션없음, NORMAL_OPTION:일반옵션) */
    optionType: Omit<OptionType, 'ADDITIONAL_PRODUCT'>;
    /** 결제수단 */
    payType: PayType;
    /** 금액정보 */
    price: {
        /** 구매가(즉시할인 + 추가할인 적용) */
        buyPrice: number;
        /** 구매금액 합 */
        buyAmt: number;
        /** 즉시할인적용가 * 주문수량 */
        immediateDiscountedAmt: number;
        /** 즉시할인금액 */
        immediateDiscountAmt: number;
        /** 추가할인금액 */
        additionalDiscountAmt: number;
        /** 상품판매가 */
        salePrice: number;
        /** 정상금액(상품판매가 + 옵션추가금액) * 주문수량 */
        standardAmt: number;
        /** 즉시할인적용가 */
        immediateDiscountedPrice: number;
        /** 정상가(상품판매가 + 옵션추가금액) */
        standardPrice: number;
        /** 옵션추가금액 */
        addPrice: number;
        /** 적립률 */
        accumulationRate: number;
    };
    /** 예약주문여부 */
    reservation: boolean;
    /** 상품 이미지 정보 */
    imageUrlInfo: ImageUrlInfo[];
    /** 상세사유 (nullable) */
    claimReasonDetail?: Nullable<string>;
    /** 브랜드명 (nullable) */
    brandName?: Nullable<string>;
    /** PG타입 */
    pgType: PgType;
    /** 주문번호 */
    orderNo: string;
    /** 주문상태 */
    orderStatusType: OrderStatusType;
    /** 파트너배송/쇼핑몰배송 */
    shippingAreaType: ShippingAreaType;
    /** 주문수량 */
    orderCnt: number;
    /** 반품가능여부 */
    returnable: boolean;
    /** 주문날짜정보 */
    orderStatusDate: Omit<OrderStatusDate, 'payYmdt' | 'deliveryCompleteYmdt'>;
    /** 교환가능여부 */
    exchangeable: boolean;
    /** 예약상품 배송 지정일 (nullable) */
    reservationDeliveryYmdt?: Nullable<string>;
    /** 클레임 번호 (nullable) */
    claimNo?: Nullable<number>;
    /** 취소가능여부 */
    cancelable: boolean;
    /** 클레임사유 (nullable) */
    claimReasonType?: Nullable<ClaimReasonType>;
    /** 추가상품여부 */
    isExtraProduct: boolean;
    /** 정기배송 상품 여부(개발중) */
    isRecurringPayment: boolean;
    /** 수량할인 여부 */
    isQuantityDiscount: boolean;
    /** 클레임상태 (nullable) */
    claimStatusType?: Nullable<ClaimStatusType>;
    /** 추가상품의 본상품번호 (nullable) */
    baseProductNo?: Nullable<number>;
    /** 해외배송여부(true: 해외배송, false: 국내배송) */
    deliveryInternationalYn: boolean;
    /** 상품 이미지 URL */
    imageUrl: string;
    /** 회원여부 */
    member: boolean;
    /** 다음에 할 수 있는 작업 */
    nextActions: Omit<NextAction, 'actionGroupType'>[];
    /** 환불가능여부 */
    refundable: boolean;
    /** 옵션번호 */
    optionNo: number;
    /** 주문상품옵션번호 */
    orderOptionNo: number;
    /** 상품번호 */
    productNo: number;
    /** 옵션권장출력값 */
    optionTitle: string;
    /** 배송정보 */
    delivery: {
        /** 나중입력배송 여부 */
        receiverInputLater: boolean;
        /** 택배사명(nullable) */
        deliveryCompanyTypeLabel?: Nullable<string>;
        /** 택배사타입 (nullable) */
        deliveryCompanyType?: Nullable<DeliveryCompanyType>;
        /** 송장추적 URL(nullable) */
        retrieveInvoiceUrl?: Nullable<string>;
        /** 송장번호 (nullable) */
        invoiceNo?: Nullable<string>;
    };
    /** 옵션값 */
    optionValue: string;
    /** 추가상품의 본상품명 (nullable) */
    baseProductName?: Nullable<string>;
    /** 상품 리스트 이미지 정보 (nullable) */
    listImageUrlInfo?: Nullable<ImageUrlInfo>;
    /** 교환여부 (nullable) */
    exchangeYn?: Nullable<string>;
    /** 적립금 (nullable) */
    accumulationAmt?: Nullable<number>;
    /** 브랜드영문명 (nullable) */
    brandNameEn?: Nullable<string>;
    /** 영어상품명(nullable) */
    productNameEn?: Nullable<string>;
    /** 옵션명 */
    optionName: string;
    /** 옵션관리코드 (nullable) */
    optionManagementCd?: Nullable<string>;
}

export interface ImageUrlInfo {
    /** 메인 이미지 여부 */
    isMain: boolean;
    /** 이미지 타입 */
    imageUrlType: ImageUrlType;
    /** 이미지 url */
    url: string;
}

/** 금액정보 */
export interface ClaimPriceInfo {
    /** 차감금액정보 */
    subtractionAmtInfo: {
        /** 총주문차감금액 */
        totalAmt: number;
        /** 배송비쿠폰 변경금액 */
        deliveryCouponAmt: number;
        /** 환불금액조정사유 (nullable) */
        refundAdjustReason?: Nullable<string>;
        /** 환불금액조정 */
        refundAdjustAmt: number;
        /** 장바구니쿠폰 변경금액 */
        cartCouponAmt: number;
    };
    /** 환불방법(노출용) */
    refundTypeLabel: string;
    /** 환불금액(적립금제외) */
    refundMainPayAmt: number;
    /** 배송비정보 */
    deliveryAmtInfo: ClaimDeliveryAmtInfo;
    /** 외부결제 환불 정보 (nullable) */
    refundExternalPayInfos?: Nullable<
        {
            /** 외부 결제 키 */
            externalPayKey: string;
            /** 결제/환불 우선순위 */
            priority: number;
            /** 외부 결제 금액 */
            payAmt: number;
            /** 외부 결제 결제수단명 (nullable) */
            externalPayName?: Nullable<string>;
        }[]
    >;
    /** 적립금환불금액 */
    refundSubPayAmt: number;
    /** 환불금액(적립금포함) */
    refundPayAmt: number;
    /** 추가결제금액 */
    additionalPayAmt: number;
    /** 환불결제방법  */
    refundPayType: PayType;
    /** 외부결제 환불금액 */
    refundExternalPayAmt: number;
    /** 상품금액정보 */
    productAmtInfo: ClaimProductAmtInfo;
}

export interface ClaimDeliveryAmtInfo extends DeliveryAmtInfo {
    /** 변경 전 지역별 배송비 */
    beforeRemoteDeliveryAmt: number;
    /** 변경 후 지역별 배송비 */
    afterRemoteDeliveryAmt: number;
}

/** 상품금액정보 */
export interface ClaimProductAmtInfo
    extends Omit<ProductAmtInfo, 'returnImmediateDiscountedPrice'> {
    // exchangeImmediateDiscountedPrice : 교환상품금액(deprecated: immediateDiscountedPrice 에 합산됩니다.)
    // exchangeDiscountAmt : 교환할인금액(deprecated: discountAmt 에 합산됩니다.)
    // 사은품할인금액
    freeGiftDiscountAmt: number;
}

/** 교환 추가금액 결제 정보 */
export interface ExchangePayInfo {
    /** 교환금액 */
    exchangePayAmt: number;
    /** 계좌정보 (nullable) */
    bankAccount: Nullable<BankAccountInfo>;
    /** 결제방법 (nullable) */
    payType: Nullable<AdditionalPayType>;
    /** 입금자 (nullable) */
    remitter: Nullable<string>;
}

/** 교환, 반품시 사용하는 출고지 주소 */
export interface ClaimAddress {
    /** 수령자지번주소 (nullable) */
    receiverJibunAddress?: string;
    /** 수령자명 */
    receiverName: string;
    /** 개인통관고유부호(해외배송상품인 경우 필수, nullable) */
    customsIdNumber?: Nullable<string>;
    /** 국가코드 */
    countryCd: CountryCdType;
    /** 수령자우편번호 */
    receiverZipCd: string;
    /** 수령자상세주소 (nullable) */
    receiverDetailAddress?: Nullable<string>;
    /** 배송메모 (nullable) */
    deliveryMemo?: Nullable<string>;
    /** (해외) 도시 (nullable) */
    receiverCity?: Nullable<string>;
    /** 수령자 휴대폰번호 국가 코드 (nullable) */
    receiverMobileCountryCd?: Nullable<string>;
    /** 수령자주소 */
    receiverAddress: string;
    /** (zip코드 포함) 수령자 상세 주소 */
    addressView: string;
    /** 해외배송 관련 기타 필드 (nullable) */
    shippingEtcInfo?: Nullable<{
        /** (해외배송 시 필수) 수령인 lastName */
        receiverLastName: string;
        /** (해외배송 시 필수) 수령인 firstName */
        receiverFirstName: string;
    }>;
    /** (해외) 주 (nullable) */
    receiverState?: Nullable<string>;
    /** 수령자연락처1 */
    receiverContact1: string;
    /** 수령자연락처2 (nullable) */
    receiverContact2?: Nullable<string>;
}

export interface ReturnOrExchangeAddress {
    /** (해외배송 시 필수) 수령인 lastName (nullable) */
    receiverLastName?: Nullable<string>;
    /** 수령자지번주소 (nullable) */
    receiverJibunAddress?: Nullable<string>;
    /** 수령자명 */
    receiverName: string;
    /** 개인통관고유부호(해외배송상품인 경우 필수) (nullable) */
    customsIdNumber?: Nullable<string>;
    /** 국가코드 (nullable) */
    countryCd?: Nullable<CountryCdType>;
    /** 수령자우편번호 */
    receiverZipCd: string;
    /** 수령자상세주소 (nullable) */
    receiverDetailAddress?: Nullable<string>;
    /** 배송메모 (nullable)  */
    deliveryMemo?: Nullable<string>;
    /** (해외) 도시 (nullable) */
    receiverCity?: Nullable<string>;
    /** 수령자 휴대폰번호 국가 코드 (nullable) */
    receiverMobileCountryCd?: Nullable<string>;
    /** 수령자주소 */
    receiverAddress: string;
    /** (해외) 주 (nullable) */
    receiverState?: Nullable<string>;
    /** (해외배송 시 필수) 수령인 firstName (nullable) */
    receiverFirstName?: Nullable<string>;
    /** 수령자연락처1 */
    receiverContact1: string;
    /** 수령자연락처2 (nullable) */
    receiverContact2?: Nullable<string>;
}

/** 클레임 대상 상품 */
export interface ClaimableOption {
    /** 사은품 여부 */
    isFreeGift: boolean;
    /** 구매자 작성형 옵션 */
    inputs: {
        /** 구매자 작성형 입력 값 (nullable) */
        inputValue: Nullable<string>;
        /** 구매자 작성형 입력 이름 (nullable) */
        inputLabel: Nullable<string>;
    }[];
    /** 배송상품여부 */
    deliverable: boolean;
    /** 옵션사용여부 */
    optionUsed: boolean;
    /** 상품명 */
    productName: string;
    /** 클레임상태(한글) (nullable) */
    claimStatusTypeLabel?: Nullable<string>;
    /** 추가상품번호 */
    additionalProductNo: number;
    /** 옵션형태 */
    optionType: Omit<OptionType, 'ADDITIONAL_PRODUCT'>;
    /** 결제수단 */
    payType: PayType;
    /** 금액정보 */
    price: {
        /** 구매가(즉시할인 + 추가할인 적용) */
        buyPrice: number;
        /** 구매금액 합 */
        buyAmt: number;
        /** 즉시할인적용가 * 주문수량 */
        immediateDiscountedAmt: number;
        /** 즉시할인금액 */
        immediateDiscountAmt: number;
        /** 추가할인금액 */
        additionalDiscountAmt: number;
        /** 상품판매가 */
        salePrice: number;
        /** 정상금액(상품판매가 + 옵션추가금액) * 주문수량 */
        standardAmt: number;
        /** 즉시할인적용가 */
        immediateDiscountedPrice: number;
        /** 정상가(상품판매가 + 옵션추가금액) */
        standardPrice: number;
        /** 옵션추가금액 */
        addPrice: number;
        /** 적립률 */
        accumulationRate: number;
    };
    /** 예약주문여부 */
    reservation: boolean;
    /** 상품 이미지 정보 */
    imageUrlInfo: ImageUrlInfo[];
    /** 상세사유 (nullable) */
    claimReasonDetail?: Nullable<string>;
    /** 브랜드명 (nullable) */
    brandName?: Nullable<string>;
    /** PG타입 */
    pgType: PgType;
    /** 주문번호 */
    orderNo: string;
    /** 주문상태 */
    orderStatusType: OrderStatusType;
    /** 파트너배송/쇼핑몰배송 */
    shippingAreaType: ShippingAreaType;
    /** 주문수량 */
    orderCnt: number;
    /** 반품가능여부 */
    returnable: boolean;
    /** 주문날짜정보 */
    orderStatusDate: Omit<OrderStatusDate, 'payYmdt' | 'deliveryCompleteYmdt'>;
    /** 교환가능여부 */
    exchangeable: boolean;
    /** 예약상품 배송 지정일 (nullable) */
    reservationDeliveryYmdt?: Nullable<string>;
    /** 클레임 번호 (nullable) */
    claimNo?: Nullable<number>;
    /** 취소가능여부 */
    cancelable: boolean;
    /** 클레임사유 (nullable) */
    claimReasonType?: Nullable<ClaimReasonType>;
    /** 추가상품여부 */
    isExtraProduct: boolean;
    /** 정기배송 상품 여부(개발중) */
    isRecurringPayment: boolean;
    /** 수량할인 여부 */
    isQuantityDiscount: boolean;
    /** 클레임상태 (nullable) */
    claimStatusType?: Nullable<ClaimStatusType>;
    /** 추가상품의 본상품번호 (nullable) */
    baseProductNo?: Nullable<number>;
    /** 해외배송여부(true: 해외배송, false: 국내배송) */
    deliveryInternationalYn: boolean;
    /** 상품 이미지 URL */
    imageUrl: string;
    /** 회원여부 */
    member: boolean;
    /** 다음에 할 수 있는 작업 */
    nextActions: Omit<NextAction, 'actionGroupType'>[];
    /** 환불가능여부 */
    refundable: boolean;
    /** 옵션번호 */
    optionNo: number;
    /** 주문상품옵션번호 */
    orderOptionNo: number;
    /** 상품번호 */
    productNo: number;
    /** 옵션권장출력값 */
    optionTitle: string;
    /** 배송정보 */
    delivery: {
        /** 나중입력배송 여부 */
        receiverInputLater: boolean;
        /** 택배사명 (nullable) */
        deliveryCompanyTypeLabel?: Nullable<string>;
        /** 택배사타입 (nullable) */
        deliveryCompanyType?: Nullable<DeliveryCompanyType>;
        /** 송장추적 URL (nullable) */
        retrieveInvoiceUrl?: Nullable<string>;
        /** 송장번호 (nullable) */
        invoiceNo?: Nullable<string>;
    };
    /** 옵션값 */
    optionValue: string;
    /** 추가상품의 본상품명 (nullable) */
    baseProductName?: Nullable<string>;
    /** 리스트 이미지 정보 */
    listImageUrlInfo?: Nullable<ImageUrlInfo>;
    /** 교환여부 (nullable) */
    exchangeYn?: Nullable<string>;
    /** 적립금 (nullable) */
    accumulationAmt?: Nullable<number>;
    /** 브랜드영문명 (nullable) */
    brandNameEn?: Nullable<string>;
    /** 영어상품명 (nullable) */
    productNameEn?: Nullable<string>;
    /** 옵션명 */
    optionName: string;
    /** 옵션관리코드 (nullable) */
    optionManagementCd?: Nullable<string>;
}
