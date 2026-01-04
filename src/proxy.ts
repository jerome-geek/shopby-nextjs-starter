import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookieTokenManager, parseCookies } from '@/api/core/cookie';
import { PATHS } from '@/const/paths';

/**
 * 보호된 라우트 목록
 * 이 경로들로 시작하는 모든 경로는 인증이 필요합니다
 */
const protectedRoutes = ['/mypage'];

/**
 * 인증이 필요하지 않은 라우트 목록
 * 로그인 페이지 등은 인증 체크를 건너뜁니다
 */
const publicRoutes = [
    PATHS.AUTH.LOGIN,
    PATHS.MAIN,
    '/signup',
    '/products',
    '/search',
    '/support',
    '/company',
];

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. 공개 라우트 체크 (인증 불필요)
    const isPublicRoute = publicRoutes.some((route) => {
        if (route === '/') {
            return pathname === '/';
        }
        return pathname === route || pathname.startsWith(`${route}/`);
    });
    console.log('🚀 ~ proxy ~ isPublicRoute:', isPublicRoute);

    // 공개 라우트는 인증 체크 없이 통과
    if (isPublicRoute) {
        const response = NextResponse.next();
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Middleware] Public route: ${pathname}`);
        }
        return response;
    }

    // 2. 보호된 라우트 체크 (인증 필요)
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (isProtectedRoute) {
        // 쿠키에서 토큰 확인
        const cookieString = request.cookies.toString();
        const cookies = parseCookies(cookieString);

        // Access Token뿐만 아니라 Refresh Token 존재 여부도 확인
        const accessToken = cookieTokenManager.getTokenFromServer(cookies);
        const refreshToken =
            cookieTokenManager.getRefreshTokenFromServer(cookies);

        // 두 토큰이 모두 없는 '완전한 미로그인' 상태일 때만 로그인 페이지로 리다이렉트
        if (!accessToken && !refreshToken) {
            const loginUrl = new URL(PATHS.AUTH.LOGIN, request.url);
            loginUrl.searchParams.set('returnUrl', pathname);

            if (process.env.NODE_ENV === 'development') {
                console.log(
                    `[Middleware] No tokens found for ${pathname}, redirecting to login`
                );
            }

            return NextResponse.redirect(loginUrl);
        }

        // 토큰이 하나라도 있다면 통과 (만료된 Access Token인 경우 API 레이어의 refreshToken 훅에서 처리됨)
        if (process.env.NODE_ENV === 'development') {
            console.log(
                `[Middleware] Token exists for ${pathname}, allowing access for potential refresh`
            );
        }
    }

    // 3. 응답 생성 (여러 작업을 수행할 수 있음)
    const response = NextResponse.next();

    // 4. 헤더 추가/수정 (예: 요청 ID, 플랫폼 정보 등)
    // response.headers.set('X-Request-ID', crypto.randomUUID());
    // response.headers.set('X-Platform', 'PC');

    // 5. 쿠키 설정 (예: 추적, A/B 테스트 등)
    // response.cookies.set('visitor-id', crypto.randomUUID(), {
    //     maxAge: 60 * 60 * 24 * 365, // 1년
    // });

    // 6. 로깅 (개발 환경에서만)
    if (process.env.NODE_ENV === 'development') {
        console.log(`[Middleware] ${request.method} ${pathname}`);
    }

    return response;
}

/**
 * 미들웨어가 실행될 경로 지정
 */
export const config = {
    matcher: [
        /*
         * 다음 경로를 제외한 모든 요청 경로에 매칭:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public 폴더의 파일들
         */
        // '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
        '/((?!api|_next|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
