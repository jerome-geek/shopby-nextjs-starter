'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import InputField from '@/components/ui/input/field';
import { InputLabel } from '@/components/ui/input/label';
import ErrorMessage from '@/components/ui/form/ErrorMessage';
import { css } from '@/styled-system/css';
import MemberJoinField from '@/components/auth/MemberJoinField';
import { FormMobile } from '@/components/ui/form/Mobile';
import { Button } from '@/components/ui/button';
import InputFieldContainer from '@/components/ui/input/FieldContainer';
import InputContainer from '@/components/ui/input/InputContainer';
import EmailForm from '@/components/ui/form/Email';
// import z from 'zod';
import { SignupFormType } from '@/schema';

export default function SignupFormPage() {
    const { t } = useTranslation();

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
    } = useFormContext<SignupFormType>();

    useEffect(() => {
        const stored = sessionStorage.getItem('signupTerms');
        if (stored) {
            const { checkedTermList, checkedOptInList } = JSON.parse(stored);
        }
    }, []);

    const onSubmit = handleSubmit((data) => {});

    return (
        <div
            className={css({
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: { base: '32px', md: '28px' },
            })}
        >
            <form
                id="signup"
                onSubmit={onSubmit}
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: { base: '24px', md: '32px' },
                    width: '100%',
                })}
            >
                {!isSocialLogin && (
                    <>
                        <InputContainer>
                            <InputLabel isRequired>{t('아이디')}</InputLabel>
                            <InputFieldContainer>
                                <InputField
                                    {...register('memberId')}
                                    type="text"
                                    placeholder={t(
                                        '영어 소문자, 숫자 사용 4~16자리'
                                    )}
                                />
                                <ErrorMessage name="memberId" />
                            </InputFieldContainer>
                        </InputContainer>

                        <InputContainer>
                            <InputLabel isRequired>{t('비밀번호')}</InputLabel>
                            <InputFieldContainer>
                                <InputField
                                    {...register('password')}
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder={t(
                                        '영문+숫자+특수문자 조합 8~16자리'
                                    )}
                                />
                                <ErrorMessage name="password" />
                            </InputFieldContainer>
                        </InputContainer>

                        <InputContainer>
                            <InputLabel isRequired>
                                {t('비밀번호 확인')}
                            </InputLabel>
                            <InputFieldContainer>
                                <InputField
                                    {...register('passwordConfirm')}
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder={t(
                                        '비밀번호를 한 번 더 입력해 주세요.'
                                    )}
                                />
                                <ErrorMessage name="passwordConfirm" />
                            </InputFieldContainer>
                        </InputContainer>
                    </>
                )}

                <MemberJoinField name="memberId" label={t('이름')}>
                    <InputFieldContainer>
                        <InputField
                            {...register('memberId')}
                            type="text"
                            placeholder={t('영어 소문자, 숫자 사용 4~16자리')}
                        />
                        <ErrorMessage name="memberId" />
                    </InputFieldContainer>
                </MemberJoinField>

                {/* TODO: 휴대폰번호 */}
                <MemberJoinField name="mobileNo" label={t('휴대폰번호')}>
                    <InputFieldContainer>
                        <FormMobile />
                    </InputFieldContainer>
                </MemberJoinField>

                {/* TODO: 이메일 */}
                <MemberJoinField name="email" label={t('이메일')}>
                    <EmailForm />
                </MemberJoinField>

                {/* TODO: 성별 */}
                <MemberJoinField name="sex" label={t('성별')}></MemberJoinField>

                {/* TODO: 생년월일 */}
                <MemberJoinField
                    name="birthday"
                    label={t('생년월일')}
                ></MemberJoinField>
            </form>

            <Button
                frame="solid"
                variant="primary"
                form="signup"
                disabled={isSubmitting}
                onClick={onSubmit}
            >
                <span>{t('가입하기')}</span>
            </Button>
        </div>
    );
}
