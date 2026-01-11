import type { Options } from 'ky';
import qs from 'qs';

import { request } from '@/api/core/request';
import {
    GetBrandChildrenResponse,
    GetBrandDetailResponse,
    GetBrandInfoByBrandNoParams,
    GetBrandInfoByBrandNoResponse,
    GetBrandsExtraInfoParams,
    GetBrandsExtraInfoResponse,
    GetBrandsParams,
    GetBrandsResponse,
    GetBrandTreeResponse,
    SearchBrandResponse,
    SearchBrandsParams,
} from '@/models/product/brand';

const brand = {
    /**
     * 브랜드 목록 조회하기
     *  - 브랜드 목록 조회하는 API입니다
     *  - Paging 기능 제공합니다
     *  - 상품에 매핑된 브랜드를 조회합니다.
     */
    getBrands: (params?: GetBrandsParams, options?: Options) => {
        return request.get<GetBrandsResponse>('brands', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 브랜드 추가 정보 조회하기
     *  - 브랜드 요청 번호는 최대 30개 까지 가능합니다.
     */
    getBrandExtraInfo: (
        params?: GetBrandsExtraInfoParams,
        options?: Options,
    ) => {
        return request.get<GetBrandsExtraInfoResponse>('brands/extraInfo', {
            searchParams: qs.stringify(params),
            ...options,
        });
    },

    /**
     * 브랜드 조회하기
     *  - 브랜드 조회하는 API입니다.
     */
    searchBrands: (params: SearchBrandsParams, options?: Options) => {
        return request.get<SearchBrandResponse>('brands/search', {
            searchParams: qs.stringify(params),
            ...options,
        });
    },

    /**
     * 브랜드번호로 브랜드정보 조회하기
     *  - 브랜드번호로 브랜드정보 조회하는 API입니다
     */
    getBrandsByNos: (
        params: GetBrandInfoByBrandNoParams,
        options?: Options,
    ) => {
        return request.get<GetBrandInfoByBrandNoResponse>(
            'brands/search-by-nos',
            {
                searchParams: qs.stringify(params),
                ...options,
            },
        );
    },

    /**
     * 브랜드 트리 조회하기
     *  - 브랜드 트리 조회하는 API입니다
     */
    getBrandTreeInfo: (options?: Options) => {
        return request.get<GetBrandTreeResponse>('brands/tree', {
            ...options,
        });
    },

    /**
     * 브랜드 상세 조회하기
     *  - 브랜드 상세 조회하는 API입니다
     */
    getBrandDetail: (displayBrandNo: number, options?: Options) => {
        return request.get<GetBrandDetailResponse>(`brands/${displayBrandNo}`, {
            ...options,
        });
    },

    /**
     * 자식 브랜드 조회하기
     *  - 자식 브랜드를 조회하는 API입니다
     *  - 해당 브랜드의 바로 하위 브랜드의 정보를 조회합니다
     */
    getBrandChildrenInfo: (displayBrandNo: number, options?: Options) => {
        return request.get<GetBrandChildrenResponse>(
            `brands/${displayBrandNo}/children`,
            {
                ...options,
            },
        );
    },
};

export default brand;
