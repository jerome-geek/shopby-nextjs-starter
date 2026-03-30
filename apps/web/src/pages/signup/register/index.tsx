/* eslint-disable @typescript-eslint/no-explicit-any */
import { includes, join, map, pipe, prop } from '@fxts/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { fromError } from 'zod-validation-error';

import { AuthLayout } from '@/components/layout/auth';
import {
    SignupFormAddress,
    SignupFormEmail,
    SignupFormId,
    SignupFormMobile,
    SignupFormName,
    SignupFormNickname,
    SignupFormPassword,
    SignupFormTelephone,
    SignupFormBirthday,
    SignupFormSex,
} from '@/components/signup/form';
import { Button } from '@/components/ui/button';
import { CertificationCheckContext } from '@/context/certificationCheck';
import { useProfileMutation } from '@/hooks/mutations';
import { useSignupInitialize } from '@/hooks/signup';
import { useDialog, useGlobal } from '@/hooks/utils';
import { NcpOpenIdProviderType } from '@/models';
import { NextPageWithLayout } from '@/pages/_app';
import { createSignupFormSchema, SignupFormSchemaType } from '@/schema';
import { useMall } from '@/hooks/query/admin/mall';

import * as styles from '@/pages/signup/register/index.css';

const SignupRegister: NextPageWithLayout = () => {
    const { t } = useTranslation();

    const { openDialog } = useDialog();

    const { countryCd } = useGlobal();

    const { data: mallData } = useMall();
    const router = useRouter();
    const query = router.query;

    const key = query?.key as string;
    const accessToken = query?.accessToken as string;
    const provider = query?.provider as NcpOpenIdProviderType;
    const expiry = Number(query?.expiry) || 0;

    const termsStr = query?.terms as string;
    const terms = (termsStr ? termsStr.split(',') : []) as any;
    const smsAgreed = query?.smsAgreed === 'true';
    const directMailAgreed = query?.directMailAgreed === 'true';

    const isSocialLogin = !!provider;

    console.log('directMailAgreed', directMailAgreed);
    console.log('smsAgreed', smsAgreed);

    const value = useContext(CertificationCheckContext);

    const isAuthenticationByPhone = value?.isAuthenticationByPhone;

    const schema = createSignupFormSchema({ isSocialLogin });

    const methods = useForm<SignupFormSchemaType>({
        resolver: zodResolver(schema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            type: 'personal',
            joinTermsAgreements: terms,
            isRegistrationNoChecked: false,
            isDuplicateMemberId: true,
            isDuplicateEmail: true,
            isDuplicateNickname: true,
            openIdAccessToken: accessToken ?? undefined,
            providerType: provider
                ? (provider
                      .replace('ncp_', '')
                      .replace('-', '_')
                      .toUpperCase() as any)
                : undefined,
            smsAgreed,
            directMailAgreed,
            countryCd,
            isBirthdayRequired: false,
            isNicknameRequired: false,
            isMobileNoRequired: false,
            isTelephoneNoRequired: false,
            isAddressRequired: false,
            isSexRequired: false,
        },
    });

    const {
        reset,
        formState: { isSubmitting },
        handleSubmit,
        watch,
    } = methods;

    console.log(watch());

    const { getSocialData, kcpCertificationResultData } = useSignupInitialize({
        reset,
        accessToken,
        isSocialLogin,
        key,
        provider,
    });

    const formValueDisabled = {
        name: isSocialLogin
            ? !!getSocialData?.memberName
            : isAuthenticationByPhone
            ? !!kcpCertificationResultData?.name
            : false,
        email: isSocialLogin
            ? !includes(provider, ['ncp_apple', 'ncp_google', 'ncp_line']) &&
              !!getSocialData?.email
            : false,
        sex: isSocialLogin
            ? getSocialData?.sex === 'F' || getSocialData?.sex === 'M'
            : isAuthenticationByPhone
            ? !!kcpCertificationResultData?.ci
            : false,
        birthday: isSocialLogin
            ? !!getSocialData?.birthday
            : isAuthenticationByPhone
            ? !!kcpCertificationResultData?.birthday
            : false,
        mobileNo: isSocialLogin
            ? !!getSocialData?.mobileNo
            : isAuthenticationByPhone
            ? !!kcpCertificationResultData?.phone
            : false,
    };

    const {
        register: { mutateAsync: registerMutate },
        openIdRegister: { mutateAsync: openIdRegisterMutate },
    } = useProfileMutation();

    const onSubmit = handleSubmit(async (data) => {
        try {
            console.log('data', data);
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

    if (!mallData) {
        return null;
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit} className={styles.form}>
                {!isSocialLogin && (
                    <>
                        <SignupFormId />

                        <SignupFormPassword />
                    </>
                )}

                <SignupFormName disabled={formValueDisabled.name} />

                <SignupFormEmail disabled={formValueDisabled.email} />

                <SignupFormMobile disabled={formValueDisabled.mobileNo} />

                <SignupFormTelephone />

                <SignupFormAddress />

                <SignupFormNickname />

                <SignupFormBirthday disabled={formValueDisabled.birthday} />

                <SignupFormSex disabled={formValueDisabled.sex} />

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

SignupRegister.getLayout = (page) => (
    <AuthLayout title='회원 정보 입력'>{page}</AuthLayout>
);

export default SignupRegister;
