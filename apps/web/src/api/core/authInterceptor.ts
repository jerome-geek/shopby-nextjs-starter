import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import { isGuestRequest, isUpdateOauth2Request } from '@/api/core/utils';
import type { UpdateAccessTokenResponse } from '@/models/auth/oauth2';
import { accessTokenCookie } from '@/utils/cookie';

type RefreshCallback = (token: string) => void;
type RetryableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

const TOKEN_REFRESH_TIMEOUT = 10_000;
const GUEST_LOGIN_EXPIRED_CODE = ['O7001', 'E1011'];

/**
 * 전역 갱신 상태 관리를 위한 싱글톤 변수
 */
let isRefreshing = false;
let refreshQueue: RefreshCallback[] = [];

const notifySuccess = (newToken: string) => {
    refreshQueue.forEach((callback) => callback(newToken));
    refreshQueue = [];
};

const notifyFailure = () => {
    refreshQueue.forEach((callback) => callback(''));
    refreshQueue = [];
};

/**
 * 401 에러 통합 핸들러
 * @param error AxiosError 객체
 * @param instance 에러가 발생한 Axios 인스턴스 (재시도용)
 * @param onSessionExpired 세션 만료 시 실행할 콜백 (UI 처리 등)
 */
export const handle401Error = async (
    error: AxiosError,
    instance: AxiosInstance,
    onSessionExpired: () => Promise<void>,
) => {
    const originalRequest = error.config as RetryableConfig;
    if (!originalRequest) return Promise.reject(error);

    const { url, method } = originalRequest;

    // 1. 갱신 요청 자체가 401 → 리프레시 토큰 만료
    if (isUpdateOauth2Request(url, method)) {
        notifyFailure();
        await onSessionExpired();
        return new Promise(() => {});
    }

    // 2. 게스트 요청 → 토큰 갱신 불필요 (게스트 토큰은 인터셉터 레벨에서 갱신하지 않음)
    if (isGuestRequest(url, method)) {
        return Promise.reject(error);
    }

    // 3. 이미 재시도한 요청 → 세션 만료로 간주
    if (originalRequest._retry) {
        await onSessionExpired();
        return new Promise(() => {});
    }

    // 4. 이미 다른 요청에 의해 갱신이 진행 중인 경우 → 큐에서 대기
    if (isRefreshing) {
        return new Promise<unknown>((resolve, reject) => {
            refreshQueue.push((newToken) => {
                if (!newToken) {
                    reject(error);
                    return;
                }
                // 새 토큰으로 헤더 교체 및 재요청
                originalRequest.headers[
                    'Shop-By-Authorization'
                ] = `Bearer ${newToken}`;
                resolve(instance(originalRequest));
            });
        });
    }

    // 5. 최초 401 발생 시 갱신 시작
    originalRequest._retry = true;
    isRefreshing = true;

    try {
        const { data } = await Promise.race([
            shopbyRequest.request<UpdateAccessTokenResponse>({
                method: 'PUT',
                url: '/oauth2',
            }),
            new Promise<never>((_, reject) =>
                setTimeout(
                    () => reject(new Error('토큰 갱신 시간 초과')),
                    TOKEN_REFRESH_TIMEOUT,
                ),
            ),
        ]);

        // 토큰 저장 및 대기 중인 요청들에 전파
        accessTokenCookie.set(data.accessToken, data.expiresIn);
        notifySuccess(data.accessToken);

        // 현재 요청 재실행
        originalRequest.headers[
            'Shop-By-Authorization'
        ] = `Bearer ${data.accessToken}`;

        return instance(originalRequest);
    } catch (refreshError) {
        notifyFailure();
        await onSessionExpired();
        return new Promise(() => {});
    } finally {
        isRefreshing = false;
    }
};

/**
 * 400 에러 통합 핸들러
 * @param error AxiosError 객체
 * @param instance 에러가 발생한 Axios 인스턴스 (재시도용)
 * @param onSessionExpired 세션 만료 시 실행할 콜백 (UI 처리 등)
 */
export const handle400Error = async (
    error: AxiosError,
    onSessionExpired: () => Promise<void>,
) => {
    const response = error.response?.data as ShopByErrorResponse;

    if (GUEST_LOGIN_EXPIRED_CODE.includes(response.code)) {
        await onSessionExpired();
        return new Promise(() => {});
    }

    return Promise.reject(error);
};
