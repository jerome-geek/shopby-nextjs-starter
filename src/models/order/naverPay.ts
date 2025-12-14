export interface NaverPayOrderSheetData {
    /** 주문서 번호. items[].channelType 이 존재하는 경우 서버에서 주문서번호 생성함. (nullable) */
    orderSheetNo?: Nullable<string>;
    /** 쇼핑몰에서 사용 할 extraData (nullable) */
    extraData?: Nullable<string>;
    /** 이동URL */
    clientReturnUrl: string;
    /** SA CLICK ID. 네이버 검색광고 이용 가맹점 중 광고주 센터의 광고 효과 보고서를 통해 네이버페이 전환 데이터를 확인하길 원하는 가맹점은 SA로부터 받은 추적 URL 파라미터 중 NVADID를 입력. (nullable) */
    nvadid?: Nullable<string>;
    /** 네이버 서비스 유입 경로 코드. (nullable) */
    naCo?: Nullable<string>;
    /** 구매상품 */
    items: NaverPayOrderSheetItem[];
}

export interface NaverPayOrderSheetItem {
    /** 채널타입 */
    channelType: string;
    /** 상품개수 */
    orderCnt: number;
    /** 옵션 */
    optionInputs: {
        /** 옵션 입력값 */
        inputValue: string;
        /** 옵션 입력라벨 */
        inputLabel: string;
    }[];
    /** 옵션번호 */
    optionNo: number;
    /** 상품번호 */
    productNo: number;
    /** 추가상품번호 (nullable) */
    additionalProductNo?: Nullable<number>;
}

export type ValidateNaverPayData = Omit<
    NaverPayOrderSheetItem,
    'additionalProductNo'
>;

export interface ValidateNaverPayResponse {
    /** 검증 결과 */
    result: boolean;
}

export interface RequestNaverPayWishListData {
    /** 상품번호 */
    productNo: number;
}
