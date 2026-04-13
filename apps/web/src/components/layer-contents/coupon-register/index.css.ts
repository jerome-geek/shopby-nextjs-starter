import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { media } from '@/styles/media';

export const form = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
});

export const description = style({
    fontSize: '1.4rem',
    color: vars.color.gray['70'],

    '@media': {
        [media.mobile]: {
            fontSize: '1.2rem',
        },
    },
});
