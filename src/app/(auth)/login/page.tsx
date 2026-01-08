'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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
import useSnsLogin from '@/hooks/useSnsLogin';
import useApiError from '@/hooks/useApiError';
import { loginFormSchema, LoginFormSchemaType } from '@/schema/login.schema';
import { css } from '@/styled-system/css';

export default function LoginPage() {
    const { t } = useTranslation();
    const router = useRouter();
    const searchParams = useSearchParams();
    const returnUrl = searchParams.get('returnUrl') || '';

    const links = [
        { href: PATHS.MEMBER.FIND_ID, label: '아이디 찾기' },
        { href: PATHS.MEMBER.FIND_PASSWORD, label: '비밀번호 찾기' },
        { href: PATHS.GUEST.LOGIN, label: '비회원 배송조회' },
    ] as const;

    const { handleError } = useApiError();

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
        formState: { isSubmitting },
    } = methods;

    const { socialLoginList } = useSnsLogin();
    const availableSocialLoginList = socialLoginList.filter(
        ({ isAvailable }) => isAvailable,
    );
    const isSocialLoginVisible = availableSocialLoginList.length > 0;

    const onSubmit = handleSubmit(async ({ memberId, password, isSaved }) => {
        try {
            const data = await oauth2
                .issueAccessToken({
                    memberId,
                    password,
                    keepLogin: true,
                })
                .json();

            // TODO: 30분 더 길게 추가
            await cookieTokenManager.setToken({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                expiresIn: data.expiresIn + 1800,
                refreshTokenExpiresIn: data.refreshTokenExpiresIn,
            });

            router.push(returnUrl || PATHS.MAIN);
        } catch (error) {
            handleError(error);
        }
    });

    return (
        <FormProvider {...methods}>
            <div
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '60px',
                })}
            >
                {/* 로그인 폼 */}
                <div
                    className={css({
                        backgroundColor: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: { base: '24px', md: '32px' },
                    })}
                >
                    <form
                        className={css({
                            display: 'flex',
                            flexDirection: 'column',
                            gap: { base: '16px', md: '20px' },
                        })}
                        onSubmit={onSubmit}
                    >
                        {/* 로그인 헤더 */}
                        <h1
                            className={css({
                                fontSize: '3xl',
                                fontWeight: 'bold',
                                color: 'black',
                            })}
                        >
                            {t('로그인')}
                        </h1>

                        {/* 아이디 입력 */}
                        <div
                            className={css({
                                display: 'flex',
                                flexDirection: 'column',
                                gap: { base: '8px' },
                            })}
                        >
                            <InputLabel htmlFor='memberId'>
                                {t('아이디')}
                            </InputLabel>
                            <InputField
                                {...register('memberId')}
                                type='text'
                                id='memberId'
                                placeholder={t('아이디를 입력해 주세요')}
                            />
                            <ErrorMessage name='memberId' />
                        </div>

                        {/* 비밀번호 입력 */}
                        <div
                            className={css({
                                display: 'flex',
                                flexDirection: 'column',
                                gap: { base: '8px' },
                            })}
                        >
                            <InputLabel htmlFor='password'>
                                {t('비밀번호')}
                            </InputLabel>
                            <InputField
                                {...register('password')}
                                type='password'
                                id='password'
                                placeholder={t('비밀번호를 입력해 주세요')}
                            />
                            <ErrorMessage name='password' />
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
                                name='isSaved'
                                render={({ field }) => {
                                    return (
                                        <InputCheckbox
                                            id='isSaved'
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    );
                                }}
                            />
                            <InputLabel isCheckbox htmlFor='isSaved'>
                                {t('아이디 저장')}
                            </InputLabel>
                        </div>

                        {/* 버튼 컨테이너 */}
                        <div
                            className={css({
                                display: 'flex',
                                flexDirection: 'column',
                                gap: { base: '8px' },
                            })}
                        >
                            <Button
                                type='submit'
                                frame='solid'
                                variant='primary'
                                disabled={isSubmitting}
                            >
                                <span>
                                    {isSubmitting ? '로그인 중...' : '로그인'}
                                </span>
                            </Button>

                            <Button
                                type='button'
                                frame='outlined'
                                variant='primary'
                                onClick={() =>
                                    router.push(PATHS.SIGNUP.REGISTER_METHOD)
                                }
                            >
                                <span>{t('회원가입')}</span>
                            </Button>
                        </div>
                    </form>

                    <ul
                        className={css({
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '16px',
                            fontSize: 'sm',
                            padding: 0,
                            margin: 0,
                            '& > li:not(:last-child)': {
                                _after: {
                                    content: '""',
                                    position: 'absolute',
                                    right: '-8.5px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    width: '1px',
                                    height: { base: '10px', md: '12px' },
                                    backgroundColor: 'gray.400',
                                },
                            },
                        })}
                    >
                        {links.map(({ href, label }) => (
                            <li
                                key={href}
                                className={css({
                                    position: 'relative',
                                })}
                            >
                                <Link
                                    href={href}
                                    className={css({
                                        color: 'gray.600',
                                        _hover: {
                                            color: 'black',
                                        },
                                    })}
                                >
                                    {t(label)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 간편로그인 섹션 */}
                {isSocialLoginVisible && (
                    <ul
                        className={css({
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                        })}
                    >
                        {availableSocialLoginList.map(
                            ({ label, provider, onClick, Icon }) => {
                                return (
                                    <li key={`social-login-button-${provider}`}>
                                        <Button
                                            type='button'
                                            frame='solid'
                                            variant={provider}
                                            onClick={() =>
                                                onClick({ returnUrl })
                                            }
                                        >
                                            {Icon && <Icon />}
                                            <span>{label}</span>
                                        </Button>
                                    </li>
                                );
                            },
                        )}
                    </ul>
                )}
            </div>
        </FormProvider>
    );
}
