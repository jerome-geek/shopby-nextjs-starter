import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { oauth2 } from '@/api/auth';
import { PATHS } from '@/const/paths';
import { useMyApp } from '@/hooks/myapp';
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
            queryClient.removeQueries();
            fn?.();

            router.push(PATHS.MAIN);
        } catch (error) {
            console.error(error);
        }
    };

    return { logout };
};

export default useLogout;
