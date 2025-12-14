export interface GetCityListResponse {
    /** 등록일 */
    regDt: string;
    /** 수정일 */
    updateDt: string;
    /** 코드키 */
    codeKey: string;
    /** 부모키코드 */
    parentKey: string;
    /** 코드명 */
    codeName: string;
    /** 코드값 */
    codeValue: string;
    /** 루트여부 */
    rootFl: string;
    /** 노출여부 */
    displayFl: string;
}

export interface GetCityInfoResponse {
    /** 등록일 */
    regDt: string;
    /** 수정일 */
    updateDt: string;
    /** 코드키 */
    codeKey: string;
    /** 부모키코드 */
    parentKey: string;
    /** 코드명 */
    codeName: string;
    /** 코드값 */
    codeValue: string;
    /** 루트여부 */
    rootFl: string;
    /** 노출여부 */
    displayFl: string;
}
