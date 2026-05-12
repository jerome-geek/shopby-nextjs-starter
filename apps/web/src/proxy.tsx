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

const NEXT_DATA_PREFIX = '/_next/data/';
const CACHE_CONTROL_NO_STORE = 'no-store, max-age=0, must-revalidate';

const getPagePathname = (pathname: string) => {
    if (!pathname.startsWith(NEXT_DATA_PREFIX)) {
        return pathname;
    }

    const dataPath = pathname
        .slice(NEXT_DATA_PREFIX.length)
        .replace(/^[^/]+/, '')
        .replace(/\.json$/, '');

    return dataPath === '/index' ? '/' : dataPath;
};

const applyNoStore = (response: NextResponse) => {
    response.headers.set('Cache-Control', CACHE_CONTROL_NO_STORE);
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('x-middleware-cache', 'no-cache');

    return response;
};

/**
 * Edge Runtime에서 실행되는 proxy 함수
 *
 * - next.config.ts의 pageExtensions: ['tsx', 'api.ts'] 설정에 영향을 받기 때문에
 *   .ts가 아닌 .tsx 파일로 작성 (.ts는 proxy 파일로 인식되지 않음)
 */
export async function proxy(request: NextRequest) {
    const { pathname, search } = request.nextUrl;
    const pagePathname = getPagePathname(pathname);
    const isNextDataRequest = pathname.startsWith(NEXT_DATA_PREFIX);
    const isGuestOnlyRoute = GUEST_ONLY_ROUTES.includes(pagePathname);
    const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
        pagePathname.startsWith(route),
    );
    const isPrefetchRequest =
        request.headers.get('next-router-prefetch') ||
        request.headers.get('purpose') === 'prefetch';

    // [OPTIMIZATION] 정적 자원, API 경로, 또는 확장자가 있는 요청은 미들웨어 로직 스킵
    if (
        (pathname.startsWith('/_next') && !isNextDataRequest) ||
        pathname.startsWith('/api') ||
        (pathname.includes('.') && !isNextDataRequest) ||
        (isPrefetchRequest && !isProtectedRoute && !isGuestOnlyRoute)
    ) {
        return NextResponse.next();
    }

    const accessToken = request.cookies.get(COOKIE_KEYS.ACCESS_TOKEN)?.value;

    const isLoggedIn = !!accessToken;

    if (isGuestOnlyRoute && isLoggedIn) {
        const response = NextResponse.redirect(new URL(PATHS.MAIN, request.url));
        // [IMPORTANT] 뒤로가기 시 캐시된 페이지가 보이는 현상을 방지하기 위해 캐시 제어 헤더 추가
        return applyNoStore(response);
    }

    if (isProtectedRoute && !isLoggedIn) {
        const loginUrl = new URL(PATHS.AUTH.LOGIN, request.url);
        loginUrl.searchParams.set('returnUrl', `${pagePathname}${search}`);
        const response = NextResponse.redirect(loginUrl);
        // 보호된 페이지에서도 로그아웃 후 뒤로가기 시 캐시된 정보가 보이는 것을 방지
        return applyNoStore(response);
    }

    if (isProtectedRoute) {
        // 운영 client navigation에서 보호 페이지 data response가 캐시되어
        // 로그아웃 이후에도 화면이 먼저 보이는 것을 방지합니다.
        return applyNoStore(NextResponse.next());
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // [AUTH ROUTES] 인증 상태에 따라 redirect가 필요한 실제 페이지 요청만 proxy를 태웁니다.
        '/login',
        '/signup/register-method',
        '/signup/terms',
        '/mypage/:path*',
        '/recipes/scrap',
        '/recipes/write',

        // [NEXT DATA ROUTES] 운영 client navigation에서 발생하는 page-data 요청만 추가로 보호합니다.
        '/_next/data/:path*/login.json',
        '/_next/data/:path*/signup/register-method.json',
        '/_next/data/:path*/signup/terms.json',
        '/_next/data/:path*/mypage.json',
        '/_next/data/:path*/mypage/:path*.json',
        '/_next/data/:path*/recipes/scrap.json',
        '/_next/data/:path*/recipes/write.json',
    ],
};
