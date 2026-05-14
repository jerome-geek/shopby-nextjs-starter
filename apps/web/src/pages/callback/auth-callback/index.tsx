import { useRouter } from 'next/router';
import qs from 'qs';
import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { oauth2 } from '@/api/auth';
import { shopbyRequest } from '@/api/core/request';
import { PATHS } from '@/const/paths';
import useMyApp from '@/hooks/myapp/useMyApp';
import useApiError from '@/hooks/useApiError';
import { useAuth } from '@/hooks/useAuth';
import { useDialog } from '@/hooks/utils';
import { NcpOpenIdProviderType } from '@/models';
import { GetProfileResponse } from '@/models/member/profile';
import { accessTokenCookie, refreshTokenCookie } from '@/utils/cookie';

import { useIsClient } from '@/shared/hooks/useIsClient';

export const AuthCallbackPage = () => {
    const isClient = useIsClient();
    const router = useRouter();

    const isLoggedIn = useAuth();
    const { isMyApp, syncAppLogin } = useMyApp();

    const { openAsyncDialog } = useDialog();
    const { handleErrorDialog } = useApiError();

    const [openReturnUrl, setOpenReturnUrl] = useLocalStorage(
        'openReturnUrl',
        isClient ? window.location.origin : '',
    );

    const returnPage = ({
        accessToken,
        expiry,
        refreshToken,
        refreshTokenExpiresIn,
    }: {
        accessToken: string;
        expiry: number;
        refreshToken: string;
        refreshTokenExpiresIn: number;
    }) => {
        setOpenReturnUrl('');

        accessTokenCookie.set(accessToken, expiry);
        refreshTokenCookie.set(refreshToken, refreshTokenExpiresIn);

        if (openReturnUrl) {
            router.replace(openReturnUrl);
        } else {
            router.replace(PATHS.MAIN);
        }
    };

    useEffect(() => {
        (async () => {
            if (!router.isReady) {
                return;
            }

            const code = router.query.code as string | undefined;
            const provider = router.query.provider as NcpOpenIdProviderType;
            const returnUrl = router.query.returnUrl ?? PATHS.MAIN;

            if (!code || !provider) {
                await openAsyncDialog({
                    message: '잘못된 접근입니다. 메인 페이지로 이동합니다.',
                });
                router.replace(PATHS.MAIN);
                return;
            }

            // NOTE : 회원 정보 수정일 때
            if (isLoggedIn) {
                try {
                    // NOTE : 로그인 상태일 경우 회원 재인증 로직 타도록 로직 추가
                    const accessToken = accessTokenCookie.get();
                    const refreshToken = refreshTokenCookie.get();

                    const { data: tokenData } =
                        await oauth2.refreshOpenIdAccessToken(
                            {
                                provider,
                                keepLogin: false,
                                code,
                                redirectUri: `${window.location.origin}${PATHS.CALLBACK.AUTH}?provider=${provider}`,
                            },
                            {
                                headers: {
                                    'Shop-By-Authorization': `Bearer ${accessToken}`,
                                    'Refresh-Token': refreshToken,
                                },
                            },
                        );

                    if (tokenData) {
                        accessTokenCookie.set(
                            tokenData.accessToken,
                            tokenData.expiresIn,
                        );
                    }

                    router.replace({
                        pathname: PATHS.MYPAGE.EDIT,
                        query: {
                            token: true,
                        },
                    });
                    return;
                } catch (error) {
                    await handleErrorDialog(error);

                    router.replace(PATHS.MYPAGE.EDIT);
                    return;
                }
            }

            try {
                const {
                    data: {
                        accessToken,
                        expiresIn,
                        refreshToken,
                        refreshTokenExpiresIn,
                    },
                } = await oauth2.issueOpenIdAccessToken({
                    provider,
                    code,
                    redirectUri: `${window.location.origin}${PATHS.CALLBACK.AUTH}?provider=${provider}`,
                    keepLogin: true,
                });

                const expiry = new Date().getTime() + expiresIn * 1000;

                const { data: getProfileData } =
                    await shopbyRequest<GetProfileResponse>({
                        method: 'GET',
                        url: '/profile',
                        headers: {
                            'Shop-By-Authorization': `Bearer ${accessToken}`,
                        },
                    });

                if (getProfileData.memberStatus === 'WAITING') {
                    const nextPath = `${window.location.origin}${
                        PATHS.SIGNUP.TERMS
                    }?${qs.stringify({
                        provider,
                        accessToken,
                        refreshToken,
                        code,
                        expiry,
                        refreshTokenExpiresIn,
                        returnUrl,
                    })}`;

                    router.replace(nextPath);
                    return;
                }

                await syncAppLogin(accessToken, provider);

                returnPage({
                    accessToken,
                    expiry,
                    refreshToken,
                    refreshTokenExpiresIn,
                });
            } catch (error) {
                await handleErrorDialog(error);
                router.replace(PATHS.MAIN);
                return;
            }
        })();
    }, [isMyApp, router.isReady]);

    return null;
};

export default AuthCallbackPage;
