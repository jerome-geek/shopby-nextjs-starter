import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useScript } from 'usehooks-ts';

import { useProfile } from '@/hooks/query/member/profile';
import { useAuth } from '@/hooks/useAuth';

const useShopbyStatistics = () => {
    const router = useRouter();
    const pathname = router.asPath.split('?')[0];

    const isLogin = useAuth();

    const { data: profileData } = useProfile({
        options: {
            enabled: !!isLogin,
        },
    });

    const isScriptUsable =
        process.env.NODE_ENV === 'production' &&
        process.env.NEXT_PUBLIC_CLIENT_ID;

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
                    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
                    memberNo: isLogin ? profileData?.memberNo : '',
                });
            }
        }
    }, [isScriptUsable, status, profileData?.memberNo, pathname, isLogin]);
};

export default useShopbyStatistics;
