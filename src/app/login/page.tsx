'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PrimaryButton, SocialButton } from '@/components/ui';
import oauth2Service from '@/api/auth/oauth2';
import { cookieTokenManager } from '@/api/core/utils';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        id: '',
        password: '',
        rememberMe: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        // 에러 메시지 초기화
        if (error) setError(null);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            // 로그인 데이터 준비
            const loginData = {
                memberId: formData.id,
                password: formData.password,
                keepLogin: formData.rememberMe,
            };

            // issueAccessToken API 호출
            const response = await oauth2Service.issueAccessToken(loginData);

            // 응답에서 토큰 추출 (실제 응답 구조에 맞게 조정 필요)
            const { accessToken, refreshToken } = response as {
                accessToken?: string;
                refreshToken?: string;
            };

            if (accessToken && refreshToken) {
                // 토큰을 쿠키에 저장
                cookieTokenManager.setToken(accessToken, 1800); // 30분
                cookieTokenManager.setRefreshToken(
                    refreshToken,
                    formData.rememberMe ? 7776000 : 86400
                ); // 90일 또는 1일

                // 로그인 성공 후 메인 페이지로 이동
                router.push('/');
            } else {
                throw new Error('토큰을 받지 못했습니다.');
            }
        } catch (err: unknown) {
            console.error('Login error:', err);

            // 에러 메시지 설정
            if (
                err &&
                typeof err === 'object' &&
                'response' in err &&
                err.response &&
                typeof err.response === 'object' &&
                'status' in err.response
            ) {
                const status = (err.response as { status: number }).status;
                if (status === 401) {
                    setError('아이디 또는 비밀번호가 올바르지 않습니다.');
                } else if (status === 400) {
                    setError('입력 정보를 확인해주세요.');
                } else {
                    setError(
                        '로그인 중 오류가 발생했습니다. 다시 시도해주세요.'
                    );
                }
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
        } finally {
            setIsLoading(false);
        }
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
                        {/* 에러 메시지 */}
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
                                <p className="text-sm text-red-600 dark:text-red-400 text-center">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* 아이디 입력 */}
                        <div>
                            <input
                                id="id"
                                name="id"
                                type="text"
                                required
                                disabled={isLoading}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
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
                                disabled={isLoading}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
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
                                disabled={isLoading}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                checked={formData.rememberMe}
                                onChange={handleInputChange}
                            />
                            <label
                                htmlFor="rememberMe"
                                className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                            >
                                로그인 상태 유지
                            </label>
                        </div>

                        {/* 로그인 버튼 */}
                        <div>
                            <PrimaryButton
                                type="submit"
                                fullWidth
                                size="lg"
                                disabled={isLoading}
                            >
                                {isLoading ? '로그인 중...' : '로그인'}
                            </PrimaryButton>
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
                        <PrimaryButton type="submit" fullWidth size="lg">
                            주문조회
                        </PrimaryButton>
                    </form>
                </div>

                {/* 간편로그인 섹션 */}
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 mt-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
                        간편로그인
                    </h3>

                    <div className="space-y-3">
                        {/* 카카오 로그인 */}
                        <SocialButton
                            variant="kakao"
                            fullWidth
                            size="lg"
                            onClick={() => handleSocialLogin('kakao')}
                            leftIcon={<span className="text-lg">💬</span>}
                        >
                            카카오아이디로 로그인
                        </SocialButton>

                        {/* 네이버 로그인 */}
                        <SocialButton
                            variant="naver"
                            fullWidth
                            size="lg"
                            onClick={() => handleSocialLogin('naver')}
                            leftIcon={
                                <span className="text-lg font-bold">N</span>
                            }
                        >
                            네이버 아이디로 로그인
                        </SocialButton>

                        {/* 애플 로그인 */}
                        <SocialButton
                            variant="apple"
                            fullWidth
                            size="lg"
                            onClick={() => handleSocialLogin('apple')}
                            leftIcon={<span className="text-lg">🍎</span>}
                        >
                            Apple로 로그인
                        </SocialButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
