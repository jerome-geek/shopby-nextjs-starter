import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { oauth2 } from '@/api/auth';
import { PATHS } from '@/const/paths';
import { useMyApp } from '@/hooks/myapp';
import { dispatchAuthChange } from '@/hooks/useAuth';
import { memberCookie } from '@/utils/cookie';

interface useLogoutProps {
    fn?: (...args: unknown[]) => void;
}

const useLogout = ({ fn }: useLogoutProps = {}) => {
    const queryClient = useQueryClient();

    const { isMyApp, handleSendLogout } = useMyApp();

    const router = useRouter();

    const logout = async () => {
        try {
            if (isMyApp) {
                handleSendLogout({
                    option: {
                        returnUrl: window.location.origin,
                    },
                });
                return;
            }

            await oauth2.deleteAccessToken();

            memberCookie.clearAll();
            fn?.();

            // 로그아웃 버튼을 누른 경우에는 마이페이지 guard보다 의도한 이동을 먼저 완료합니다.
            await router.replace(PATHS.MAIN);

            queryClient.removeQueries();
            dispatchAuthChange();
        } catch (error) {
            console.error(error);
        }
    };

    return { logout };
};

export default useLogout;
