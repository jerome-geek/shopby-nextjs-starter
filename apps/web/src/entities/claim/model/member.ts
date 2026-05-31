import type {
    AdditionalPayType,
    BankType,
    ClaimClassType,
    ClaimReasonType,
    ClaimType,
    CountryCdType,
    DeliveryCompanyType,
    NonClaimReasonType,
    OrderStatusType,
    PayType,
    ResponsibleObjectType,
    ReturnWayType,
} from '@/models';
import {
    BankAccountInfo,
    ClaimAddress,
    ClaimPriceInfo,
    ClaimableOption,
    ClaimedOption,
    ClaimedProductOption,
    ExchangeOption,
    ExchangePayInfo,
    MemberClaim,
    ReturnOrExchangeAddress,
} from '.';

export interface GetClaimListParams extends Paging {
    /** 클레임 구분(null인 경우 전체) */
    claimTypes: Nullable<ClaimType[]>;
    /** 조회 시작일(null인 경우 3개월 전) */
    startYmd: Nullable<string>;
    /** 조회 종료일(null인 경우 오늘) */
    endYmd: Nullable<string>;
}

export type GetClaimListResponse = ItemList<MemberClaim>;

export interface GetClaimDetailByClaimNoResponse {
    /** 클레임사유상세 (nullable) */
    claimReasonDetail?: Nullable<string>;
    /** 반품배송정보 (nullable) */
    returnDelivery?: Nullable<{
        /** 택배사명 (nullable) */
        deliveryCompanyTypeLabel?: Nullable<string>;
        /** 택배사타입 (nullable) */
        deliveryCompanyType?: Nullable<DeliveryCompanyType>;
        /** 송장번호 (nullable) */
        invoiceNo?: Nullable<string>;
        /** 무적반품(임의반품) 여부 */
        evadesReturnProcess: boolean;
    }>;
    /** 취소/상품상품 리스트 */
    claimedOptions: ClaimedOption[];
    /** 클레임번호 */
    claimNo: number;
    /** 교환상품 (nullable) */
    exchangedOption?: Nullable<ClaimedOption>;
    /** 클레임사유 */
    claimReasonType: ClaimReasonType;
    /** 반품상품 수거방법 (nullable) */
    returnWayType?: Nullable<ReturnWayType>;
    /** 주문옵션번호 */
    orderProductOptionNo: number;
    /** 클레임신청일시 */
    claimYmdt: string;
    /** 교환 추가금액 결제 정보 (nullable) */
    exchangePayInfo?: Nullable<ExchangePayInfo>;
    /** 출고전교환인경우 true */
    exchangeBeforeDelivery: boolean;
    /** 반품/교환 이미지 첨부파일 url 리스트 (nullable) */
    claimImageUrls?: Nullable<string[]>;
    /** 취소/반품상품 */
    claimedOption: ClaimedOption;
    /** 반품수거지 (nullable) */
    returnAddress?: Nullable<ReturnAddress>;
    /** 클레임타입 */
    claimType: ClaimType;
    /** 교환출고배송지 (nullable) */
    exchangeAddress?: Nullable<ReturnAddress>;
    /** 클레임종류 */
    claimClassType: ClaimClassType;
    /** 금액정보 */
    claimPriceInfo: ClaimPriceInfo;
    /** 환불계좌 정보(무통장 및 가상계좌) (nullable) */
    refundBankAccount?: Nullable<BankAccountInfo>;
}

interface ReturnAddress {
    /** 배송메모 */
    note?: Nullable<string>;
    /** 주소 */
    addressStr: string;
    /** 주소 */
    address: string;
    /** 휴대폰번호 국가 코드 */
    mobileCountryCd?: Nullable<string>;
    /** 수령자명 */
    name: string;
    /** 국가코드 */
    countryCd: CountryCdType;
    /** 지번주소 */
    jibunAddress?: Nullable<string>;
    /** 세부주소 */
    detailAddress?: Nullable<string>;
    /** 우편번호 */
    zipCd: string;
    /** 연락처1 */
    contact1: string;
    /** 연락처2 */
    contact2?: Nullable<string>;
}

export interface GetOrderOptionDetailForClaimParams {
    claimType: ClaimType;
}

