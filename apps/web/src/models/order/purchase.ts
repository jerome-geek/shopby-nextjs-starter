import {
    CashReceiptIssuePurposeType,
    CashReceiptKeyType,
    CountryCdType,
    InstType,
    OptionYnType,
    OrderTermsType,
    PayType,
    PgType,
} from '@/models';
import { Products } from '@/models/order';

export interface FreeGift {
    /** 옵션번호 */
    mallOptionNo: number;
    /** 상품번호 */
    mallProductNo: number;
}

export interface ReservePaymentData {
    /** 결제완료 API 호출 후 다시 전달 받을 값(NCPPay script에서 넣음) (nullable) */
    clientParams?: Nullable<{ mallNo: string; orderName: string }>;
    /** 추가 정보 (ex : Stripe결제수단의 경우 카드 정보 or 저장된 카드의 cardId) (nullable) */
    extraData?: Nullable<ExtraData | ExtraData2 | { appUrl: string }>;
    /** 배송정보에 회원정보 사용 여부 (nullable) */
    useMemberInfo?: Nullable<boolean>;
    /** 추가 약관 동의 항목 번호 리스트 */
    customTermsAgrees?: {
        /** 추가 약관 동의 여부 */
        isAgree?: Nullable<boolean>;
        /** 추가 약관 동의 항목 번호 */
        customTermsNo?: Nullable<number>;
    }[];
    /** 필수 약관 동의 항목 리스트(deprecated: agreementTermsAgrees 사용) */
    agreementTypes?: Nullable<OrderTermsType>;
    /** 주문메모 (nullable) */
    orderMemo?: Nullable<string>;
    /** 앱카드 정보 */
    appCardInfo?: AppCardInfo;
    /** 무통장 입금 정보 */
    bankAccountToDeposit?: BankAccountToDeposit;
    /** 렌탈 상품 정보 */
    rentalInfo?: RentalInfo;
    /** 결제수단 */
    payType: PayType;
    /**
     *  결제 완료 후 리턴되는 쇼핑몰의 URL
     * URL 의 파라미터중
     * result=SUCCESS 인 경우 : 성공 페이지 구현 (orderNo 파라미터로 주문정보 출력가능)
     * result=FAIL 인 경우 : message 값을 화면이나 경고창으로 출력함
     */
    clientReturnUrl: string;
    /** 쿠폰 */
    coupons?: PaymentCoupons;
    /** 기본 주소지 설정 여부 (true: 선택한 배송지 정보가 기본주소지로 설정, false: 미설정) (nullable) */
    useDefaultAddress?: Nullable<boolean>;
    /** 회원 여부 */
    member: boolean;
    /** 앱내 결제 여부, Y인 경우 extraData.appUrl에 결제완료 후 돌아갈 app scheme을 넣어야 함 (nullable) */
    inAppYn?: Nullable<'Y' | 'N'>;
    /** 무통장 거래 시 현금영수증 발행 신청 여부(true: 신청, false: 미신청) * kcp 현금영수증 발행 대행 서비스 사용 시 true (nullable) */
    applyCashReceipt?: Nullable<boolean>;
    /** PG 명세서에 표시될 주문명 - null일 경우 [첫번째상품명 외 2건]으로 기본 생성됩니다. (nullable) */
    orderTitle?: Nullable<string>;
    /** 임시주문번호(비회원인경우 필수) (nullable) */
    tempPassword?: Nullable<string>;
    /**
     * 주소록에 등록 여부
     * - true 이면 선택한 배송지 정보가 주소록에 저장된다.
     * - 이미 저장된 주소록을 선택하여 주소를 수정했다면, 변경한 주소로 수정되어 저장한다.
     */
    saveAddressBook: boolean;
    /** true 인 경우 주문자 정보로 회원의 정보를 수정함. 몰설정에서 회원의 점유인증을 하지 않는 경우에만 update 된다. */
    updateMember: boolean;
    /** 주문서번호 */
    orderSheetNo: string;
    /** 외부 PG사 */
    pgType: PgType;
    /** 무통장 입금 시 입금할 입금자 이름 (nullable) */
    remitter?: Nullable<string>;
    /** 선택한 사은품 정보 (사은품 선택이 가능한 경우 사용) */
    freeGiftInfos?: {
        /** 지급할 사은품 목록 */
        freeGifts: FreeGift[];
        /** 사은품 지급조건 번호 */
        freeGiftConditionNo: number;
    }[];
    /** 옵션별 사용가능 적립금 정보 */
    availableAccumulationByOptions?: {
        /** 상품 옵션 번호 */
        mallOptionNo?: Nullable<number>;
        /** 사용가능 적립금 한도율 (nullable) */
        availableAccumulationRate?: Nullable<number>;
        /** 사용가능 적립금 한도 (nullable) */
        availableAccumulationAmt?: Nullable<number>;
    }[];
    /** 배송메모 (nullable) */
    deliveryMemo?: Nullable<string>;
    /** 필수 약관 동의 항목 리스트 */
    agreementTermsAgrees?: {
        isAgree?: Nullable<boolean>;
        termsType?: OrderTermsType;
    }[];
    /** 주문자 정보 */
    orderer: Orderer;
    /** 검증을위한 결제예정금액(적립금사용후) */
    paymentAmtForVerification?: Nullable<number>;
    /** 배송지 정보 */
    shippingAddress?: ShippingAddress;
    /** 선택한 결제수단 사용여부(true: 사용, false: 미사용) (nullable) */
    savesLastPayType?: Nullable<boolean>;
    /** 마이페이 결제인증 정보 (nullable) */
    myPayInfo?: MyPayInfo;
    /** 보조결제 수단 결제액(적립금 사용액) */
    subPayAmt: number;
    /** 현금영수증 신청정보 */
    cashReceipt?: CashReceipt;
    /** 복수배송지 */
    shippingAddresses: ShippingAddresses[];
}

