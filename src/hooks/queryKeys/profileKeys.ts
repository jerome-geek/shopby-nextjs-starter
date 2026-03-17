import { RawAxiosRequestHeaders } from 'axios';

const profileKeys = {
    all: ['profile'] as const,

    /** 회원 정보 조회 */
    getProfile: (headers?: RawAxiosRequestHeaders) =>
        [...profileKeys.all, { headers }] as const,

    /** 회원 정보 조회 (마스킹 해제) */
    getNonMaskingProfile: (headers?: RawAxiosRequestHeaders) =>
        [...profileKeys.all, 'non-masking', { headers }] as const,
};

export default profileKeys;
