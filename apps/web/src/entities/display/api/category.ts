import type { AxiosRequestConfig } from 'axios';
import qs from 'qs';

import { shopbyRequest } from '@/api/core/request';
import type {
    Get1depthCategoryResponse,
    GetCategoriesByManagementCodeData,
    GetCategoriesByManagementCodeResponse,
    GetCategoriesParams,
    GetCategoriesResponse,
    GetCategoryParams,
    GetCategoryResponse,
    GetNewProductCategoriesResponse,
} from '@/entities/display/model/category';

const category = {
    /**
     * 전체 카테고리 조회하기
     *  - 키워드로 카테고리를 조회하는 API입니다
     *   - 계층을 가지는 카테고리 목록(multiLevelCategories)을 조회합니다 (최대 5 depth)
     *   - 원본 카테고리 목록(flatCategories)을 조회합니다
     */
    getCategories: (
        params?: GetCategoriesParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetCategoriesResponse>({
            method: 'GET',
            url: '/categories',
            params,
            ...options,
        });
    },

    /**
     * 신상품이 있는 카테고리 조회하기
     *  - 판매 시작일이 1주일 이내인 상품이 존재하는 카테고리 조회하는 API입니다
     */
    getNewProductCategories: (options?: AxiosRequestConfig) => {
        return shopbyRequest<GetNewProductCategoriesResponse>({
            method: 'GET',
            url: '/categories/new-product-categories',
            ...options,
        });
    },

    /**
     * 관리코드로 카테고리 번호를 조회하기
     *  - 전시카테고리 관리코드로 카테고리 번호를 조회하는 API입니다
     */
    getCategoriesByManagementCode: (
        data: GetCategoriesByManagementCodeData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetCategoriesByManagementCodeResponse>({
            method: 'POST',
            url: '/categories/search-by-management-code',
            data,
            ...options,
        });
    },

    /**
     * 1차 카테고리 간단 정보 조회하기
     *  - 1차 카테고리 관련 간단한 정보를 조회하는 API 입니다
     */
    get1depthCategory: (options?: AxiosRequestConfig) => {
        return shopbyRequest<Get1depthCategoryResponse>({
            method: 'GET',
            url: '/categories/simple-1depth',
            ...options,
        });
    },

    /**
     * 카테고리 조회하기
     *  - 카테고리 번호로 카테고리를 조회하는 API입니다
     *   - 계층을 가지는 카테고리 목록(multiLevelCategories)을 조회합니다 (최대 5 depth)
     *   - 원본 카테고리 목록(flatCategories)을 조회합니다
     */
    getCategory: (
        categoryNo: string | number,
        params?: GetCategoryParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetCategoryResponse>({
            method: 'GET',
            url: `/categories/${categoryNo}`,
            params,
            ...options,
        });
    },
};

export default category;
