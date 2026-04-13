import { accessTokenManager } from '@/api/core/token';

export const checkLogin = () => {
    const accessToken = accessTokenManager.getToken();

    return !!accessToken;
};
