import type { AxiosRequestConfig } from 'axios';
import qs from 'qs';

import { shopbyRequest } from '@/api/core/request';
import {
    GetAccumulationsParams,
    GetAccumulationsResponse,
    GetAccumulationSummaryParams,
    GetAccumulationSummaryResponse,
    GetExpectAccumulationResponse,
    GetExpirationAccumulationListParams,
    GetExpirationAccumulationListResponse,
} from '@/models/manage/accumulation';

const accumulation = {
    /**
     * 적립금 이력 조회하기
     *  - 적립금 이력을 전체 검색하는 API 입니다
     */
    getAccumulations: (
        params?: GetAccumulationsParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetAccumulationsResponse>({
            method: 'GET',
            url: '/profile/accumulations',
            params,
            ...options,
        });
    },

    /**
     * 만료 예정 적립금 조회하기
     * - 만료 예정 적립금을 조회하는 API 입니다.
     */
    getExpirationAccumulations: (
        params?: GetExpirationAccumulationListParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetExpirationAccumulationListResponse>({
            method: 'GET',
            url: '/profile/accumulations/expiration',
            params,
            ...options,
        });
    },

    /**
     * 적립금 요약 조회하기
     *  - 적립금 요약정보를 조회하는 API 입니다
     */
    getAccumulationSummary: (
        params?: GetAccumulationSummaryParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetAccumulationSummaryResponse>({
            method: 'GET',
            url: '/profile/accumulations/summary',
            params,
            ...options,
        });
    },

    /**
     * 해당 회원의 예상 적립금 조회하기
     *  - 해당 회원의 예상 적립금(적립대기)을 조회하는 API 입니다
     */
    getExpectAccumulation: (options?: AxiosRequestConfig) => {
        return shopbyRequest<GetExpectAccumulationResponse>({
            method: 'GET',
            url: '/profile/accumulations/waiting',
            ...options,
        });
    },
};

export default accumulation;
