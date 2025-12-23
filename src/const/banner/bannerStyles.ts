/**
 * 배너 스타일
 */
// TODO: 추후 사용 여부 확인 후 정리
export const BANNER_STYLES = {
    MAIN: {
        COMMON: {
            aspectRatio: '4/5' as const,
            autoplayDelay: 3000,
        },
        SECTION: {
            width: '100vw',
            marginLeft: 'calc(50% - 50vw)',
            marginRight: 'calc(50% - 50vw)',
            padding: '12px 0',
            '@media (min-width: 768px)': {
                padding: '24px 0',
            },
            overflow: 'hidden',
        },
    },
} as const;
