import { NextResponse } from 'next/server';
import ky from 'ky';
import type { NextRequest } from 'next/server';

import { cookieTokenManager } from '@/api/core/cookie';
import { PATHS } from '@/const/paths';

/**
 * 보호된 라우트 목록
 * 이 경로들로 시작하는 모든 경로는 인증이 필요합니다
 */
const protectedRoutes: string[] = ['/mypage'];

/**
 * 인증이 필요하지 않은 라우트 목록
 * 로그인 페이지 등은 인증 체크를 건너뜁니다
 */
const publicRoutes: string[] = [
    PATHS.AUTH.LOGIN,
    PATHS.MAIN,
    '/signup',
    '/products',
    '/search',
    '/support',
    '/company',
];

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. 공개 라우트 체크 (인증 불필요)
    const isPublicRoute = publicRoutes.some((route) => {
        if (route === '/') {
            return pathname === '/';
        }
        return pathname === route || pathname.startsWith(`${route}/`);
    });

    // 공개 라우트는 인증 체크 없이 통과
    if (isPublicRoute) {
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Middleware] Public route: ${pathname}`);
        }
        return NextResponse.next();
    }

    // 2. 보호된 라우트 체크 (인증 필요)
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (isProtectedRoute) {
        // request.cookies를 직접 사용하여 토큰 확인 (middleware 표준 방식)
        const accessToken = request.cookies.get(
            cookieTokenManager.ACCESS_TOKEN_KEY
        )?.value;
        const refreshToken = request.cookies.get(
            cookieTokenManager.REFRESH_TOKEN_KEY
        )?.value;

        // Case 1: 둘 다 없는 '완전한 미로그인' 상태 -> 로그인 페이지로 리다이렉트
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

        // Case 2: Access Token은 없는데 Refresh Token은 있는 경우 -> Middleware에서 즉시 갱신
        if (!accessToken && refreshToken) {
            if (process.env.NODE_ENV === 'development') {
                console.log(
                    `[Middleware] Access token missing, attempting to refresh for ${pathname}`
                );
            }

            try {
                // 순환 참조 및 전역 hooks와의 간섭을 피하기 위해 ky를 직접 호출 (Pure Instance)
                const data = await ky
                    .put('https://shop-api.e-ncp.com/oauth2', {
                        headers: {
                            'Content-Type': 'application/json',
                            version: '1.0',
                            clientId: process.env.NEXT_PUBLIC_CLIENT_ID || '',
                            platform: 'PC',
                            'Shop-By-Authorization': 'Bearer ',
                            'Refresh-Token': refreshToken,
                        },
                        timeout: 5000,
                    })
                    .json<{
                        accessToken: string;
                        expiresIn: number;
                        refreshToken?: string;
                        refreshTokenExpiresIn: number;
                    }>();

                if (data.accessToken) {
                    const response = NextResponse.next();

                    // 새로운 토큰들을 응답 쿠키에 설정
                    const isProd = process.env.NODE_ENV === 'production';
                    const cookieOptions = {
                        path: '/',
                        secure: isProd,
                        sameSite: (isProd ? 'strict' : 'lax') as
                            | 'strict'
                            | 'lax',
                    };

                    response.cookies.set(
                        cookieTokenManager.ACCESS_TOKEN_KEY,
                        data.accessToken,
                        { ...cookieOptions, maxAge: data.expiresIn }
                    );

                    if (data.refreshToken) {
                        response.cookies.set(
                            cookieTokenManager.REFRESH_TOKEN_KEY,
                            data.refreshToken,
                            {
                                ...cookieOptions,
                                maxAge: data.refreshTokenExpiresIn,
                            }
                        );
                    }

                    if (process.env.NODE_ENV === 'development') {
                        console.log(
                            '🔄 [Middleware] Token refreshed successfully via ky'
                        );
                    }

                    return response;
                } else {
                    throw new Error('No access token in response');
                }
            } catch (error) {
                console.error('❌ [Middleware] Token refresh failed:', error);

                // 갱신 실패 시 모든 쿠키를 삭제하고 로그인 페이지로 강제 이동
                const loginUrl = new URL(PATHS.AUTH.LOGIN, request.url);
                loginUrl.searchParams.set('returnUrl', pathname);
                const response = NextResponse.redirect(loginUrl);

                response.cookies.delete(cookieTokenManager.ACCESS_TOKEN_KEY);
                response.cookies.delete(cookieTokenManager.REFRESH_TOKEN_KEY);

                return response;
            }
        }
    }

    // 3. 응답 생성
    return NextResponse.next();
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
