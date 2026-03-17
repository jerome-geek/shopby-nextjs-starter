import {
    filter,
    includes,
    isEmpty,
    join,
    map,
    pipe,
    prop,
    toArray,
} from '@fxts/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { RadioGroup } from 'radix-ui';
import { ReactElement, useEffect, useRef } from 'react';
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { fromError } from 'zod-validation-error';
import { useSearchParams } from 'next/navigation';

import { Layout } from '@/components/layout';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { NextPageWithLayout } from '@/pages/_app';
import {
    openIdSignupSubmitSchema,
    signupFormSchema,
    signupSubmitSchema,
} from '@/schema';
import { NcpOpenIdProviderType } from '@/models';
import { useProfile } from '@/hooks/query/member/profile';
import { useProfileMutation } from '@/hooks/mutations';
import { profile } from '@/api/member';
import { useDialog } from '@/hooks/utils';
import { Button } from '@/components/ui/button';

const SignupRegister: NextPageWithLayout = () => {
    const { t } = useTranslation();

    const { openDialog } = useDialog();

    const searchParams = useSearchParams();

    const accessToken = searchParams.get('accessToken');
    const provider = searchParams.get('provider') as NcpOpenIdProviderType;
    const expiry = Number(searchParams.get('expiry')) || 0;

    const termsStr = searchParams.get('terms');
    const terms = (termsStr ? termsStr.split(',') : []) as any;
    const smsAgreed = searchParams.get('smsAgreed') === 'true';
    const directMailAgreed = searchParams.get('directMailAgreed') === 'true';

    const isSocialLogin = !!provider;

    const methods = useForm<z.infer<typeof signupFormSchema>>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            type: 'personal',
            isRegistrationNoChecked: false,
            joinTermsAgreements: terms,
            smsAgreed: smsAgreed,
            directMailAgreed: directMailAgreed,
            openIdAccessToken: accessToken ?? undefined,
            providerType: provider
                ? (provider
                      .replace('ncp_', '')
                      .replace('-', '_')
                      .toUpperCase() as any)
                : undefined,
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

    const isBusiness =
        useWatch({
            control,
            name: 'type',
        }) === 'business';

    useEffect(() => {
        if (!getSocialData) {
            return;
        }

        const birthday = getSocialData.birthday?.replace(/-/g, '') ?? '';

        reset((prev) => {
            return {
                ...prev,
                providerType: getSocialData.providerType,
                memberName: getSocialData.memberName || '',
                mobileNo: getSocialData.mobileNo ?? '',
                // NOTE: 애플,라인은 메일정보가 없으며, 구글은 마스킹되서 옴
                email: includes(provider, ['ncp_apple', 'ncp_line'])
                    ? ''
                    : (getSocialData.email ?? ''),
                sex: getSocialData.sex === 'X' ? undefined : getSocialData.sex,
                birthYear: birthday.slice(0, 4),
                birthMonth: birthday.slice(4, 6),
                birthDay: birthday.slice(6, 8),
            };
        });
    }, [getSocialData, provider, reset]);

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
                <input type="submit" />

                <Button
                    type="submit"
                    frame="solid"
                    variant="primary"
                    disabled={isSubmitting}
                >
                    <span>{t('회원가입하기')}</span>
                </Button>
            </form>
        </FormProvider>
    );
};

SignupRegister.getLayout = (page) => {
    return (
        <Layout>
            <AuthLayout>{page}</AuthLayout>
        </Layout>
    );
};

export default SignupRegister;
