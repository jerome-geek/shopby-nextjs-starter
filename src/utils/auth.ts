import { accessTokenCookie, refreshTokenCookie } from '@/utils/cookie';
import type { CookieCtx } from '@/utils/cookie';

/**
 * 로그인 여부를 쿠키 기반으로 판단합니다.
 *
 * ⚠️  UI 분기 전용입니다. 실제 권한 검증은 서버(API)가 최종 판단합니다.
 *
 * 판단 기준:
 * - accessToken 또는 refreshToken 중 하나라도 존재하면 로그인으로 간주합니다.
 * - accessToken만 확인하지 않는 이유: 토큰이 만료됐더라도 refreshToken으로
 *   무음 갱신이 가능하기 때문에 로그인 상태로 봐야 합니다.
 *
 * @example CSR (컴포넌트 내부)
 * const loggedIn = isLoggedIn();
 * if (loggedIn) { ... }
 *
 * @example SSR (getServerSideProps) — 로그인 필요 페이지 보호
 * export const getServerSideProps = async (ctx) => {
 *   if (!isLoggedIn(ctx)) {
 *     return { redirect: { destination: '/login', permanent: false } };
 *   }
 *   return { props: {} };
 * };
 */
export function isLoggedIn(ctx?: CookieCtx): boolean {
    const access = accessTokenCookie.get(ctx);
    console.log('🚀 ~ isLoggedIn ~ access:', access);
    const refresh = refreshTokenCookie.get(ctx);
    console.log('🚀 ~ isLoggedIn ~ refresh:', refresh);

    if (access || refresh) {
        console.log(
            `[Auth] Logged in detected. Access: ${!!access}, Refresh: ${!!refresh}`,
        );
    }

    return !!(access || refresh);
}
