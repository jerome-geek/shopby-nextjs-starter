import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';

export const contentWrapper = style({
    display: 'block',
    margin: '60px 0',

    '@media': {
        [media.mobile]: {
            display: 'none',
        },
    },
});

export const mobileContentWrapper = style({
    display: 'none',

    '@media': {
        [media.mobile]: {
            display: 'block',
            margin: '40px 0',
        },
    },
});

export const image = style({
    width: '100%',
});

export const htmlContent = style({
    width: '100%',
});
