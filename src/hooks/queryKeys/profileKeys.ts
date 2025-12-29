import type { Options } from 'ky';

const profileKeys = {
    all: ['profile'] as const,

    // /** 회원 정보 조회 */
    getProfile: (headers?: Options['headers']) =>
        [...profileKeys.all, { headers }] as const,

    // /** 회원 정보 조회 (마스킹 해제) */
    getNonMaskingProfile: (headers?: Options['headers']) =>
        [...profileKeys.all, 'non-masking', { headers }] as const,
};

export default profileKeys;
