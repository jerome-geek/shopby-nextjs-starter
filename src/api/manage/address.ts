import type { Options } from 'ky';
import qs from 'qs';

import request from '@/api/core/request';
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
    searchAddress: (params: SearchAddressParams, options?: Options) => {
        return request.get<SearchAddressResponse>('addresses/search', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 일본 주소 검색
     */
    searchJpAddress: (params: SearchJpAddressParams, options?: Options) => {
        return request.get<SearchJpAddressResponse>('addresses/search/jp', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },
};

export default address;
