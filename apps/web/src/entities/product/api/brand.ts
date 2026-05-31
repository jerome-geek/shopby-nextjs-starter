import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import type {
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
} from '@/entities/product/model/brand';

const brand = {
    /**
     * 브랜드 목록 조회하기
     *  - 브랜드 목록 조회하는 API입니다
     *  - Paging 기능 제공합니다
     *  - 상품에 매핑된 브랜드를 조회합니다.
     */
    getBrands: (params?: GetBrandsParams, options?: AxiosRequestConfig) => {
        return shopbyRequest<GetBrandsResponse>({
            method: 'GET',
            url: '/display/brands',
            params,
            ...options,
        });
    },

    /**
     * 브랜드 추가 정보 조회하기
     *  - 브랜드 요청 번호는 최대 30개 까지 가능합니다.
     */
    getBrandExtraInfo: (
        params?: GetBrandsExtraInfoParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetBrandsExtraInfoResponse>({
            method: 'GET',
            url: '/display/brands/extraInfo',
            params,
            ...options,
        });
    },

    /**
     * 브랜드 조회하기
     *  - 브랜드 조회하는 API입니다.
     */
    searchBrands: (
        params: SearchBrandsParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<SearchBrandResponse>({
            method: 'GET',
            url: '/display/brands/search',
            params,
            ...options,
        });
    },

    /**
     * 브랜드번호로 브랜드정보 조회하기
     *  - 브랜드번호로 브랜드정보 조회하는 API입니다
     */
    getBrandsByNos: (
        params: GetBrandInfoByBrandNoParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetBrandInfoByBrandNoResponse>({
            method: 'GET',
            url: '/display/brands/search-by-nos',
            params,
            ...options,
        });
    },

    /**
     * 브랜드 트리 조회하기
     *  - 브랜드 트리 조회하는 API입니다
     */
    getBrandTreeInfo: (options?: AxiosRequestConfig) => {
        return shopbyRequest<GetBrandTreeResponse>({
            method: 'GET',
            url: '/display/brands/tree',
            ...options,
        });
    },

    /**
     * 브랜드 상세 조회하기
     *  - 브랜드 상세 조회하는 API입니다
     */
    getBrandDetail: (displayBrandNo: number, options?: AxiosRequestConfig) => {
        return shopbyRequest<GetBrandDetailResponse>({
            method: 'GET',
            url: `/display/brands/${displayBrandNo}`,
            ...options,
        });
    },

    /**
     * 자식 브랜드 조회하기
     *  - 자식 브랜드를 조회하는 API입니다
     *  - 해당 브랜드의 바로 하위 브랜드의 정보를 조회합니다
     */
    getBrandChildrenInfo: (
        displayBrandNo: number,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetBrandChildrenResponse>({
            method: 'GET',
            url: `/display/brands/${displayBrandNo}/children`,
            ...options,
        });
    },
};

export default brand;
