import { RawAxiosRequestHeaders } from 'axios';

export interface GetBrandListHeaders extends RawAxiosRequestHeaders {
    version: string;
    clientId: string;
}

export interface GetBrandListParams {
    /** 오름차순/내림차순 */
    order?: 'ASC' | 'DESC';
    /** 페이지 번호 */
    page?: number;
    /** 불러올 데이터 수 */
    take?: number;
    /** 메인 브랜드명(최대30자) */
    mainName?: string;
    /** 서브 브랜드명(최대30자) */
    subName?: string;
    /** 브랜드 설명 */
    description?: string;
}

export interface GetBrandListResponse {
    count: number;
    currentPage: number;
    data: BrandInfo[];
    lastPage: number;
    nextPage: Nullable<number>;
    prevPage: Nullable<number>;
    statusCode: 'success' | 'fail';
}

export interface BrandInfo {
    /** brandNo */
    brandNo: number;
    /** 고객사 번호 */
    partnerSno: number;
    /** 상위 전시브랜드 번호 (상위전시브랜드가 없는 경우 0) */
    parentNo: number;
    /** 부가 브랜드명(최대 30자) */
    subName: string;
    /** 메인 브랜드명(최대 30자) */
    mainName: string;
    /** 브랜드 설명 */
    description: string;
    /** 브랜드 이미지 또는 브랜드 관련 동영상 url */
    displayAreaContentUrl: string;
    /** 추가정보 */
    extraInfo: string;
    /** 브랜드 로고 이미지 */
    brandLogoImage: string;
    /** 브랜드 추가 이미지 */
    brandExtraImage: string;
    /** 등록일 */
    regDt: string;
    /** 수정일 */
    updateDt: string;
}
