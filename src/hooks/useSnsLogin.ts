'use client';

import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
// import { useLocalStorage } from 'usehooks-ts';

import { authentication } from '@/api/auth';
import { PATHS } from '@/const/paths';
import { useMall } from '@/hooks/suspenseQuery/admin/mall';
// import { useMyApp } from '@/hooks/myapp';
import useDialog from '@/hooks/useDialog';
import { NcpOpenIdProviderType } from '@/models';
// import { shopbyTokenStorage } from '@/utils/storage';
// import {
//     AppleIcon,
//     FacebookIcon,
//     GoogleIcon,
//     KakaoIcon,
//     LineIcon,
//     NaverIcon,
// } from '@/components/icons/login';

const useSnsLogin = () => {
    const { t } = useTranslation();

    const { openDialog } = useDialog();

    // const { isInAppBrowser, isMyApp } = useMyApp();
    const searchParams = useSearchParams();
    const returnUrl = searchParams.get('returnUrl') || '';

    // const [, setOpenReturnUrl] = useLocalStorage(
    //     'openReturnUrl',
    //     window.location.origin,
    // );

    const openLoginTab = (loginUrl: string, snsReturnUrl?: string) => {
        // setOpenReturnUrl(snsReturnUrl || returnUrl);

        window.location.replace(loginUrl);
    };

    // const { data: mallData } = useMall();
    const { mutateAsync } = useMutation({
        mutationFn: async ({
            provider,
            isLoginDisplay,
        }: {
            provider: NcpOpenIdProviderType;
            isLoginDisplay?: boolean;
        }) => {
            const data = await authentication
                .getOpenIdLoginUrl({
                    provider,
                    redirectUri: `${window.location.origin}${PATHS.CALLBACK.AUTH
                        }?provider=${provider}&prompt=${isLoginDisplay ? 'login' : ''}`,
                })
                .json();

            return data;
        },
    });

    // const customTabOpen = (provider: 'google' | 'facebook') => {
    //     const accessToken =
    //         shopbyTokenStorage.getAccessToken()?.accessToken ?? '';
    //     const refreshToken = shopbyTokenStorage.getRefreshToken() ?? '';

    //     if (accessToken && refreshToken) {
    //         const url = `${window.location.origin}${
    //             PATHS.APP.OPEN_AUTH
    //         }${encodeURIComponent(
    //             `?provider=${provider}&next=${encodeURIComponent(
    //                 `${window.location.origin}${PATHS.MYPAGE.EDIT}?socialAuthentication=true`
    //             )}&accessToken=${accessToken}&refreshToken=${refreshToken}`
    //         )}`;

    //         window.location.href = `${window.myapp.helpers.getShopScheme()}.customtabs://${provider}?links=${JSON.stringify(
    //             { url }
    //         )}`;
    //     } else {
    //         openDialog({
    //             message: t(
    //                 '로그인 정보가 찾을 수 없습니다. 로그아웃 후 다시 로그인 해주세요.'
    //             ),
    //         });
    //     }
    // };

    const openNaverRegister = async ({
        returnUrl,
    }: { returnUrl?: string } = {}) => {
        const data = await mutateAsync({
            provider: 'ncp_naver',
        });
        if (!data.loginUrl && data.loginUrl.length === 0) {
            openDialog({
                message: t(
                    '간편 회원가입에 실패했습니다. 고객센터에 문의해주세요.',
                ),
            });
            return;
        }

        openLoginTab(data.loginUrl, returnUrl);
    };

    const openKakaoRegister = async ({
        returnUrl,
    }: { returnUrl?: string } = {}) => {
        const data = await mutateAsync({
            provider: 'ncp_kakao',
        });

        if (!data.loginUrl && data.loginUrl.length === 0) {
            openDialog({
                message: t(
                    '간편 회원가입에 실패했습니다. 고객센터에 문의해주세요.',
                ),
            });
            return;
        }

        openLoginTab(data.loginUrl, returnUrl);
    };

    const openKakaoSync = async ({
        isLoginDisplay,
        returnUrl,
    }: {
        isLoginDisplay?: boolean;
        returnUrl?: string;
    } = {}) => {
        const data = await mutateAsync({
            provider: 'ncp_kakao-sync',
            isLoginDisplay,
        });

        if (!data.loginUrl && data.loginUrl.length === 0) {
            openDialog({
                message: t(
                    '간편 회원가입에 실패했습니다. 고객센터에 문의해주세요.',
                ),
            });
            return;
        }

        openLoginTab(data.loginUrl, returnUrl);
    };

    const openKcpAuthRegister = () => {
        window.open(
            PATHS.CALLBACK.KCP_AUTH,
            'auth_popup',
            'width=500,height=500,location=no,status=no,scrollbars=yes',
        );
    };

    const openAppleRegister = async ({
        returnUrl,
    }: { returnUrl?: string } = {}) => {
        const data = await mutateAsync({ provider: 'ncp_apple' });

        if (!data.loginUrl && data.loginUrl.length === 0) {
            openDialog({
                message: t(
                    '간편 회원가입에 실패했습니다. 고객센터에 문의해주세요.',
                ),
            });
            return;
        }

        openLoginTab(data.loginUrl, returnUrl);
    };

    const openFacebookRegister = async ({
        returnUrl,
    }: { returnUrl?: string } = {}) => {
        const data = await mutateAsync({ provider: 'ncp_facebook' });

        if (!data.loginUrl && data.loginUrl.length === 0) {
            openDialog({
                message: t(
                    '간편 회원가입에 실패했습니다. 고객센터에 문의해주세요.',
                ),
            });
            return;
        }

        // if (isMyApp && !isInAppBrowser) {
        //     customTabOpen('facebook');
        //     return;
        // }

        openLoginTab(data.loginUrl, returnUrl);
    };

    const openGoogleRegister = async ({
        returnUrl,
    }: { returnUrl?: string } = {}) => {
        const data = await mutateAsync({ provider: 'ncp_google' });

        if (!data.loginUrl && data.loginUrl.length === 0) {
            openDialog({
                message: t(
                    '간편 회원가입에 실패했습니다. 고객센터에 문의해주세요.',
                ),
            });
            return;
        }

        // if (isMyApp && !isInAppBrowser) {
        //     customTabOpen('google');
        //     return;
        // }

        openLoginTab(data.loginUrl, returnUrl);
    };

    const openLineRegister = async ({
        returnUrl,
    }: { returnUrl?: string } = {}) => {
        const data = await mutateAsync({ provider: 'ncp_line' });

        if (!data.loginUrl && data.loginUrl.length === 0) {
            openDialog({
                message: t(
                    '간편 회원가입에 실패했습니다. 고객센터에 문의해주세요.',
                ),
            });
            return;
        }

        openLoginTab(data.loginUrl, returnUrl);
    };

    const socialLoginList = [
        {
            provider: 'kakao' as const,
            label: t('카카오로 로그인'),
            // TODO: SNS 연동 이후 수정 필요
            // isAvailable: includes(
            //     'kakao',
            //     mallData?.openIdJoinConfig.providers || []
            // ),
            isAvailable: true,
            onClick: openKakaoRegister,
            // Icon: KakaoIcon,
        },
        {
            provider: 'kakao-sync' as const,
            label: t('카카오로 로그인'),
            // TODO: SNS 연동 이후 수정 필요
            // isAvailable: includes(
            //     'kakao-sync',
            //     mallData?.openIdJoinConfig.providers || []
            // ),
            isAvailable: true,
            onClick: openKakaoSync,
            // Icon: KakaoIcon,
        },
        {
            provider: 'naver' as const,
            label: t('네이버로 로그인'),
            // TODO: SNS 연동 이후 수정 필요
            // isAvailable: includes(
            //     'naver',
            //     mallData?.openIdJoinConfig.providers || []
            // ),
            isAvailable: true,
            onClick: openNaverRegister,
            // Icon: NaverIcon,
        },
        {
            provider: 'apple' as const,
            label: t('Apple로 로그인'),
            // TODO: SNS 연동 이후 수정 필요
            // isAvailable: includes(
            //     'apple',
            //     mallData?.openIdJoinConfig.providers || []
            // ),
            isAvailable: true,
            onClick: openAppleRegister,
            // Icon: AppleIcon,
        },
        {
            provider: 'facebook' as const,
            label: t('페이스북으로 로그인'),
            // TODO: SNS 연동 이후 수정 필요
            // isAvailable: includes(
            //     'facebook',
            //     mallData?.openIdJoinConfig.providers || []
            // ),
            isAvailable: true,
            onClick: openFacebookRegister,
            // Icon: FacebookIcon,
        },
        {
            provider: 'google' as const,
            label: t('구글로 로그인'),
            // TODO: SNS 연동 이후 수정 필요
            // isAvailable: includes(
            //     'google',
            //     mallData?.openIdJoinConfig.providers || []
            // ),
            isAvailable: true,
            onClick: openGoogleRegister,
            // Icon: GoogleIcon,
        },
        {
            provider: 'line' as const,
            label: t('라인으로 로그인'),
            // TODO: SNS 연동 이후 수정 필요
            // isAvailable: includes(
            //     'line',
            //     mallData?.openIdJoinConfig.providers || []
            // ),
            isAvailable: true,
            onClick: openLineRegister,
            // Icon: LineIcon,
        },
    ];

    return {
        openNaverRegister,
        openKakaoRegister,
        openKakaoSync,
        openKcpAuthRegister,
        openAppleRegister,
        openFacebookRegister,
        openGoogleRegister,
        openLineRegister,
        socialLoginList,
    };
};

export default useSnsLogin;
