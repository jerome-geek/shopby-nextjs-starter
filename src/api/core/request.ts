import ky from 'ky';

const baseRequest = ky.create({
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
        beforeRequest: [], // 요청 전 헤더에 인증 토큰 추가 (setTokenHeader)
        beforeRetry: [], // 재시도 전 토큰 갱신 (handleRefreshToken)
        afterResponse: [], // 응답 후 에러 처리 (handleError)
    },
});

const request = baseRequest.extend({
    timeout: 10 * 1000,
    retry: {
        limit: 3, // 재시도 횟수
        statusCodes: [401], // 401 에러일 때 재시도
        methods: ['get'], // 재시도를 적용할 HTTP 메서드
        backoffLimit: 3 * 1000, // 재시도 간격의 최댓값
    },
});

export default request;
