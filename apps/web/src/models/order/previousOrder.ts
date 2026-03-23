import { OrderStatusType, PayType, PreviousOrderSearchType } from '@/models';

export interface GetPreviousOrdersParams {
    /** 검색 타입 */
    searchType?: PreviousOrderSearchType;
    /** 검색어 */
    keyword?: string;
    /** 조회시작일 */
    startYmd?: string;
    /** 조회종료일 */
    endYmd?: string;
    /** 페이지 번호 */
    page: number;
    /** 페이지당 노출 개수(최대 200) */
    size: number;
}

export interface GetPreviousOrdersResponse {
    /** 전체 주문수 */
    totalCount: number;
    contents: {
        /** 주문 옵션 리스트 */
        orderOptions: {
            /** 옵션별 상품 금액 */
            salePrice: number;
            /** 옵션값 */
            optionValue: string;
            /** 주문 상태 */
            orderStatusType: OrderStatusType;
            /** 사용자 입력형 옵션 */
            purchaserInputs: {
                /** 값 */
                inputValue?: Nullable<string>;
                /** 이름 */
                inputLabel?: Nullable<string>;
                /** 필수 여부 */
                required?: Nullable<boolean>;
                /** 번호 */
                inputNo?: Nullable<number>;
            }[];
            /** 주문일시 */
            orderYmdt: string;
            /** 주문 수량 */
            orderCnt: number;
            /** 옵션명 */
            optionName: string;
            /** 옵션 번호 */
            optionNo: number;
            /** 주문 메모 */
            orderMemo: string;
            /** 상품명 */
            productName: string;
            /** 결제일시 */
            payYmdt: string;
        }[];
        /** 주문 번호 */
        orderNo: string;
        /** 수령자 전화번호 */
        receiverContact: string;
        /** 상품 금액 */
        salePrice: number;
        /** 수령자명 */
        receiverName: string;
        /** 개인통관고유번호 */
        customsIdNumber: string;
        /** 플랫폼 구분 */
        platformType: string;
        /** 주문자 전화번호 */
        ordererContact: string;
        /** 우편번호 */
        receiverZipCd: string;
        /** 주문 금액 */
        purchasePrice: number;
        /** 배송 메모 */
        deliveryMemo: string;
        /** 주소 */
        receiverAddress: string;
        /** 회원 번호 */
        memberNo: number;
        /** 주문 유형 */
        payType: PayType;
        /** 배송비 */
        deliveryAmt: number;
        /** 실 결제금액 */
        mainPayAmt: number;
        /** 회원 등급명 */
        memberGradeNames: (boolean | string | number)[];
        /** 주문 유형 라벨 */
        payTypeLabel: string;
        /** 주문자명 */
        ordererName: string;
        /** 회원 아이디 */
        memberId: string;
    }[];
}

