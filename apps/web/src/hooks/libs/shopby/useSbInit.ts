import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { getPlatform } from '@/api/core/utils';
import { useAuth } from '@/hooks/useAuth';
import { useMall } from '@/hooks/query/admin/mall';
import { useProfile } from '@/hooks/query/member/profile';
import { useIsClient } from '@/shared/hooks/useIsClient';
import { determinePageScriptType } from '@/shared/utils/shopby';

export const useSbInit = () => {
    const isClient = useIsClient();
    const { data: mallData } = useMall();
    const isExternalScriptUsable =
        isClient && !!mallData?.externalServiceConfig.useScript;

    const router = useRouter();
    const isLogin = useAuth();

    // TODO: 쿼리 파라미터가 변경됐을때도 새 페이지 이동이라고 간주해야되는지 체크, router.asPath로 체크하면 쿼리 파라미터가 바뀔때도 페이지 이동으로 간주
    const { data: profileData } = useProfile({
        options: {
            enabled: !!isLogin && isClient,
        },
    });

    useEffect(() => {
        if (!isExternalScriptUsable) {
            return;
        }

        window.ShopbyExternalScript?.initialize({
            apiOption: {
                clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
                profile: 'real',
                platform: getPlatform(),
            },
        });
    }, [isExternalScriptUsable]);

    useEffect(() => {
        if (!isExternalScriptUsable) {
            return;
        }

        const pageScriptType = determinePageScriptType(router.pathname);

        // location 을 변경할 때마다 `setPageScriptType` 메소드로 페이지 스크립트 타입을 설정합니다
        window.ShopbyExternalScript?.setPageScriptType(pageScriptType);

        return () => {
            // SPA 특성을 고려해 다른 페이지로 이동 시 이전 페이지에서 사용한 sb 객체에 대한 정보를 제거합니다.
            try {
                window.ShopbyExternalScript?.clearGlobalObjectSb?.();
            } catch (error) {
                console.warn(
                    'ShopbyExternalScript.clearGlobalObjectSb 호출 중 에러 발생:',
                    error,
                );
            }
        };
    }, [isExternalScriptUsable, router.pathname]);

    useEffect(() => {
        if (!isExternalScriptUsable) {
            return;
        }

        if (isLogin && !profileData) {
            return;
        }

        window.ShopbyExternalScript?.setGlobalObjectSb({
            profile: profileData || null,
            getPlatform,
        });
    }, [isExternalScriptUsable, profileData, router.pathname, isLogin]);
};
