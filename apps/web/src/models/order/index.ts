import {
    AdditionalPayType,
    BankType,
    CardCodeType,
    CardCompanyType,
    CashReceiptIssuePurposeType,
    CashReceiptIssueType,
    CashReceiptKeyType,
    ClaimClassType,
    ClaimReasonType,
    ClaimStatusType,
    CountryCdType,
    CouponTargetType,
    CouponType,
    CycleType,
    DayOfWeekCycleType,
    DaysOfWeekType,
    DeliveryCompanyType,
    DeliveryConditionType,
    DeliveryPayType,
    DeliveryType,
    FreeGiftOptionCountType,
    GroupDeliveryAmtType,
    ImageUrlType,
    NextActionType,
    OptionSelectType,
    OptionType,
    OrderRequestType,
    OrderStatusLabelType,
    OrderStatusType,
    PayType,
    PgType,
    PlatformType,
    ReceiptType,
    RefundPayType,
    RefundType,
    ResponsibleObjectType,
    ReturnWayType,
    ShippingAreaType,
    TaxType,
} from '@/models';
import { ImageUrlInfo } from '@/models/claim';

/** 상품쿠폰 */
export interface ProductCoupon {
    /** 쿠폰 생성 사유 */
    reason: string;
    /** 할인비율 (nullable) */
    discountRate?: Nullable<number>;
    /** 쿠폰명 */
    couponName: string;
    /** 쿠폰 발급 번호 */
    couponIssueNo: number;
    /** 쿠폰 사용 가능한 최소 금액 */
    minSalePrice?: Nullable<number>;
    /** 배송비무료여부 (true: 무료, false: 유료) */
    freeDelivery: boolean;
    /** 최대할인금액(정률에서) */
    maxDiscountAmt?: Nullable<number>;
    /** 장바구니 쿠폰 사용 가능 여부(상품쿠폰인 경우) (true: 가능, false: 불가능) */
    cartCouponUsable: boolean;
    /** 사용종료일 */
    useEndYmdt?: Nullable<string>;
    /** 현재 주문에서 쿠폰 사용 여부 (true: 사용, false: 미사용) */
    used: boolean;
    /** 쿠폰할인금액 */
    couponDiscountAmt: number;
    /** 쿠폰 유형 (PRODUCT: 상품, CART: 장바구니) */
    couponType: Omit<CouponType, 'CART_DELIVERY' | 'GIFT'>;
    /** 상품쿠폰 사용 가능 여부(주문쿠폰인 경우) (true: 가능, false: 불가능) */
    productCouponUsable: boolean;
    /** 제한 결제수단 리스트 */
    limitPayTypes?: Nullable<PayType[]>;
    /** 선택여부 (true: 선택, false: 선택안함) */
    selected: boolean;
    /** 제한 결제수단 (limitPayTypes를 사용하세요. */
    limitPayType?: Nullable<string>;
    /** 배송비무료여부 */
    freeDeliveryYn: 'Y' | 'N';
    /** 쿠폰명(노출용) */
    displayCouponName: string;
    /** 쿠폰 번호 */
    couponNo: number;
    /** 사용 가능플랫폼 (PC웹,모바일웹,모바일앱) */
    usablePlatformTypes: string;
    /** 쿠폰 대상 유형 */
    couponTargetType?: Nullable<CouponTargetType>;
    /** 적립금 적립 불가 여부 (true: 불가능, false: 가능) */
    skipsAccumulation: boolean;
    /** 쿠폰 사용 가능한 최대 금액 */
    maxSalePrice?: Nullable<number>;
    /** 쿠폰 하위 타입 */
    couponSubType: string;
    /** 최대 할인 적용 가능한 쿠폰 여부 */
    maximum?: Nullable<boolean>;
    /** 고정금액할인 (true:정액, false:정률) */
    fixedAmountDiscount: boolean;
}

/** 정기결제 배송 정보 */
interface RecurringPaymentDelivery {
    /** 정기결제 배송주기 일자 (nullable) */
    date?: Nullable<number>;
    /** 정기결제 배송주기 타입 (nullable) */
    cycleType?: Nullable<CycleType>;
    /** 배송요일 (nullable) */
    dayOfWeek?: Nullable<DayOfWeekCycleType>;
    /** 정기결제 배송주기 (nullable) */
    cycle?: Nullable<number>;
}

/** 소비자 입력형 옵션 */
export interface OptionInputs {
    /** 구매자 작성형 입력 깂 (nullable) */
    inputValue?: Nullable<string>;
    /** 구매자 작성형 입력 이름 (nullable) */
    inputLabel?: Nullable<string>;
    /** 구매자 작성형 입력 필수여부 (nullable) */
    required?: Nullable<boolean>;
    /** 구매자 입력형 옵션 번호 (nullable) */
    inputNo?: Nullable<number>;
}

/** 상품결제 파라미터 */
export interface Products {
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
    recurringPaymentDelivery: RecurringPaymentDelivery;
    /** 채널 타입 */
    channelType?: string;
    /** 추가상품이 있는 상품번호 (nullable) */
    baseProductNo?: Nullable<number>;
    /** 정기결제 종료 회차 (nullable) */
    recurringPaymentLastRound?: Nullable<number>;
    /** 주문수량 */
    orderCnt: number;
    /** 소비자 입력형 옵션 */
    optionInputs: OptionInputs[];
    /** 옵션번호 */
    optionNo: number;
    /** 상품번호 */
    productNo: number;
}

export interface AddressRequest {
    /** 수령인 LastName (nullable) */
    receiverLastName?: Nullable<string>;
    /** 배송지 지번(지역추가배송비계산 시 사용되며 외부 주소 검색 서비스를 사용하는 경우 해당 값을 비워서 호출해 주시기 바랍니다.) */
    receiverJibunAddress?: Nullable<string>;
    /** 기본배송지 여부  */
    defaultYn?: Nullable<string>;
    /** 수령자 명 */
    receiverName?: Nullable<string>;
    /** 개인고유통관부호 */
    customsIdNumber?: Nullable<string>;
    /** 국가코드 */
    countryCd?: Nullable<string>;
    /** 배송지 우편 번호 */
    receiverZipCd: string;
    /** 배송지 상세 주소 */
    receiverDetailAddress: string;
    /** (해외) 도시 (nullable) */
    receiverCity?: Nullable<string>;
    /** 배송지 주소 */
    receiverAddress: string;
    /** (해외) 주 (nullable) */
    receiverState?: Nullable<string>;
    /** 주소록명 */
    addressName?: Nullable<string>;
    /** (해외배송 / 글로벌결제 시 필수) 수령인 FirstName (nullable) */
    receiverFirstName?: Nullable<string>;
    /** 연락처1 */
    receiverContact1: string;
    /** 연락처2 */
    receiverContact2?: Nullable<string>;
}

/** 쿠폰 */
export interface PaymentCoupons {
    /** 상품쿠폰 */
    productCoupons: {
        /** 상품쿠폰 발행번호 */
        couponIssueNo: number;
        /** 상품 쿠폰 프로모션 코드 (nullable) */
        promotionCode?: string;
        /** 상품번호 */
        productNo: number;
    }[];
    /** 장바구니 쿠폰 발행 번호 (nullable) */
    cartCouponIssueNo?: number;
    /** 쿠폰 할인 코드 (nullable) */
    promotionCode?: string;
}

/** 쿠폰 */
export interface CouponRequest {
    /** 상품 쿠폰 (nullable) */
    productCoupons?: Nullable<
        {
            /** 쿠폰 발급 번호 */
            couponIssueNo?: Nullable<number>;
            /** 상품번호 */
            productNo?: Nullable<number>;
        }[]
    >;
    /** 장바구니 쿠폰 발행 번호 */
    cartCouponIssueNo?: Nullable<number>;
    /** 쿠폰 할인 코드 */
    promotionCode?: Nullable<string>;
    /** 쇼핑채널링-채널타입 */
    channelType?: Nullable<string>;
}

/** 복수 배송지 정보 */
export interface ShippingAddresses {
    /** 상품결제 파라미터 */
    payProductParams: Omit<Products, 'channelType'>[];
    /** 배송지정일 */
    requestShippingDate?: Nullable<string>;
    /** 배송지 번호(0:신규, 0이상:이전배송지) */
    addressNo?: Nullable<number>;
    /** 배송지 나중입력 여부 (true: 나중입력, false: 바로입력) */
    usesShippingInfoLaterInput?: Nullable<boolean>;
    /** 기본 주소지 설정 여부 (true 이면 선택한 배송지 정보가 기본주소지로 설정되어 저장된다) */
    useDefaultAddress?: Nullable<boolean>;
    shippingAddress: ShippingAddressInfo;
    /** 주소록명 */
    addressName?: Nullable<string>;
    /** 배송지 나중입력 연락처 */
    shippingInfoLaterInputContact?: Nullable<string>;
}

interface ShippingAddressInfo extends Omit<AddressRequest, 'addressName'> {
    /** 주문 추가 정보 (nullable) */
    orderAdditionalInfo?: Nullable<string>;
    /** 배송메모 */
    deliveryMemo?: Nullable<string>;
    /** [개발중] 전화번호 국가코드 (nullable) */
    receiverMobileCountryCd?: Nullable<string>;
}

