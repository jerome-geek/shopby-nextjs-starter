export interface GetShopListParams {
    order?: 'ASC' | 'DESC';
    page?: number;
    take?: number;
    shopName?: string;
    shopTel?: string;
    shopCode?: string;
    address?: string;
    addressSub?: string;
    city?: string;
    gu?: string;
}

export interface GetShopListResponse {
    count: number;
    currentPage: number;
    data: GetShopInfoResponse[];
    lastPage: number;
    nextPage: number;
    prevPage: number;
    statusCode: 'success' | 'fail';
}

export interface GetShopInfoResponse {
    /** sno */
    sno: number;
    /** 등록일 */
    regDt: string;
    /** 수정일 */
    updateDt: string;
    /** 고객사 번호 */
    partnerSno: number;
    /** 고객사명 **/
    partnerName: string;
    /** 매장명 */
    shopName: string;
    /** 매장 전화번호 */
    shopTel: string;
    /** 매장 코드 */
    shopCode: string;
    /** 우편번호 */
    zipcode: string;
    /** 주소 */
    address: string;
    /** 주소 상세 */
    addressSub: string;
    /** 도시 코드 */
    city: string;
    /** 도시 동 */
    gu: string;
    /** 위도 */
    lat: number;
    /** 경도 */
    lng: number;
    /** 운영시간 */
    officeHour: string;
    /** 매장 설명 */
    description: string;
    /** 추가정보 */
    additionalInfo: string;
}
