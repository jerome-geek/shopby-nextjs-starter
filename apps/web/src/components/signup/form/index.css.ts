import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';

export const button = style({
    height: '100%',
    fontSize: '1.6rem',

    '@media': {
        [media.mobile]: {
            fontSize: '1.4rem',
        },
    },
});
