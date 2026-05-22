import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { oauth2 } from '@/api/auth';
import { PATHS } from '@/const/paths';
import { useMyApp } from '@/hooks/myapp';
import { useToast } from '@/hooks/ui';
import {
    clearLogoutNavigationInProgress,
    markLogoutNavigationInProgress,
} from '@/utils/auth';
import { memberCookie } from '@/utils/cookie';

interface useLogoutProps {
    fn?: (...args: unknown[]) => void;
}

const useLogout = ({ fn }: useLogoutProps = {}) => {
    const queryClient = useQueryClient();

    const { isMyApp, handleSendLogout } = useMyApp();
    const { addToast } = useToast();

    const router = useRouter();

    const logout = async () => {
        try {
            markLogoutNavigationInProgress();
            await oauth2.deleteAccessToken();

            memberCookie.clearAll();
            fn?.();

            // 로그아웃 버튼을 누른 경우에는 마이페이지 guard보다 의도한 이동을 먼저 완료합니다.
            if (isMyApp) {
                addToast({ message: '로그아웃되었습니다.' });
                await handleSendLogout({
                    option: {
                        returnUrl: window.location.origin,
                    },
                });
            } else {
                await router.replace(PATHS.MAIN);
                addToast({ message: '로그아웃되었습니다.' });
            }

            queryClient.removeQueries();
            // Note: memberCookie.clearAll() calls accessTokenCookie.clear() which already dispatches auth change.
        } catch (error) {
            console.error(error);
        } finally {
            clearLogoutNavigationInProgress();
        }
    };

    return { logout };
};

export default useLogout;
