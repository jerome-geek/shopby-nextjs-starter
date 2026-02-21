import type { AxiosRequestConfig } from 'axios';
import qs from 'qs';

import { shopbyRequest } from '@/api/core/request';
import {
    SearchAddressParams,
    SearchAddressResponse,
    SearchJpAddressParams,
    SearchJpAddressResponse,
} from '@/models/manage/address';

const address = {
    /**
     * 주소 조회하기
     *  - 검색 키워드로 주소정보를 검색하는 API 입니다
     */
    searchAddress: (
        params: SearchAddressParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<SearchAddressResponse>({
            method: 'GET',
            url: '/addresses/search',
            params,
            ...options,
        });
    },

    /**
     * 일본 주소 검색
     */
    searchJpAddress: (
        params: SearchJpAddressParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<SearchJpAddressResponse>({
            method: 'GET',
            url: '/addresses/search/jp',
            params,
            ...options,
        });
    },
};

export default address;