export interface ExchangeReturnAddress {
    /** 수령자지번주소 (nullable) */
    receiverJibunAddress?: Nullable<string>;
    /** 수령자명 */
    receiverName: string;
    /** 개인통관고유부호(해외배송상품인 경우 필수) (nullable) */
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
    /** (해외) 주 */
    receiverState?: Nullable<string>;
    /** 수령자연락처1 */
    receiverContact1: string;
    /** 수령자연락처2 (nullable) */
    receiverContact2?: Nullable<string>;
}

export interface GetOrderOptionDetailForClaimParams {
    /** 클레임 타입 */
    claimType: ClaimType;
}

export interface GetOrderOptionDetailForClaimResponse {
    /** 택배사타입 */
    deliveryCompanyTypes: DeliveryCompanyType[];
    /** 클레임 대상 상품 */
    originalOption: ClaimableOption;
    /** 클레임 사유 목록 */
    claimReasonTypes: {
        /** 귀책 */
        responsibleObjectType: ResponsibleObjectType;
        /** 클레임사유 */
        claimReasonType: ClaimReasonType;
        /** 클레임사유명 */
        label: string;
    }[];
    /** 수거지(반품할 물건을 수거하러 갈 주소) (nullable) */
    returnAddress?: Nullable<ExchangeReturnAddress>;
    /** 클레임 불가 사유 - ORDER_STATUS_TYPE(주문상태가 클레임 불가), NAVER_PAY(네이버페이 주문), NON_CLAIM_PRODUCT(클레임 불가 상품) (nullable) */
    nonClaimReason?: Nullable<NonClaimReasonType>;
    /** 클레임타입 */
    claimType: ClaimType;
    /** 결제수단 (nullable) */
    payType?: Nullable<PayType>;
    /** 교환배송지 (nullable) */
    exchangeAddress?: Nullable<ClaimAddress>;
    /** 같이 클레임 가능한 상품 */
    claimableOptions: ClaimableOption[];
    /** 귀책 - responsibleObjectType이 null이면 ClaimReasonType에 매핑되는 귀책 적용 */
    responsibleObjectTypes: ResponsibleObjectType;
    /** 환불 가능한 은행 */
    availableBanks: {
        /** 은행 코드 */
        bank: BankType;
        /** 은행명 */
        label: string;
    }[];
    /** 등록되어 있는 환불계좌 (nullable) */
    refundAccount?: Nullable<{
        /** 계좌번호 */
        bankAccount?: Nullable<string>;
        /** 예금주명 */
        bankDepositorName?: Nullable<string>;
        /** 은행 코드 */
        bank?: Nullable<BankType>;
        /** 은행명 */
        bankName?: Nullable<string>;
    }>;
    /** 택배사 목록 */
    deliveryCompanyTypeWithLabels: {
        /** 택배사타입 */
        deliveryCompanyType: DeliveryCompanyType;
        /** 택배사명 */
        label?: Nullable<string>;
    }[];
    /** 반품할 물건을 보낼 주소 (nullable) */
    returnWarehouse?: Nullable<{
        /** 요약정보 */
        summary: string;
        /** 주소 */
        address?: Nullable<string>;
        /** 수령자명 */
        receiverName?: Nullable<string>;
        /** 연락처 */
        contact?: Nullable<string>;
        /** 지번주소 (nullable) */
        jibunAddress?: Nullable<string>;
        /** 상세주소 (nullable) */
        detailAddress?: Nullable<string>;
        /** 우편번호 (nullable) */
        zipCd?: Nullable<string>;
        /** 대체문구 (nullable) */
        substitutionText?: Nullable<string>;
    }>;
}

