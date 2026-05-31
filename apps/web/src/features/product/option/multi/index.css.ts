import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';

export const list = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
});

export const listItem = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',

    '@media': {
        [media.desktop]: {
            gap: '12px',
        },
    },
});
