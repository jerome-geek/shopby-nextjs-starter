import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '48px',

    '@media': {
        [media.desktop]: {
            gap: '96px',
        },
    },
});
