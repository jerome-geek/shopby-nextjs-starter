/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty, join, map, pipe, prop } from '@fxts/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { fromError } from 'zod-validation-error';
import { useRouter } from 'next/router';

import { profile } from '@/api/member';
import { AuthLayout } from '@/components/layout/auth';
import { Button } from '@/components/ui/button';
import { CertificationCheckContext } from '@/context/certificationCheck';
import { useProfileMutation } from '@/hooks/mutations';
import { useProfile } from '@/hooks/query/member/profile';
import { useDialog } from '@/hooks/utils';
import { NcpOpenIdProviderType } from '@/models';
import { NextPageWithLayout } from '@/pages/_app';
import { signupFormSchema } from '@/schema';

const SignupRegister: NextPageWithLayout = () => {
    const { t } = useTranslation();

    const { openDialog } = useDialog();

    const router = useRouter();
    const query = router.query;

    const accessToken = query?.accessToken as string;
    const provider = query?.provider as NcpOpenIdProviderType;
    const expiry = Number(query?.expiry) || 0;

    const termsStr = query?.terms as string;
    const terms = (termsStr ? termsStr.split(',') : []) as any;
    const smsAgreed = query?.smsAgreed === 'true';
    const directMailAgreed = query?.directMailAgreed === 'true';

    const isSocialLogin = !!provider;

    const value = useContext(CertificationCheckContext);

    const isAuthenticationByPhone = value?.isAuthenticationByPhone;

    const methods = useForm<z.infer<typeof signupFormSchema>>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            type: 'personal',
            joinTermsAgreements: terms,
            isRegistrationNoChecked: false,
            isDuplicateMemberId: true,
            openIdAccessToken: accessToken ?? undefined,
            providerType: provider
                ? (provider
                      .replace('ncp_', '')
                      .replace('-', '_')
                      .toUpperCase() as any)
                : undefined,
            smsAgreed,
            directMailAgreed,
            // countryCd,
            isBirthdayRequired: false,
            isNicknameRequired: false,
            isMobileNoRequired: false,
            isTelephoneNoRequired: false,
            isAddressRequired: false,
            isSexRequired: false,
        },
    });

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

    const { data: getSocialData } = useProfile({
        headers: {
            'Shop-By-Authorization': `Bearer ${accessToken}`,
        },
        options: {
            enabled: isSocialLogin && !isEmpty(accessToken),
        },
    });

    const {
        register: { mutateAsync: registerMutate },
        openIdRegister: { mutateAsync: openIdRegisterMutate },
    } = useProfileMutation();

    const onSubmit = handleSubmit(async (data) => {
        try {
            // TODO: 이메일이 필수값이 되어야함
            const { data: emailCheckData } = await profile.checkDuplicateEmail({
                email: data.email || '',
                memberTypes: 'OPEN_ID',
            });

            if (emailCheckData.exist) {
                setError('email', {
                    message: t('이미 사용중인 이메일입니다.'),
                });
                setFocus('email');
                return;
            }
        } catch (error) {
            if (isAxiosError(error)) {
                const message = isAxiosError(error)
                    ? error.response?.data.message
                    : t(
                          '회원가입에 실패했습니다.<br /> 관리자에게 문의해주세요.',
                      );
                openDialog({
                    message,
                });
            }

            if (error instanceof z.ZodError) {
                const validationError = fromError(error);

                openDialog({
                    message: pipe(
                        validationError,
                        prop('details'),
                        map((a) => a.message),
                        join('<br/>'),
                    ),
                });
            }
        }
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
                <input type='submit' />

                <Button
                    type='submit'
                    frame='solid'
                    variant='primary'
                    disabled={isSubmitting}
                >
                    <span>{t('회원가입하기')}</span>
                </Button>
            </form>
        </FormProvider>
    );
};

SignupRegister.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default SignupRegister;
