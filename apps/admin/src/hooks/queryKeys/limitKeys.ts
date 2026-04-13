const limitKeys = {
    all: ['limit'] as const,

    /** 생성 제한 설정 */
    settings: () => [...limitKeys.all, 'settings'] as const,
};

export default limitKeys;
