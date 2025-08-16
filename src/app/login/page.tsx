'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        id: '',
        password: '',
        rememberMe: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // 로그인 로직은 나중에 구현
        console.log('Login attempt:', formData);
    };

    const handleSocialLogin = (provider: string) => {
        // SNS 로그인 로직은 나중에 구현
        console.log(`${provider} login clicked`);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* 로그인 헤더 */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        로그인
                    </h2>
                </div>

                {/* 로그인 폼 */}
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        {/* 아이디 입력 */}
                        <div>
                            <input
                                id="id"
                                name="id"
                                type="text"
                                required
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="아이디"
                                value={formData.id}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* 비밀번호 입력 */}
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="비밀번호"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* 아이디 저장 체크박스 */}
                        <div className="flex items-center">
                            <input
                                id="rememberMe"
                                name="rememberMe"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                checked={formData.rememberMe}
                                onChange={handleInputChange}
                            />
                            <label
                                htmlFor="rememberMe"
                                className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                            >
                                아이디 저장
                            </label>
                        </div>

                        {/* 로그인 버튼 */}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                로그인
                            </button>
                        </div>
                    </form>

                    {/* 하단 링크들 */}
                    <div className="mt-6 flex justify-center space-x-4 text-sm">
                        <Link
                            href="/find-id"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                        >
                            아이디찾기
                        </Link>
                        <span className="text-gray-300 dark:text-gray-600">
                            |
                        </span>
                        <Link
                            href="/find-password"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                        >
                            비밀번호찾기
                        </Link>
                        <span className="text-gray-300 dark:text-gray-600">
                            |
                        </span>
                        <Link
                            href="/signup"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                        >
                            회원가입
                        </Link>
                    </div>
                </div>

                {/* 비회원 주문조회 섹션 */}
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 mt-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
                        비회원 주문조회 하기
                    </h3>

                    <form className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="주문번호 입력"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="주문번호 비밀번호 입력"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        >
                            주문조회
                        </button>
                    </form>
                </div>

                {/* 간편로그인 섹션 */}
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 mt-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
                        간편로그인
                    </h3>

                    <div className="space-y-3">
                        {/* 카카오 로그인 */}
                        <button
                            onClick={() => handleSocialLogin('kakao')}
                            className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
                        >
                            <span className="mr-2 text-lg">💬</span>
                            카카오아이디로 로그인
                        </button>

                        {/* 네이버 로그인 */}
                        <button
                            onClick={() => handleSocialLogin('naver')}
                            className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                        >
                            <span className="mr-2 text-lg">N</span>
                            네이버 아이디로 로그인
                        </button>

                        {/* 애플 로그인 */}
                        <button
                            onClick={() => handleSocialLogin('apple')}
                            className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                        >
                            <span className="mr-2 text-lg">🍎</span>
                            Apple로 로그인
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
