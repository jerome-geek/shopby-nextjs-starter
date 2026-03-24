import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { oauth2 } from '@/api/auth';
import SocialLoginList from '@/components/auth/social-login-list';
import { AuthLayout } from '@/components/layout/auth';
import { Button } from '@/components/ui/button';
import ErrorMessage from '@/components/ui/form/ErrorMessage';
import InputCheckbox from '@/components/ui/input/Checkbox';
import InputField from '@/components/ui/input/field';
import { InputLabel } from '@/components/ui/input/label';
import { PATHS } from '@/const/paths';
import useApiError from '@/hooks/useApiError';
import { NextPageWithLayout } from '@/pages/_app';
import { loginFormSchema, LoginFormSchemaType } from '@/schema/login.schema';
import * as styles from '@/styles/pages/login.css';
import { accessTokenCookie, refreshTokenCookie } from '@/utils/cookie';
import InputContainer from '@/components/ui/input/InputContainer';

const LoginPage: NextPageWithLayout = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const returnUrl = (router.query.returnUrl as string) || '';

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

    const onSubmit = handleSubmit(async ({ memberId, password, isSaved }) => {
        try {
            const data = await oauth2.issueAccessToken({
                memberId,
                password,
                keepLogin: true,
            });

            const accessToken = data.data?.accessToken;
            const accessTokenExpiresIn = data.data?.expiresIn;
            const refreshToken = data.data?.refreshToken;
            const refreshTokenExpiresIn = data.data?.refreshTokenExpiresIn;

            if (accessToken && refreshToken) {
                accessTokenCookie.set(accessToken, accessTokenExpiresIn);
                refreshTokenCookie.set(refreshToken, refreshTokenExpiresIn);

                location.replace(returnUrl || PATHS.MAIN);
                return;
            }

            throw new Error(t('로그인 실패하였습니다.'));
        } catch (error) {
            handleError(error);
        }
    });

    return (
        <FormProvider {...methods}>
            {/* 로그인 폼 */}
            <div className={styles.container}>
                <div className={styles.loginFormSection}>
                    <form className={styles.form} onSubmit={onSubmit}>
                        <div className={styles.inputGroupContainer}>
                            {/* 아이디 입력 */}
                            <InputContainer>
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
                            </InputContainer>

                            {/* 비밀번호 입력 */}
                            <InputContainer>
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
                            </InputContainer>

                            {/* 아이디 저장 체크박스 */}
                            <div className={styles.checkboxGroup}>
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
                        </div>

                        {/* 버튼 컨테이너 */}
                        <div className={styles.buttonContainer}>
                            <Button
                                type='submit'
                                frame='solid'
                                variant='primary'
                                disabled={isSubmitting}
                            >
                                <span>
                                    {isSubmitting
                                        ? t('로그인 중...')
                                        : t('로그인')}
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

                    <ul className={styles.linkList}>
                        {links.map(({ href, label }) => (
                            <li key={href} className={styles.linkItem}>
                                <Link
                                    href={href}
                                    prefetch={false}
                                    className={styles.link}
                                >
                                    {t(label)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <SocialLoginList />
            </div>
        </FormProvider>
    );
};

LoginPage.getLayout = (page) => <AuthLayout title='로그인'>{page}</AuthLayout>;

export default LoginPage;
