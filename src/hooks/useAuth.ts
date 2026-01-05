'use client';

import { useMemo } from 'react';
import { cookieTokenManager } from '@/api/core/cookie';

/**
 * Client Component에서 로그인 여부 확인하는 훅
 */
export function useAuth() {
    const isAuthenticated = useMemo(() => {
        return cookieTokenManager.isTokenValidSync();
    }, []);

    const accessToken = useMemo(() => {
        return cookieTokenManager.getTokenSync();
    }, []);

    const refreshToken = useMemo(() => {
        return cookieTokenManager.getRefreshTokenSync();
    }, []);

    return {
        isAuthenticated,
        accessToken,
        refreshToken,
    };
}
