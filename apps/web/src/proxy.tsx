import { type NextRequest, NextResponse } from 'next/server';

import { COOKIE_KEYS } from '@/const/cookieKeys';
import { PATHS } from '@/const/paths';

const GUEST_ONLY_ROUTES: string[] = [
    PATHS.AUTH.LOGIN,
    PATHS.SIGNUP.REGISTER_METHOD,
    PATHS.SIGNUP.TERMS,
];

/**
 * Edge Runtime에서 실행되는 proxy 함수
 *
 * - next.config.ts의 pageExtensions: ['tsx', 'api.ts'] 설정에 영향을 받기 때문에
 *   .ts가 아닌 .tsx 파일로 작성 (.ts는 proxy 파일로 인식되지 않음)
 */
export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const accessToken = request.cookies.get(COOKIE_KEYS.ACCESS_TOKEN)?.value;

    const isLoggedIn = !!accessToken;

    const isGuestOnlyRoute = GUEST_ONLY_ROUTES.includes(pathname);

    if (isGuestOnlyRoute && isLoggedIn) {
        return NextResponse.redirect(new URL(PATHS.MAIN, request.url));
    }

    if (!isGuestOnlyRoute && !isLoggedIn) {
        const loginUrl = new URL(PATHS.AUTH.LOGIN, request.url);
        loginUrl.searchParams.set('returnUrl', pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    // NOTE : ⚠️ 반드시 문자열 리터럴로만 작성 (import 상수 사용 시 무한 리다이렉트 발생)
    // NOTE : :path* → 해당 경로의 하위 경로 전체 포함
    matcher: [
        // [AUTH_ONLY] 로그인 상태에서 접근 불가
        '/login',
        '/signup/register-method',
        '/signup/terms',

        // [PROTECTED] 비로그인 상태에서 접근 불가
        '/mypage/:path*',
    ],
};
