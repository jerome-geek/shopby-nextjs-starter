import { cookies } from 'next/headers';
import { cookieTokenManager } from '@/api/core/utils';

/**
 * Server Component에서 로그인 여부 확인
 */
export async function isAuthenticated(): Promise<boolean> {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();
    return cookieTokenManager.isTokenValidFromServer(cookieString);
}

/**
 * Server Component에서 토큰 가져오기
 */
export async function getAccessToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();
    return cookieTokenManager.getTokenFromServer(cookieString);
}


