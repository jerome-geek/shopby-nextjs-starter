import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';

export const inputContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',

    '@media': {
        [media.desktop]: {
            gap: '16px',
        },
    },
});
