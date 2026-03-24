import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import { getPlatform } from '@/api/core/utils';
import { useMall } from '@/hooks/query/admin/mall';
import { useProfile } from '@/hooks/query/member/profile';
import { isLoggedIn } from '@/utils/auth';
import { determinePageScriptType } from '@/utils/shopby';

const useSbInit = () => {
    const { data: mallData } = useMall();
    const isExternalScriptUsable = !!mallData?.externalServiceConfig.useScript;

    const router = useRouter();

    // TODO: 쿼리 파라미터가 변경됐을때도 새 페이지 이동이라고 간주해야되는지 체크, router.asPath로 체크하면 쿼리 파라미터가 바뀔때도 페이지 이동으로 간주
    const location = useMemo(() => {
        const [pathname, search] = router.asPath.split('?');
        return {
            pathname: pathname || '/',
            search: search ? `?${search}` : '',
        };
    }, [router.asPath]);

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
            window.ShopbyExternalScript?.clearGlobalObjectSb();
        };
    }, [isExternalScriptUsable, router]);

    const isLogin = isLoggedIn();

    const { data: profileData } = useProfile({
        options: {
            enabled: isLogin,
        },
    });

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
    }, [isExternalScriptUsable, profileData, location, isLogin]);
};

export default useSbInit;
