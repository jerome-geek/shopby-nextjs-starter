import { getCookies, setCookie } from 'cookies-next';
import ky from 'ky';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/api/core/cookie';
import { PATHS } from '@/const/paths';
import { UpdateAccessTokenResponse } from '@/models/auth/oauth2';

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

const checkPublicRoute = (pathname: string) => {
    return publicRoutes.some((route) => {
        if (route === '/') {
            return pathname === '/';
        }
        return pathname === route || pathname.startsWith(`${route}/`);
    });
};

const checkPrivateRoute = (pathname: string) => {
    return protectedRoutes.some((route) => pathname.startsWith(route));
};

export async function proxy(req: NextRequest) {
    const res = NextResponse.next();
    const { pathname } = req.nextUrl;

    // 공개 라우트는 인증 체크 없이 통과
    if (checkPublicRoute(pathname)) {
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Middleware] Public route: ${pathname}`);
        }
        return res;
    }

    // 보호된 라우트 체크 (인증 필요)
    if (checkPrivateRoute(pathname)) {
        const cookies = await getCookies({ res, req });
        console.log('🚀 ~ proxy ~ cookies:', cookies);

        const accessToken = cookies?.[ACCESS_TOKEN_KEY];
        const refreshToken = cookies?.[REFRESH_TOKEN_KEY];

        if (!accessToken) {
            const loginUrl = new URL(PATHS.AUTH.LOGIN, req.url);
            loginUrl.searchParams.set('returnUrl', pathname);

            if (process.env.NODE_ENV === 'development') {
                console.log(
                    `[Middleware] No tokens found for ${pathname}, redirecting to login`,
                );
            }

            return NextResponse.redirect(loginUrl);
        }

        try {
            const updateAccessTokenResponse = await ky
                .put<UpdateAccessTokenResponse>(
                    'https://shop-api.e-ncp.com/oauth2',
                    {
                        headers: {
                            'Shop-By-Authorization': `Bearer ${accessToken}`,
                            'Refresh-Token': refreshToken,
                        },
                    },
                )
                .json();
            console.log(
                '🚀 ~ proxy ~ updateAccessTokenResponse:',
                updateAccessTokenResponse,
            );

            // 토큰 갱신 성공 시
            if (updateAccessTokenResponse?.accessToken) {
                const isProd = process.env.NODE_ENV === 'production';

                await setCookie(
                    ACCESS_TOKEN_KEY,
                    updateAccessTokenResponse.accessToken,
                    {
                        path: '/',
                        httpOnly: isProd,
                        secure: isProd,
                        sameSite: (isProd ? 'strict' : 'lax') as
                            | 'strict'
                            | 'lax',
                    },
                );

                // 토큰 갱신 후 응답
                res.headers.set(
                    ACCESS_TOKEN_KEY,
                    updateAccessTokenResponse.accessToken,
                );
            }
        } catch (error) {
            console.log('🚀 ~ proxy ~ error:', error);
        }
    }

    return res;
}

/**
 * 미들웨어가 실행될 경로 지정
 */
export const config = {
    matcher: [
        /*
         * 다음 경로를 제외한 모든 요청 경로에 매칭:
         * - .map 파일 및 정적 리소스 파일들
         */
        '/((?!api|_next|favicon.ico|installHook|.*\\.(?:svg|png|jpg|jpeg|gif|webp|map)$).*)',
    ],
};
