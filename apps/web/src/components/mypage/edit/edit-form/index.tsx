import { filter, find, isEmpty, isNull, pipe, toArray } from '@fxts/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { overlay } from 'overlay-kit';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { profile } from '@/api/member';
import upload from '@/api/storage/image';
import { WithdrawalBottomSheet } from '@/components/bottom-sheet/withdrawal';
import WithMemberJoinConfig from '@/components/hoc/with-member-join-config';
import { WithdrawalModal } from '@/components/modal/withdrawal';
import * as formStyles from '@/components/mypage/common/mypage-form/index.css';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import { ChangePassword } from '@/components/mypage/edit/edit-form/change-password';
import { TermCheckList } from '@/components/mypage/edit/edit-form/term-check-list';
import {
    SignupFormAddress,
    SignupFormBirthday,
    SignupFormEmail,
    SignupFormMobile,
    SignupFormName,
    SignupFormNickname,
    SignupFormSex,
    SignupFormTelephone,
} from '@/components/signup/form';
import * as signupFormStyles from '@/components/signup/form/index.css';
import MemberConfig from '@/components/signup/member-config';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/input';
import { PATHS } from '@/const/paths';
import { CertificationCheckContext } from '@/context/certificationCheck';
import { useEditInitialize } from '@/hooks/edit';
import useProfileMutation from '@/hooks/mutations/useProfileMutation';
import { useMyApp } from '@/hooks/myapp';
import { useMemberExtraInfo } from '@/hooks/query/member/memberConfig';
import { profileKeys } from '@/hooks/queryKeys';
import { useProfile } from '@/hooks/suspenseQuery/member/profile';
import { useToast } from '@/hooks/ui/useToast';
import useApiError from '@/hooks/useApiError';
import useSnsLogin from '@/hooks/useSnsLogin';
import { useDialog, useGlobal, useResponsive } from '@/hooks/utils';
import * as styles from '@/pages/mypage/edit/index.css';
import * as memberConfigStyles from '@/pages/signup/register/index.css';
import {
    createUpdateProfileSchema,
    UpdateProfileSchemaType,
} from '@/schema/profile.schema';
import { accessTokenCookie } from '@/utils/cookie';

