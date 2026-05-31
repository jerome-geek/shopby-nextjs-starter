import type { Brand, FlatCategory, MultiLevelCategory } from '@/entities/display/model';

export interface GetCategoriesParams {
    /** 카테고리명 */
    keyword?: string;
}

export interface GetCategoriesResponse {
    /** 카테고리 목록(계층) */
    multiLevelCategories: MultiLevelCategory[];
    /** 카테고리 목록 */
    flatCategories: FlatCategory[];
}

export type GetNewProductCategoriesResponse = number[];

export interface GetCategoriesByManagementCodeData {
    /** 관리코드 */
    codes: (string | number)[];
}

export type GetCategoriesByManagementCodeResponse = {
    /** 관리코드 */
    code: string;
    /** 카테고리 번호 */
    displayCategoryNo: number;
}[];

export type Get1depthCategoryResponse = {
    /** 카테고리명 */
    displayCategoryName: string;
    /** 카테고리 번호 */
    displayCategoryNo: number;
    /** 카테고리 코드 */
    displayManagementCode: string;
}[];

export interface GetCategoryResponse extends GetCategoriesResponse {
    /** 요청한 카테고리 번호 */
    requestedCategoryNo: number;
    /** 브랜드 목록 */
    brands: Brand[];
}

export interface GetCategoryParams {
    /** 브랜드 정보 조회 여부 (default: true) */
    needsBrands?: boolean;
}
