import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { accessTokenManager } from '@/api/core/token';
import { PATHS } from '@/const/paths';
import { useAuthMutation } from '@/hooks/mutations';
import useApiError from '@/hooks/useApiError';

interface useLogoutProps {
    fn?: (...args: unknown[]) => void;
}

const useLogout = ({ fn }: useLogoutProps = {}) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {
        logout: { mutateAsync: logoutAsyncMutation },
    } = useAuthMutation();

    const { handleErrorToast } = useApiError();

    const logout = async () => {
        try {
            await logoutAsyncMutation();

            accessTokenManager.clearToken();
            queryClient.removeQueries();

            fn?.();

            navigate(PATHS.AUTH.LOGIN);
        } catch (error) {
            handleErrorToast(error);
        }
    };

    return { logout };
};

export default useLogout;
