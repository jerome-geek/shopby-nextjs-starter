/* eslint-disable @typescript-eslint/no-explicit-any */
import { isNull, isUndefined } from '@fxts/core';
import { useQueryClient } from '@tanstack/react-query';
import { istype AxiosError } from 'axios';
import { overlay } from 'overlay-kit';
import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import { KCPCertification, oauth2 } from '@/api/auth';
import { profile } from '@/api/member';
import { PATHS } from '@/const/paths';
import { useDialog } from '@/hooks/utils';
import { MEMBER_SIGNUP_STATUS } from '@/const/member';
import { memberCookie } from '@/utils/cookie';

let currentOnNext: ((...args: any) => void) | null = null;

const useKcpCertification = ({
    onNext,
}: {
    onNext: (...args: any) => void;
}) => {
    const router = useRouter();

    const query = router.query;

    const queryClient = useQueryClient();
    const isProcessing = useRef(false);

    const accessToken = (query?.accessToken as string) || '';
    const refreshToken = (query?.refreshToken as string) || '';
    const provider = (query?.provider as string) || '';
    const code = (query?.code as string) || '';
    const expiry = (query?.expiry as string) || '';
    const returnUrl = (query?.returnUrl as string) || '';

    // const { isMyApp, handleSendLogout } = useMyApp();

    const { openAsyncDialog } = useDialog();

    const processKcpAuthCode = useCallback(
        async (key: string) => {
            if (onNext !== currentOnNext) {
                return;
            }

            if (isProcessing.current) {
                return;
            }

            isProcessing.current = true;

            try {
                const { data } =
                    await KCPCertification.getKCPCertificationResult({
                        key,
                    });

                const {
                    data: { exist: isCheckDuplicateCi, status },
                } = await profile.checkDuplicateCI(
                    {
                        ci: data.ci,
                    },
                    {
                        headers: {
                            'Shop-By-Authorization': `Bearer ${accessToken}`,
                        },
                    },
                );

                if (
                    isCheckDuplicateCi &&
                    location.pathname !== PATHS.MEMBER.FIND_ID
                ) {
                    const memberStatus = status || 'ACTIVE';

                    await openAsyncDialog({
                        message:
                            MEMBER_SIGNUP_STATUS[memberStatus] ??
                            MEMBER_SIGNUP_STATUS['ACTIVE'],
                        iconType: 'auth',
                        onConfirmReturnValue: false,
                        onCloseReturnValue: false,
                        confirmText:
                            memberStatus === 'ACTIVE'
                                ? '아이디 찾기 바로가기'
                                : '확인',
                        confirm: async () => {
                            if (
                                memberStatus === 'ACTIVE' &&
                                location.pathname !== PATHS.MYPAGE.EDIT
                            ) {
                                // if (isMyApp) {
                                //     handleSendLogout({
                                //         option: {
                                //             returnUrl: PATHS.MEMBER.FIND_ID,
                                //         },
                                //     });
                                // } else {
                                await oauth2.deleteAccessToken();

                                memberCookie.clearAll();
                                queryClient.removeQueries();

                                router.push(PATHS.MEMBER.FIND_ID);
                                // }
                            }
                        },
                    });
                    overlay.closeAll();
                    return;
                }

                if (
                    isNull(isCheckDuplicateCi) ||
                    isUndefined(isCheckDuplicateCi)
                ) {
                    await openAsyncDialog({
                        message: '본인 인증이 필요합니다.',
                        iconType: 'auth',
                        onConfirmReturnValue: false,
                        onCloseReturnValue: false,
                    });

                    overlay.closeAll();
                    router.push(PATHS.AUTH.LOGIN);
                    return;
                }

                onNext({
                    key,
                    sexCode: data.sexCode,
                    phone: data.phone,
                    ci: data.ci,
                    name: data.name,
                    birthday: data.birthday,
                    accessToken,
                    refreshToken,
                    provider,
                    code,
                    expiry,
                    returnUrl,
                });
            } catch (error) {
                await openAsyncDialog({
                    message: isAxiosError(error)
                        ? error.response?.data.message
                        : '알 수 없는 오류가 발생했습니다.',
                    iconType: 'auth',
                    onConfirmReturnValue: false,
                    onCloseReturnValue: false,
                });
                overlay.closeAll();
            } finally {
                isProcessing.current = false;
            }
        },
        [
            router,
            onNext,
            accessToken,
            refreshToken,
            provider,
            code,
            expiry,
            returnUrl,
            openAsyncDialog,
        ],
    );

    const handleKcpAuthCode = useCallback(
        (e: MessageEvent<{ key: string }>) => {
            if (e.origin !== window.location.origin || !e.data.key) {
                return;
            }

            processKcpAuthCode(e.data.key);
        },
        [processKcpAuthCode],
    );

    useEffect(() => {
        if (currentOnNext) {
            currentOnNext = onNext;
        }

        currentOnNext = onNext;

        return () => {
            currentOnNext = null;
        };
    }, [onNext]);

    useEffect(() => {
        window.addEventListener('message', handleKcpAuthCode);

        return () => {
            window.removeEventListener('message', handleKcpAuthCode);
        };
    }, [handleKcpAuthCode]);

    return null;
};

export default useKcpCertification;
