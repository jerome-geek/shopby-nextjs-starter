import {
    CashReceiptIssuePurposeType,
    CashReceiptKeyType,
    CashReceiptResultType,
    ClaimType,
    CountryCdType,
    OrderRequestType,
    ReplyType,
} from '@/models';
import {
    CartPriceInfo,
    DeliveryGroup,
    InvalidProduct,
    OptionInputs,
} from '@/models/order';

export interface GetCartParams {
    /** 구매하지 못하는 상품 분할여부 */
    divideInvalidProducts?: boolean;
}

/** 장바구니 목록 */
export type GetCartData = {
    /** 본상품번호(추가상품이라면 필수 입력) (nullable) */
    baseProductNo?: Nullable<number>;
    /** 유입채널 (nullable) */
    channelType?: Nullable<string>;
    /** 구매개수 */
    orderCnt: number;
    /** 구매자 입력형 옵션 */
    optionInputs?: Omit<OptionInputs, 'required'>[];
    /** 옵션번호 */
    optionNo: number;
    /** 카트번호 */
    cartNo: number;
    /** 상품번호 */
    productNo: number;
}[];

export interface GetCartResponse {
    /** 배송그룹 */
    deliveryGroups: DeliveryGroup[];
    /** 가격 정보 */
    price: CartPriceInfo;
    /** 유효하지 않은 상품 */
    invalidProducts: Omit<
        InvalidProduct,
        'eanCode' | 'partnerName' | 'minorPurchasable' | 'combinable'
    >[];
}

export interface UpdateDeliveryInfoParams {
    /** 주소지 추가 여부 */
    add?: boolean;
}

export interface UpdateDeliveryInfoData {
    /** (해외배송 / 글로벌결제 시 필수) 수령인 LastName (nullable) */
    receiverLastName?: Nullable<string>;
    /** 지번주소(대한민국 주소의 경우는 필수 값) (nullable) */
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

export interface SendPasswordByEmailParams {
    /** 비밀번호 받을 방식 (EMAIL: 이메일, SMS: sms) */
    replyType: ReplyType;
    /** 주문자 핸드폰 번호 */
    mobileNo?: string;
    /** 주문자 이메일 */
    email?: string;
    /** 주문자명 */
    name?: string;
}

export interface UpdateCashReceiptData {
    /** 현금영수증 발급 키 타입 (nullable) */
    cashReceiptKeyType?: Nullable<CashReceiptKeyType>;
    /** 발급용도에 따른 키(소득공제용: 휴대폰번호, 지출증빙용: 사업자번호) */
    cashReceiptKey?: Nullable<string>;
    /** 발급용도 */
    cashReceiptIssuePurposeType?: Nullable<CashReceiptIssuePurposeType>;
}

export interface UpdateCashReceiptResponse {
    /** 현금영수증 발급 키 타입 (nullable) */
    cashReceiptKeyType: CashReceiptKeyType;
    /** 발급용도에 따른 키(소득공제용: 휴대폰번호, 지출증빙용: 사업자번호) */
    cashReceiptKey: string;
    /** 발급용도 */
    cashReceiptIssuePurposeType: CashReceiptIssuePurposeType;
}
export interface RequestCashReceiptData {
    /** 현금영수증 발급 키 타입 (nullable) */
    cashReceiptKeyType?: Nullable<CashReceiptKeyType>;
    /** 발급용도에 따른 키(소득공제용: 휴대폰번호, 지출증빙용: 사업자번호) */
    cashReceiptKey: string;
    /** 발급용도 */
    cashReceiptIssuePurposeType: CashReceiptIssuePurposeType;
}

export interface RequestCashReceiptResponse {
    /** 신청 결과 ( ISSUE: 발행완료, REQUEST_ONLY: 응답없음, FAIL: 실패 ) */
    resultType: CashReceiptResultType;
    /** 결과 상세 메시지 (resultType이 ISSUE가 아닐때 값 존재 (nullable) */
    resultMsg?: Nullable<string>;
}

export interface GuestOrderDetailParams {
    /** 주문옵션타입 (ALL: 전체, CLAIM: 클레임진행, NORMAL: 클레임미진행) */
    orderRequestType?: OrderRequestType;
    /** 클레임타입 (CANCEL, RETURN, EXCHANGE, NONE) */
    claimType?: ClaimType | 'NONE';
}
