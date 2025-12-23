/**
 * 배너 섹션 코드
 */
export const BANNER_CODES = {
    /** 메인 배너 */
    MAIN: '000',
} as const;

export type BannerCode = typeof BANNER_CODES[keyof typeof BANNER_CODES];