export interface GetPreviousOrderResponse {
    firstPayment?: {
        /** 할인혜택 */
        discountAmt: number;
        /** 배송비 */
        deliveryAmt: number;
        /** 판매금액 */
        standardAmt: number;
        /** 실 결제금액 */
        mainPayAmt: number;
        /** 지역별배송비 */
        remoteDeliveryAmt: number;
        /** 적립금사용 */
        subPayAmt: number;
        /** 결제금액 */
        payAmt: number;
    };
    /** 수령자 정보 */
    receiver: {
        /** 배송지 정보 */
        deliveryInfo?: Nullable<string>;
        /** 수령자명 */
        receiverName?: Nullable<string>;
        /** 옵션값 */
        optionValue?: Nullable<string>;
        /** 개인통관번호 */
        customsIdNumber?: Nullable<string>;
        /** 전화번호 */
        receiverPhoneNumber?: Nullable<string>;
        /** 사용자 입력형 옵션 */
        purchaserInputs: {
            /** 값 */
            inputValue?: Nullable<string>;
            /** 이름 */
            inputLabel?: Nullable<string>;
            /** 필수 여부 */
            required?: Nullable<boolean>;
            /** 번호 */
            inputNo?: Nullable<number>;
        }[];
        /** 택배사 */
        deliveryCompanyType?: Nullable<string>;
        /** 우편번호 */
        receiverZipCd?: Nullable<string>;
        /** 배송지 상세 주소 */
        receiverDetailAddress?: Nullable<string>;
        /** 배송메모 */
        deliveryMemo?: Nullable<string>;
        /** 상품명 */
        productName?: Nullable<string>;
        /** 배송지 주소 */
        receiverAddress?: Nullable<string>;
        /** 휴대폰번호 */
        receiverMobileNumber?: Nullable<string>;
        /** 옵션명 */
        optionName?: Nullable<string>;
        /** 송장번호 */
        invoiceNo?: Nullable<string>;
    }[];
    /** 적립혜택 */
    accumulationAmt: number;
    orderer?: {
        /** 이메일 */
        ordererEmail?: Nullable<string>;
        /** 휴대폰번호 */
        ordererMobileNumber?: Nullable<string>;
        /** 회원등급 */
        memberGradeNames?: Nullable<(boolean | string | number)[]>;
        /** 전화번호 */
        ordererPhoneNumber?: Nullable<string>;
        /** 주문메모 */
        orderMemo?: Nullable<string>;
        /** 주문자명 */
        ordererName?: Nullable<string>;
        /** 아이디 */
        memberId?: Nullable<string>;
    };
    paymentMethod?: {
        /** 결제방법 */
        payType?: Nullable<PayType>;
        /** 주문일시 */
        orderYmdt?: Nullable<string>;
        /** 결제 상세 */
        payDetail: {
            /** 예금주 */
            accountHolder?: Nullable<string>;
            /** 할인 금액 */
            discountAmt?: Nullable<string>;
            /** 은행명 */
            bank?: Nullable<string>;
            /** 입금자 */
            depositor?: Nullable<string>;
            /** 계좌 번호 */
            account?: Nullable<string>;
        };
        /** 결제방법 라벨 */
        payTypeLabel?: Nullable<string>;
        /** 결제일시 */
        payYmdt?: Nullable<string>;
    };
    lastPayment?: {
        /** 할인혜택 */
        discountAmt: number;
        /** 배송비 */
        deliveryAmt: number;
        /** 판매금액 */
        standardAmt: number;
        /** 실 결제금액 */
        mainPayAmt: number;
        /** 지역별배송비 */
        remoteDeliveryAmt: number;
        /** 적립금사용 */
        subPayAmt: number;
        /** 결제금액 */
        payAmt: number;
    };
    /** 주문상품 정보 */
    orderProduct: {
        /** 상품합계 */
        salePrice: number;
        /** 파트너사 */
        partnerName?: Nullable<string>;
        /** 주문상태 */
        orderStatusType: OrderStatusType;
        /** 옵션값 */
        optionValue?: Nullable<string>;
        /** 택배사 */
        deliveryCompanyType?: Nullable<string>;
        /** 지역별 배송비 */
        remoteDeliveryAmt?: Nullable<number>;
        /** 사용자 입력형 옵션 */
        purchaserInputs: {
            /** 값 */
            inputValue?: Nullable<string>;
            /** 이름 */
            inputLabel?: Nullable<string>;
            /** 필수 여부 */
            required?: Nullable<boolean>;
            /** 번호 */
            inputNo?: Nullable<number>;
        }[];
        /** 수량 */
        orderCnt: number;
        /** 주문금액 */
        purchasePrice?: Nullable<number>;
        /** 상품명 */
        productName?: Nullable<string>;
        /** 기본 배송비 */
        deliveryAmt?: Nullable<number>;
        /** 송장번호 */
        invoiceNo?: Nullable<string>;
        /** 옵션명 */
        optionName?: Nullable<string>;
        /** 옵션 번호 */
        optionNo?: Nullable<number>;
    }[];
    /** 몰 번호 */
    mallNo: number;
    /** 비회원 주문 토큰 */
    guestToken?: Nullable<string>;
    refund: {
        /** 환불방법 라벨 */
        refundTypeLabel?: Nullable<string>;
        /** 환불방법 */
        refundType?: Nullable<string>;
        /** 환불처리일시 */
        refundCompleteYmdt?: Nullable<string>;
        /** 환불 계좌 */
        refundBankAccount: {
            /** 계좌 예금주 */
            depositorName?: Nullable<string>;
            /** 은행명 */
            bank?: Nullable<string>;
            /** 계좌 번호 */
            account?: Nullable<string>;
        };
        /** 환불금액 */
        refundAmt?: Nullable<number>;
    };
}

export interface GetGuestPreviousOrderResponse
    extends GetPreviousOrderResponse {}

export interface IssueGuestPreviousOrderTokenData {
    password: string;
}

export interface IssueGuestPreviousOrderTokenResponse
    extends GetPreviousOrderResponse {}
