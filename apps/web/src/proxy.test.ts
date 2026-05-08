import { NextRequest } from 'next/server';
import { describe, expect, it } from 'vitest';

import { COOKIE_KEYS } from '@/const/cookieKeys';
import { PATHS } from '@/const/paths';
import { proxy } from '@/proxy';

/**
 * 리다이렉트 여부를 판별하는 헬퍼 함수
 */
const isRedirect = (res: Response) =>
    res.status === 307 || res.status === 308 || !!res.headers.get('location');

describe('proxy (미들웨어) 로직 테스트', () => {
    describe('1. 비용 최적화 가드 (Cost Optimization)', () => {
        it('Next.js 내부 정적 자원(_next/static) 요청은 미들웨어 로직을 건너뛰어야 한다', () => {
            const req = new NextRequest(
                new URL('http://localhost/_next/static/chunks/main.js'),
            );
            const res = proxy(req);
            expect(isRedirect(res)).toBeFalsy();
        });

        it('API 경로(/api) 요청은 미들웨어 로직을 건너뛰어야 한다', () => {
            const req = new NextRequest(
                new URL('http://localhost/api/revalidate'),
            );
            const res = proxy(req);
            expect(isRedirect(res)).toBeFalsy();
        });

        it('확장자가 있는 파일(이미지, 파비콘 등) 요청은 미들웨어 로직을 건너뛰어야 한다', () => {
            const req = new NextRequest(
                new URL('http://localhost/favicon.ico'),
            );
            const res = proxy(req);
            expect(isRedirect(res)).toBeFalsy();
        });

        it('Next.js의 Prefetch 요청은 불필요한 연산을 줄이기 위해 미들웨어 로직을 건너뛰어야 한다', () => {
            const req = new NextRequest(new URL('http://localhost/mypage'), {
                headers: { 'next-router-prefetch': '1' },
            });
            const res = proxy(req);
            expect(isRedirect(res)).toBeFalsy();
        });
    });

    describe('2. 사용자 인증 및 리다이렉트 권한 제어', () => {
        it('비로그인 사용자가 보호된 경로(/mypage) 접근 시 로그인 페이지로 리다이렉트해야 한다 (returnUrl 포함)', () => {
            const req = new NextRequest(new URL('http://localhost/mypage'));
            // 쿠키 없음 (로그아웃 상태)

            const res = proxy(req);
            expect(isRedirect(res)).toBeTruthy();
            expect(res.headers.get('location')).toContain(PATHS.AUTH.LOGIN);
            expect(res.headers.get('location')).toContain(
                'returnUrl=%2Fmypage',
            );
        });

        it('이미 로그인한 사용자가 로그인 페이지(/login) 접근 시 메인으로 리다이렉트해야 한다', () => {
            const req = new NextRequest(
                new URL(`http://localhost${PATHS.AUTH.LOGIN}`),
            );
            // 로그인 쿠키 설정
            req.cookies.set(COOKIE_KEYS.ACCESS_TOKEN, 'mock-access-token');

            const res = proxy(req);
            expect(isRedirect(res)).toBeTruthy();
            expect(res.headers.get('location')).toBe('http://localhost/');
        });

        it('비로그인 사용자가 공개된 경로(메인 등) 접근 시 리다이렉트 없이 통과시켜야 한다', () => {
            const req = new NextRequest(new URL('http://localhost/'));
            const res = proxy(req);
            expect(isRedirect(res)).toBeFalsy();
        });

        it('로그인한 사용자가 마이페이지(/mypage) 접근 시 리다이렉트 없이 통과시켜야 한다', () => {
            const req = new NextRequest(new URL('http://localhost/mypage'));
            req.cookies.set(COOKIE_KEYS.ACCESS_TOKEN, 'mock-access-token');

            const res = proxy(req);
            expect(isRedirect(res)).toBeFalsy();
        });
    });

    describe('3. 보안 헤더 및 캐시 제어', () => {
        it('리다이렉트 시 보안을 위해 브라우저 캐시를 방지하는 Cache-Control 헤더가 포함되어야 한다', () => {
            const req = new NextRequest(new URL('http://localhost/mypage'));
            const res = proxy(req);

            expect(res.headers.get('Cache-Control')).toBe(
                'no-store, max-age=0, must-revalidate',
            );
        });
    });
});
