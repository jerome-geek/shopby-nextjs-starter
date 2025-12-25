import { cookies } from 'next/headers';
import { cookieTokenManager, parseCookies } from '@/api/core/cookie';

/**
 * Server Component에서 로그인 여부 확인
 */
export async function isAuthenticated(): Promise<boolean> {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();
    const parsedCookies = parseCookies(cookieString);
    return cookieTokenManager.isTokenValidFromServer(parsedCookies);
}

/**
 * Server Component에서 토큰 가져오기
 */
export async function getAccessToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();
    const parsedCookies = parseCookies(cookieString);
    return cookieTokenManager.getTokenFromServer(parsedCookies);
}
