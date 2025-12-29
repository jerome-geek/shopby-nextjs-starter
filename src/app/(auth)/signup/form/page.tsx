'use client';

import { useSearchParams } from 'next/navigation';
import { RadioGroup } from 'radix-ui';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import MemberJoinField from '@/components/auth/MemberJoinField';
import { Button } from '@/components/ui/button';
import InputField from '@/components/ui/input/field';
import InputFieldContainer from '@/components/ui/input/FieldContainer';
import InputContainer from '@/components/ui/input/InputContainer';
import { InputLabel } from '@/components/ui/input/label';
import { SignupFormType } from '@/schema';
import { css } from '@/styled-system/css';
import { Email, ErrorMessage, Mobile } from '@/components/ui/form';

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
                        <Mobile />
                    </InputFieldContainer>
                </MemberJoinField>

                {/* TODO: 이메일 */}
                <MemberJoinField name="email" label={t('이메일')}>
                    <Email />
                </MemberJoinField>

                {/* TODO: 성별 */}
                {/* <MemberJoinField name="sex" label={t('성별')}> */}
                <Controller
                    name="sex"
                    control={control}
                    render={({ field: { onChange, value, ...rest } }) => {
                        return (
                            <RadioGroup.Root
                                {...rest}
                                value={value}
                                onValueChange={onChange}
                                disabled={!!watch('ci')}
                                className={css({
                                    display: 'flex',
                                    gap: '16px',
                                    fontSize: '1.4rem',
                                })}
                            >
                                <label
                                    className={css({
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                    })}
                                >
                                    <RadioGroup.Item
                                        value="M"
                                        id="M"
                                        className={css({
                                            width: '18px',
                                            height: '18px',
                                            borderRadius: '999',
                                            border: `1px solid gray`,
                                            // backgroundColor: 'white',
                                            // width: '25px',
                                            // height: '25px',
                                            // borderRadius: '100%',
                                            // boxShadow:
                                            //     '0 2px 10px var(--black-a7)',
                                        })}
                                    >
                                        <RadioGroup.Indicator
                                            className={css({
                                                // display: 'flex',
                                                // alignItems: 'center',
                                                // justifyContent: 'center',
                                                // width: '100%',
                                                // height: '100%',
                                                // position: 'relative',
                                                // _after: {
                                                //     content: '""',
                                                //     display: 'block',
                                                //     width: '11px',
                                                //     height: '11px',
                                                //     borderRadius: '50%',
                                                //     backgroundColor:
                                                //         token('colors.black'),
                                                // },
                                                display: 'inline-block',
                                                width: '100%',
                                                height: '100%',
                                                position: 'relative',
                                                border: '6px solid black',
                                                borderRadius: '999',
                                            })}
                                        />
                                    </RadioGroup.Item>

                                    <span
                                    // type={
                                    //     isMobile ? 't13' : 't15'
                                    // }
                                    // style={{
                                    //     color: 'var(--color-gray-700)',
                                    // }}
                                    >
                                        {t('남성')}
                                    </span>
                                </label>
                                <label
                                    className={css({
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                    })}
                                >
                                    <RadioGroup.Item
                                        value="F"
                                        id="F"
                                        className={css({
                                            width: '18px',
                                            height: '18px',
                                            borderRadius: '999',
                                            border: `1px solid gray`,
                                            // backgroundColor: 'white',
                                            // width: '25px',
                                            // height: '25px',
                                            // borderRadius: '100%',
                                            // boxShadow:
                                            //     '0 2px 10px var(--black-a7)',
                                        })}
                                    >
                                        <RadioGroup.Indicator
                                            className={css({
                                                // display: 'flex',
                                                // alignItems: 'center',
                                                // justifyContent: 'center',
                                                // width: '100%',
                                                // height: '100%',
                                                // position: 'relative',
                                                // _after: {
                                                //     content: '""',
                                                //     display: 'block',
                                                //     width: '11px',
                                                //     height: '11px',
                                                //     borderRadius: '50%',
                                                //     backgroundColor:
                                                //         token('colors.black'),
                                                // },
                                                display: 'inline-block',
                                                width: '100%',
                                                height: '100%',
                                                position: 'relative',
                                                border: '6px solid black',
                                                borderRadius: '999',
                                            })}
                                        />
                                    </RadioGroup.Item>
                                    <span
                                    // type={
                                    //     isMobile ? 't13' : 't15'
                                    // }
                                    // style={{
                                    //     color: 'var(--color-gray-700)',
                                    // }}
                                    >
                                        {t('여성')}
                                    </span>
                                </label>
                            </RadioGroup.Root>
                        );
                    }}
                />
                {/* </MemberJoinField> */}

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
