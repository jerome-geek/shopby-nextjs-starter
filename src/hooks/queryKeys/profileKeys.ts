const profileKeys = {
    all: ['profile'] as const,

    /** 회원 정보 조회 */
    getProfile: (headers?: Record<string, string>) =>
        [...profileKeys.all, { headers }] as const,

    /** 회원 정보 조회 (마스킹 해제) */
    getNonMaskingProfile: (headers?: Record<string, string>) =>
        [...profileKeys.all, 'non-masking', { headers }] as const,
};

export default profileKeys;