export const EditForm = ({
    password,
    setPassword,
}: {
    password: string;
    setPassword: (password: string | null) => void;
}) => {
    const { isMobile } = useResponsive();

    const { t } = useTranslation();
    const router = useRouter();

    const { isMyApp, handleSendPasswordModify } = useMyApp();

    const { handleErrorToast } = useApiError();

    const queryClient = useQueryClient();

    const value = useContext(CertificationCheckContext);
    const isAuthenticationByPhone =
        value?.authenticationType === 'AUTHENTICATION_BY_PHONE';

    const { openKcpAuthRegister } = useSnsLogin();
    const { data: profileData } = useProfile();

    const { isKorean, isJapan, isEnglish } = useGlobal();
    const { openAsyncDialog } = useDialog();
    const { addToast } = useToast();

    const { data: memberExtraInfoData } = useMemberExtraInfo();

    const isJapaneseAddress = isNull(profileData.countryCd) && isJapan;
    const isEnglishAddress = isNull(profileData.countryCd) && isEnglish;

    const isSocialLogin = !!profileData.providerType;

    const schema = createUpdateProfileSchema({
        isSocialLogin,
        nickname: profileData.nickname ?? '',
        email: profileData.email ?? '',
    });

    const methods = useForm<UpdateProfileSchemaType>({
        resolver: zodResolver(schema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            currentPassword: isSocialLogin ? undefined : password,
            memberName: isKorean
                ? profileData.memberName ?? ''
                : `${profileData.firstName} ${profileData.lastName}`,
            firstName: profileData.firstName ?? undefined,
            lastName: profileData.lastName ?? undefined,
            mobileNo: profileData.mobileNo ?? '',
            telephoneNo: profileData.telephoneNo ?? '',
            birthday: profileData.birthday?.replace(/-/g, '') ?? '',
            nickname: profileData.nickname ?? '',
            mobileCountryCode:
                profileData.providerType === 'KAKAO_SYNC'
                    ? 'KR'
                    : profileData.mobileCountryCode || undefined,
            sex:
                profileData.sex === 'M' || profileData.sex === 'F'
                    ? profileData.sex
                    : undefined,

            smsAgreed: profileData.smsAgreed,
            directMailAgreed: profileData.directMailAgreed,
            zipCd: profileData.zipCd ?? '',
            address: profileData.address ?? '',
            jibunAddress: profileData.jibunAddress ?? '',
            jibunDetailAddress: profileData.jibunDetailAddress ?? '',
            detailAddress: profileData.detailAddress ?? '',
            email: profileData.email ?? '',
            countryCd: isJapaneseAddress
                ? 'JP'
                : isEnglishAddress
                ? 'US'
                : profileData.providerType === 'KAKAO_SYNC'
                ? 'KR'
                : profileData.countryCd ?? undefined,
            state: profileData.state || '',
            city: profileData.city || '',
            isBirthdayRequired: false,
            isNicknameRequired: false,
            isMobileNoRequired: false,
            isTelephoneNoRequired: false,
            isAddressRequired: false,
            isSexRequired: false,
            certificated: false,
            isDuplicateEmail: false,
            isDuplicateNickname: false,
            isModifyEmail: false,
            isModifyPassword: false,
        },
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
        reset,
        setError,
    } = methods;

    const { formValueDisabled, key } = useEditInitialize({
        reset,
        profileData,
    });

    const { update: updateProfileMutate } = useProfileMutation();

    const isLoading = isSubmitting || updateProfileMutate.isPending;

    const onSubmit = handleSubmit(async (data) => {
        const missingRequiredExtraInfo = pipe(
            memberExtraInfoData?.extraInfoContents ?? [],
            filter((item) => {
                if (item.status !== 'REQUIRED') {
                    return false;
                }

                const filledExtraInfo = find(
                    (e) => e.extraInfoNo === item.extraInfoNo,
                    Object.values(data.extraInfo ?? {}),
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

        const isAgree = await openAsyncDialog({
            type: 'confirm',
            message: t('회원정보를 변경하시겠습니까?'),
            iconType: 'warning',
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (!isAgree) {
            return;
        }

        const accessToken = accessTokenCookie.get();

        const extraInfoList = data.extraInfo
            ? (
                  await Promise.all(
                      Object.values(data.extraInfo).map(async (v) => {
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
                                      extraInfoOptionNos: v.extraInfoOptionNos,
                                      extraInfoOptionTextContent:
                                          imageData.imageUrl,
                                  };
                              } catch {
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

        const updateData = {
            ...data,
            extraInfo: extraInfoList,
            joinTermsAgreements: undefined,
            password: data.isModifyPassword ? data.password : undefined,
        };

        try {
            await updateProfileMutate.mutateAsync({
                accessToken,
                data: updateData,
            });

            if (key) {
                await profile.updateProfileByCertification(
                    {
                        key,
                    },
                    {
                        headers: {
                            'Shop-By-Authorization': `Bearer ${accessToken}`,
                        },
                    },
                );

                queryClient.removeQueries();
            } else {
                queryClient.invalidateQueries({
                    queryKey: profileKeys.all,
                });
            }

            if (data.isModifyPassword && isMyApp) {
                handleSendPasswordModify();
            }

            addToast({
                message: t('회원정보가 변경되었습니다.'),
            });

            router.replace(PATHS.MYPAGE.MAIN);
        } catch (error) {
            handleErrorToast(error);
        }
    });

    const openWithdrawal = () => {
        overlay.open((props) => {
            return isMobile ? (
                <WithdrawalBottomSheet {...props} />
            ) : (
                <WithdrawalModal {...props} />
            );
        });
    };

    return (
        <div className={card.container}>
            <section className={card.section} data-type='form'>
                {profileData ? (
                    <FormProvider {...methods}>
                        <form onSubmit={onSubmit} className={formStyles.form}>
                            <div className={formStyles.content}>
                                <p className={styles.guideText}>
                                    {t('회원정보를 수정합니다.')}
                                </p>

                                {!isSocialLogin && (
                                    <>
                                        <WithMemberJoinConfig
                                            name='memberId'
                                            label={t('아이디')}
                                        >
                                            <InputField
                                                type='text'
                                                autoComplete='off'
                                                value={
                                                    profileData?.memberId ?? ''
                                                }
                                                disabled
                                            />
                                        </WithMemberJoinConfig>

                                        <ChangePassword />
                                    </>
                                )}

                                <SignupFormName
                                    disabled={formValueDisabled.name}
                                />

                                <SignupFormEmail
                                    isDefaultDuplicated={false}
                                    disabled={formValueDisabled.email}
                                />

                                <SignupFormMobile
                                    disabled={formValueDisabled.mobileNo}
                                />

                                {isAuthenticationByPhone && (
                                    <Button
                                        frame='outlined'
                                        variant='secondary'
                                        className={signupFormStyles.button}
                                        type='button'
                                        onClick={() => openKcpAuthRegister()}
                                    >
                                        <span>
                                            {t('이름/휴대전화번호 변경')}
                                        </span>
                                    </Button>
                                )}

                                <SignupFormTelephone />

                                <SignupFormAddress />

                                <SignupFormNickname
                                    isDefaultDuplicated={false}
                                />

                                <SignupFormBirthday
                                    disabled={formValueDisabled.birthday}
                                />

                                <SignupFormSex
                                    disabled={formValueDisabled.sex}
                                />

                                <TermCheckList />

                                {!isEmpty(
                                    memberExtraInfoData?.extraInfoContents,
                                ) && (
                                    <div
                                        className={
                                            memberConfigStyles.memberConfigContainer
                                        }
                                    >
                                        <h2
                                            className={
                                                memberConfigStyles.memberConfigTitle
                                            }
                                        >
                                            {t('추가항목 입력')}
                                        </h2>

                                        {memberExtraInfoData?.extraInfoContents?.map(
                                            (extraInfo) => (
                                                <MemberConfig
                                                    key={extraInfo.extraInfoNo}
                                                    {...extraInfo}
                                                    defaultData={profileData.extraInfo?.find(
                                                        (item) =>
                                                            item.extraInfoNo ===
                                                            extraInfo.extraInfoNo,
                                                    )}
                                                />
                                            ),
                                        )}
                                    </div>
                                )}

                                <Button
                                    frame='text'
                                    className={styles.withdrawalButton}
                                    onClick={openWithdrawal}
                                >
                                    {t('회원 탈퇴')}
                                </Button>
                            </div>

                            <div className={formStyles.actions}>
                                <Button
                                    type='button'
                                    frame='outlined'
                                    variant='secondary'
                                    className={formStyles.actionButton}
                                    onClick={() => {
                                        setPassword(null);
                                    }}
                                >
                                    {t('취소')}
                                </Button>
                                <Button
                                    type='submit'
                                    frame='solid'
                                    variant='primary'
                                    className={formStyles.actionButton}
                                    disabled={isLoading}
                                >
                                    {t('저장')}
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                ) : (
                    <div className={styles.form} />
                )}
            </section>
        </div>
    );
};
