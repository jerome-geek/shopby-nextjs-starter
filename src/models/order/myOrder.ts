import {
    CashReceiptIssuePurposeType,
    CashReceiptKeyType,
    ClaimType,
    CountryCdType,
    OrderRequestStatusType,
    OrderRequestType,
    OrderStatusType,
    OrderType,
    PayType,
    PgType,
    RequestCashReceiptResultType,
} from '@/models';
import {
    FirstOrderAmount,
    LastOrderAmount,
    NextAction,
    OrderDetailResponse,
    OrderOption,
    OrderSummary,
    PayInfo,
} from '@/models/order';

export interface GetOrderListParams extends Paging {
    /** 주문상태 (null인 경우 전체) */
    orderRequestTypes?: Nullable<OrderRequestStatusType[]>;
    /** 조회 시작일(yyyy-MM-dd), null인 경우 3개월 전 날짜로 조회 */
    startYmd?: Nullable<string>;
    /** 조회 종료일(yyyy-MM-dd), null인 경우 오늘 날짜로 조회 */
    endYmd?: Nullable<string>;
    /** 검색 타입 */
    searchType?: string;
    /** 검색어 */
    keyword?: string;
    /** 배송여부(개발중) */
    requiresShipping?: string;
    /** 주문유형(개발중)^|NORMAL(일반주문),LATER_SHIPPING_INPUT(선물주문) */
    orderType?: OrderType;
}

export type GetOrderListResponse = ItemList<OrderItems>;

export interface OrderItems {
    /** 주문 상품 옵션 */
    orderOptions: OrderOption[];
    /** 외부 PG사 */
    pgType: PgType;
    /** 주문번호 */
    orderNo: string;
    /** 추가 정보 (nullable) */
    extraData: Nullable<any>;
    /** PG사 결제키 (nullable) */
    pgMallKey?: Nullable<string>;
    /** 결제수단 */
    payType: PayType;
    /** 최종주문금액정보 */
    lastOrderAmt: LastOrderAmount;
    /** 주문자 정보 */
    orderer: Orderer;
    /** PG사 주문번호 - 매출전표 등 확인용 (nullable) */
    pgOrderNo: Nullable<string>;
    /** 회원 여부 */
    member: boolean;
    /** 다음에 할 수 있는 작업 */
    nextActions: NextAction[];
    /** 에스크로 여부 */
    escrow: boolean;
    /** 주문일자 */
    orderYmdt: string;
    /** 결제수단 라벨 */
    payTypeLabel: string;
    /** 해외 결제 정보 */
    internationalPaymentInfo: {
        /** 환율 */
        exchangeRate?: Nullable<number>;
        /** 환전된 금액 */
        exchangedAmt?: Nullable<number>;
        /** 통화 코드 */
        currencyCode: string;
    };
    /** 결제정보 */
    payInfo: PayInfo;
    /** 최초 주문금액 정보 */
    firstOrderAmt: FirstOrderAmount;
}

export interface Orderer {
    /** 주문자 연락처1 끝 4자리 (nullable)^ */
    contact1LastDigits?: Nullable<string>;
    /** 주문자 연락처 국가코드 (nullable) */
    mobileCountryCd?: Nullable<string>;
    /** 주문자 이름 */
    name: string;
    /** 주문자 연락처 (nullable) */
    contact1?: Nullable<string>;
    /** 환불계좌 (nullable) */
    refundAccount?: string;
    /** 주문자 이메일 (nullable) */
    email?: Nullable<string>;
    /** 주문자 연락처2 (nullable) */
    contact2?: Nullable<string>;
}

export interface GetOrderDetailParams {
    /** 주문옵션타입 (ALL: 전체, CLAIM: 클레임진행, NORMAL: 클레임미진행) */
    orderRequestType?: OrderRequestType;
}

export type GetOrderDetailResponse = OrderDetailResponse;

