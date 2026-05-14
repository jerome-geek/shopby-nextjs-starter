import { includes } from '@fxts/core';
import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from 'usehooks-ts';

import { authentication } from '@/api/auth';
import {
    AppleIcon,
    FacebookIcon,
    GoogleIcon,
    KakaoIcon,
    LineIcon,
    NaverIcon,
} from '@/components/icons/login';
import { PATHS } from '@/const/paths';
import { useMall } from '@/hooks/query/admin/mall';
import useDialog from '@/hooks/utils/useDialog';
import { useIsClient } from '@/shared/hooks/useIsClient';
import type { NcpOpenIdProviderType, OpenIdJoinProvider } from '@/models';

const useSnsLogin = () => {
    const { t } = useTranslation();

    const { openDialog } = useDialog();

    const { data: mallData } = useMall();

    const openIdJoinProviders = useMemo(
        () => mallData?.openIdJoinConfig.providers || [],
        [mallData],
    );

    const isClient = useIsClient();

    const searchParams = useSearchParams();
    const returnUrl = searchParams.get('returnUrl') || '';

    const [, setOpenReturnUrl] = useLocalStorage('openReturnUrl', '');

    const openLoginTab = (loginUrl: string, snsReturnUrl?: string) => {
        setOpenReturnUrl(snsReturnUrl || returnUrl || (isClient ? window.location.origin : ''));

        if (isClient) {
            window.location.href = loginUrl;
        }
    };

    const { mutateAsync } = useMutation({
        mutationFn: async ({
            provider,
            isLoginDisplay,
        }: {
            provider: NcpOpenIdProviderType;
            isLoginDisplay?: boolean;
        }) => {
            const currentOrigin = isClient ? window.location.origin : '';
            const response = await authentication.getOpenIdLoginUrl({
                provider,
                redirectUri: `${currentOrigin}${
                    PATHS.CALLBACK.AUTH
                }?provider=${provider}&prompt=${isLoginDisplay ? 'login' : ''}`,
            });

            return response.data;
        },
    });

    const openNaverRegister = async ({
        returnUrl,
    }: { returnUrl?: string } = {}) => {
        const response = await mutateAsync({
            provider: 'ncp_naver',
        });

        if (!response.loginUrl && response.loginUrl.length === 0) {
            openDialog({
                message: t(
                    '간편 회원가입에 실패했습니다. 고객센터에 문의해주세요.',
                ),
            });
            return;
        }

        openLoginTab(response.loginUrl, returnUrl);
    };

    const openKakaoRegister = async ({
        returnUrl,
    }: { returnUrl?: string } = {}) => {
        const response = await mutateAsync({
            provider: 'ncp_kakao',
        });

        if (!response.loginUrl && response.loginUrl.length === 0) {
            openDialog({
                message: t(
                    '간편 회원가입에 실패했습니다. 고객센터에 문의해주세요.',
                ),
            });
            return;
        }

        openLoginTab(response.loginUrl, returnUrl);
    };

    const openKakaoSync = async ({
        isLoginDisplay,
        returnUrl,
    }: {
        isLoginDisplay?: boolean;
        returnUrl?: string;
    } = {}) => {
        const response = await mutateAsync({
            provider: 'ncp_kakao-sync',
            isLoginDisplay,
        });

        if (!response.loginUrl && response.loginUrl.length === 0) {
            openDialog({
                message: t(
                    '간편 회원가입에 실패했습니다. 고객센터에 문의해주세요.',
                ),
            });
            return;
        }

        openLoginTab(response.loginUrl, returnUrl);
    };

    const openAppleRegister = async ({
        returnUrl,
    }: { returnUrl?: string } = {}) => {
        const response = await mutateAsync({ provider: 'ncp_apple' });

        if (!response.loginUrl && response.loginUrl.length === 0) {
            openDialog({
                message: t(
                    '간편 회원가입에 실패했습니다. 고객센터에 문의해주세요.',
                ),
            });
            return;
        }

        openLoginTab(response.loginUrl, returnUrl);
    };

    const openFacebookRegister = async ({
        returnUrl,
    }: { returnUrl?: string } = {}) => {
        const response = await mutateAsync({ provider: 'ncp_facebook' });

        if (!response.loginUrl && response.loginUrl.length === 0) {
            openDialog({
                message: t(
                    '간편 회원가입에 실패했습니다. 고객센터에 문의해주세요.',
                ),
            });
            return;
        }

        openLoginTab(response.loginUrl, returnUrl);
    };

    const openGoogleRegister = async ({
        returnUrl,
    }: { returnUrl?: string } = {}) => {
        const response = await mutateAsync({ provider: 'ncp_google' });

        if (!response.loginUrl && response.loginUrl.length === 0) {
            openDialog({
                message: t(
                    '간편 회원가입에 실패했습니다. 고객센터에 문의해주세요.',
                ),
            });
            return;
        }

        openLoginTab(response.loginUrl, returnUrl);
    };

    const openLineRegister = async ({
        returnUrl,
    }: { returnUrl?: string } = {}) => {
        const response = await mutateAsync({ provider: 'ncp_line' });

        if (!response.loginUrl && response.loginUrl.length === 0) {
            openDialog({
                message: t(
                    '간편 회원가입에 실패했습니다. 고객센터에 문의해주세요.',
                ),
            });
            return;
        }

        openLoginTab(response.loginUrl, returnUrl);
    };

    const openKcpAuthRegister = () => {
        window.open(
            PATHS.CALLBACK.KCP_AUTH,
            'auth_popup',
            'width=500,height=500,location=no,status=no,scrollbars=yes',
        );
    };

    const isAvailableProvider = useCallback(
        (provider: OpenIdJoinProvider) => {
            return includes(provider, openIdJoinProviders);
        },
        [openIdJoinProviders],
    );

    const socialLoginList = [
        {
            provider: 'kakao' as const,
            providerType: 'KAKAO' as const,
            label: t('카카오로 로그인'),
            isAvailable: isAvailableProvider('kakao'),
            onClick: openKakaoRegister,
            Icon: KakaoIcon,
        },
        {
            provider: 'kakao-sync' as const,
            providerType: 'KAKAO_SYNC' as const,
            label: t('카카오로 로그인'),
            isAvailable: isAvailableProvider('kakao-sync'),
            onClick: openKakaoSync,
            Icon: KakaoIcon,
        },
        {
            provider: 'naver' as const,
            providerType: 'NAVER' as const,
            label: t('네이버로 로그인'),
            isAvailable: isAvailableProvider('naver'),
            onClick: openNaverRegister,
            Icon: NaverIcon,
        },
        {
            provider: 'apple' as const,
            providerType: 'APPLE' as const,
            label: t('Apple로 로그인'),
            isAvailable: isAvailableProvider('apple'),
            onClick: openAppleRegister,
            Icon: AppleIcon,
        },
        {
            provider: 'facebook' as const,
            providerType: 'FACEBOOK' as const,
            label: t('페이스북으로 로그인'),
            isAvailable: isAvailableProvider('facebook'),
            onClick: openFacebookRegister,
            Icon: FacebookIcon,
        },
        {
            provider: 'google' as const,
            providerType: 'GOOGLE' as const,
            label: t('구글로 로그인'),
            isAvailable: isAvailableProvider('google'),
            onClick: openGoogleRegister,
            Icon: GoogleIcon,
        },
        {
            provider: 'line' as const,
            providerType: 'LINE' as const,
            label: t('라인으로 로그인'),
            isAvailable: isAvailableProvider('line'),
            onClick: openLineRegister,
            Icon: LineIcon,
        },
    ];

    const availableSocialLoginList = socialLoginList.filter(
        ({ isAvailable }) => isAvailable,
    );

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
        availableSocialLoginList,
    };
};

export default useSnsLogin;
