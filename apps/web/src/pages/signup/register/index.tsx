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
import Seo from '@/shared/components/common/seo';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { fromError } from 'zod-validation-error';

import { oauth2 } from '@/api/auth';
import upload from '@/api/storage/image';
import { AuthLayout } from '@/shared/components/layout';
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
import MemberConfig from '@/components/signup/member-config';
import { Button } from '@/shared/ui/button';
import { PATHS } from '@/const/paths';
import { useProfileMutation } from '@/hooks/mutations';
import { useMyApp } from '@/hooks/myapp';
import { useMall } from '@/hooks/query/admin/mall';
import { useMemberExtraInfo } from '@/hooks/query/member/memberConfig';
import { useSignupInitialize } from '@/hooks/signup';
import { useDialog, useGlobal } from '@/hooks/utils';
import type { NcpOpenIdProviderType } from '@/models';
import { NextPageWithLayout } from '@/pages/_app';
import * as styles from '@/pages/signup/register/index.css';
import { createSignupFormSchema, SignupFormSchemaType } from '@/schema';
import { accessTokenCookie, refreshTokenCookie } from '@/utils/cookie';
import { getSafeQueryString } from '@/utils/query';

type SignupRegisterProps = {
    accessToken: string;
    refreshToken: string;
    provider: NcpOpenIdProviderType | '';
    expiry: number;
    refreshTokenExpiresIn: number;
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
    refreshTokenExpiresIn,
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

    const { syncAppLogin } = useMyApp();

    const { data: mallData } = useMall();

    const { data: memberExtraInfoData } = useMemberExtraInfo();

    const [isNavigating, setIsNavigating] = useState(false);

    const schema = createSignupFormSchema({ isSocialLogin });

    const methods = useForm<SignupFormSchemaType>({
        resolver: zodResolver(schema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            type: 'personal',
            joinTermsAgreements: terms,
            isRegistrationNoChecked: false,
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
            isDuplicateMemberId: true,
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
                setIsNavigating(true);
                await openIdRegisterMutate({
                    data: submitData,
                    accessToken,
                });

                accessTokenCookie.set(accessToken, expiry);
                refreshTokenCookie.set(refreshToken, refreshTokenExpiresIn);

                await syncAppLogin(accessToken, provider);

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

            setIsNavigating(true);

            await registerMutate({
                data: {
                    ...submitData,
                    extraInfo: extraInfoList,
                    memberId,
                    password,
                },
            });

            const { data: oauth2Data } = await oauth2.issueAccessToken({
                memberId,
                password,
                keepLogin: true,
            });

            accessTokenCookie.set(
                oauth2Data.accessToken || '',
                oauth2Data.expiresIn,
            );
            refreshTokenCookie.set(
                oauth2Data.refreshToken || '',
                oauth2Data.refreshTokenExpiresIn,
            );

            await syncAppLogin(oauth2Data.accessToken || '');

            window.location.replace(PATHS.SIGNUP.COMPLETE);
        } catch (error) {
            setIsNavigating(false);

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
            <Seo title='회원 정보 입력' noindex />
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
    const refreshTokenExpiresIn =
        Number(getSafeQueryString(query.refreshTokenExpiresIn)) || 0;

    const termsStr = getSafeQueryString(query.terms);
    const terms = (termsStr ? termsStr.split(',') : []) as any;
    const smsAgreed = query?.smsAgreed === 'true';
    const directMailAgreed = query?.directMailAgreed === 'true';

    const isSocialLogin = !!provider;

    // NOTE : 정상 진입 경로 체크:
    // - 일반 가입: /signup/terms에서 terms query param을 전달
    // - 소셜 가입: provider query param이 존재
    // 두 경우 모두 없으면 URL 직접 접근으로 판단 → 진입점으로 리다이렉트
    const isValidEntry = 'terms' in query || isSocialLogin;

    if (!isValidEntry) {
        return {
            redirect: {
                destination: PATHS.SIGNUP.REGISTER_METHOD,
                permanent: false,
            },
        };
    }

    return {
        props: {
            accessToken,
            refreshToken,
            provider,
            expiry,
            refreshTokenExpiresIn,
            terms,
            smsAgreed,
            directMailAgreed,
            isSocialLogin,
            certificationKey,
        },
    };
};