export interface GetPreviousOrdersSummaryParams {
    /** 조회 시작일(yyyy-MM-dd), null인 경우 3개월 전 날짜로 조회 */
    startYmd?: Nullable<string>;
    /** 조회 종료일(yyyy-MM-dd), null인 경우 오늘 날짜로 조회 */
    endYmd?: Nullable<string>;
}

export interface GetPreviousOrdersSummaryResponse {
    /** 수량 */
    count: number;
}

export interface GetOrderOptionStatusParams {
    /** 조회 시작일(yyyy-MM-dd), null인 경우 3개월 전 날짜로 조회 */
    startYmd?: Nullable<string>;
    /** 조회 종료일(yyyy-MM-dd), null인 경우 오늘 날짜로 조회 */
    endYmd?: Nullable<string>;
}

export type GetOrderOptionStatusResponse = OrderSummary;

export interface GetOrderSummaryParams {
    /** 주문 상태 */
    orderStatusType?: OrderStatusType;
    /** 조회 시작일(yyyy-MM-dd), null인 경우 3개월 전 날짜로 조회 */
    startYmd?: Nullable<string>;
    /** 조회 종료일(yyyy-MM-dd), null인 경우 오늘 날짜로 조회 */
    endYmd?: Nullable<string>;
}

export interface GetOrderSummaryResponse {
    /** 최종 결제 금액 */
    lastPayAmt: number;
    /** 최종 배송 금액 */
    lastDeliveryAmt: number;
    /** 최종 보조 결제 금액 */
    lastSubPayAmt: number;
    /** 최종 지역별 추가 배송 금액 */
    lastRemoteDeliveryAmt: number;
    /** 최종 추가 할인 금액 */
    lastAdditionalDiscountAmt: number;
    /** 주문 수량 */
    orderCnt: number;
    /** 최종 즉시 할인 금액 */
    lastImmediateDiscountAmt: number;
    /** 최종 배송 쿠폰 할인 금액 */
    lastDeliveryCouponDiscountAmt: number;
    /** 최종 상품 금액 (할인 제외) */
    lastStandardAmt: number;
    /** 최종 상품 쿠폰 할인 금액 */
    lastProductCouponDiscountAmt: number;
    /** 최종 주문 쿠폰 할인 금액 */
    lastCartCouponDiscountAmt: number;
}

export type GetOrderStatusSummaryParams = GetOrderOptionStatusParams;

export interface GetOrderStatusSummaryResponse {
    /**배송완료수 */
    deliveryDoneCnt: number;
    /**교환완료수 */
    exchangeDoneCnt: number;
    /**반품 진행중 수 */
    returnProcessingCnt: number;
    /**상품준비중수 */
    productPrepareCnt: number;
    /**배송중수 */
    deliveryIngCnt: number;
    /**취소 진행중 수 */
    cancelProcessingCnt: number;
    /**결제완료수 */
    payDoneCnt: number;
    /**배송준비중수 */
    deliveryPrepareCnt: number;
    /**
     * 구매확정수
     * - 구매확정수는 옵션단위로 카운트됩니다.
     * - (ex) 한 번에 3개의 상품을 주문하는 경우: 1개의 상품을 구매확정하면 buyConfirmCnt는1, 모든 상품을 구매확정하면 buyConfirmCnt는 3.
     * - (ex) 1개의 상품의 서로 다른 옵션을 각각 주문하는 경우: 주문한 옵션 개수에 따라 카운트.
     * - 단, 동일 옵션 주문시 개수를 기준으로 카운트 되지 않습니다.
     * - (ex) 특정 상품의 동일 옵션 1가지를 여러 개 주문하는 경우: buyConfirmCnt는 1
     */
    buyConfirmCnt: number;
    /** 입금대기수 */
    depositWaitCnt: number;
    /** 취소완료수 */
    cancelDoneCnt: number;
    /** 반품완료수 */
    returnDoneCnt: number;
    /** 교환 진행중 수 */
    exchangeProcessingCnt: number;
}

