import { style } from '@vanilla-extract/css';
import { media } from '@/styles/media';

export const iconSection = style({
    margin: '30px 0 0 0',

    '@media': {
        [media.tablet]: {
            margin: '36px 0 0 0',
        },
    },
});

// index.css.ts
export const bannerList = style({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px 8px',
    maxWidth: '1200px', // 적절한 최대 너비
    margin: '30px auto 0',
    padding: 0, // ul 기본 패딩 제거
    listStyle: 'none', // ul 기본 불렛 제거
});
export const bannerItem = style({
    flex: '0 0 auto',
    // li 관련 스타일
});