/** 주문자정보 */
interface Orderer {
    /** 주문자 이메일 (nullable) */
    ordererEmail?: Nullable<string>;
    /** 주문자연락처1 */
    ordererContact1: string;
    /** 주문자연락처2 (nullable) */
    ordererContact2?: Nullable<string>;
    /** 주문자 연락처 국가코드 (nullable) */
    mobileCountryCd?: Nullable<string>;
    /** 주문자명 */
    ordererName: string;
}

export interface GuestCart {
    /** 유입채널 (nullable) */
    channelType: Nullable<string>;
    /** 구매개수 */
    orderCnt: number;
    /** 구매자 입력형 옵션 */
    optionInputs: Nullable<
        {
            /** 구매자 작성형 입력 값 (nullable) */
            inputValue?: string;
            /** 구매자 작성형 입력 이름 (nullable) */
            inputLabel?: string;
        }[]
    >;
    /** 옵션번호 */
    optionNo: number;
    /** 카트번호 */
    cartNo: number;
    /** 상품번호 */
    productNo: number;
}

export interface ShoppingCartBody {
    /** 구매개수 */
    orderCnt: number;
    /** 구매자 입력형 옵션 */
    optionInputs?: {
        /** 구매자 작성형 입력 값 (nullable) */
        inputValue?: Nullable<string>;
        /** 구매자 작성형 입력 이름 (nullable) */
        inputLabel?: Nullable<string>;
    }[];
    /** 옵션번호 */
    optionNo: number;
    /** 상품번호 */
    productNo: number;
    /** 카트번호 */
    cartNo?: number;
}

export interface TokenIssueData {
    /** 주문옵션타입 */
    orderRequestType: OrderRequestType;
    /** 비회원 주문 비밀번호 (nullable) */
    password?: Nullable<string>;
    /** 주문자명 (nullable) */
    name?: Nullable<string>;
    /** 핸드폰번호 (nullable) */
    mobileNo?: Nullable<string>;
    /** 이메일 (nullable) */
    email?: Nullable<string>;
}

/** 렌탈 정보 */
export interface RentalInfo {
    /** 월 렌탈료 */
    monthlyRentalAmount?: Nullable<number>;
    /** 렌탈 기간 */
    rentalPeriod?: Nullable<number>;
}

export interface CartList {
    // 배송그룹
    deliveryGroups: DeliveryGroup[];
    // 가격 정보
    price: CartPriceInfo;
    // 유효하지 않은 상품
    invalidProducts: InvalidProduct[];
}

