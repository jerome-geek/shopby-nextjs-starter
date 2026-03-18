import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useProfile } from '@/hooks/query/member/profile';
import { determinePageScriptType, getPlatform } from '@/utils';
import { checkLogin } from '@/utils/users';

const useSbInit = () => {
    const location = useLocation();

    useEffect(() => {
        window.ShopbyExternalScript.initialize({
            apiOption: {
                clientId: import.meta.env.VITE_CLIENT_ID,
                profile: 'real',
                platform: getPlatform(),
            },
        });
    }, []);

    useEffect(() => {
        const pageScriptType = determinePageScriptType(location);

        // location 을 변경할 때마다 `setPageScriptType` 메소드로 페이지 스크립트 타입을 설정합니다
        window.ShopbyExternalScript?.setPageScriptType(pageScriptType);

        return () => {
            // SPA 특성을 고려해 다른 페이지로 이동 시 이전 페이지에서 사용한 sb 객체에 대한 정보를 제거합니다.
            window.ShopbyExternalScript?.clearGlobalObjectSb();
        };
    }, [location]);

    const isLogin = checkLogin();

    const { data: profileData } = useProfile();
    useEffect(() => {
        if (isLogin && !profileData) {
            return;
        }

        window.ShopbyExternalScript.setGlobalObjectSb({
            profile: profileData || null,
            getPlatform,
        });
    }, [profileData, location, isLogin]);
};

export default useSbInit;
