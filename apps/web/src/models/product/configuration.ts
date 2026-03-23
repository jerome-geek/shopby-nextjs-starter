export interface GetNaverShoppingConfigurationResponse {
    /** 네이버 쇼핑 설정 여부 */
    supportsNaverShopping: boolean;
    /** CPA 주문수집 동의여부 */
    agreedToCollectingCPAOrder: boolean;
    /** 네이버 공통 인증키 */
    authenticationKey: string;
}
