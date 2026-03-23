import { media } from '@/styles/media';
import { style } from '@vanilla-extract/css';

export const container = style({
    display: 'flex',
    gap: '18px',
});

export const list = style({
    display: 'flex',

    '@media': {
        [media.desktop]: {
            gap: '18px',
        },
    },
});
