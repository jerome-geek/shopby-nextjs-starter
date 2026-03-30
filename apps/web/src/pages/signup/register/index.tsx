/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    filter,
    find,
    isEmpty,
    join,
    map,
    pipe,
    prop,
    toArray,
} from '@fxts/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { fromError } from 'zod-validation-error';

import { oauth2 } from '@/api/auth';
import upload from '@/api/storage/image';
import { AuthLayout } from '@/components/layout/auth';
import {
    SignupFormAddress,
    SignupFormBirthday,
    SignupFormEmail,
    SignupFormId,
    SignupFormMobile,
    SignupFormName,
    SignupFormNickname,
    SignupFormPassword,
    SignupFormSex,
    SignupFormTelephone,
} from '@/components/signup/form';
import { Button } from '@/components/ui/button';
import { PATHS } from '@/const/paths';
import { useProfileMutation } from '@/hooks/mutations';
import { useMyApp } from '@/hooks/myapp';
import { useMall } from '@/hooks/query/admin/mall';
import { useSignupInitialize } from '@/hooks/signup';
import { useDialog, useGlobal } from '@/hooks/utils';
import { NcpOpenIdProviderType } from '@/models';
import { NextPageWithLayout } from '@/pages/_app';
import { createSignupFormSchema, SignupFormSchemaType } from '@/schema';
import { accessTokenCookie, refreshTokenCookie } from '@/utils/cookie';
import { getSafeQueryString } from '@/utils/query';
import { useMemberExtraInfo } from '@/hooks/query/member/memberConfig';
import MemberConfig from '@/components/signup/member-config';
import * as styles from '@/pages/signup/register/index.css';

type SignupRegisterProps = {
    accessToken: string;
    refreshToken: string;
    provider: NcpOpenIdProviderType | '';
    expiry: number;
    terms: any;
    smsAgreed: boolean;
    directMailAgreed: boolean;
    isSocialLogin: boolean;
    certificationKey: string;
};

