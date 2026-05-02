import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';

export const main = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '48px',

    '@media': {
        [media.desktop]: {
            gap: '96px',
            marginTop: '-12px',
        },
        [media.mobile]: {
            padding: '12px 0 0',
        },
    },
});

export const heroBannerSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    width: '100%',
    '@media': {
        [media.mobile]: {
            gap: '24px',
        },
    },
});
