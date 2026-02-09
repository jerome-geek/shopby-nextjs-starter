import type { Options } from 'ky';
import qs from 'qs';

import { request } from '@/api/core/request';
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
    getAccumulations: (params?: GetAccumulationsParams, options?: Options) => {
        return request.get<GetAccumulationsResponse>('profile/accumulations', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 만료 예정 적립금 조회하기
     * - 만료 예정 적립금을 조회하는 API 입니다.
     */
    getExpirationAccumulations: (
        params?: GetExpirationAccumulationListParams,
        options?: Options,
    ) => {
        return request.get<GetExpirationAccumulationListResponse>(
            'profile/accumulations/expiration',
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            },
        );
    },

    /**
     * 적립금 요약 조회하기
     *  - 적립금 요약정보를 조회하는 API 입니다
     */
    getAccumulationSummary: (
        params?: GetAccumulationSummaryParams,
        options?: Options,
    ) => {
        return request.get<GetAccumulationSummaryResponse>(
            'profile/accumulations/summary',
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            },
        );
    },

    /**
     * 해당 회원의 예상 적립금 조회하기
     *  - 해당 회원의 예상 적립금(적립대기)을 조회하는 API 입니다
     */
    getExpectAccumulation: (options?: Options) => {
        return request.get<GetExpectAccumulationResponse>(
            'profile/accumulations/waiting',
            {
                ...options,
            },
        );
    },
};

export default accumulation;
