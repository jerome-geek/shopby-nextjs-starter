'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cookieTokenManager } from '@/api/core/utils';
import oauth2Service from '@/api/auth/oauth2';

export default function Header() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 컴포넌트 마운트 시 로그인 상태 체크
        checkLoginStatus();
    }, []);

    const checkLoginStatus = () => {
        const token = cookieTokenManager.getToken();
        const isValid = cookieTokenManager.isTokenValid();
        const isExpired = cookieTokenManager.isTokenExpired();

        console.log('Header - Login Status Check:', {
            token: token ? `${token.substring(0, 10)}...` : null,
            isValid,
            isExpired,
            allCookies: document.cookie,
        });

        setIsLoggedIn(isValid);
        setIsLoading(false);
    };

    const handleLogout = async () => {
        try {
            setIsLoading(true);

            // 로그아웃 API 호출
            await oauth2Service.deleteAccessToken();

            // 쿠키에서 토큰 제거
            cookieTokenManager.clearTokens();

            // 로그인 상태 업데이트
            setIsLoggedIn(false);

            // 홈페이지로 이동
            router.push('/');
        } catch (error) {
            console.error('Logout error:', error);
            // 에러가 발생해도 로컬 토큰은 제거
            cookieTokenManager.clearTokens();
            setIsLoggedIn(false);
            router.push('/');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <header className="w-full border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 py-4">
                <nav className="flex items-center justify-between">
                    <Link
                        href="/"
                        className="text-xl font-bold hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        min's mall
                    </Link>
                    <div className="hidden md:flex space-x-6">
                        <Link
                            href="/"
                            className="hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            Home
                        </Link>
                        <Link
                            href="/products"
                            className="hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            Products
                        </Link>
                        <Link
                            href="/about"
                            className="hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            Contact
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {/* 데스크톱 메뉴 */}
                        <div className="hidden md:flex items-center space-x-4">
                            {isLoggedIn && (
                                <Link
                                    href="/mypage"
                                    className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                                >
                                    마이페이지
                                </Link>
                            )}

                            {!isLoading &&
                                (isLoggedIn ? (
                                    <button
                                        onClick={handleLogout}
                                        disabled={isLoading}
                                        className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading
                                            ? '로그아웃 중...'
                                            : '로그아웃'}
                                    </button>
                                ) : (
                                    <Link
                                        href="/login"
                                        className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                                    >
                                        로그인
                                    </Link>
                                ))}

                            <Link
                                href="/cart"
                                className="relative text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l1.5 1.5M13 19a1 1 0 11-2 0 1 1 0 012 0zM21 19a1 1 0 11-2 0 1 1 0 012 0z"
                                    />
                                </svg>
                                {/* 장바구니 아이템 수 표시 (예시) */}
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    0
                                </span>
                            </Link>
                        </div>

                        {/* 모바일 메뉴 버튼 */}
                        <button className="md:hidden">☰</button>
                    </div>
                </nav>
            </div>
        </header>
    );
}