/** 앱카드 정보 */
export interface AppCardInfo {
    /** 할부 타입 */
    instType: InstType;
    /** 간편결제 회원번호 */
    userNo?: Nullable<string>;
    /** 간편결제 카드사 코드 */
    cardCode: string;
    /** 할부 개월 (일시불: 00) */
    installment: string;
    /** 선택 카드의 원클릭 설정 여부 */
    oneClickYn: OptionYnType;
    /** 간편결제 계정 ID */
    acntId?: Nullable<string>;
}

export interface ReservePaymentResponse {
    /** 주문서번호 */
    orderSheetNo: string;
    /** 외부 PG사 */
    pgType: PgType;
    /** 각 PG사에서 요구하는 특수 정보 */
    extraData?: Nullable<any>;
    /** client화면이 전환될 URL */
    clientReturnUrl: string;
    /** 결제키 환경 (nullable) */
    profile?: Nullable<'REAL' | 'ALPHA'>;
    /** confirm redirect url (nullable) */
    confirmUrl?: Nullable<string>;
    /** PG사에서 전달 받은 결제 URL (nullable) */
    returnUrl?: Nullable<string>;
    /** PG사에서 전달 받은 예약 승인 키 값 (nullable) */
    key?: Nullable<string>;
}

interface ExtraData {
    cardNumber: number;
    cardExpMonth: number;
    cardExpYear: number;
    cardCvc: number;
    saveYn: boolean;
}

interface ExtraData2 {
    cardId: string;
}

/** 무통장 입금 정보 */
interface BankAccountToDeposit {
    /** 계좌번호 */
    bankAccount: string;
    /** 은행명 */
    bankCode: string;
    /** 입금자명 */
    bankDepositorName: string;
}

/** 렌탈 상품 정보 */
interface RentalInfo {
    /** 월 렌탈료 */
    monthlyRentalAmount: number;
    /** 렌탈 기간 */
    rentalPeriod: number;
}

