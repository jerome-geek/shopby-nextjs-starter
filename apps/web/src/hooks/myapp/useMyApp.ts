import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { profile } from '@/api/member';

/**
 * @description 마이앱 환경 여부 정적 상수 (서버 렌더링 시에는 항상 false)
 */
const IS_MY_APP_CLIENT =
    typeof window !== 'undefined'
        ? !!window.myapp?.helpers?.isMyApp?.()
        : false;

type Key =
    | 'LOGIN'
    | 'LOGOUT'
    | 'INIT_LOGIN_INFO'
    | 'PASSWORD_MODIFIED'
    | 'LOGINVIEW'
    | 'REFRESH_TOKEN_EXPIRED'
    | 'SHOW_SETTING'
    | 'SHOW_NOTIFICATION'
    | 'SIGN_UP_COMPLETED';

export type SnsProvider =
    | 'payco'
    | 'kakao'
    | 'naver'
    | 'google'
    | 'facebook'
    | 'apple'
    | 'line'
    | undefined;

interface LoginOption {
    memberId: string;
    memberNo: number;
    memberName: string;
    nickName: string;
    // 쇼핑몰 웹 액세스 토큰
    solutionAuthenticationKey: string;
    // (선택) sns 인증 시, sns 인증 제공자
    snsProvider?: SnsProvider;
}

interface LogoutOption {
    returnUrl: string;
}

interface LoginViewOption {
    returnUrl?: string;
    // (선택, 기본값 : "NONE") NONE: 기본 디자인 로그인 창 | ONLY_ADULT: 성인인증 디자인 로그인 창 | ONLY_MEMBER: 회원전용 디자인 로그인 창
    loginViewType?: 'NONE' | 'ONLY_ADULT' | 'ONLY_MEMBER';
    // (선택, 기본값 : false) 로그인창에서 비회원 주문하기 버튼을 노출할지 여부
    showGuestOrder?: boolean;
}

interface MyAppHandleType<T extends Key> {
    option?: T extends 'LOGIN'
        ? LoginOption
        : T extends 'LOGOUT'
          ? LogoutOption
          : LoginViewOption;
    meta?: {
        provider: string;
        nextPath: string;
        pkgName: string;
        cookies?: string;
        localStorages?: string;
        sessionStorages?: string;
        bridge?: string;
    };
}

/**
 * @hook useMyApp
 * @client_only
 * @description 마이앱(APP) 인앱 브라우저 및 하이브리드 앱 브릿지 통신 전담 훅 (Client Side Only)
 */
const useMyApp = ({ isMyAppInit }: { isMyAppInit?: boolean } = {}) => {
    const router = useRouter();

    const [isMyApp, _] = useState(() => {
        if (typeof window !== 'undefined') {
            return !!window?.myapp?.helpers?.isMyApp?.();
        }
        return IS_MY_APP_CLIENT; // 서버 사이드 기본값
    });

    const isInAppBrowser = useCallback(() => {
        return typeof window !== 'undefined'
            ? !!window.myapp?.helpers?.isOpenedAsCustomTab?.()
            : false;
    }, []);

    // myapp.init()이 정상적으로 실행되었다면 true
    const getIsMyAppHandlerAvailable = useCallback(() => {
        return typeof window !== 'undefined' ? !!window?.myapp?.handler : false;
    }, []);

    useEffect(() => {
        if (!isMyAppInit || !isMyApp) {
            return;
        }

        try {
            if (isMyApp || isInAppBrowser()) {
                const timer = setTimeout(() => {
                    window.myapp?.init();
                }, 100);
                return () => clearTimeout(timer);
            }
        } catch (e) {
            console.error(e);
        }
    }, [isMyAppInit, isMyApp, router.pathname, isInAppBrowser]);

    const sendToMyApp = useCallback(
        <T extends Key>(key: T, action?: MyAppHandleType<T>) => {
            if ((isInAppBrowser() || isMyApp) && window?.myapp?.handler) {
                window.myapp.handler.send({
                    key,
                    ...action,
                });
            } else {
                console.log('MyApp is not available');
            }
        },
        [isMyApp, isInAppBrowser],
    );

    const handleSendLogin = (action: MyAppHandleType<'LOGIN'>) => {
        sendToMyApp('LOGIN', action);
    };
    const handleSendLogout = (action: MyAppHandleType<'LOGOUT'>) =>
        new Promise((resolve) => {
            sendToMyApp('LOGOUT', action);
            resolve(true);
        });
    const handleSendInitLoginInfo = () => sendToMyApp('INIT_LOGIN_INFO');
    const handleSendPasswordModify = () => sendToMyApp('PASSWORD_MODIFIED');
    const handleSendRefreshTokenExpired = () =>
        sendToMyApp('REFRESH_TOKEN_EXPIRED');
    const handleSendLoginView = (action?: MyAppHandleType<'LOGINVIEW'>) =>
        sendToMyApp('LOGINVIEW', action);
    const handleSendShowSettings = (action?: MyAppHandleType<'SHOW_SETTING'>) =>
        sendToMyApp('SHOW_SETTING', action);
    const handleSendShowNotification = () => sendToMyApp('SHOW_NOTIFICATION');
    const handleSendSignUpCompleted = () => sendToMyApp('SIGN_UP_COMPLETED');

    const syncAppLogin = async (accessToken: string, provider?: string) => {
        if (!isMyApp) {
            return;
        }

        try {
            const { data: profileData } = await profile.getProfile({
                headers: {
                    'Shop-By-Authorization': `Bearer ${accessToken}`,
                },
            });

            handleSendLogin({
                option: {
                    memberId: profileData.memberId || profileData.email || '',
                    memberNo: profileData.memberNo,
                    memberName: profileData.memberName || '',
                    nickName: profileData.nickname || '',
                    solutionAuthenticationKey: accessToken,
                    snsProvider: provider
                        ? (provider.replace('ncp_', '') as SnsProvider)
                        : undefined,
                },
            });
        } catch (e) {
            console.error('Failed to sync login state to MyApp', e);
        }
    };

    return {
        isMyApp,
        isMyAppHandler: getIsMyAppHandlerAvailable(),
        isInAppBrowser: isInAppBrowser(),
        handleSendLogin,
        handleSendLogout,
        handleSendInitLoginInfo,
        handleSendPasswordModify,
        handleSendLoginView,
        handleSendRefreshTokenExpired,
        handleSendShowSettings,
        handleSendShowNotification,
        handleSendSignUpCompleted,
        syncAppLogin,
    };
};

export default useMyApp;
