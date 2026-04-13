export const ACCESS_TOKEN_STORAGE_KEY = 'admin_access_token';

export const accessTokenManager = {
    getToken: (): string | null => {
        if (typeof window === 'undefined') {
            return null;
        }

        try {
            return window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
        } catch {
            return null;
        }
    },

    setToken: (accessToken: string): void => {
        if (typeof window === 'undefined') {
            return;
        }

        try {
            window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
        } catch (error) {
            console.error(error);
        }
    },

    clearToken: (): void => {
        if (typeof window === 'undefined') {
            return;
        }

        try {
            window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
        } catch (error) {
            console.error(error);
        }
    },
};
