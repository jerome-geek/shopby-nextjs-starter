import { type NextRequest, NextResponse } from 'next/server';

import { COOKIE_KEYS } from '@/const/cookieKeys';
import { PATHS } from '@/const/paths';

const GUEST_ONLY_ROUTES: string[] = [
    PATHS.AUTH.LOGIN,
    PATHS.SIGNUP.REGISTER_METHOD,
    PATHS.SIGNUP.TERMS,
];

const PROTECTED_ROUTES: string[] = [
    '/mypage',
    '/recipes/scrap',
    '/recipes/write',
];

/**
 * Edge Runtime에서 실행되는 proxy 함수
 *
 * - next.config.ts의 pageExtensions: ['tsx', 'api.ts'] 설정에 영향을 받기 때문에
 *   .ts가 아닌 .tsx 파일로 작성 (.ts는 proxy 파일로 인식되지 않음)
 */
export function proxy(request: NextRequest) {
    const { pathname, search } = request.nextUrl;

    // [OPTIMIZATION] 정적 자원, API 경로, 또는 확장자가 있는 요청은 미들웨어 로직 스킵
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.') ||
        request.headers.get('next-router-prefetch') ||
        request.headers.get('purpose') === 'prefetch'
    ) {
        return NextResponse.next();
    }

    const accessToken = request.cookies.get(COOKIE_KEYS.ACCESS_TOKEN)?.value;

    const isLoggedIn = !!accessToken;

    const isGuestOnlyRoute = GUEST_ONLY_ROUTES.includes(pathname);
    const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
        pathname.startsWith(route),
    );

    if (isGuestOnlyRoute && isLoggedIn) {
        const response = NextResponse.redirect(
            new URL(PATHS.MAIN, request.url),
        );
        // [IMPORTANT] 뒤로가기 시 캐시된 페이지가 보이는 현상을 방지하기 위해 캐시 제어 헤더 추가
        response.headers.set(
            'Cache-Control',
            'no-store, max-age=0, must-revalidate',
        );
        return response;
    }

    if (isProtectedRoute && !isLoggedIn) {
        const loginUrl = new URL(PATHS.AUTH.LOGIN, request.url);
        loginUrl.searchParams.set('returnUrl', `${pathname}${search}`);
        const response = NextResponse.redirect(loginUrl);
        // 보호된 페이지에서도 로그아웃 후 뒤로가기 시 캐시된 정보가 보이는 것을 방지
        response.headers.set(
            'Cache-Control',
            'no-store, max-age=0, must-revalidate',
        );
        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // [SPECIFIC ROUTES] 미들웨어 로직이 주로 작동하는 경로 (가독성 유지)
        '/login',
        '/signup/register-method',
        '/signup/terms',
        '/member/find-id',
        '/member/find-password',
        '/mypage/:path*',
        '/recipes/scrap',
        '/recipes/write',

        // [GLOBAL OPTIMIZATION] 모든 경로에서 정적 자원 및 Next.js 내부 경로를 Vercel 레벨에서 차단
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|js|css|woff2?|ico)$).*)',
    ],
};