export interface RequestReturnMultipleOptionsData {
    /** 상세사유 (nullable) */
    claimReasonDetail?: Nullable<string>;
    /** 귀책 - responsibleObjectType이 null이면 ClaimReasonType에 매핑되는 귀책 적용 (CHANGE_MIND, CANCEL_BEFORE_PAY, OTHERS_BUYER -> BUYER / DEFECTIVE_PRODUCT, WRONG_DELIVERY, OUT_OF_STOCK_SYSTEM, WRONG_PRODUCT_DETAIL, DELAY_DELIVERY, OUT_OF_STOCK, OTHERS_SELLER -> SELLER) (nullable)*/
    responsibleObjectType?: Nullable<ResponsibleObjectType>;
    /** 주문상품옵션정보 */
    claimedProductOptions: ClaimedProductOption[];
    /** 클레임타입 */
    claimType: ClaimType;
    /** 환불계좌정보 저장 여부(true일 경우 bankAccountInfo 필수) */
    saveBankAccountInfo: boolean;
    /** 환불계좌정보(가상계좌 주문은 필수) (nullable) */
    bankAccountInfo?: Nullable<BankAccountInfo>;
    /** 클레임사유 */
    claimReasonType: ClaimReasonType;
    /** 반품상품 수거방법 (nullable) */
    returnWayType?: Nullable<ReturnWayType>;
    /** 반품 택배사타입 */
    deliveryCompanyType?: Nullable<DeliveryCompanyType>;
    /** 첨부파일 url 리스트 (nullable) */
    claimImageUrls?: Nullable<string[]>;
    /** 반품 송장번호 (nullable) */
    invoiceNo?: Nullable<string>;
    /** 반품주소(배송상품인 경우 필수, 배송안함상품인 경우 null 가능) (nullable) */
    returnAddress?: Nullable<{
        /** (해외배송 시 필수) 수령인 lastName */
        receiverLastName?: string;
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
        /** 배송메모 (nullable) */
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
    }>;
}

export type CheckFreeGiftSatisfyData = {
    /** 취소/반품할 제품수량 */
    productCnt: number;
    /** 주문 상품 옵선 번호 */
    orderProductOptionNo: number;
}[];

export type CheckFreeGiftSatisfyResponse = {
    /** 사은품 주문 옵션 번호 리스트 */
    freeGifts: {
        /** 조건 충족 여부 */
        satisfy: boolean;
        /** 사은품 주문옵션번호 */
        orderProductOptionNo: number;
    }[];
    /** 대상 상품 번호 (nullable) */
    targetOrderProductNo: Nullable<number>;
    /** 대상 주문 번호 */
    targetOrderNo: string;
    /** 사은품 지급 번호 */
    conditionNo: number;
}[];

export interface RequestExchangeData {
    /** 상세사유 */
    claimReasonDetail: string;
    /** 귀책 - responsibleObjectType이 null이면 ClaimReasonType에 매핑되는 귀책 적용 */
    responsibleObjectType?: Nullable<ResponsibleObjectType>;
    /** 입금자명(추가결제시) (nullable) */
    additionalPayRemitter?: Nullable<string>;
    /** 환불계좌정보 (nullable) */
    bankAccountInfo?: Nullable<BankAccountInfo>;
    /** 취소 / 반품할 제품수량 */
    productCnt: number;
    /** 현재 주문 상태 (nullable) */
    orderStatusType?: Nullable<OrderStatusType>;
    /** 클레임사유 */
    claimReasonType: ClaimReasonType;
    /** 반품수거방법(SELLER_COLLECT 일 경우 returnAddress(반품수거주소지) 입력 필요) (nullable) */
    returnWayType?: Nullable<ReturnWayType>;
    /** 택배사타입 (nullable) */
    deliveryCompanyType?: Nullable<DeliveryCompanyType>;
    /** 첨부파일 url 리스트 (5개까지 가능, 취소교환은 무시되며, 반품교환만 저장합니다.)  */
    claimImageUrls?: Nullable<string[]>;
    /** 반품수거 주소지(배송상품인 경우 필수, 배송안함상품인 경우 null 가능) */
    returnAddress?: Nullable<ReturnOrExchangeAddress>;
    /** 추가결제입금계좌(추가결제시) (nullable) */
    additionalPayBankAccount?: Nullable<{
        /** 계좌소유자명 (nullable) */
        depositorName?: Nullable<string>;
        /** 은행코드 (nullable) */
        bank?: Nullable<string>;
        /** 은행명 */
        bankName: string;
        /** 계좌번호 (nullable) */
        account?: Nullable<string>;
    }>;
    /** 환불계좌정보 저장 여부(true일 경우 bankAccountInfo 필수) (nullable) */
    saveBankAccountInfo?: Nullable<boolean>;
    /** 추가결제방법 (nullable) */
    additionalPayType?: Nullable<AdditionalPayType>;
    /** 교환출고지주소 (nullable) */
    exchangeAddress?: Nullable<ReturnOrExchangeAddress>;
    /** 교환할 옵션 */
    exchangeOption: ExchangeOption;
    /** 송장번호 (nullable) */
    invoiceNo?: Nullable<string>;
}
