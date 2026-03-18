import { useEffect } from 'react';
import { useScript } from 'usehooks-ts';
import { useLocation } from 'react-router-dom';

import { useProfile } from '@/hooks/query/member/profile';
import { checkLogin } from '@/utils/users';

const useShopbyStatistics = () => {
    const { pathname } = useLocation();

    const { data: profileData } = useProfile();

    const isScriptUsable =
        import.meta.env.PROD && !!import.meta.env.VITE_CLIENT_ID;

    const status = useScript(
        'https://rl3flznkr.toastcdn.net/shopby-statistics-recorder.js',
        {
            shouldPreventLoad: !isScriptUsable,
        },
    );

    useEffect(() => {
        if (isScriptUsable && status === 'ready') {
            if (typeof window.shopbyStatistics === 'function') {
                window.shopbyStatistics({
                    clientId: import.meta.env.VITE_CLIENT_ID,
                    memberNo: checkLogin() ? profileData?.memberNo : '',
                });
            }
        }
    }, [isScriptUsable, status, profileData?.memberNo, pathname]);
};

export default useShopbyStatistics;
