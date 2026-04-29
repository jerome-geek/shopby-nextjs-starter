import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';

export const gridList = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    listStyle: 'none',
    padding: 0,
    margin: 0,

    '@media': {
        [media.desktop]: {
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
        },
    },
});

export const detailList = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '32px',
    listStyle: 'none',
    padding: 0,
    margin: 0,

    '@media': {
        [media.desktop]: {
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '40px',
        },
    },
});

export const listContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    transition: 'opacity 0.2s',
});

export const isPending = style({
    opacity: 0.5,
    pointerEvents: 'none',
});
