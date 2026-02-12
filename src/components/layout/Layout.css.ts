import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';

export const layout = style({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%',
});

export const main = style({
    flex: 1,
    width: '100%',
    paddingTop: '64px', // Header 높이만큼 여백 추가

    '@media': {
        [media.mobile]: {
            paddingTop: '56px', // 모바일 Header 높이에 맞춤
        },
    },
});
