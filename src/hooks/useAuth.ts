import { useMemo } from 'react';
import { cookieTokenManager } from '@/api/core/cookie';

export const useAuth = () => {
    const accessToken = cookieTokenManager.getToken();
    const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

    return {
        isAuthenticated,
    };
};