export interface ModifyCashReceiptData {
    /** 현금영수증 발급 키 타입 (nullable) */
    cashReceiptKeyType?: Nullable<CashReceiptKeyType>;
    /** 발급용도에 따른 키(소득공제용: 휴대폰번호, 지출증빙용: 사업자번호) */
    cashReceiptKey?: Nullable<string>;
    /** 현금영수증 발급 타입 */
    cashReceiptIssuePurposeType?: Nullable<CashReceiptIssuePurposeType>;
}

export interface ModifyCashReceiptResponse {
    /** 현금영수증 발급 키 타입 (nullable) */
    cashReceiptKeyType: Nullable<CashReceiptKeyType>;
    /** 발급용도에 따른 키(소득공제용: 휴대폰번호, 지출증빙용: 사업자번호) */
    cashReceiptKey: Nullable<string>;
    /** 현금영수증 발급 타입 */
    cashReceiptIssuePurposeType: Nullable<CashReceiptIssuePurposeType>;
}

export interface RequestCashReceiptData {
    /** 현금영수증 발급 키 타입 (nullable) */
    cashReceiptKeyType?: Nullable<CashReceiptKeyType>;
    /** 발급용도에 따른 키(소득공제용: 휴대폰번호, 지출증빙용: 사업자번호) */
    cashReceiptKey: Nullable<string>;
    /** 현금영수증 발급 타입 */
    cashReceiptIssuePurposeType: Nullable<CashReceiptIssuePurposeType>;
}

export interface RequestCashReceiptResponse {
    /** 신청 결과 (ISSUE: 발행완료, CANCEL: 발행취소, REQUEST_ONLY: 응답없음, FAIL: 실패, REQUEST: 신청) */
    resultType: RequestCashReceiptResultType;
    /** 결과 상세 메시지 (resultType이 ISSUE가 아닐때 값 존재 (nullable) */
    resultMsg?: Nullable<string>;
}

export interface GetOrderDetailForClaimParams {
    /** 주문옵션타입 */
    orderRequestType?: OrderStatusType;
    /** 클레임타입 */
    claimType: ClaimType;
}

export type GetOrderDetailForClaimResponse = OrderDetailResponse;

export interface UpdateDeliveryInformationParams {
    /** 주소지 추가 여부 */
    add?: boolean;
}

export interface UpdateDeliveryInformationData {
    /** (해외배송 / 글로벌결제 시 필수) 수령인 LastName (nullable) */
    receiverLastName?: Nullable<string>;
    /** 지번주소 (대한민국 주소의 경우는 필수 값) (nullable) */
    receiverJibunAddress?: Nullable<string>;
    /** 수령자명 */
    receiverName: string;
    /** 개인통관고유부호 (nullable) */
    customsIdNumber?: Nullable<string>;
    /** 국가코드(default:mall의 국가코드) (nullable) */
    countryCd?: Nullable<CountryCdType>;
    /** 우편번호 */
    receiverZipCd: string;
    /** 상세주소 */
    receiverDetailAddress: string;
    /** 배송메모 (nullable) */
    deliveryMemo?: Nullable<string>;
    /** (해외) 도시 (nullable) */
    receiverCity?: Nullable<string>;
    /** 연락처 국가코드 (nullable) */
    receiverMobileCountryCd?: Nullable<string>;
    /** 주소 */
    receiverAddress: string;
    /** (해외) 주 (nullable) */
    receiverState?: Nullable<string>;
    /** (해외배송 / 글로벌결제 시 필수) 수령인 FirstName (nullable) */
    receiverFirstName?: Nullable<string>;
    /** 수령자연락처1 */
    receiverContact1: string;
    /** 수령자연락처2 (nullable) */
    receiverContact2?: Nullable<string>;
}

export interface GetPaymentReceiptUrlResponse {
    /** url */
    url: string;
}

