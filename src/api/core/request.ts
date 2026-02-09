import ky from 'ky';

import { env } from '@/configs/env';
import {
    beforeRetry,
    DEFAULT_API_TIMEOUT,
    logRequest,
    logResponse,
    setTokenHeader,
} from '@/api/core/utils';

// 공통 헤더
const commonHeaders = {
    'Content-Type': 'application/json',
    version: '1.0',
    clientId: env.NEXT_PUBLIC_CLIENT_ID,
    platform: 'PC',
    language: 'ko',
    currency: 'KRW',
};

/**
 * 액세스 토큰이 필요없는 API 호출용 인스턴스
 * - 상품 목록, 카테고리 등 public API에 사용
 */
export const publicRequest = ky.create({
    prefixUrl: env.NEXT_PUBLIC_API_URL,
    timeout: DEFAULT_API_TIMEOUT,
    headers: commonHeaders,
    hooks: {
        beforeRequest: [logRequest],
        afterResponse: [logResponse],
    },
});

/**
 * 인증이 필요한 API 호출용 인스턴스 (클라이언트 사이드)
 * - 쿠키에서 토큰을 자동으로 가져와 헤더에 설정
 * - 401 에러 시 자동 토큰 갱신 및 재시도
 */
export const request = publicRequest.extend({
    hooks: {
        beforeRequest: [logRequest, setTokenHeader],
        beforeRetry: [beforeRetry],
        afterResponse: [logResponse],
    },
    retry: {
        limit: 3,
        statusCodes: [401],
        methods: ['get', 'post', 'put', 'delete'],
        backoffLimit: 3 * 1000,
    },
});

/**
 * 토큰 갱신 전용 인스턴스
 * - beforeRetry에서 사용 (순환 참조 방지)
 */
export const authRequest = ky.create({
    prefixUrl: env.NEXT_PUBLIC_API_URL,
    timeout: 5000,
    headers: commonHeaders,
    hooks: {
        beforeRequest: [logRequest],
        afterResponse: [logResponse],
    },
});

/**
 * getServerSideProps에서 사용할 인증된 요청 생성
 *
 * @example
 * ```ts
 * export async function getServerSideProps(ctx: GetServerSidePropsContext) {
 *   const request = createServerRequest(ctx.req.cookies);
 *   const data = await request.get('profile').json();
 *   return { props: { data } };
 * }
 * ```
 */
export function createServerRequest(cookies: Record<string, string>) {
    const accessToken = cookies['shopby_access_token'];

    return publicRequest.extend({
        headers: accessToken
            ? { 'Shop-By-Authorization': `Bearer ${accessToken}` }
            : {},
    });
}

/**
 * getServerSideProps에서 사용할 토큰 갱신 요청 생성
 */
export function createServerAuthRequest(cookies: Record<string, string>) {
    const accessToken = cookies['shopby_access_token'];
    const refreshToken = cookies['shopby_refresh_token'];

    return authRequest.extend({
        headers: {
            ...(accessToken && {
                'Shop-By-Authorization': `Bearer ${accessToken}`,
            }),
            ...(refreshToken && { 'Refresh-Token': refreshToken }),
        },
    });
}
