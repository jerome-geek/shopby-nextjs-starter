'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { css } from '@/styled-system/css';
import { loginFormSchema, LoginFormSchemaType } from '@/schema/login.schema';
import { oauth2 } from '@/api/auth';
import { cookieTokenManager } from '@/api/core/utils';
import { PATHS } from '@/const/paths';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const returnUrl = searchParams.get('returnUrl');

    const {
        handleSubmit,
        register,
        control,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormSchemaType>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            memberId: '',
            password: '',
            isSaved: true,
        },
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            const { accessToken, refreshToken } = await oauth2.issueAccessToken(
                {
                    memberId: data.memberId,
                    password: data.password,
                    keepLogin: data.isSaved,
                }
            );

            // 쿠키에 토큰 저장
            // accessToken: 30분 (1800초)
            cookieTokenManager.setToken(accessToken, 1800);
            // refreshToken: keepLogin이 true면 90일, false면 1일
            cookieTokenManager.setRefreshToken(
                refreshToken,
                data.isSaved ? 7776000 : 86400
            );

            router.push(returnUrl || PATHS.MAIN);
        } catch (error) {
            console.error('Login error:', error);
            // 에러 처리 로직 추가 가능
        }
    });

    return (
        <div
            className={css({
                minHeight: '100vh',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingY: 12,
                paddingX: { base: 4, sm: 6, lg: 8 },
            })}
        >
            <div
                className={css({
                    maxWidth: '28rem',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                })}
            >
                {/* 로그인 헤더 */}
                <div className={css({ textAlign: 'center' })}>
                    <h2
                        className={css({
                            fontSize: '3xl',
                            fontWeight: 'bold',
                            color: 'black',
                        })}
                    >
                        로그인
                    </h2>
                </div>

                {/* 로그인 폼 */}
                <div className={css({ backgroundColor: 'white' })}>
                    <form
                        className={css({
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 6,
                        })}
                        onSubmit={onSubmit}
                    >
                        {/* 아이디 입력 */}
                        <div>
                            <label
                                htmlFor="id"
                                className={css({
                                    display: 'block',
                                    fontSize: 'sm',
                                    fontWeight: 'medium',
                                    color: 'black',
                                    marginBottom: 2,
                                })}
                            >
                                아이디
                            </label>
                            <input
                                id="id"
                                type="text"
                                required
                                {...register('memberId')}
                                className={css({
                                    width: '100%',
                                    paddingX: 4,
                                    paddingY: 3,
                                    border: '1px solid',
                                    borderColor: 'gray.300',
                                    borderRadius: 'md',
                                    color: 'black',
                                    backgroundColor: 'white',
                                    _placeholder: {
                                        color: 'gray.500',
                                    },
                                    _focus: {
                                        outline: 'none',
                                        ring: '2px',
                                        ringColor: 'black',
                                        borderColor: 'transparent',
                                    },
                                })}
                                placeholder="아이디를 입력해 주세요."
                            />
                        </div>

                        {/* 비밀번호 입력 */}
                        <div>
                            <label
                                htmlFor="password"
                                className={css({
                                    display: 'block',
                                    fontSize: 'sm',
                                    fontWeight: 'medium',
                                    color: 'black',
                                    marginBottom: 2,
                                })}
                            >
                                비밀번호
                            </label>
                            <input
                                id="password"
                                {...register('password')}
                                type="password"
                                required
                                className={css({
                                    width: '100%',
                                    paddingX: 4,
                                    paddingY: 3,
                                    border: '1px solid',
                                    borderColor: 'gray.300',
                                    borderRadius: 'md',
                                    color: 'black',
                                    backgroundColor: 'white',
                                    _placeholder: {
                                        color: 'gray.500',
                                    },
                                    _focus: {
                                        outline: 'none',
                                        ring: '2px',
                                        ringColor: 'black',
                                        borderColor: 'transparent',
                                    },
                                })}
                                placeholder="비밀번호를 입력해 주세요."
                            />
                        </div>

                        {/* 아이디 저장 체크박스 */}
                        <div
                            className={css({
                                display: 'flex',
                                alignItems: 'center',
                            })}
                        >
                            <input
                                id="rememberMe"
                                type="checkbox"
                                {...register('isSaved')}
                                className={css({
                                    width: 4,
                                    height: 4,
                                    color: 'black',
                                    borderColor: 'gray.300',
                                    borderRadius: 'sm',
                                    _focus: {
                                        ringColor: 'black',
                                    },
                                })}
                            />
                            <label
                                htmlFor="rememberMe"
                                className={css({
                                    marginLeft: 2,
                                    fontSize: 'sm',
                                    color: 'black',
                                })}
                            >
                                아이디 저장
                            </label>
                        </div>

                        {/* 로그인 버튼 */}
                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={css({
                                    width: '100%',
                                    height: 11,
                                    paddingX: 8,
                                    backgroundColor: 'black',
                                    color: 'white',
                                    borderRadius: 'md',
                                    fontWeight: 'medium',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'colors',
                                    _hover: {
                                        backgroundColor: 'gray.800',
                                    },
                                    _disabled: {
                                        opacity: 0.5,
                                        cursor: 'not-allowed',
                                    },
                                })}
                            >
                                {isSubmitting ? '로그인 중...' : '로그인'}
                            </button>
                        </div>

                        {/* 회원가입 버튼 */}
                        <div>
                            <Link href="/signup">
                                <button
                                    type="button"
                                    className={css({
                                        width: '100%',
                                        height: 11,
                                        paddingX: 8,
                                        backgroundColor: 'white',
                                        color: 'black',
                                        border: '1px solid',
                                        borderColor: 'gray.300',
                                        borderRadius: 'md',
                                        fontWeight: 'medium',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'colors',
                                        _hover: {
                                            backgroundColor: 'gray.50',
                                        },
                                    })}
                                >
                                    <span>회원가입</span>
                                    <span
                                        className={css({
                                            fontSize: 'xs',
                                            color: 'red.600',
                                            marginTop: 1,
                                        })}
                                    >
                                        10% 쿠폰 + 2천원 할인받기
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </form>

                    {/* 하단 링크들 */}
                    <div
                        className={css({
                            marginTop: 6,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 2,
                            fontSize: 'sm',
                        })}
                    >
                        <Link
                            href="/find-id"
                            className={css({
                                color: 'gray.600',
                                _hover: {
                                    color: 'black',
                                },
                            })}
                        >
                            아이디 찾기
                        </Link>
                        <span className={css({ color: 'gray.300' })}>|</span>
                        <Link
                            href="/find-password"
                            className={css({
                                color: 'gray.600',
                                _hover: {
                                    color: 'black',
                                },
                            })}
                        >
                            비밀번호 찾기
                        </Link>
                        <span className={css({ color: 'gray.300' })}>|</span>
                        <Link
                            href="/non-member-delivery"
                            className={css({
                                color: 'gray.600',
                                _hover: {
                                    color: 'black',
                                },
                            })}
                        >
                            비회원 배송조회
                        </Link>
                    </div>
                </div>

                {/* 간편로그인 섹션 */}
                <div className={css({ backgroundColor: 'white' })}>
                    <div
                        className={css({
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                        })}
                    >
                        {/* 카카오 로그인 */}
                        <button
                            type="button"
                            className={css({
                                width: '100%',
                                height: 11,
                                paddingX: 8,
                                backgroundColor: '#FEE500',
                                color: 'black',
                                borderRadius: 'md',
                                fontWeight: 'medium',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 2,
                                transition: 'colors',
                                _hover: {
                                    backgroundColor: '#FDD835',
                                },
                            })}
                        >
                            <span
                                className={css({
                                    fontSize: 'lg',
                                    fontWeight: 'bold',
                                })}
                            >
                                💬
                            </span>
                            <span>카카오로 로그인</span>
                        </button>

                        {/* 네이버 로그인 */}
                        <button
                            type="button"
                            className={css({
                                width: '100%',
                                height: 11,
                                paddingX: 8,
                                backgroundColor: '#03C75A',
                                color: 'white',
                                borderRadius: 'md',
                                fontWeight: 'medium',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 2,
                                transition: 'colors',
                                _hover: {
                                    backgroundColor: '#02B350',
                                },
                            })}
                        >
                            <span
                                className={css({
                                    fontSize: 'lg',
                                    fontWeight: 'bold',
                                    color: 'white',
                                })}
                            >
                                N
                            </span>
                            <span>네이버로 로그인</span>
                        </button>

                        {/* 애플 로그인 */}
                        <button
                            type="button"
                            className={css({
                                width: '100%',
                                height: 11,
                                paddingX: 8,
                                backgroundColor: 'white',
                                color: 'black',
                                border: '1px solid',
                                borderColor: 'gray.300',
                                borderRadius: 'md',
                                fontWeight: 'medium',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 2,
                                transition: 'colors',
                                _hover: {
                                    backgroundColor: 'gray.50',
                                },
                            })}
                        >
                            <span
                                className={css({
                                    fontSize: 'lg',
                                    fontWeight: 'bold',
                                })}
                            >
                                🍎
                            </span>
                            <span>Apple로 로그인</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