const SignupRegister: NextPageWithLayout<SignupRegisterProps> = ({
    accessToken,
    provider,
    refreshToken,
    terms,
    smsAgreed,
    directMailAgreed,
    isSocialLogin,
    certificationKey,
    expiry,
}) => {
    const { t } = useTranslation();

    const { openDialog } = useDialog();

    const router = useRouter();

    const { countryCd, isKorean, isJapan } = useGlobal();

    const { isMyApp } = useMyApp();

    const { data: mallData } = useMall();

    const { data: memberExtraInfoData } = useMemberExtraInfo();

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
        setError,
        handleSubmit,
    } = methods;

    const { formValueDisabled } = useSignupInitialize({
        reset,
        accessToken,
        isSocialLogin,
        key: certificationKey,
        provider: provider as NcpOpenIdProviderType,
    });

    const {
        register: { mutateAsync: registerMutate, isPending: isRegisterPending },
        openIdRegister: {
            mutateAsync: openIdRegisterMutate,
            isPending: isOpenIdRegisterPending,
        },
    } = useProfileMutation();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const submitData = schema.parse({
                ...data,
                memberName: isKorean
                    ? data.memberName
                    : isJapan
                    ? `${data.lastName}${data.firstName}`
                    : `${data.firstName}${data.lastName}`,
                passwordConfirm: isSocialLogin
                    ? undefined
                    : data.passwordConfirm,
                extraInfo: data.extraInfo,
            });

            if (isSocialLogin) {
                await openIdRegisterMutate({
                    data: submitData,
                    accessToken,
                });

                if (isMyApp) {
                    router.replace(PATHS.SIGNUP.COMPLETE);
                    return;
                }

                accessTokenCookie.set(accessToken, expiry);
                refreshTokenCookie.set(refreshToken, expiry * 1000);

                window.location.replace(PATHS.SIGNUP.COMPLETE);
                return;
            }

            // NOTE: 추가 정보 필수 항목 여부 체크
            const missingRequiredExtraInfo = pipe(
                memberExtraInfoData?.extraInfoContents ?? [],
                filter((item) => {
                    if (item.status !== 'REQUIRED') {
                        return false;
                    }

                    const filledExtraInfo = find(
                        (e) => e.extraInfoNo === item.extraInfoNo,
                        Object.values(submitData.extraInfo ?? {}),
                    );

                    if (!filledExtraInfo) {
                        return true;
                    }

                    if (item.extraInfoType === 'TEXTBOX') {
                        return !filledExtraInfo.extraInfoOptionTextContent;
                    }

                    if (item.extraInfoType === 'IMAGE') {
                        return !filledExtraInfo.extraFileInfo;
                    }

                    if (
                        item.extraInfoType === 'CHECKBOX' ||
                        item.extraInfoType === 'DROPDOWN' ||
                        item.extraInfoType === 'RADIOBUTTON'
                    ) {
                        return !filledExtraInfo.extraInfoOptionNos?.length;
                    }

                    return false;
                }),
                toArray,
            );

            if (missingRequiredExtraInfo.length) {
                missingRequiredExtraInfo.forEach((item) => {
                    setError(`extraInfo.no_${item.extraInfoNo}`, {
                        type: 'required',
                        message: t('{{extraInfoName}}을(를) 입력해 주세요.', {
                            extraInfoName: item.extraInfoName,
                        }),
                    });
                });
                return;
            }

            const memberId = submitData.memberId ?? '';
            const password = submitData.password ?? '';

            const extraInfoList = submitData.extraInfo
                ? (
                      await Promise.all(
                          Object.values(submitData.extraInfo).map(async (v) => {
                              if (v.extraFileInfo) {
                                  try {
                                      const formData = new FormData();
                                      formData.append('file', v.extraFileInfo);

                                      const { data: imageData } =
                                          await upload.uploadImage({
                                              data: formData,
                                          });

                                      return {
                                          extraInfoNo: v.extraInfoNo,
                                          extraInfoOptionNos:
                                              v.extraInfoOptionNos,
                                          extraInfoOptionTextContent:
                                              imageData.imageUrl,
                                      };
                                  } catch (error) {
                                      return null;
                                  }
                              }

                              return {
                                  extraInfoNo: v.extraInfoNo,
                                  extraInfoOptionNos: v.extraInfoOptionNos,
                                  extraInfoOptionTextContent:
                                      v.extraInfoOptionTextContent,
                              };
                          }),
                      )
                  ).filter((v) => v !== null)
                : undefined;

            await registerMutate(
                {
                    data: {
                        ...submitData,
                        extraInfo: extraInfoList,
                        memberId,
                        password,
                    },
                },
                {
                    onSuccess: async () => {
                        if (isMyApp) {
                            router.replace(PATHS.SIGNUP.COMPLETE);
                            return;
                        }

                        const { data } = await oauth2.issueAccessToken({
                            memberId,
                            password,
                            keepLogin: true,
                        });

                        accessTokenCookie.set(
                            data.accessToken || '',
                            data.expiresIn,
                        );
                        refreshTokenCookie.set(
                            data.refreshToken || '',
                            data.refreshTokenExpiresIn,
                        );

                        window.location.replace(PATHS.SIGNUP.COMPLETE);
                    },
                },
            );
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

                {!isSocialLogin &&
                    !isEmpty(memberExtraInfoData?.extraInfoContents) && (
                        <div className={styles.memberConfigContainer}>
                            <h2 className={styles.memberConfigTitle}>
                                {t('추가항목 입력')}
                            </h2>

                            {memberExtraInfoData?.extraInfoContents?.map(
                                (extraInfo) => (
                                    <MemberConfig
                                        key={extraInfo.extraInfoNo}
                                        {...extraInfo}
                                    />
                                ),
                            )}
                        </div>
                    )}

                <Button
                    type='submit'
                    frame='solid'
                    variant='primary'
                    disabled={
                        isSubmitting ||
                        isRegisterPending ||
                        isOpenIdRegisterPending
                    }
                    style={{
                        marginTop: '32px',
                    }}
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

export const getServerSideProps: GetServerSideProps<
    SignupRegisterProps
> = async (context) => {
    const query = context.query;

    const certificationKey = getSafeQueryString(query.key);
    const accessToken = getSafeQueryString(query.accessToken);
    const provider = getSafeQueryString(query.provider) as
        | NcpOpenIdProviderType
        | '';
    const refreshToken = getSafeQueryString(query.refreshToken);
    const expiry = Number(getSafeQueryString(query.expiry)) || 0;

    const termsStr = getSafeQueryString(query.terms);
    const terms = (termsStr ? termsStr.split(',') : []) as any;
    const smsAgreed = query?.smsAgreed === 'true';
    const directMailAgreed = query?.directMailAgreed === 'true';

    const isSocialLogin = !!provider;

    return {
        props: {
            accessToken,
            refreshToken,
            provider,
            expiry,
            terms,
            smsAgreed,
            directMailAgreed,
            isSocialLogin,
            certificationKey,
        },
    };
};