/** 쿠폰 */
export interface PaymentCoupons {
    /** 상품쿠폰 */
    productCoupons: {
        /** 상품쿠폰 발행번호 */
        couponIssueNo: number;
        /** 상품 쿠폰 프로모션 코드 (nullable) */
        promotionCode?: Nullable<string>;
        /** 상품번호 */
        productNo: number;
    }[];
    /** 장바구니 쿠폰 발행 번호 (nullable) */
    cartCouponIssueNo?: Nullable<number>;
    /** 쿠폰 할인 코드 (nullable) */
    promotionCode?: Nullable<string>;
}

/** 주문자 정보 */
interface Orderer {
    /** 주문자이메일 */
    ordererEmail?: Nullable<string>;
    /** 주문자연락처1 */
    ordererContact1: string;
    /** 주문자연락처2 */
    ordererContact2?: Nullable<string>;
    /** 연락처 국가코드 */
    ordererMobileCountryCd?: Nullable<string>;
    /** 주문자명 */
    ordererName: string;
}

interface ShippingAddress {
    /** (해외배송 / 글로벌결제 시 필수) 수령인 LastName (nullable) */
    receiverLastName?: Nullable<string>;
    /** 배송지 지번(지역추가배송비계산 시 사용) */
    receiverJibunAddress: string;
    /** 배송지정일 (nullable) */
    requestShippingDate?: Nullable<string>;
    /** 주문 추가 정보 (nullable) */
    orderAdditionalInfo?: Nullable<string>;
    /** 배송지 나중입력 여부 (true: 나중입력, false: 바로입력) (nullable) */
    usesShippingInfoLaterInput?: Nullable<boolean>;
    /** 수령자 명 */
    receiverName: string;
    /** 개인고유통관부호 (nullable) */
    customsIdNumber?: Nullable<string>;
    /** 국가코드 */
    countryCd: CountryCdType;
    /** 배송지 우편 번호 */
    receiverZipCd: string;
    /** 배송지 상세 주소 */
    receiverDetailAddress: string;
    /** (해외) 도시 (nullable) */
    receiverCity?: Nullable<string>;
    /** [개발중] 연락처 국가코드 (nullable) */
    receiverMobileCountryCd?: Nullable<string>;
    /** 배송지 주소 */
    receiverAddress: string;
    /** 배송지 번호(0:신규, 0이상:이전배송지) */
    addressNo: number;
    /** (해외) 주 (엑심베이 페이팔 해외결제의 경우 중국, 일본, 미국은 state 코드로 요청하셔야 합니다. [state code 참고: https://developer.paypal.com/api/rest/reference/state-codes/]) (nullable) */
    receiverState?: Nullable<string>;
    /** 주소록명 (nullable) */
    addressName?: Nullable<string>;
    /** (해외배송 / 글로벌결제 시 필수) 수령인 FirstName (nullable) */
    receiverFirstName?: Nullable<string>;
    /** 배송지 나중입력 연락처 (nullable) */
    shippingInfoLaterInputContact?: Nullable<string>;
    /** 연락처1 */
    receiverContact1: string;
    /** 연락처 */
    receiverContact2?: Nullable<string>;
}

