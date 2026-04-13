import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',

    '@media': {
        [media.mobile]: {
            gap: '20px',
        },
    },
});
