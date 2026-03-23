import { PgType, ShopSpecificationFields } from '@/models';

export interface GetOrderConfigsResponse {
    /** pg사 */
    pgType: PgType;
    /** 쇼핑몰 이전 일자 */
    mallTransferYmdt: string;
    /** 거래명세서 쇼핑몰 출력 항목 설정 */
    shopSpecificationFields: ShopSpecificationFields[];
    /** 네이버페이 설정정보(사용안함 설정이거나 설정이 없을 경우 null 반환) */
    naverPay?: {
        /** 네이버페이 결제버튼 노출에 필요한 button key */
        buttonKey: string;
    };
    /** 무통장입금 시 현금영수증 신청 필수 여부 */
    cashReceiptRequired: boolean;
    /** [개발중] 앱카드 사용 여부 */
    useAppCard: boolean;
    /** 영수증 보기 버튼 사용 여부 */
    visibleReceiptBtn: {
        /** PG사 매출전표 */
        pgReceipt: boolean;
        /** 거래명세서 */
        specification: boolean;
        /** 간이 영수증 */
        specificationBrief: boolean;
    };
    /** 이전주문 내역 존재 여부 */
    includesPreviousOrder: boolean;
    shippingEmptyAutoCancel?: {
        /** 나중배송지 주문 자동 취소 설정 여부 */
        use: boolean;
        /** 나중배송지 주문 자동 취소 처리 기간 - 해당 영업일 이후 자동 취소 처리 */
        cancelDays: number;
    };
    /** 마이페이 사용여부 */
    useMyPay: boolean;
    /** 거래명세서 하단 추가 정보 (빈값: 사용안함) */
    specificationAdditionalInfo: string;
    /** 결제영수증 사용 여부 */
    usePaymentReceipt: boolean;
    /** 몰 정기배송(결제) 사용 여부 */
    useRecurringPayment: boolean;
    /** 에스크로 설정 정보 */
    escrow?: {
        /** 에스크로 정보 확인 키 (nullable) */
        escrowInfoKey?: Nullable<string>;
        /** 이니시스 에스크로 표시 로고 (nullable) */
        logo: Nullable<string>;
        /** 에스크로 로고 노출 여부 */
        exposeLogo: boolean;
    };
    /** 간이영수증 사용 여부 */
    useSimpleReceipt: boolean;
    /** 정기결제 사은품 지급 기준 */
    recurringPaymentFreeGiftIssueType: string;
    /** 거래명세서 쇼핑몰 노출 설정 */
    viewShopSpecification: boolean;
    /** 무통장입금 시 현금영수증 사용 여부 */
    cashReceipt: boolean;
}