/** 마이페이 결제인증 정보 */
interface MyPayInfo {
    /** 휴대폰 결제 결제인증 정보 (nullable) */
    mobileInfo?: {
        /** 핀인증 진행 여부(Y: 인증 진행, N: 인증 안함) default=Y, N 사용은 협의 필요 (nullable) */
        flagPin?: Nullable<'Y' | 'N'>;
        /** 현물컨텐츠구분코드(1: 컨텐츠, 2: 현물) (nullable) */
        hppType?: Nullable<'1' | '2'>;
    };
    /** 계좌 결제 결제인증 정보 (nullable) */
    accountInfo?: {
        /** 현금영수증정보 저장 여부(Y: 저장, N or null: 저장 안함) (nullable) */
        cshRecpSave?: Nullable<'Y' | 'N'>;
        /** 현금영수증 발행 정보(소득공제용 : 휴대폰 번호," + "사업자등록번호, 주민등 록번호, 외국인등록번호, (현금영수증)카드번호, (신용)카드번호" + "지출증빙용 : 사업자등록번 호) (nullable) */
        cshRecpInfo?: Nullable<string>;
        /** 현금영수증 발행 요청 코드(1: 소득공제, 2:지출증빙) (nullable) */
        cshRecpCode?: Nullable<'1' | '2'>;
        /** 카드사 코드 (nullable)  */
        bankCardCode?: Nullable<string>;
    };
    /** 카드결제 결제 인증 정보 (nullable) */
    cardInfo?: {
        /** 핀인증 진행 여부(Y: 인증 진행, N: 인증 안함) default=Y, N 사용은 협의 필요 (nullable) */
        flagPin?: Nullable<'Y' | 'N'>;
        /** 카드포인트 사용여부(Y: 사용, 그외 미사용), default=N (nullable) */
        flagCardPoint?: Nullable<'Y' | 'N'>;
        /** 할부개월수, 2자리로 입력(일시불: 00) *카드 결제수단 사용시 필수값 (nullable) */
        cardQuota?: Nullable<string>;
        /** 선할인 쿠폰코드 (nullable) */
        couponCode?: Nullable<string>;
        /** 무이자여부(Y: 무이자, N: 무이자 아님) (nullable) */
        cardInterest?: Nullable<'Y' | 'N'>;
        /** 카드사 코드 (nullable) */
        bankCardCode?: Nullable<string>;
    };
    /** 이니시스에서 발행한 결제수단 token(nullable) */
    wpayToken?: Nullable<string>;
    /** 결제수단 코드(01: 신용카드, 16: 계좌)(nullable) */
    payMethod?: Nullable<'01' | '16'>;
    /** 고객 ci (nullable) */
    ci?: Nullable<string>;
}

/** 현금영수증 */
export interface CashReceipt {
    /** 발급용도에 따른 키 타입 */
    cashReceiptKeyType: CashReceiptKeyType;
    /** 발급용도에 따른 키(소득공제용: 휴대폰번호, 지출증빙용: 사업자번호) */
    cashReceiptKey: string;
    /** 발급용도 */
    cashReceiptIssuePurposeType: CashReceiptIssuePurposeType;
}

/** 복수 배송지 정보 */
interface ShippingAddresses {
    // FIXME: API 문서가 잘못된듯 (payProductParams 설명 수정 필요)
    /** 복수 배송지 */
    payProductParams: Omit<Products, 'channelType'>[];
    /** 배송지정일 (nullable) */
    requestShippingDate?: Nullable<string>;
    /** 배송지 번호(0:신규, 0이상:기존 배송지) */
    addressNo: number;
    /** 배송지 나중입력 여부 (true: 나중입력, false: 바로입력) (nullable) */
    usesShippingInfoLaterInput?: Nullable<boolean>;
    /** 기본 주소지 설정 여부 (true: 선택한 배송지 정보가 기본주소지로 설정, false: 미설정) (nullable) */
    useDefaultAddress: Nullable<boolean>;
    /** 배송지 정보 */
    shippingAddress: Omit<ShippingAddress, 'receiverMobileCountryCd'> & {
        deliveryMemo?: Nullable<string>;
    };
    /** 주소록명 (nullable) */
    addressName?: Nullable<string>;
    /** 배송지 나중입력 연락처 (nullable) */
    shippingInfoLaterInputContact?: Nullable<string>;
    /**
     * 주소록에 등록 여부(nullable)
     *  - true 이면 선택한 배송지 정보가 주소록에 저장된다.
     *  - 이미 저장된 주소록을 선택하여 주소를 수정했다면, 변경한 주소로 수정되어 저장한다.
     */
    saveAddressBook?: Nullable<boolean>;
}
