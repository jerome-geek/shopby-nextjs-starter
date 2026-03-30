import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';

export const form = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',

    '@media': {
        [media.mobile]: {
            gap: '16px',
        },
    },
});
