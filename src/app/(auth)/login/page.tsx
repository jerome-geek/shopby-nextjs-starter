'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Suspense } from '@suspensive/react';
import { HTTPError, TimeoutError } from 'ky';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { oauth2 } from '@/api/auth';
import { cookieTokenManager } from '@/api/core/cookie';
import { Button } from '@/components/ui/button';
import ErrorMessage from '@/components/ui/form/ErrorMessage';
import InputCheckbox from '@/components/ui/input/Checkbox';
import InputField from '@/components/ui/input/field';
import { InputLabel } from '@/components/ui/input/label';
import { PATHS } from '@/const/paths';
import useDialog from '@/hooks/useDialog';
import { loginFormSchema, LoginFormSchemaType } from '@/schema/login.schema';
import { css } from '@/styled-system/css';
import useSnsLogin from '@/hooks/useSnsLogin';

export default function LoginPage() {
    const { t } = useTranslation();
    const router = useRouter();
    const searchParams = useSearchParams();
    const returnUrl = searchParams.get('returnUrl') || '';

    const { openDialog } = useDialog();

    const methods = useForm<LoginFormSchemaType>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            memberId: '',
            password: '',
            isSaved: true,
        },
    });
    const {
        handleSubmit,
        register,
        control,
        watch,
        formState: { isSubmitting },
    } = methods;

    const { socialLoginList } = useSnsLogin();
    const availableSocialLoginList = socialLoginList.filter(
        ({ isAvailable }) => isAvailable
    );

    const onSubmit = handleSubmit(async ({ memberId, password, isSaved }) => {
        try {
            const data = await oauth2
                .issueAccessToken({
                    memberId,
                    password,
                    keepLogin: true,
                })
                .json();

            cookieTokenManager.setToken({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                expiresIn: data.expiresIn,
                refreshTokenExpiresIn: data.refreshTokenExpiresIn,
            });

            router.push(returnUrl || PATHS.MAIN);
        } catch (error) {
            if (error instanceof HTTPError) {
                // Handle HTTP errors (e.g., 404 Not Found, 401 Unauthorized)
                // const response = error.response;
                // console.error(
                //     `HTTP Error: ${response.status} - ${await response.text()}`
                // );

                const response = await error.response.json();
                console.log('🚀 ~ LoginForm ~ response:', response);
                openDialog({
                    message: response.message,
                });

                // You can also check for specific status codes
                if (response.status === 404) {
                    console.error('User not found.');
                }
            } else if (error instanceof TimeoutError) {
                // Handle request timeouts
                console.error('Request timed out.');
            } else if (error instanceof TypeError) {
                // Handle network errors (e.g., no internet connection, unreachable URL)
                console.error(
                    'Network error or an issue with the request setup.'
                );
            } else {
                // Handle other potential errors
                console.error('An unknown error occurred:', error);
            }
        }
    });

    return (
        <FormProvider {...methods}>
            <div
                className={css({
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
                        {t('로그인')}
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
                        <div
                            className={css({
                                display: 'flex',
                                flexDirection: 'column',
                                gap: { base: '8px' },
                            })}
                        >
                            <InputLabel htmlFor="memberId">
                                {t('아이디')}
                            </InputLabel>
                            <InputField
                                {...register('memberId')}
                                type="text"
                                id="memberId"
                                placeholder={t('아이디를 입력해 주세요')}
                            />
                            <ErrorMessage name="memberId" />
                        </div>

                        {/* 비밀번호 입력 */}
                        <div
                            className={css({
                                display: 'flex',
                                flexDirection: 'column',
                                gap: { base: '8px' },
                            })}
                        >
                            <InputLabel htmlFor="password">
                                {t('비밀번호')}
                            </InputLabel>
                            <InputField
                                {...register('password')}
                                type="password"
                                id="password"
                                placeholder={t('비밀번호를 입력해 주세요')}
                            />
                            <ErrorMessage name="password" />
                        </div>

                        {/* 아이디 저장 체크박스 */}
                        <div
                            className={css({
                                display: 'flex',
                                alignItems: 'center',
                                gap: { base: '8px' },
                            })}
                        >
                            <Controller
                                control={control}
                                name="isSaved"
                                render={({ field }) => {
                                    return (
                                        <InputCheckbox
                                            id="isSaved"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    );
                                }}
                            />
                            <InputLabel isCheckbox htmlFor="isSaved">
                                {t('아이디 저장')}
                            </InputLabel>
                        </div>

                        <div
                            className={css({
                                display: 'flex',
                                flexDirection: 'column',
                                gap: { base: '8px' },
                            })}
                        >
                            <Button
                                type="submit"
                                frame="solid"
                                variant="primary"
                                disabled={isSubmitting}
                            >
                                <span>
                                    {isSubmitting ? '로그인 중...' : '로그인'}
                                </span>
                            </Button>

                            <Button
                                type="button"
                                frame="outlined"
                                variant="primary"
                                onClick={() =>
                                    router.push(PATHS.SIGNUP.REGISTER_METHOD)
                                }
                            >
                                <span>{t('회원가입')}</span>
                            </Button>
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
                            {t('아이디 찾기')}
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
                            {t('비밀번호 찾기')}
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
                            {t('비회원 배송조회')}
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
                        {availableSocialLoginList.map(
                            ({ label, provider, onClick, Icon }) => {
                                return (
                                    <Button
                                        type="button"
                                        frame="solid"
                                        variant={provider}
                                        onClick={() => onClick({ returnUrl })}
                                    >
                                        {Icon && <Icon />}
                                        {label}
                                    </Button>
                                );
                            }
                        )}
                    </div>
                </div>
            </div>
        </FormProvider>
    );
}
