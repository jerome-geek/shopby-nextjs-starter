import ky from 'ky';

import {
    logRequest,
    logResponse,
    beforeRetry,
    setTokenHeader,
} from '@/api/core/utils';

const request = ky.create({
    prefixUrl: 'https://shop-api.e-ncp.com/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        version: '1.0',
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID || '',
        platform: 'PC',
        language: 'ko',
        currency: 'KRW',
    },
    hooks: {
        beforeRequest: [logRequest, setTokenHeader], // 요청 전 헤더에 인증 토큰 추가 (setTokenHeader)
        beforeRetry: [beforeRetry], // 재시도 전 토큰 갱신 (handleRefreshToken)
        afterResponse: [logResponse], // 응답 후 에러 처리 (handleError)
    },
    retry: {
        limit: 3, // 재시도 횟수
        statusCodes: [401], // 401 에러일 때 재시도
        methods: ['get'], // 재시도를 적용할 HTTP 메서드
        backoffLimit: 3 * 1000, // 재시도 간격의 최댓값
    },
});

// 토큰 갱신 전용 인스턴스 (훅이 없고 최소한의 설정만 가짐)
export const authRequest = ky.create({
    prefixUrl: 'https://shop-api.e-ncp.com/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        version: '1.0',
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID || '',
        platform: 'PC',
        language: 'ko',
        currency: 'KRW',
    },

    // hooks: { beforeRequest: [setTokenHeader, setRefreshTokenHeader] },
});

export default request;
