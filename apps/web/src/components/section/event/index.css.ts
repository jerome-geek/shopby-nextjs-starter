import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';

export const container = style({
    display: 'flex',
    gap: '48px',
    alignItems: 'center',
    flexDirection: 'row',
    '@media': {
        [media.tablet]: {
            gap: '24px',
        },
        [media.mobile]: {
            flexDirection: 'column',
            gap: '20px',
        },
    },
});
