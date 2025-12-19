import type { Options } from 'ky';
import qs from 'qs';

import { request } from '@/api/core';
import {
    GetProductSectionProductsParams,
    GetProductSectionProductsResponse,
    GetProductSectionResponse,
    GetProductSectionsResponse,
} from '@/models/display/productSection';

const productSection = {
    /**
     * 상품 진열 리스트 조회하기
     *  - 상품 진열 리스트를 반환합니다
     */
    getProductSections: (options?: Options) => {
        return request.get<GetProductSectionsResponse>('display/sections', {
            ...options,
        });
    },

    /**
     * 상품 섹션 조회하기 (단일 진열) v2.0)
     *  - 상품 진열 번호(sectionNo)를 기준으로 상품 진열을 조회하는 API 입니다. 버전 v2.0 API 입니다.
     *  - 상품에 대한 조회는 상품 진열 상세조회 API 를 통해 호출이 필요합니다.
     */
    getProductSection: (sectionNo: string, options?: Options) => {
        return request.get<GetProductSectionResponse>(
            `display/sections/${sectionNo}`,
            {
                ...options,
                headers: {
                    version: '2.0',
                },
            }
        );
    },

    /**
     * 진열 ID로 상품 진열 조회하기 (단일 진열) v2.0
     *  - 상품 진열 ID(sectionId)를 기준으로 상품 진열을 조회하는 API 입니다. 버전 v2.0 API 입니다.
     *  - 상품에 대한 조회는 상품 진열 상세조회 API 를 통해 호출이 필요합니다.
     */
    getProductSectionById: (sectionId: string, options?: Options) => {
        return request.get<GetProductSectionResponse>(
            `display/sections/ids/${sectionId}`,
            {
                ...options,
                headers: {
                    version: '2.0',
                },
            }
        );
    },

    /**
     * 진열 번호로 상품 진열 내 상품 상세 조회하기 (단일진열-페이징)
     *  - 상품 진열 ID(sectionId)를 기준으로 상품 진열 내 상품 목록을 조회하는 API입니다.
     *  - pageSize: 상품을 조회하는 최대 페이지 사이즈는 30입니다
     */
    getProductSectionProductsByNo: (
        sectionNo: string,
        params: GetProductSectionProductsParams,
        options?: Options
    ) => {
        return request.get<GetProductSectionProductsResponse>(
            `display/sections/${sectionNo}/products`,
            {
                searchParams: qs.stringify(params),
                ...options,
            }
        );
    },

    /**
     * 진열 ID로 상품 진열 내 상품 상세 조회하기 (단일진열-페이징)
     *  - 상품 진열 ID(sectionId)를 기준으로 상품 진열 내 상품 목록을 조회하는 API입니다.
     *  - pageSize: 상품을 조회하는 최대 페이지 사이즈는 30입니다
     */
    getProductSectionProductsById: (
        sectionId: string,
        params: GetProductSectionProductsParams,
        options?: Options
    ) => {
        return request.get<GetProductSectionProductsResponse>(
            `display/sections/ids/${sectionId}/products`,
            {
                searchParams: qs.stringify(params),
                ...options,
            }
        );
    },
};

export default productSection;
