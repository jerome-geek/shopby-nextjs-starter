'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export default function SignupFormPage() {
    const methods = useForm();

    const searchParams = useSearchParams();
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const provider = searchParams.get('provider');
    const expiry = Number(searchParams.get('expiry')) || 0;

    const isSocialLogin = !!provider;

    const {
        register,
        reset,
        setError,
        setFocus,
        watch,
        getValues,
        control,
        formState: { isSubmitting },
        handleSubmit,
    } = methods;

    console.log('watch');
    console.log(watch());

    useEffect(() => {
        const stored = sessionStorage.getItem('signupTerms');
        if (stored) {
            const { checkedTermList, checkedOptInList } = JSON.parse(stored);
        }
    }, []);

    const onSubmit = handleSubmit((data) => {});

    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
                {!isSocialLogin && (
                    <>
                        {/* <div>
                            <Input.Label isRequired>{t('아이디')}</Input.Label>
                            <Input.FieldContainer>
                                <Input.Field
                                    {...register('memberId')}
                                    type="text"
                                    placeholder={t(
                                        '영어 소문자, 숫자 사용 4~16자리'
                                    )}
                                />
                                <ErrorMessageV2 name="memberId" />
                            </Input.FieldContainer>
                        </div>

                        <div>
                            <Input.Label isRequired>
                                {t('비밀번호')}
                            </Input.Label>
                            <Input.FieldContainer>
                                <Input.Field
                                    {...register('password')}
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder={t(
                                        '영문+숫자+특수문자 조합 8~16자리'
                                    )}
                                />
                                <ErrorMessageV2 name="password" />
                            </Input.FieldContainer>
                        </div>

                        <div>
                            <Input.Label isRequired>
                                {t('비밀번호 확인')}
                            </Input.Label>
                            <Input.FieldContainer>
                                <Input.Field
                                    {...register('passwordConfirm')}
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder={t(
                                        '비밀번호를 한 번 더 입력해 주세요.'
                                    )}
                                />
                                <ErrorMessageV2 name="passwordConfirm" />
                            </Input.FieldContainer>
                        </div> */}
                    </>
                )}
            </form>
        </FormProvider>
    );
}
