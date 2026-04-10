import type { AxiosRequestConfig } from 'axios';

import { request } from '@/api/core/request';
import { LoginRequest, LoginResponse } from '@/model/auth';

export const auth = {
    login: (data: LoginRequest, options?: AxiosRequestConfig) => {
        return request<LoginResponse>({
            method: 'POST',
            url: '/common/auth/signIn',
            data,
            ...options,
        });
    },
    logout: () => {
        return request({
            method: 'POST',
            url: '/common/auth/logout',
        });
    },
};
