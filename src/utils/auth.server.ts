import {
    getTokenFromAppRouter,
    isTokenValidFromAppRouter,
} from '@/api/core/cookie';

/**
 * Server Component에서 로그인 여부 확인
 */
export async function isAuthenticated() {
    return isTokenValidFromAppRouter();
}

/**
 * Server Component에서 토큰 가져오기
 */
export async function getAccessToken() {
    return getTokenFromAppRouter();
}
