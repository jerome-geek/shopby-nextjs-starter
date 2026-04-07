import { isEmpty } from '@fxts/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import LoadingWrapper from '@/components/common/loading-wrapper';
import { MypageLayout } from '@/components/layout';
import * as formStyles from '@/components/mypage/common/mypage-form/index.css';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';
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
import MemberConfig from '@/components/signup/member-config';
import { Button } from '@/components/ui/button';
import { PATHS } from '@/const/paths';
import useProfileMutation from '@/hooks/mutations/useProfileMutation';
import { useMemberExtraInfo } from '@/hooks/query/member/memberConfig';
import profileKeys from '@/hooks/queryKeys/profileKeys';
import { useToast } from '@/hooks/ui/useToast';
import { useDialog } from '@/hooks/utils';
import type { GetProfileResponse } from '@/models/member/profile';
import * as styles from '@/pages/mypage/edit/index.css';
import * as memberConfigStyles from '@/pages/signup/register/index.css';
import { accessTokenCookie } from '@/utils/cookie';
import {
    MYPAGE_EDIT_COOKIE_NAME,
    validateMypageEditToken,
} from '@/utils/editToken';

const editProfileSchema = z.object({
    nickname: z.string().optional(),
    email: z.string().optional(),
    telephoneNo: z.string().optional(),
    mobileNo: z.string().optional(),
    zipCd: z.string().optional(),
    address: z.string().optional(),
    detailAddress: z.string().optional(),
});

type EditProfileForm = z.infer<typeof editProfileSchema>;

type NonMaskingProfileError = Error & { status?: number; code?: string };

export const MypageEdit = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { openDialog, openAsyncDialog } = useDialog();
    const { addToast } = useToast();

    const { update } = useProfileMutation();

    const { data: memberExtraInfoData } = useMemberExtraInfo();

    const clearEditToken = () => {
        try {
            const url = '/api/mypage/edit/clear';
            const payload = new Blob([], { type: 'application/json' });

            if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
                navigator.sendBeacon(url, payload);
                return;
            }
        } catch (error) {
            console.error(error);
        }

        fetch('/api/mypage/edit/clear', {
            method: 'POST',
            keepalive: true,
        });
    };

    useEffect(() => {
        const handleRouteChangeStart = () => {
            clearEditToken();
        };

        router.events.on('routeChangeStart', handleRouteChangeStart);

        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const methods = useForm<EditProfileForm>({
        resolver: zodResolver(editProfileSchema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            nickname: '',
            email: '',
            telephoneNo: '',
            mobileNo: '',
            zipCd: '',
            address: '',
            detailAddress: '',
        },
    });

    const { handleSubmit, formState, reset } = methods;

    const nonMaskingProfileQuery = useQuery<
        GetProfileResponse,
        NonMaskingProfileError
    >({
        queryKey: profileKeys.getNonMaskingProfile(),
        queryFn: async () => {
            const response = await fetch('/api/mypage/edit/profile');

            if (!response.ok) {
                const body = (await response.json().catch(() => null)) as {
                    message?: string;
                } | null;

                const error: NonMaskingProfileError = new Error(
                    'Failed to load non-masking profile',
                );

                error.status = response.status;
                error.code = body?.message;
                throw error;
            }

            const data = await response.json();

            return data;
        },
        retry: false,
    });

    const nonMaskingProfileData = nonMaskingProfileQuery.data ?? null;
    const isNonMaskingProfileLoading = nonMaskingProfileQuery.isLoading;

    useEffect(() => {
        if (!nonMaskingProfileData) {
            return;
        }
        reset({
            ...nonMaskingProfileData,
            nickname: nonMaskingProfileData.nickname ?? '',
            email: nonMaskingProfileData.email ?? '',
            telephoneNo: nonMaskingProfileData.telephoneNo ?? '',
            mobileNo: nonMaskingProfileData.mobileNo ?? '',
            zipCd: nonMaskingProfileData.zipCd ?? '',
            address: nonMaskingProfileData.address ?? '',
            detailAddress: nonMaskingProfileData.detailAddress ?? '',
        });
    }, [nonMaskingProfileData, reset]);

    useEffect(() => {
        const error = nonMaskingProfileQuery.error;

        if (!error) {
            return;
        }

        (async () => {
            await openAsyncDialog({
                message: t('프로필 조회에 실패했습니다. ({{code}})', {
                    code: error.code,
                }),
            });

            router.replace(PATHS.MYPAGE.CHECK_ACCOUNT);
        })();
    }, [nonMaskingProfileQuery.error]);

    const isLoading =
        isNonMaskingProfileLoading ||
        formState.isSubmitting ||
        update.isPending;

    const onSubmit = handleSubmit(async (data) => {
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

        try {
            await update.mutateAsync({
                accessToken,
                data: {
                    nickname: data.nickname || '',
                    email: data.email || '',
                    telephoneNo: data.telephoneNo || '',
                    mobileNo: data.mobileNo || '',
                    zipCd: data.zipCd || '',
                    address: data.address || '',
                    detailAddress: data.detailAddress || '',
                },
            });

            addToast({
                message: t('회원정보가 변경되었습니다.'),
            });
            clearEditToken();
            router.replace(PATHS.MYPAGE.MAIN);
        } catch (error) {
            openDialog({
                message: isAxiosError(error)
                    ? error.response?.data.message ??
                      t('회원정보 수정에 실패했습니다.')
                    : t('회원정보 수정에 실패했습니다.'),
            });
        }
    });

    return (
        <div className={card.container}>
            <section className={card.section} data-type='form'>
                <LoadingWrapper
                    isLoading={isLoading}
                    containerStyle={{ height: '50vh' }}
                >
                    {nonMaskingProfileData ? (
                        <FormProvider {...methods}>
                            <form
                                onSubmit={onSubmit}
                                className={formStyles.form}
                            >
                                <div className={formStyles.content}>
                                    <p className={styles.guideText}>
                                        {t('회원정보를 수정합니다.')}
                                    </p>

                                    <SignupFormName />

                                    <SignupFormEmail />

                                    <SignupFormMobile />

                                    <SignupFormTelephone />

                                    <SignupFormAddress />

                                    <SignupFormNickname />

                                    <SignupFormBirthday />

                                    <SignupFormSex />

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
                                                        key={
                                                            extraInfo.extraInfoNo
                                                        }
                                                        {...extraInfo}
                                                    />
                                                ),
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className={formStyles.actions}>
                                    <Button
                                        type='button'
                                        frame='outlined'
                                        variant='secondary'
                                        className={formStyles.actionButton}
                                        onClick={() => {
                                            clearEditToken();
                                            router.back();
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
                </LoadingWrapper>
            </section>
        </div>
    );
};

MypageEdit.getLayout = (page: React.ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};

export default MypageEdit;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const token = ctx.req.cookies[MYPAGE_EDIT_COOKIE_NAME];

    if (!token || !validateMypageEditToken(token).ok) {
        return {
            redirect: {
                destination: PATHS.MYPAGE.CHECK_ACCOUNT,
                permanent: false,
            },
        };
    }

    return { props: {} };
};