export interface GetSimpleReceiptUrlResponse {
    /** 거래 명세서 주문 옵션 */
    orderOptions: {
        /** 옵션 사용 여부 */
        usesOption: boolean;
        /** 쇼핑몰 옵션 번호 */
        mallOptionNo: number;
        /** 주문번호 */
        orderNo: string;
        /** 주문 상태 */
        orderStatusTypeLabel: string;
        /** 사업(파트너 어드민) */
        business: {
            /** 업태 (nullable) */
            condition?: Nullable<string>;
            /** 사업자 등록번호 (nullable) */
            registrationNo?: Nullable<string>;
            /** 업종 (nullable) */
            type?: Nullable<string>;
            /** 통신판매신고번호 (nullable) */
            onlineMarketingDeclarationNo?: Nullable<string>;
        };
        /** 사은품 여부 */
        isFreeGift: boolean;
        /** 옵션값 */
        optionValue: string;
        /** 회사명(파트너 어드민) */
        companyName: string;
        /** 구매자 입력형 옵션 */
        purchaserInputs: {
            /** 구매자 입력형 옵션 - 값 (nullable) */
            inputValue?: Nullable<string>;
            /** 구매자 입력형 옵션 - 이름 (nullable) */
            inputLabel?: Nullable<string>;
            /** 구매자 입력형 옵션 - 필수여부 (nullable) */
            required?: Nullable<boolean>;
            /** 구매자 입력형 옵션번호 (nullable) */
            inputNo?: Nullable<number>;
        }[];
        /** 주문 수량 */
        orderCnt: number;
        /** 사무실(파트너 어드민) */
        office: {
            /** 주 (해외) (nullable) */
            stateOrRegion?: Nullable<string>;
            /** 우편번호 (nullable) */
            zipCode?: Nullable<string>;
            /** 도로명주소 (한국) (nullable) */
            address?: Nullable<string>;
            /** 지번주소 상세 (한국) (nullable) */
            jibunDetail?: Nullable<string>;
            /** 도시 (해외) (nullable) */
            city?: Nullable<string>;
            /** 도로명주소 상세 (한국) (nullable) */
            detailAddress?: Nullable<string>;
            /** 지번주소 (한국) (nullable) */
            jibun?: Nullable<string>;
        };
        /** 쇼핑몰 상품 번호 */
        mallProductNo: number;
        /** 판매 방식명 */
        saleMethodTypeLabel: string;
        /** 클레임 상태 (nullable) */
        claimStatusTypeLabel?: Nullable<string>;
        /** 상품명 */
        productName: string;
        /** 판매 방식 */
        saleMethodType: string;
        /** 결제 타입 */
        payType: PayType;
        /** 주문 상품 번호 */
        orderProductNo: number;
        /** 즉시 할인가 */
        immediateDiscountedPrice: number;
        /** 결제 타입명 */
        payTypeLabel: string;
        /** 옵션명 */
        optionName: string;
        /** 주문 옵션 번호 */
        orderOptionNo: number;
        /** 대표(파트너 어드민) */
        representative: {
            /** 대표자명 */
            name?: Nullable<string>;
            /** 대표 이메일 */
            email?: Nullable<string>;
            /** 대표 전화번호 */
            phoneNo?: Nullable<string>;
        };
    }[];
    /** 주문 번호 */
    orderNo: string;
    /** 사업(파트너 어드민) */
    business: {
        /** 업태 (nullable) */
        condition?: Nullable<string>;
        /** 사업자 등록번호 (nullable) */
        registrationNo?: Nullable<string>;
        /** 업종 (nullable) */
        type?: Nullable<string>;
        /** 통신판매신고번호 (nullable) */
        onlineMarketingDeclarationNo?: Nullable<string>;
    };
    /** 배송비 쿠폰 할인금액 */
    deliveryCouponDiscountAmt: number;
    /** 회사명(서비스 어드민) */
    companyName: string;
    /** 지역별 배송비 */
    remoteDeliveryAmt: number;
    /** 장바구니 쿠폰 할인금액 */
    cartCouponDiscountAmt: number;
    /** 사무실(서비스 어드민) */
    office: {
        /** 주 (해외) (nullable) */
        stateOrRegion?: Nullable<string>;
        /** 우편번호 (nullable) */
        zipCode?: Nullable<string>;
        /** 도로명주소 (한국) (nullable) */
        address?: Nullable<string>;
        /** 지번주소 상세 (한국) (nullable) */
        jibunDetail?: Nullable<string>;
        /** 도시 (해외) (nullable) */
        city?: Nullable<string>;
        /** 도로명주소 상세 (한국) (nullable) */
        detailAddress?: Nullable<string>;
        /** 지번주소 (한국) (nullable) */
        jibun?: Nullable<string>;
    };
    /** 추가 할인금액 */
    additionalDiscountAmt: number;
    /** 주문일자 */
    orderYmd: string;
    /** 배송비 */
    deliveryAmt: number;
    /** 적립금 */
    subPayAmt: number;
    /** 상품 쿠폰 할인금액 */
    productCouponDiscountAmt: number;
    /** 쇼핑몰 번호 */
    mallNo: number;
    /** 주문자 명(nullable) */
    ordererName?: Nullable<string>;
    /** 대표(서비스 어드민) */
    representative: {
        /** 대표자명 (nullable) */
        name?: Nullable<string>;
        /** 대표 이메일 (nullable) */
        email?: Nullable<string>;
        /** 대표 전화번호 (nullable) */
        phoneNo?: Nullable<string>;
    };
    /** 외부 결제 수단 */
    externalPayInfo: {
        /** 외부 결제 인증 키 (nullable) */
        authKey?: Nullable<string>;
        /** 외부 결제수단별 고유키 */
        externalPayKey: string;
        /** 결제/환불 우선순위 */
        priority: number;
        /** 외부 결제수단별 결제 금액 */
        payAmt: number;
        /** 외부 결제수단명(노출용) */
        externalPayName: string;
    }[];
}

