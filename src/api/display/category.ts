import type { Options } from 'ky';
import qs from 'qs';

import { publicRequest } from '@/api/core/request';
import { ONE_WEEK } from '@/const/time';
import {
    Get1depthCategoryResponse,
    GetCategoriesByManagementCodeData,
    GetCategoriesByManagementCodeResponse,
    GetCategoriesParams,
    GetCategoriesResponse,
    GetCategoryParams,
    GetCategoryResponse,
    GetNewProductCategoriesResponse,
} from '@/models/display/category';

export const CATEGORY_REVALIDATE_MS = ONE_WEEK;

const category = {
    /**
     * 전체 카테고리 조회하기
     *  - 키워드로 카테고리를 조회하는 API입니다
     *   - 계층을 가지는 카테고리 목록(multiLevelCategories)을 조회합니다 (최대 5 depth)
     *   - 원본 카테고리 목록(flatCategories)을 조회합니다
     */
    getCategories: (params?: GetCategoriesParams, options?: Options) => {
        return publicRequest.get<GetCategoriesResponse>('categories', {
            searchParams: qs.stringify(params),
            ...options,
        });
    },

    /**
     * 신상품이 있는 카테고리 조회하기
     *  - 판매 시작일이 1주일 이내인 상품이 존재하는 카테고리 조회하는 API입니다
     */
    getNewProductCategories: (options?: Options) => {
        return publicRequest.get<GetNewProductCategoriesResponse>(
            'categories/new-product-categories',
            {
                ...options,
            },
        );
    },

    /**
     * 관리코드로 카테고리 번호를 조회하기
     *  - 전시카테고리 관리코드로 카테고리 번호를 조회하는 API입니다
     */
    getCategoriesByManagementCode: (
        data: GetCategoriesByManagementCodeData,
        options?: Options,
    ) => {
        return publicRequest.post<GetCategoriesByManagementCodeResponse>(
            'categories/search-by-management-code',
            {
                next: {
                    revalidate: CATEGORY_REVALIDATE_MS,
                    tags: ['category'],
                },
                json: data,
                ...options,
            },
        );
    },

    /**
     * 1차 카테고리 간단 정보 조회하기
     *  - 1차 카테고리 관련 간단한 정보를 조회하는 API 입니다
     */
    get1depthCategory: (options?: Options) => {
        return publicRequest.get<Get1depthCategoryResponse>(
            'categories/simple-1depth',
            {
                ...options,
            },
        );
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
        options?: Options,
    ) => {
        return publicRequest.get<GetCategoryResponse>(
            `categories/${categoryNo}`,
            {
                next: {
                    revalidate: CATEGORY_REVALIDATE_MS,
                },
                searchParams: qs.stringify(params),
                ...options,
            },
        );
    },
};

export default category;
