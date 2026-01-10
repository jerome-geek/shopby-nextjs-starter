import type { Options } from 'ky';
import qs from 'qs';

import { request } from '@/api/core';
import {
    AdditionalTermsResponse,
    GetAdditionalTermsData,
    GetTermDetailByPostData,
    GetTermDetailByPostResponse,
    GetTermHistoryParams,
    GetTermListByPostData,
    GetTermListParams,
    GetTermListResponse,
    GetTermsHistoryResponse,
    GetUsedTermsParams,
    GetUsedTermsResponse,
} from '@/models/manage/terms';

const terms = {
    /**
     * 적용 중인 몰 약관 조회하기
     *  - 해당 쇼핑몰의 약관을 조회하는 API 입니다
     */
    getTermList: (params: GetTermListParams, options?: Options) => {
        return request.get<GetTermListResponse>('terms', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 적용중인 몰 약관 조회하기 (ver 1.1)
     *  - 해당 쇼핑몰의 약관을 조회하는 API (ver 1.1) 치환하고 싶은 문구를 replacementPhrase 항목에 [key: value]형태로 넣어서 치환할 수 있습니다.
     */
    getTermListByPost: (data: GetTermListByPostData, options?: Options) => {
        return request.post<GetTermListResponse>('terms', {
            json: data,
            headers: {
                version: '1.1',
            },
            ...options,
        });
    },

    /**
     * 추가 약관 조회하기
     *  - 해당 쇼핑몰의 추가 약관을 조회하는 API 입니다.
     */
    getAdditionalTerms: (data: GetAdditionalTermsData, options?: Options) => {
        return request.post<AdditionalTermsResponse>('terms/custom', {
            json: data,
            ...options,
        });
    },

    /**
     * 약관 변경이력 조회하기
     *  - 해당 쇼핑몰 약관의 변경이력을 조회하는 API 입니다
     */
    getTermHistory: (params: GetTermHistoryParams, options?: Options) => {
        return request.get<GetTermsHistoryResponse>('terms/history', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 적용 중인 몰 약관 조회하기
     * - 해당 쇼핑몰의 현재 적용중인 약관타입만 조회하는 API 입니다.
     */
    getUsedTerms: (params: GetUsedTermsParams, options?: Options) => {
        return request.get<GetUsedTermsResponse>('terms/used', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 약관 상세 조회하기
     *  - 특정 약관(약관번호 기준)을 상세 조회하는 API 입니다
     */
    getTermDetail: (termsNo: number, options?: Options) => {
        return request.get<GetTermDetailByPostResponse>(`terms/${termsNo}`, {
            ...options,
        });
    },

    /**
     * 약관 상세 조회하기 (ver 1.1)
     * - 특정 약관(약관번호 기준)을 상세 조회하는 API 입니다. (ver 1.1)
     * - 치환하고 싶은 문구를 replacementPhrase 항목에 [key:value]형태로 넣어서 치환할 수 있습니다.
     */
    getTermDetailByPost: (
        termsNo: number,
        data: GetTermDetailByPostData,
        options?: Options,
    ) => {
        return request.post<GetTermDetailByPostResponse>(`terms/${termsNo}`, {
            json: data,
            headers: {
                version: '1.1',
            },
            ...options,
        });
    },
};

export default terms;