/** 배송그룹 */
export interface DeliveryGroup {
    /** 배송그룹별 구매금액 합 */
    buyAmt: number;
    /** 파트너번호 (nullable) */
    partnerNo?: Nullable<number>;
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

/** 주문상품 */
export interface OrderProduct {
    /** 교환가능여부 */
    exchangeable: boolean;
    /** 구매금액 합 */
    buyAmt: number;
    /** 취소가능여부 */
    cancelable: boolean;
    /** 쿠폰 사용 가능 여부 */
    couponUsable: boolean;
    /** 추가상품전용 여부 */
    extraProductOnly: boolean;
    /** 배송가능여부 */
    deliverable: boolean;
    /** 카테고리 명 */
    categoryName: string;
    /** 옵션사용여부 */
    optionUsed: boolean;
    /** 찜상품 여부 */
    liked: boolean;
    /** 상품명 */
    productName: string;
    /** 파트너 번호 */
    partnerNo: number;
    /** 최대 구매수량 정보 */
    maxBuyCountInfo?: MaxBuyCountInfo;
    /** 적립금 사용 가능 여부 */
    accumulationUsable: boolean;
    /** eanCode */
    eanCode: string;
    /** 최소 구매 수량 */
    minBuyCount: number;
    /** 상품 url */
    imageUrl: string;
    /** 표준 카테고리 번호 */
    categoryNo: number;
    /** 옵션 선택 방식 */
    selectType?: Nullable<OptionSelectType>;
    /** 주문 상품 옵션 */
    orderProductOptions: OrderProductOption[];
    /** 환불가능여부 */
    refundable: boolean;
    /** 전시 카테고리 번호 목록 */
    categoryNos: (boolean | string | number)[];
    /** 배송일 지정 정보 */
    deliveryDate?: DeliveryDate;
    /** 브랜드 번호 */
    brandNo: number;
    /** 해외직배송여부 */
    deliveryInternational: boolean;
    /** 상품번호 */
    productNo: number;
    /** 브랜드 명 */
    brandName: string;
    /** 파트너 명 */
    partnerName: string;
    /** 네이버페이 주문형 결제 가능 여부 */
    allowsNaverPay: boolean;
    /** 배송구분 */
    shippingAreaType: ShippingAreaType;
    /** 이미지 타입 */
    imageUrlType: ImageUrlType;
    /** 가격대체문구 */
    contentsIfPausing: string;
    /** 미성년자 구매 가능 여부 */
    minorPurchasable: boolean;
    /** 반품가능여부 */
    returnable: boolean;
    /** hsCode */
    hsCode: string;
    /** 브랜드 영문명 */
    brandNameEn: string;
    /** 상품 영문명 */
    productNameEn?: Nullable<string>;
    /** 묶음 배송 가능 여부 */
    combinable: boolean;
}

/** 주문 상품 옵션 */
export interface OrderProductOption {
    /** 예약주문 상품 배송시작예정일 */
    reservationDeliveryYmdt: string;
    /** 구매확정 시 적립금 합 */
    accumulationAmtWhenBuyConfirm: number;
    /** 유효성 정보 */
    validInfo: ValidInfo;
    /** 장바구니 그룹 아이디 (nullable) */
    groupId?: Nullable<string>;
    /** 추가상품여부 */
    isExtraProduct: boolean;
    /** 카테고리 명 */
    categoryName: string;
    /** 옵션형태 */
    optionType: OptionType;
    /** 추가상품의 본상품번호 (nullable) */
    baseProductNo?: Nullable<number>;
    /** 구매확정 시 회원에 대한 적립률(회원등급/그룹 중 큰 값) */
    accumulationRateForMemberWhenBuyConfirm: number;
    /** 가격정보 */
    price: {
        /** 구매금액(구매가 * 주문수량) */
        buyAmt: number;
        /** 추가할인금액 */
        additionalDiscountAmt: number;
        /** 즉시할인금액 */
        immediateDiscountAmt: number;
        /** 상품판매가 */
        salePrice: number;
        /** 정상금액(상품판매가 + 옵션추가금액) * 주문수량 */
        standardAmt: number;
        /** 옵션가격(추가금액) */
        addPrice: number;
    };
    /** 옵션 이미지 URL */
    imageUrl: string;
    /** 표준 카테고리 번호 */
    categoryNo: number;
    /** 주문 상품 옵션 */
    setOptions: SetOption[];
    /** 예약주문여부 (true: 예약주문상품, false: 일반상품) */
    reservation: boolean;
    /** 옵션번호 */
    optionNo: number;
    /** 구매확정 시 회원에 대한 적립금(회원등급/그룹 중 큰 값) */
    accumulationAmtForMemberWhenBuyConfirm: number;
    /** 상품번호 */
    productNo: number;
    /** 필수형 옵션 여부 */
    isRequiredOption: boolean;
    /** 조정가능 배송 주기 */
    adjustableDeliveryCycle: AdjustableDeliveryCycle;
    /** 옵션권장출력값 */
    optionTitle: string;
    /** 옵션값 */
    optionValue: string;
    /** 주문수량 */
    orderCnt: number;
    /** 소비자 입력형 옵션 */
    optionInputs: OptionInputs[];
    /** 품절여부 (true:품절 false:구매가능) */
    soldOut: boolean;
    /** 추가상품의 본상품명 */
    baseProductName?: Nullable<string>;
    /** 구매확정 시 상품에 대한 적립률 */
    accumulationRateForProductWhenBuyConfirm: number;
    /** 구매확정 시 상품에 대한 적립금 */
    accumulationAmtForProductWhenBuyConfirm: number;
    /** 재고 개수 */
    stockCnt: number;
    /** 옵션명 */
    optionName: string;
    /** 판매자 관리코드 */
    optionManagementCd: string;
    /** 장바구니 번호 */
    cartNo: number;
}

/** 조정가능 배송 주기 */
export interface AdjustableDeliveryCycle {
    /** 조정가능한 배송 요일 */
    dayOfWeekCycles: (boolean | string | number)[];
    /** 조정가능한 배송 주기 타입 */
    deliveryCycleTypes: 'MONTH' | 'WEEK';
    /** 조정가능한 주단위 배송 주기 */
    weekDeliveryCycles: (boolean | string | number)[];
    /** 조정가능한 월단위 배송 주기 */
    monthDeliveryCycles: (boolean | string | number)[];
}

/** 가격정보 */
export interface Price {
    /** 구매가(즉시할인 + 추가할인 적용) */
    buyPrice: number;
    /** 구매금액(구매가 * 주문수량) */
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
    /** 옵션추가금액 */
    addPrice: number;
    /** 정상가(상품판매가 + 옵션추가금액) */
    standardPrice: number;
    /** 적립율 */
    accumulationRate: number;
}

/** 유효성 정보 */
export interface ValidInfo {
    /** 유효 여부(true: 유효, false: 유효하지 않음) */
    valid: boolean;
    /** @deprecated(더 이상 제공하지 않는 개체항목입니다) */
    validYn: 'Y' | 'N';
    /** 유효성 실패 코드 (nullable) */
    errorCode?: Nullable<string>;
    /** 유효성 실패 사유 메세지 (nullable) */
    message?: Nullable<string>;
    /** 주문수량변경 가능 여부 (true:변경가능, false:변경불가능) */
    orderCntChangeable: boolean;
}

/** 배송일 지정 정보 */
export interface DeliveryDate {
    /** 기간 */
    period: {
        /** 배송일지정 가능한 시작일 */
        startYmdt: string;
        /** 배송일지정 가능한 종료일 */
        endYmdt: string;
    };
    /** 요일 */
    daysOfWeek: DaysOfWeekType[];
    /** 주문일 기준 */
    daysAfterPurchase: number;
}

/** 최대 구매수량 정보 */
export interface MaxBuyCountInfo {
    /** 1인당 최대 구매 수량 */
    maxBuyPersonCount: number;
    /** 최대 구매 수량 기간 제한 : 7일 동안 최대 2개 구매가능 (2개 항목) */
    maxBuyPeriodCount: number;
    /** 최대 구매 수량 기간 제한 : 7일 동안 최대 2개 구매가능 (7일 항목) */
    maxBuyDays: number;
    /** 1회당 최대 구매 수량 */
    maxBuyTimeCount: number;
}

/** 배송 조건 */
export interface DeliveryCondition {
    /** 배송조건 (nullable) */
    deliveryConditionType?: Nullable<DeliveryConditionType>;
    /** 조건부 배송비의 기준값(9,800원 미만 배송비 2,500원일때 aboveDeliveryAmt는 9800) */
    aboveDeliveryAmt: number;
    /** 배송비(조건에 의해 계산되어진) */
    deliveryAmt: number;
    /** 묶음배송조건 (nullable) */
    groupDeliveryAmtType?: Nullable<GroupDeliveryAmtType>;
    /** 반품배송비 */
    returnDeliveryAmt: number;
    /** 조건부 배송비 미달 시 배송비(9,800원 미만 배송비 2,500원일때 baseDeliveryAmt는 2,500) */
    baseDeliveryAmt: number;
    /** 배송구분 (nullable) */
    deliveryType?: Nullable<DeliveryType>;
    /** 추가배송비(조건에 의해 계산되어진) */
    remoteDeliveryAmt: number;
    /** 배송구분(노출용) (nullable) */
    deliveryTypeLabel?: Nullable<string>;
}

/** 유효하지 않은 상품 */
export interface InvalidProduct {
    /** 교환가능여부 */
    exchangeable: boolean;
    /** 구매금액 합 */
    buyAmt: number;
    /** 취소가능여부 */
    cancelable: boolean;
    /** 쿠폰 사용 가능 여부 */
    couponUsable: boolean;
    /** 추가상품전용 여부 */
    extraProductOnly: boolean;
    /** 배송가능여부 */
    deliverable: boolean;
    /** 카테고리 명 */
    categoryName: string;
    /** 옵션사용여부 */
    optionUsed: boolean;
    /** 찜상품 여부 */
    liked: boolean;
    /** 상품 명 */
    productName: string;
    /** 파트너 번호 */
    partnerNo: number;
    /** 최대 구매수량 정보 */
    maxBuyCountInfo?: MaxBuyCountInfo;
    /** 적립금 사용 가능 여부 */
    accumulationUsable: boolean;
    /** eanCode */
    eanCode: string;
    /** 최소 구매 수량 */
    minBuyCount: number;
    /** 상품 url */
    imageUrl: string;
    /** 표준 카테고리 번호 */
    categoryNo: number;
    /** 옵션 선택 방식 (nullable) */
    selectType?: Nullable<OptionSelectType>;
    /** 주문 상품 옵션 */
    orderProductOptions: OrderProductOption[];
    /** 환불가능여부 */
    refundable: boolean;
    /** 전시 카테고리 번호 목록 */
    categoryNos: (boolean | string | number)[];
    /** 배송일 지정 정보 */
    deliveryDate?: DeliveryDate;
    /** 브랜드 번호 */
    brandNo: number;
    /** 해외직배송여부 */
    deliveryInternational: boolean;
    /** 상품번호 */
    productNo: number;
    /** 브랜드 명 */
    brandName: string;
    /** 파트너 명 */
    partnerName: string;
    /** 네이버페이 주문형 결제 가능 여부 */
    allowsNaverPay: boolean;
    /** 배송구분 */
    shippingAreaType: ShippingAreaType;
    /** 상품 url 타입 */
    imageUrlType: ImageUrlType;
    /** 가격대체문구 */
    contentsIfPausing: string;
    /** 미성년자 구매 가능 여부 */
    minorPurchasable: boolean;
    /** 반품가능여부 */
    returnable: boolean;
    /** hsCode */
    hsCode: string;
    /** 브랜드 영문명 */
    brandNameEn: string;
    /** 상품 영문명 */
    productNameEn?: Nullable<string>;
    /** 묶음 배송 가능 여부 */
    combinable: boolean;
}

export interface Period2 {
    startYmdt: string;
    endYmdt: string;
}

/** 가격 정보 */
export interface CartPriceInfo {
    /** 구매금액 합 */
    buyAmt: number;
    /** 할인금액 */
    discountAmt: number;
    /** 총 구매금액 합(구매금액 합 + 총 선불배송비 합) */
    totalAmt: number;
    /** 구매확정 시 적립금 합 */
    accumulationAmtWhenBuyConfirm: number;
    /** 정상금액(상품판매가 + 옵션추가금액) * 주문수량 */
    standardAmt: number;
    /** 총 착불배송비 합 */
    totalPayOnDeliveryAmt: number;
    /** 총 배송비 합 */
    totalDeliveryAmt: number;
    /** 총 선불배송비 합 */
    totalPrePaidDeliveryAmt: number;
}

export interface ErrorCode {
    code: string;
    simpleCode: string;
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
    mallProductNo: number;
    /** 재고번호 */
    stockNo: number;
    /** 상품명 */
    productName: string;
}

/** 프로모션 정보 요약 */
export interface OrderSheetPromotionSummary {
    /** 사용가능한 적립금 */
    myAccumulationAmt: number;
    /** 해당 회원이 발급받은 장바구니 쿠폰 수 + 해당 주문서의 상품 기준으로 사용 가능한 쿠폰 수 */
    usableCouponCnt: number;
    /** 해당 회원이 발급받은 사용 가능한 전체 쿠폰 수량 */
    myCouponCnt: number;
}

/** 배송지 */
export interface OrderSheetAddress {
    /** 최근 배송지 */
    recentAddresses: MainAddress[];
    /** 최근 배송 메시지 (nullable) */
    recentDeliveryMemo?: Nullable<string[]>;
    /** 회원에 저장된 주소 */
    memberAddress: MemberAddress;
    /** 기본 배송지 */
    mainAddress: MainAddress;
}

export interface MainAddress {
    /** 배송지 지번(지역추가배송비계산 시 사용되며 외부 주소 검색 서비스를 사용하는 경우 해당 값을 비워서 호출해 주시기 바랍니다.) */
    receiverJibunAddress?: Nullable<string>;
    /** 수령자 명 (nullable) */
    receiverName?: Nullable<string>;
    /** 개인고유통관부호 (nullable) */
    customsIdNumber?: Nullable<string>;
    /** 국가코드 */
    countryCd?: Nullable<CountryCdType>;
    /** 배송지 우편 번호 */
    receiverZipCd: string;
    /** 주소지 메모 (nullable) */
    addressMemo?: Nullable<string>;
    /** 배송지 상세 주소 */
    receiverDetailAddress: string;
    /** (해외) 도시 (nullable) */
    receiverCity?: Nullable<string>;
    /** 배송지 주소 */
    receiverAddress: string;
    /** 해외배송지 기타정보 (nullable) */
    shippingEtcInfo?: {
        /** 수령인 LastName (nullable) */
        receiverLastName?: Nullable<string>;
        /** 주문 추가 정보 (nullable) */
        orderAdditionalInfo?: Nullable<string>;
        /** (해외배송 / 글로벌결제 시 필수) 수령인 FirstName (nullable) */
        receiverFirstName?: Nullable<string>;
    };
    /** 배송지 번호(0:신규, 0이상:이전배송지) */
    addressNo?: Nullable<number>;
    /** (해외) 주 (nullable) */
    receiverState?: Nullable<string>;
    /** 주소록명 (nullable) */
    addressName?: Nullable<string>;
    /** 연락처1 */
    receiverContact1: string;
    /** 연락처2 */
    receiverContact2?: Nullable<string>;
}

/** 회원에 저장된 주소 */
export interface MemberAddress {
    /** 해외배송지 기타정보 (nullable) */
    shippingEtcInfo?: Nullable<{
        /** 수령인 LastName (nullable) */
        receiverLastName?: Nullable<string>;
        /** 주문 추가 정보 (nullable) */
        orderAdditionalInfo?: Nullable<string>;
        /** (해외배송 / 글로벌결제 시 필수) 수령인 FirstName (nullable) */
        receiverFirstName?: Nullable<string>;
    }>;
    /** 도로명 주소 (nullable) */
    address?: Nullable<string>;
    /** (해외) 주 (nullable) */
    receiverState?: Nullable<string>;
    /** 지번 주소 (nullable) */
    jibunAddress?: Nullable<string>;
    /** 도로명 상세 주소 (nullable) */
    detailAddress?: Nullable<string>;
    /** 우편번호 (nullable) */
    zipCd?: Nullable<string>;
    /** (해외) 도시 (nullable) */
    receiverCity?: Nullable<string>;
    /** 지번 상세 주소 (nullable) */
    jibunDetailAddress?: Nullable<string>;
}

/** 주문자 연락처 (nullable) */
export interface OrdererContact {
    /** 주문자이메일 */
    ordererEmail: string;
    /** 주문자연락처1 */
    ordererContact1: string;
    /** 주문자연락처2 */
    ordererContact2: string;
    /** $[개발중] 주문자 연락처 국가코드 (nullable) */
    ordererMobileCountryCd?: Nullable<string>;
    /** 주문자명 */
    ordererName: string;
}

/**상품 쿠폰 */
export interface AppliedProductCoupon {
    /** 쿠폰 적용 여부 */
    couponApplied: boolean;
    /** 쿠폰 발급 번호 */
    couponIssueNo: number;
    /** 상품번호 */
    productNo: number;
}

/** 적용된 쿠폰 */
export interface AppliedCoupons {
    /** 상품 쿠폰 (nullable) */
    productCoupons: Nullable<AppliedProductCoupon[]>;
    /** 장바구니 쿠폰 발행 번호 */
    cartCouponIssueNo: number;
    /** 장바구니 쿠폰 적용 여부 */
    cartCouponApplied: boolean;
    /** 쿠폰 할인 코드 */
    promotionCode: string;
}

/** 결제 정보 */
export interface PaymentInfo {
    /** paymentAmt[결제예정금액] = buyAmt[장바구니 금액] - cartCouponAmt[장바구니 쿠폰할인금액] + deliveryAmt[배송비] + remoteDeliveryAmt[지역별추가배송비] + salesTaxAmt (- usedAccumulationAmt[사용한적립금]:OrderSheet시점에는 hidden) - 외부 결제금액 */
    paymentAmt: number;
    /** buyAmt[장바구니 금액] = totalStandardAmt[최종상품금액] - totalImmediateDiscountAmt[즉시할인가] - totalAdditionalDiscountAmt[추가할인가] - productCouponAmt[상품쿠폰할인금액] */
    cartAmt: number;
    /** productAmt[상품금액] = totalStandardAmt[최종상품금액] - totalImmediateDiscountAmt[즉시할인가] - totalAdditionalDiscountAmt[추가할인가] */
    productAmt: number;
    /** 구매확정시 예상 적립금 */
    accumulationAmtWhenBuyConfirm: number;
    /** 사용한 적립금 */
    usedAccumulationAmt: number;
    /** 추가배송비(조건에 의해 계산되어진) */
    remoteDeliveryAmt: number;
    /** 상품쿠폰 할인금액(상품쿠폰 + 플러스쿠폰) */
    productCouponAmt: number;
    /** customs Duty [관세] (미국 몰 전용) */
    customsDuty: number;
    /** immediateDiscountAmt[즉시할인가] * orderCnt[구매수량] */
    totalImmediateDiscountAmt: number;
    /** 착불 지역별 추가 배송비 */
    remoteDeliveryAmtOnDelivery: number;
    /** 장바구니 쿠폰 할인금액 */
    cartCouponAmt: number;
    /** 적립금을 사용할 수 있는 최소 적립금 기준 */
    minAccumulationLimit: number;
    /** 적립금을 사용할 수 있는 최소 결제 금액 기준 */
    minPriceLimit: number;
    /** 배송비 */
    deliveryAmt: number;
    /** additionalDiscountAmt[추가할인가] * orderCnt[구매수량] */
    totalAdditionalDiscountAmt: number;
    /** 최대 사용가능한 적립금 */
    availableMaxAccumulationAmt: number;
    /** 보유한 적립금 */
    accumulationAmt: number;
    /** 착불 배송비 */
    deliveryAmtOnDelivery: number;
    /** sales Tax (미국 몰 전용) */
    salesTaxAmt: number;
    /** 적립금 사용 가능 여부 (true: 가능, false: 불가능) */
    isAvailableAccumulation: boolean;
    /** 외부결제수단정보 (nullable) */
    externalPayInfos?: Nullable<(boolean | string | number)[]>;
    /** standardPrice[최종상품금액] (salePrice[판매가] + addPrice[옵션추가금액]) * orderCnt[구매수량] */
    totalStandardAmt: number;
}

/** 거래은행 정보 */
export interface TradeBankAccountInfo {
    /** 계좌번호 */
    bankAccount: string;
    /** 은행 코드 */
    bankCode: string;
    /** 예금주명 */
    bankDepositorName: string;
    /** 은행명 */
    bankName: string;
}

export interface AvailablePayType {
    /** 사용 가능한 결제수단 */
    payType: PayType;
    /** 외부 PG사 */
    pgTypes: PgType[];
    /** payType 이름 */
    payTypeLabel: string;
}

/** 해외 파트너 */
export interface ForeignPartner {
    /** 파트너명 */
    partnerName: string;
    /** 개인정보관리책임자 연락처 */
    privacyManagerPhoneNo: string;
    /** 개인정보관리책임자 이름 */
    privacyManagerName: string;
    /** 국가코드 */
    countryCd?: Nullable<CountryCdType>;
}

export interface SellerPrivacyUsagePartner {
    /** 파트너명 */
    partnerName: string;
}

export interface FreeGiftInfo {
    /** 선택 개수 설정. freeGiftOptionCountType이 SELECT인 경우 전달 (nullable) */
    freeGiftOptionCount: Nullable<number>;
    freeGifts: FreeGift[];
    /** 지급 시작 일시 */
    giveStartYmdt: string;
    /** 사은품 지급조건 번호 */
    freeGiftConditionNo: number;
    /** 지급 종료 일시 */
    giveEndYmdt: string;
    /** 지급옵션 수량 타입 */
    freeGiftOptionCountType: FreeGiftOptionCountType;
    /** 지급조건명 */
    giveConditionName: string;
}

export interface FreeGift {
    /** 옵션번호 */
    mallOptionNo: number;
    /** 옵션값 */
    optionValue: string;
    /** 옵션명 */
    optionName: string;
    /** 상품번호 */
    mallProductNo: number;
    /** 상품 이미지 URL */
    mallProductMainImageUrl: string;
    /** 상품명 */
    productName: string;
}

export interface ApplyCouponParams {
    /** 채널타입^|NAVER_EP */
    channelType?: string;
}

export interface ApplyCouponResponse {
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
    products: ProductInfo[];
}

export interface ProductInfo {
    /** 상품 쿠폰 */
    productCoupons: ProductCoupon[];
    /** 구매금액(구매가 * 주문수량) */
    buyAmt: number;
    /** 상품플러스쿠폰 (nullable) */
    productPlusCoupons?: Nullable<ProductPlusCoupon[]>;
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

/** 상품 플러스 쿠폰 */
export interface ProductPlusCoupon {
    /** 쿠폰 생성 사유 */
    reason: string;
    /** 할인비율 (nullable) */
    discountRate: Nullable<number>;
    /** 쿠폰명 */
    couponName: string;
    /** 쿠폰 발급 번호 */
    couponIssueNo: number;
    /** 쿠폰 사용 가능한 최소 금액 */
    minSalePrice: number;
    /** 배송비무료여부 (true: 무료, false: 유료) */
    freeDelivery: boolean;
    /** 최대할인금액(정률에서) */
    maxDiscountAmt: number;
    /** 장바구니 쿠폰 사용 가능 여부(상품쿠폰인 경우) (true: 가능, false: 불가능) */
    cartCouponUsable: boolean;
    /** 사용종료일 */
    useEndYmdt: string;
    /** 현재 주문에서 쿠폰 사용 여부 (true: 사용, false: 미사용) */
    used: boolean;
    /** 쿠폰할인금액 */
    couponDiscountAmt: number;
    /** 쿠폰 유형 (PRODUCT: 상품, CART: 장바구니) */
    couponType: 'PRODUCT' | 'CART';
    /** 상품쿠폰 사용 가능 여부(주문쿠폰인 경우) (true: 가능, false: 불가능) */
    productCouponUsable: boolean;
    /** 제한 결제수단 리스트 */
    limitPayTypes: PayType[];
    /** 배송비무료여부 */
    freeDeliveryYn: 'Y' | 'N';
    /** 쿠폰명(노출용) */
    displayCouponName: string;
    /** 쿠폰 번호 */
    couponNo: number;
    /** 사용 가능플랫폼 (PC웹,모바일웹,모바일앱) */
    usablePlatformTypes: Omit<PlatformType, 'RESPONSIVE'>;
    /** 쿠폰 대상 유형 */
    couponTargetType: CouponTargetType;
    /** 적립금 적립 불가 여부 (true: 불가능, false: 가능) */
    skipsAccumulation: boolean;
    /** 쿠폰 사용 가능한 최대 금액 */
    maxSalePrice: number;
    /*** 쿠폰 하위 타입 */
    couponSubType: string;
    /** 최대 할인 적용 가능한 쿠폰 여부 */
    maximum: boolean;
    /** 고정금액할인 (true:정액, false:정률) */
    fixedAmountDiscount: boolean;
}

/** 장바구니 쿠폰 */
export interface CartCoupon {
    /** 쿠폰 생성 사유 */
    reason: string;
    /** 할인비율 (nullable) */
    discountRate?: Nullable<number>;
    /** 쿠폰명 */
    couponName: string;
    /** 쿠폰 발급 번호 */
    couponIssueNo: number;
    /** 쿠폰 사용 가능한 최소 금액 */
    minSalePrice?: Nullable<number>;
    /** 배송비무료여부 (true: 무료, false: 유료) */
    freeDelivery: boolean;
    /** 최대할인금액(정률에서) */
    maxDiscountAmt?: Nullable<number>;
    /** 장바구니 쿠폰 사용 가능 여부(상품쿠폰인 경우) (true: 가능, false: 불가능) */
    cartCouponUsable: boolean;
    /** 사용종료일 */
    useEndYmdt?: Nullable<string>;
    /** 현재 주문에서 쿠폰 사용 여부 (true: 사용, false: 미사용) */
    used: boolean;
    /** 쿠폰할인금액 */
    couponDiscountAmt: number;
    /** 쿠폰 유형 (PRODUCT: 상품, CART: 장바구니) */
    couponType: Omit<CouponType, 'CART_DELIVERY' | 'GIFT'>;
    /** 상품쿠폰 사용 가능 여부(주문쿠폰인 경우) (true: 가능, false: 불가능) */
    productCouponUsable: boolean;
    /** 제한 결제수단 리스트 */
    limitPayTypes?: Nullable<PayType[]>;
    /** 선택여부 (true: 선택, false: 선택안함) */
    selected: boolean;
    /** 제한 결제수단 (limitPayTypes를 사용하세요. */
    limitPayType?: Nullable<PayType>;
    /** 배송비무료여부 */
    freeDeliveryYn: 'Y' | 'N';
    /** 쿠폰명(노출용) */
    displayCouponName: string;
    /** 쿠폰 번호 */
    couponNo: number;
    /** 사용 가능플랫폼 (PC웹,모바일웹,모바일앱) */
    usablePlatformTypes: PlatformType;
    /** 쿠폰 대상 유형 */
    couponTargetType?: Nullable<CouponTargetType>;
    /** 적립금 적립 불가 여부 (true: 불가능, false: 가능) */
    skipsAccumulation: boolean;
    /** 쿠폰 사용 가능한 최대 금액 */
    maxSalePrice?: Nullable<number>;
    /** 쿠폰 하위 타입 */
    couponSubType: string;
    /** 최대 할인 적용 가능한 쿠폰 여부 */
    maximum?: Nullable<boolean>;
    /** 고정금액할인 (true:정액, false:정률) */
    fixedAmountDiscount: boolean;
}

// 회원 / 비회원 response 구조 같음
export interface OrderDetailResponse {
    /** deprecated(더 이상 제공하지 않는 개체항목입니다) */
    insurance?: Insurance;
    /** 결제완료시 PG사에서 전달 받는 암호키(지원 PG: 토스간편결제) (nullable) */
    orderCertifyKey?: Nullable<string>;
    /** 추가 정보 (nullable) */
    extraData?: Nullable<object>;
    /** 구매확정 시 적립예정 적립금 */
    accumulationAmtWhenBuyConfirm: number;
    /** 기본 주문 상태 */
    defaultOrderStatusType: OrderStatusType;
    /** PG사 결제키 */
    pgMallKey: string;
    /** 배송지 메모 */
    memo: string;
    /** 최초주문금액정보 */
    firstOrderAmount: FirstOrderAmount & {
        /** [개발중] 상품별 쿠폰 할인 금액 */
        productDiscountInfos: {
            /** 상품쿠폰 할인 금액 */
            discountAmt: number;
            /** 상품번호 */
            productNo: number;
        }[];
    };
    /** 주문메모 (nullable) */
    orderMemo?: Nullable<string>;
    /** 개인통관고유부호필요여부(true: 필요, false: 불필요) */
    requireCustomsIdNumber: boolean;
    /** 환불(예상)방법(PG)(deprecated: refundTypeLabel 사용) */
    refundType: RefundType;
    /** 결제 영수증 정보 */
    receiptInfos: ReceiptInfo[];
    /** 교환추가결제 정보 (nullable) */
    exchangePayInfos?: Nullable<ExchangePayInfo[]>;
    /** 결제수단 (nullable) */
    payType?: Nullable<PayType>;
    /** 현금영수증 발행 정보 */
    cashReceiptInfo?: CashReceiptInfo;
    /** 회원여부(true: 회원, false: 비회원) */
    member: boolean;
    /** 다음에 할 수 있는 작업 */
    nextActions: NextAction[];
    /** 에스크로 여부(true: 에스크로, false: 비에스크로) */
    escrow: boolean;
    /** 선택가능한 은행 */
    availableBanks: AvailableBank[];
    /** 비회원-인증토큰 (nullable) */
    guestToken: Nullable<string>;
    /** (예상)환불방법(노출용) */
    refundTypeLabel: string;
    /** 외부 PG사 */
    pgType: PgType;
    /** 주문번호 */
    orderNo: string;
    /** 최종주문금액정보 */
    lastOrderAmount: LastOrderAmount;
    /** 환불정보 */
    refundInfos?: Nullable<RefundInfo[]>;
    /** 추가결제정보 (nullable) */
    additionalPayInfos?: Nullable<AdditionalPayInfo[]>;
    /** 해외결제정보 */
    internationalPayInfo?: {
        /** 환율 (nullable) */
        exchangeRate?: Nullable<number>;
        /** 환율 적용된 PG 결제 금액 (nullable) */
        exchangedAmt?: Nullable<number>;
        /** 통화 코드) */
        currencyCode: string;
    };
    /** 배송지 메모 */
    deliveryMemo: string;
    /** 환불결제방법 */
    refundPayType: RefundPayType;
    /** 선택가능한 사유 목록 */
    claimReasonTypes: ClaimReasonTypeList[];
    /** 주문만료 일자 - (가상계좌 전용) (nullable) */
    paymentExpirationYmdt?: Nullable<string>;
    /** 현재 주문에 대한 클레임 정보 (nullable) */
    claimHistories?: Nullable<
        {
            /** 클레임 사유 상세 (nullable) */
            claimReasonDetail?: Nullable<string>;
            /** 귀책 (BUYER, SELLER) */
            responsibleObjectType: ResponsibleObjectType;
            /** 클레임 번호 */
            claimNo: number;
            /** 클레임 처리 상태 */
            treatmentStatusType: string;
            /** 클레임 완료 시각 (nullable) */
            claimCompleteYmdt?: Nullable<string>;
            /** 클레임 철회 사유 (nullable) */
            withdrawReason?: Nullable<string>;
            /** 클레임 사유 타입 (nullable) */
            claimReasonType?: Nullable<string>;
            /** 클레임 신청 시각 */
            claimYmdt: string;
            /** 클레임 처리 시각 */
            treatmentYmdt: string;
            /** 클레임 상태 (nullable) */
            claimStatusType?: Nullable<string>;
        }[]
    >;
    /** 주문자정보 */
    orderer: Orderer;
    /** PG사 결제번호(주문번호) - 매출전표등 확인용 (nullable) */
    pgOrderNo?: Nullable<string>;
    /** 파트너별주문리스트 */
    orderOptionsGroupByPartner: OrderOptionsGroupByPartner[];
    /** 배송지 정보 */
    shippingAddress: ShippingAddress;
    /** 주문일자 */
    orderYmdt: string;
    /** 결제지 주소 */
    billingAddress?: ShippingAddress;
    /** 결제수단라벨 (nullable) */
    payTypeLabel?: Nullable<string>;
    /** 결제정보 */
    payInfo?: PayInfo;
}

/** 현금영수증 발행 정보 */
export interface CashReceiptInfo {
    /** 현금영수증 발급 키 타입 (nullable) */
    cashReceiptKeyType?: Nullable<CashReceiptKeyType>;
    /** 현금영수증 발행 상태 [null: 미발행] (nullable) */
    cashReceiptIssueType?: Nullable<CashReceiptIssueType>;
    /** 현금영수증 거래아이디 (nullable) */
    pgCashReceiptNo?: Nullable<string>;
    /** 현금영수증 발급 용도에 따른 키(휴대폰번호, 사업자번호) (nullable) */
    cashReceiptKey?: Nullable<string>;
    /** 현금영수증 승인일시 (nullable) */
    issueYmdt?: Nullable<string>;
    /** 현금영수증 승인 금액 (nullable) */
    issueAmt?: Nullable<number>;
    /** 현금영수증 승인번호 (nullable) */
    cashReceiptAuthNo?: Nullable<string>;
    /** 현금영수증 발급 타입 (nullable) */
    cashReceiptIssuePurposeType?: Nullable<CashReceiptIssuePurposeType>;
}

/** 결제정보 */
export interface PayInfo {
    /** 휴대폰결제 정보 */
    mobileInfo?: {
        /** 통신사 */
        mobileCompany?: Nullable<string>;
        /** 휴대폰번호 */
        mobileNo?: Nullable<string>;
    };
    /** 가상계좌/계좌이체/무통장 정보 */
    bankInfo?: BankInfo;
    /** 신용카드 정보 */
    cardInfo?: CardInfo;
    /** 거래번호 (nullable) */
    tradeNo?: Nullable<string>;
    /** PG 쿠폰 금액 (nullable) */
    pgCouponAmt?: Nullable<number>;
    /** 카드사 쿠폰 금액 (nullable) */
    cardCouponAmt?: Nullable<number>;
    /** 네이버페이결제정보 */
    naverPayInfo?: NaverPayInfo;
    /** 가맹점 발행쿠폰 (nullable) */
    sellerCouponAmt?: Nullable<number>;
    /** 현금영수증 거래번호 (nullable) */
    cashNo?: Nullable<string>;
    /** 현금영수증 승인번호 (nullable) */
    cashAuthNo?: Nullable<string>;
    /** PG결제 금액 (nullable) */
    payAmt?: Nullable<number>;
    /** PG 포인트 (nullable) */
    pointAmt?: Nullable<number>;
    /** 렌탈 정보 */
    rentalInfo?: RentalInfo;
    /** 결제타입 */
    payType: PayType;
    /** 복합결제 */
    complexPayInfo?: {
        /** 메인 결제 금액 (nullable) */
        mainPayAmt?: Nullable<number>;
        /** 추가 결제 금액 (nullable) */
        extraPayAmt?: Nullable<number>;
    };
    /** 에스크로 결제 여부 */
    escrowYn: string;
    /** 몰의 과세 타입 (nullable) */
    taxType?: Nullable<TaxType>;
}

/** 가상계좌/계좌이체/무통장 정보 */
export interface BankInfo {
    /** 예금주명 */
    depositorName?: Nullable<string>;
    /** PG 은행코드 (PG별로 다름) */
    bankCode?: Nullable<string>;
    /** 은행 */
    bank?: Nullable<BankType>;
    /** 입금해야할 금액 */
    bankAmt?: Nullable<number>;
    /** 입금일시 */
    depositYmdt?: Nullable<string>;
    /** 은행명 */
    bankName?: Nullable<string>;
    /** 입금자명 */
    remitterName?: Nullable<string>;
    /** 실제 입금금액 */
    depositAmt?: Nullable<number>;
    /** 입금 마감일 */
    paymentExpirationYmdt?: Nullable<string>;
    /** 계좌번호 */
    account?: Nullable<string>;
}

/** 신용카드 정보 */
export interface CardInfo {
    /** 결제승인번호 */
    cardApprovalNumber?: Nullable<string>;
    /** 카드사명 */
    cardName?: Nullable<string>;
    /** 할부기간 */
    installmentPeriod?: Nullable<number>;
    /** PG 카드사 코드(PG별로 다름) */
    cardCode?: Nullable<CardCodeType>;
    /** 결제승인시간 */
    approveYmdt?: Nullable<string>;
    /** 신용카드 결제금액 */
    cardAmt?: Nullable<number>;
    /** 카드번호 */
    cardNo?: Nullable<string>;
    /** 카드사(발급사) */
    cardCompany?: Nullable<CardCompanyType>;
    /** 무이자여부(true: 무이자, false: 이자) */
    noInterest?: Nullable<boolean>;
}

/** 네이버페이결제정보 */
export interface NaverPayInfo {
    /** 네이버페이 포인트 최종 결제 금액 */
    naverMileagePaymentAmount?: Nullable<number>;
    /** 주문 유형 구분(네이버페이/통합장바구니) */
    orderType?: Nullable<string>;
    /** 입금 기한 (nullable) */
    paymentDueDate?: Nullable<string>;
    /** 일반결제수단최종결제금액 */
    generalPaymentAmount?: Nullable<number>;
    /** 네이버 페이 결제 수단 */
    paymentMeans?: Nullable<string>;
    /** 충전금최종결제금액 */
    chargeAmountPaymentAmount?: Nullable<number>;
    /** 결제 구분(네이버결제/PG 결제) */
    paymentCoreType?: Nullable<string>;
    /** 네이버페이 적립금 최종 결제 금액 */
    checkoutAccumulationPaymentAmount?: Nullable<number>;
    /** 주문 할인액 */
    orderDiscountAmount?: Nullable<number>;
    /** PG승인번호 (nullable) */
    paymentNumber?: Nullable<string>;
    /** 결제 위치 구분(PC/MOBILE) */
    payLocationType?: Nullable<string>;
}

/** 파트너별주문리스트 */
export interface OrderOptionsGroupByPartner {
    /** 파트너번호 */
    partnerNo: number;
    /** 배송그룹별 옵션 */
    orderOptionsGroupByDelivery: OrderOptionsGroupByDelivery[];
    /** 파트너명 */
    partnerName: string;
}

/** 배송그룹별 옵션 */
export interface OrderOptionsGroupByDelivery {
    /** 선/착불타입 */
    deliveryPayType: DeliveryPayType;
    /** 배송지정일 (nullable) */
    requestShippingDate?: Nullable<string>;
    /** 주문 추가 정보 (nullable) */
    orderAdditionalInfo?: Nullable<string>;
    /** 배송조건노출문구(for US) (nullable) */
    frontDisplayText?: Nullable<string>;
    /** 배송지 나중입력 여부 (true: 나중입력, false: 바로입력) (nullable) */
    usesShippingInfoLaterInput?: Nullable<boolean>;
    /** 배송지 우편 번호 */
    receiverZipCd: string;
    /** 송장추적 URL (nullable) */
    retrieveInvoiceUrl?: Nullable<string>;
    /** 파트너번호 - 쇼핑몰 배송일 경우 0 */
    partnerNo: number;
    /** 배송서비스타입라벨(for US) */
    shippingMethodLabel?: Nullable<string>;
    /** 송장번호 */
    invoiceNo: string;
    /** 연락처1^|010-1111-1111 */
    receiverContact1: string;
    /** 연락처2 */
    receiverContact2: string;
    /** 배송지 지번 (nullable) */
    receiverJibunAddress?: Nullable<string>;
    /** 주문상품옵션 */
    orderOptions: OrderOption[];
    /** 파트너명 - 쇼핑몰 배송일 경우 '쇼핑몰 배송' */
    partnerName: string;
    /** 수령자 명 */
    receiverName: string;
    /** 택배사명 (nullable) */
    deliveryCompanyTypeLabel?: Nullable<string>;
    /** 배송구분 (nullable) */
    deliveryType?: Nullable<DeliveryType>;
    /** 배송번호 */
    deliveryNo: number;
    /** 배송구분 */
    shippingAreaType: ShippingAreaType;
    /* 택배사타입 (nullable) */
    deliveryCompanyType?: Nullable<DeliveryCompanyType>;
    /** 지역별 추가 배송비 */
    remoteDeliveryAmt: number;
    /** 배송지 상세 주소 */
    receiverDetailAddress: string;
    /** 배송지 메모 (nullable) */
    deliveryMemo?: Nullable<string>;
    /** 배송지 주소 */
    receiverAddress: string;
    /** 배송비 */
    deliveryAmt: number;
    /** 반품 배송비 */
    returnDeliveryAmt: number;
    /** 배송지 입력 여부 */
    enteredAddress: boolean;
    /** 배송서비스타입(for US) (nullable) */
    shippingMethodType?: Nullable<string>;
}

/** 주문 상품 옵션 */
export interface OrderOption {
    /** 사은품 여부 */
    isFreeGift: boolean;
    /** 구매자 작성형 옵션 */
    inputs?: Nullable<
        {
            /** NOTE: API 문서에는 나와있지 않지만 실제로 있는 값 */
            inputNo?: number;
            /** 구매자 작성형 입력 값 (nullable) */
            inputValue?: Nullable<string>;
            /** 구매자 작성형 입력 이름 (nullable) */
            inputLabel?: Nullable<string>;
        }[]
    >;
    /** 배송여부 */
    deliverable: boolean;
    /** 배송보류 해제 일시 (nullable)^|2023-09-01 18:00:00 */
    releaseHoldDeliveryYmdt?: Nullable<string>;
    /** 옵션사용여부 */
    optionUsed: boolean;
    /** 클레임상태 (nullable) */
    claimStatusTypeLabel?: Nullable<string>;
    /** 상품명 */
    productName: string;
    /** 후기 작성 가능 상품 여부 */
    reviewableProduct: boolean;
    /** 추가상품번호 */
    additionalProductNo: number;
    /** 옵션형태 */
    optionType: OptionType;
    /** 가격정보 */
    price: Price;
    /** 세트옵션 */
    setOptions: SetOption[];
    /** 예약여부 */
    reservation: boolean;
    imageUrlInfo: ImageUrlInfo[];
    /** 브랜드 번호 (nullable) */
    brandNo?: Nullable<number>;
    /** 브랜드명 (nullable) */
    brandName?: Nullable<string>;
    /** 주문번호 */
    orderNo: string;
    /** 주문상태 */
    orderStatusType: OrderStatusType;
    /** 배송보류 여부 (nullable) */
    holdDelivery?: Nullable<boolean>;
    /** 주문수량 */
    orderCnt: number;
    /** 반품가능여부 */
    returnable: boolean;
    /** 주문 상태 일자 */
    orderStatusDate: OrderStatusDate;
    /** 교환가능여부 */
    exchangeable: boolean;
    /** 예약배송시작일 (nullable) */
    reservationDeliveryYmdt?: Nullable<string>;
    /**클레임 번호 (nullable) */
    claimNo?: Nullable<number>;
    /** 취소가능여부 */
    cancelable: boolean;
    /** 주문상태 (nullable) */
    orderStatusTypeLabel?: Nullable<OrderStatusLabelType>;
    /** 상품 추가 관리 코드 (nullable) */
    extraManagementCd?: Nullable<string>;
    /** 추가상품여부 */
    isExtraProduct: boolean;
    /** 정기배송 상품여부 (nullable) */
    isRecurringPayment?: Nullable<boolean>;
    /** 클레임상태 (nullable) */
    claimStatusType?: Nullable<ClaimStatusType>;
    /** 추가상품의 본상품번호 */
    baseProductNo?: Nullable<number>;
    /** 해외배송여부 */
    deliveryInternationalYn: boolean;
    /** 배송지연사유 (nullable) */
    holdDeliveryReason?: Nullable<string>;
    /** 상품 이미지 URL */
    imageUrl: string;
    /** 회원여부 */
    member: boolean;
    /** 배송예상일자 (nullable) */
    deliveryExpectedYmdt?: string;
    /** 다음에 할 수 있는 작업 */
    nextActions: NextAction[];
    /**환불가능여부 */
    refundable: boolean;
    /** 옵션번호 */
    optionNo: number;
    /**주문옵션번호 */
    orderOptionNo: number;
    /**상품번호 */
    productNo: number;
    /** 배송정보 */
    delivery: Delivery;
    /**옵션권장출력값 */
    optionTitle: string;
    /** 파트너명 */
    partnerName?: Nullable<string>;
    /** 옵션값 */
    optionValue: string;
    /** 추가상품의 본상품명 */
    baseProductName?: Nullable<string>;
    listImageUrlInfo?: ImageUrlInfo;
    /** 교환여부 */
    exchangeYn: string;
    /** 적립금 */
    accumulationAmt: number;
    /** 브랜드영문명 (nullable) */
    brandNameEn?: Nullable<string>;
    /** 영어상품명 (nullable) */
    productNameEn?: Nullable<string>;
    /** 옵션관리코드 (nullable) */
    optionManagementCd?: Nullable<string>;
    /** 옵션명 */
    optionName: string;
}

/** 주문 상태 일자 */
export interface OrderStatusDate {
    /** 상품평작성기한(구매확정일로부터 90일) (nullable) */
    reviewableYmdt?: Nullable<string>;
    /** 배송완료일시 (nullable) */
    deliveryCompleteYmdt?: Nullable<string>;
    /** 구매확정일자 (nullable) */
    buyConfirmYmdt?: Nullable<string>;
    /** 결제일시 (nullable) */
    payYmdt?: Nullable<string>;
    /** 등록일자 */
    registerYmdt: string;
}

/** 다음에 할 수 있는 작업 */
export interface NextAction {
    /** 다음에 할 수 있는 작업 그룹 */
    actionGroupType: string;
    /** 작업타입 */
    nextActionType: NextActionType;
    /** 다음 작업 URI */
    uri: string;
}

/** 배송정보 */
export interface Delivery {
    /** 배송지 나중입력 여부 (nullable) */
    usesShippingInfoLaterInput?: Nullable<boolean>;
    /** 택배사 (nullable) */
    deliveryCompanyTypeLabel?: Nullable<string>;
    /** 배송타입 (nullable) */
    deliveryType?: Nullable<DeliveryType>;
    /** 택배사타입 (nullable) */
    deliveryCompanyType?: Nullable<string>;
    /** 송장추적 URL (nullable) */
    retrieveInvoiceUrl?: Nullable<string>;
    /** 송장번호 (nullable) */
    invoiceNo?: Nullable<string>;
}

/** 환불정보 */
export interface RefundInfo {
    /** 환불금액(적립금제외) */
    refundMainPayAmt: number;
    /** 환불방법(노출용) */
    refundTypeLabel: string;
    /** 클레임번호 */
    claimNo: number;
    /** 배송비금액 */
    deliveryAmtInfo: DeliveryAmtInfo;
    /** 반품수거 타입 */
    returnWayType?: Nullable<ReturnWayType>;
    /** 반품 이미지 리스트 */
    claimImageUrls?: Nullable<(boolean | string | number)[]>;
    /** 환불결제방법 */
    refundPayType: PayType;
    /** 반품수거 주소지 (nullable) */
    returnAddress?: Nullable<ReturnAddress>;
    /** 환불상품금액 */
    productAmtInfo: ProductAmtInfo;
    /** 환불차감금액 */
    subtractionAmtInfo: SubtractionAmtInfo;
    /** 반품 송장번호 (nullable) */
    returnInvoiceNo?: Nullable<string>;
    /** 환불(예상)방법(PG) */
    refundType: RefundType;
    /** 환불상품정보 (nullable) */
    refundOrderOptions?: Nullable<RefundOrderOption[]>;
    /** 교환출고 주소지 (nullable) */
    exchangeAddress: Nullable<ReturnAddress>;
    /** 적립금환불금액 */
    refundSubPayAmt: number;
    /** 반품 택배사명 (nullable) */
    returnDeliveryCompanyTypeLabel?: Nullable<string>;
    /** 클레임 타입 (nullable) */
    claimClassType?: Nullable<ClaimClassType>;
    /** 교환상품정보 (nullable) */
    exchangeOrderOption?: Nullable<ExchangeOrderOption>;
    /** 환불금액(적립금포함) */
    refundPayAmt: number;
    /** 환불계좌 정보(무통장 및 가상계좌) */
    refundBankAccount?: RefundBankAccount;
}

/** 환불상품정보 */
export interface RefundOrderOption {
    /** 옵션사용여부 */
    usesOption: boolean;
    /** 옵션형태 */
    optionType: string;
    /** 텍스트옵션 (nullable) */
    userInputTextStr?: Nullable<string>;
    listImageUrlInfo?: ImageUrlInfo;
    /** 상품 이미지 (nullable) */
    imageUrl?: Nullable<string>;
    /** 옵션 값 (nullable) */
    optionValue?: Nullable<string>;
    /** 교환 상품 수량 (nullable) */
    orderCnt?: Nullable<number>;
    /** 옵션 명 (nullable) */
    optionName?: Nullable<string>;
    imageUrlInfo?: ImageUrlInfo[];
    /** 상품 명(nullable) */
    productName?: Nullable<string>;
}

/** 교환상품정보 */
export interface ExchangeOrderOption {
    /** 텍스트옵션 (nullable) */
    userInputTextStr?: Nullable<string>;
    /** 상품 이미지 (nullable) */
    imageUrl?: Nullable<string>;
    /** 옵션 값 (nullable) */
    optionValue?: Nullable<string>;
    /** 교환 상품 수량 (nullable) */
    orderCnt?: Nullable<number>;
    /** 옵션 명 (nullable) */
    optionName?: Nullable<string>;
    /** 상품 명 (nullable) */
    productName?: Nullable<string>;
}

/** 환불상품금액 */
export interface ProductAmtInfo {
    /** 할인금액 */
    discountAmt: number;
    /** 총환불상품금액 */
    totalAmt: number;
    /** 교환상품금액 */
    exchangeImmediateDiscountedPrice: number;
    /** 추가할인가 */
    additionalDiscountAmt: number;
    /** 즉시할인가 */
    immediateDiscountAmt: number;
    /** 상품금액(즉시할인적용된) */
    immediateDiscountedPrice: number;
    /** 교환조정금액 */
    exchangeAdjustAmt: number;
    /** 상품금액(즉시할인적용 전) */
    standardPrice: number;
    /** 반품상품금액 */
    returnImmediateDiscountedPrice: number;
    /** 상품쿠폰할인가 */
    productCouponDiscountAmt: number;
    /** 교환할인금액 */
    exchangeDiscountAmt: number;
}

/** 배송비금액 */
export interface DeliveryAmtInfo {
    /** 변경 후 배송비(지역별배송비포함) */
    afterDeliveryAmt: number;
    /** 변경 전 배송비(지역별배송비포함) */
    beforeDeliveryAmt: number;
    /** 총배송비 */
    totalAmt: number;
    /** 교환재발송배송비(지역별배송비포함) */
    exchangeDeliveryAmt: number;
    /** 구매자직접배송여부(true: 구매자직접반품, false: 판매자수거요청) */
    buyerReturn: boolean;
    /** 반품배송비(지역별배송비포함) */
    returnDeliveryAmt: number;
    /** 착불여부(true: 착불, false: 선불) * true일 경우 refundDeliveryAmt 0 */
    payOnDelivery: boolean;
    /** 교환재발송배송비 조정금액 */
    exchangeAdjustAmt: number;
    /** 판매자부담여부(true: 판매자부담, false: 구매자부담) * true일 경우 refundDeliveryAmt 0 */
    sellerFault: boolean;
    /** 환불배송비(마이너스 시 고객에게 배송비 부과) */
    refundDeliveryAmt: number;
    /** 반품배송비 조정금액 */
    returnAdjustAmt: number;
}

/** 환불차감금액 */
export interface SubtractionAmtInfo {
    /** 총주문차감금액 */
    totalAmt: number;
    /** 환불금액조정사유 */
    refundAdjustReason?: Nullable<string>;
    /** 환불금액조정 */
    refundAdjustAmt: number;
    /** 장바구니쿠폰 변경금액 */
    cartCouponAmt: number;
}

/** 반품수거 주소지 */
export interface ReturnAddress {
    /** 배송메모 (nullable) */
    note?: Nullable<string>;
    /** 주소 요약 */
    addressStr: string;
    /** 주소 */
    address: string;
    /** 개인고유통관부호 (nullable) */
    customsIdNumber?: Nullable<string>;
    /** 이름 */
    name: string;
    /** 상세주소 (nullable) */
    detailAddress?: Nullable<string>;
    /** 지번주소 (nullable) */
    jibunAddress?: Nullable<string>;
    /** 우편번호 */
    zipCd: string;
    /** 연락처1 */
    contact1: string;
    /** 연락처2 */
    contact2?: Nullable<string>;
}

/** 환불계좌 정보(무통장 및 가상계좌) */
export interface RefundBankAccount {
    /** 계좌번호 (nullable) */
    bankAccount?: Nullable<string>;
    /** 예금주명 (nullable) */
    bankDepositorName?: Nullable<string>;
    /** 은행 */
    bank: BankType;
    /** 은행명 */
    bankName: string;
}

/** 추가결제정보 */
export interface AdditionalPayInfo {
    /** 입금계좌정보 */
    bankAccount: BankAccount;
    /** 교환처리금액 */
    exchangePayAmt: number;
    /** 클레임번호 */
    claimNo: number;
    /** 배송비금액 */
    deliveryAmtInfo: DeliveryAmtInfo;
    /** 송금인 */
    remitter: string;
    /** 반품수거 타입 (nullable) */
    returnWayType?: Nullable<ReturnWayType>;
    /** 반품 이미지 리스트 */
    claimImageUrls?: Nullable<(boolean | string | number)[]>;
    /** 반품수거 주소지 (nullable) */
    returnAddress?: Nullable<ReturnAddress>;
    /** 환불상품금액 */
    productAmtInfo: ProductAmtInfo;
    /** 환불차감금액 */
    subtractionAmtInfo: SubtractionAmtInfo;
    /** 반품 송장번호 (nullable) */
    returnInvoiceNo?: Nullable<string>;
    /** 교환처리금 결제방법 */
    payType: AdditionalPayType;
    /** 교환출고 주소지( (nullable) */
    exchangeAddress?: Nullable<ReturnAddress>;
    /** 반품 택배사명 (nullable) */
    returnDeliveryCompanyTypeLabel?: Nullable<string>;
    /** 클레임 타입 (nullable) */
    claimClassType?: Nullable<ClaimClassType>;
    /** 교환상품정보 (nullable) */
    exchangeOrderOption?: Nullable<ExchangeOrderOption>;
    /** 결제수단명 */
    payTypeLabel?: Nullable<string>;
}

/** 입금계좌정보 */
export interface BankAccount {
    /** 계좌번호 (nullable) */
    bankAccount?: Nullable<string>;
    /** 예금주명 (nullable) */
    bankDepositorName?: Nullable<string>;
    /** 은행 */
    bank: BankType;
    /** 은행명 */
    bankName: string;
}

// 교환추가결제 정보
export interface ExchangePayInfo {
    /** 입금계좌정보 */
    bankAccount: BankAccount[];
    /** 교환처리금액 */
    exchangePayAmt: number;
    /** 교환처리금 결제방법 */
    payType: AdditionalPayType;
    /** 송금인 */
    remitter: string;
    /** 결제수단명 (nullable) */
    payTypeLabel: Nullable<string>;
}

/** 최초주문금액정보 */
export interface FirstOrderAmount {
    /** 총 상품금액 (즉시할인, 추가할인 포함) [총 상품정상금액(standardAmt) - 총 추가할인 금액(additionalDiscountAmt) - 총 즉시할인 금액(immediateDiscountAmt)] */
    totalProductAmt: number;
    /** 총 추가할인 금액 */
    additionalDiscountAmt: number;
    /** 총 즉시할인 금액 */
    immediateDiscountAmt: number;
    /** 사용자 결제 금액 (적립금 제외) [payAmt - subPayAmt] */
    chargeAmt: number;
    /** 총 배송비 */
    deliveryAmt: number;
    /** 배송비쿠폰 할인 금액 */
    deliveryCouponDiscountAmt: number;
    /** 총 상품정상금액(즉시할인, 추가할인 제외) */
    standardAmt: number;
    /** 총 지역추가배송비 */
    remoteDeliveryAmt: number;
    /** 주문쿠폰할인 금액 */
    cartCouponDiscountAmt: number;
    /** 총 상품쿠폰할인 금액 */
    productCouponDiscountAmt: number;
    /** 보조결제금액(적립금) */
    subPayAmt: number;
    /** 결제금액 */
    payAmt: number;
}

/** 최종 주문 금액 정보 */
/** 최종 주문 금액 정보 */
export interface LastOrderAmount {
    /** 총 즉시할인 금액 */
    immediateDiscountAmt: number;
    /** 사용자 결제 금액 */
    chargeAmt: number;
    /** 배송비쿠폰 할인 금액 */
    deliveryCouponDiscountAmt: number;
    /** 총 지역추가배송비 */
    remoteDeliveryAmt: number;
    /** 주문쿠폰할인 금액 */
    cartCouponDiscountAmt: number;
    /** 결제금액 */
    payAmt: number;
    /** 총 상품금액 (즉시할인, 추가할인 포함) [총 상품정상금액(standardAmt) - 총 추가할인 금액(additionalDiscountAmt) - 총 즉시할인 금액(immediateDiscountAmt)] */
    totalProductAmt: number;
    /** 총 추가할인 금액 */
    additionalDiscountAmt: number;
    /** 총 배송비 */
    deliveryAmt: number;
    /** 총 상품정상금액(즉시할인, 추가할인 제외) */
    standardAmt: number;
    /** 총 상품쿠폰할인 금액 */
    productCouponDiscountAmt: number;
    /** 보조결제금액(적립금) */
    subPayAmt: number;
    /** [개발중] 상품별 쿠폰 할인 금액 */
    productDiscountInfos: {
        /** 상품쿠폰 할인 금액 */
        discountAmt: number;
        /** 상품번호 */
        productNo: number;
    }[];
}

/** 배송지정보 */
export interface ShippingAddress {
    /** 배송지 지번(지역추가배송비계산 시 사용) */
    receiverJibunAddress?: Nullable<string>;
    /** 수령자 명 (nullable) */
    receiverName?: Nullable<string>;
    /** 개인고유통관부호 (nullable) */
    customsIdNumber?: Nullable<string>;
    /** 국가코드 (nullable) */
    countryCd?: Nullable<CountryCdType>;
    /** 배송지 우편 번호 */
    receiverZipCd?: Nullable<string>;
    /** 배송지 상세 주소 (nullable) */
    receiverDetailAddress?: Nullable<string>;
    /** (해외) 도시 (nullable) */
    receiverCity?: Nullable<string>;
    /** 배송지 주소 */
    receiverAddress?: Nullable<string>;
    /** 해외배송지 기타정보 (nullable) */
    shippingEtcInfo?: Nullable<string>;
    /** 배송지 번호(0:신규, 0이상:이전배송지) */
    addressNo: number;
    /** (해외) 주 (nullable) */
    receiverState?: Nullable<string>;
    /** 주소록명 */
    addressName: string;
    /** 연락처1 (nullable) */
    receiverContact1?: Nullable<string>;
    /** 연락처2 (nullable) */
    receiverContact2?: Nullable<string>;
}

export interface NextAction2 {
    nextActionType: NextActionType;
    uri: string;
    actionGroupType: string;
}

/** 결제 영수증 정보 */
export interface ReceiptInfo {
    /** 영수증 타입 */
    receiptType: ReceiptType;
    /** 영수증 url */
    url: string;
}

/** 선택가능한 사유 목록 */
export interface ClaimReasonTypeList {
    /** 귀책타입 */
    responsibleObjectType: ResponsibleObjectType;
    /** 클레임 사유타입 */
    claimReasonType: ClaimReasonType;
    /** 클레임 사유 라벨^|단순변심(색상,사이즈 등) */
    label: string;
}

/** deprecated(더 이상 제공하지 않는 개체항목입니다) */
export interface Insurance {
    /** deprecated(더 이상 제공하지 않는 개체항목입니다) */
    no: string;
    /** deprecated(더 이상 제공하지 않는 개체항목입니다) */
    type: string;
    /** deprecated(더 이상 제공하지 않는 개체항목입니다) */
    url: string;
}

/** 선택가능한 은행 */
export interface AvailableBank {
    /** 은행코드 */
    bank: BankType;
    /** 은행명 */
    label: string;
}

export interface OrderSummary {
    /** 입금대기 */
    depositWaitCnt: number;
    /** 결제완료 */
    payDoneCnt: number;
    /** 상품준비중 */
    productPrepareCnt: number;
    /** 배송준비중 */
    deliveryPrepareCnt: number;
    /** 배송중 */
    deliveryIngCnt: number;
    /** 배송완료 */
    deliveryDoneCnt: number;
    /** 구매확정 수, 구매확정수는 옵션단위로 카운트됩니다.
     * (ex) 한 번에 3개의 상품을 주문하는 경우: 1개의 상품을 구매확정하면 buyConfirmCnt는1, 모든 상품을 구매확정하면 buyConfirmCnt는 3.
     * (ex) 1개의 상품의 서로 다른 옵션을 각각 주문하는 경우: 주문한 옵션 개수에 따라 카운트.
     * 단, 동일 옵션 주문시 개수를 기준으로 카운트 되지 않습니다.
     * (ex) 특정 상품의 동일 옵션 1가지를 여러 개 주문하는 경우: buyConfirmCnt는 1^|0 */
    buyConfirmCnt: number;
    /** 취소진행중 */
    cancelProcessingCnt: number;
    /** 취소완료 */
    cancelDoneCnt: number;
    /** 교환진행중 */
    exchangeProcessingCnt: number;
    /** 교환완료 */
    exchangeDoneCnt: number;
    /** 반품진행중 */
    returnProcessingCnt: number;
    /** 반품완료 */
    returnDoneCnt: number;
}

export interface ProductCoupons {
    // 쿠폰 발급 번호
    couponIssueNo: number;
    // 상품번호
    productNo: number;
}
