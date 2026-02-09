export interface CompanyExistParams {
    /** 사업자등록번호 (10자리) */
    registration: string;
}

export interface CompanyExistResponse {
    /** 존재 여부 */
    exist: boolean;
}