export interface GetOrderSpecificationResponse {
    /** 거래 명세서 주문 옵션 */
    orderOptions: {
        /** 상품 관리 코드 (field: PRODUCT_NO) (nullable) */
        productManagementCd?: Nullable<string>;
        /** 쇼핑몰 옵션 번호 */
        mallOptionNo: Nullable<number>;
        /** 옵션 사용 여부 */
        usesOption: boolean;
        /** 주문번호 */
        orderNo: string;
        /** 주문 상태 */
        orderStatusTypeLabel: string;
        /** 사은품 여부 */
        isFreeGift?: Nullable<boolean>;
        /** 옵션값 */
        optionValue: string;
        purchaserInputs: {
            /** 구매자 입력형 옵션 - 값 (nullable) */
            inputValue?: Nullable<string>;
            /** 구매자 입력형 옵션 - 이름 (nullable) */
            inputLabel?: Nullable<string>;
            /** 구매자 입력형 옵션 - 필수여부 (nullable) */
            required?: Nullable<boolean>;
            /** 구매자 입력형 옵션번호 (nullable) */
            inputNo?: Nullable<number>;
        }[];
        /** 주문 수량 */
        orderCnt: number;
        /** 쇼핑몰 상품 번호 */
        mallProductNo?: number;
        /** 클레임 상태 (nullable) */
        claimStatusTypeLabel?: Nullable<string>;
        /** 상품명 */
        productName: string;
        /** 주문 상품 번호 */
        orderProductNo: number;
        /** 즉시 할인가 */
        immediateDiscountedPrice?: Nullable<number>;
        /** 옵션 관리 코드 (field: PRODUCT_NO) (nullable) */
        optionManagementCd?: Nullable<string>;
        /** 옵션명 */
        optionName: string;
        /** 주문 옵션 번호 */
        orderOptionNo: number;
    }[];
    /** 배송 요청 일자 (nullable) */
    requestShippingDate?: string;
    /** 주문 번호 */
    orderNo: string;
    /** 사업 */
    business: {
        /** 업태 (nullable) */
        condition?: Nullable<string>;
        /** 사업자 등록번호 (nullable) */
        registrationNo?: Nullable<string>;
        /** 업종 (nullable) */
        type?: Nullable<string>;
        /** 통신판매신고번호 (nullable) */
        onlineMarketingDeclarationNo?: Nullable<string>;
    };
    /** 배송비 쿠폰 할인금액 */
    deliveryCouponDiscountAmt?: Nullable<number>;
    /** 회사명 */
    companyName: string;
    /** 지역별 배송비 */
    remoteDeliveryAmt?: Nullable<number>;
    /** 장바구니 쿠폰 할인금액 */
    cartCouponDiscountAmt?: Nullable<number>;
    /** 사무실 */
    office: {
        /** 주 (해외) (nullable) */
        stateOrRegion?: Nullable<string>;
        /** 우편번호 (nullable) */
        zipCode?: Nullable<string>;
        /** 도로명주소 (한국) (nullable) */
        address?: Nullable<string>;
        /** 지번주소 상세 (한국) (nullable) */
        jibunDetail?: Nullable<string>;
        /** 도시 (해외) (nullable) */
        city?: Nullable<string>;
        /** 도로명주소 상세 (한국) (nullable) */
        detailAddress?: Nullable<string>;
        /** 지번주소 (한국) (nullable) */
        jibun?: Nullable<string>;
    };
    /** 주문 메모 (nullable) */
    orderMemo?: Nullable<string>;
    /** 수령자 주소 */
    receiverAddress: {
        /** 수령자 주소 (nullable) */
        address?: Nullable<string>;
        /** 수령자 지번 주소 (nullable) */
        jibunAddress?: Nullable<string>;
        /** 수령자 우편번호 (nullable) */
        zipCd?: Nullable<string>;
        /** (해외) 도시 (nullable) */
        receiverCity?: Nullable<string>;
        /** 배송 기타 정보 */
        shippingEtcInfo: {
            /** 해외배송지 수령인 lastName (nullable) */
            receiverLastName?: Nullable<string>;
            /** 주문 추가항목 (nullable) */
            orderAdditionalInfo?: Nullable<string>;
            /** 해외배송지 수령인 firstName (nullable) */
            receiverFirstName?: Nullable<string>;
        };
        /** 주소지 번호 (nullable) */
        addressNo?: Nullable<number>;
        /** 전화번호 국가코드 (nullable) */
        mobileCountryCd?: Nullable<string>;
        /** 수령자 이름 (nullable) */
        name?: Nullable<string>;
        /** (해외) 주 (nullable) */
        receiverState?: Nullable<string>;
        /** 수령자 상세 주소 (nullable) */
        detailAddress?: Nullable<string>;
        /** 수령자 주소명 (nullable) */
        addressName?: Nullable<string>;
        /** 수령자 연락처 1 (nullable) */
        contact1?: Nullable<string>;
        /** 수령자 연락처 2 (nullable) */
        contact2?: Nullable<string>;
    };
    /** 추가 할인금액 */
    additionalDiscountAmt?: Nullable<number>;
    /** 배송비 */
    deliveryAmt?: Nullable<number>;
    /** 배송 메모 (nullable) */
    shippingMemo?: Nullable<string>;
    /** 배송 번호 */
    shippingNo: number;
    /** 적립금 */
    subPayAmt?: Nullable<number>;
    /** 상품 쿠폰 할인금액 */
    productCouponDiscountAmt?: Nullable<number>;
    /** 쇼핑몰 번호 */
    mallNo: number;
    /** 주문자 명(nullable) */
    ordererName?: Nullable<string>;
    /** 대표 */
    representative: {
        /** 대표자명 (nullable) */
        name?: Nullable<string>;
        /** 대표 이메일 (nullable) */
        email?: Nullable<string>;
        /** 대표 전화번호 (nullable) */
        phoneNo?: Nullable<string>;
    };
    /** 외부 결제 수단 */
    externalPayInfo: {
        /** 외부 결제 인증 키 (nullable) */
        authKey?: Nullable<string>;
        /** 외부 결제수단별 고유키 */
        externalPayKey: string;
        /** 결제/환불 우선순위 */
        priority: number;
        /** 외부 결제수단별 결제 금액 */
        payAmt: number;
        /** 외부 결제수단명(노출용) */
        externalPayName: string;
    }[];
}
