import { globalStyle, style } from '@vanilla-extract/css';

import { media } from '@/styles/media';

export const container = style({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 'auto',
    marginTop: '10px',
    width: '60%',

    '@media': {
        [media.mobile]: {
            width: '100%',
            marginTop: '0',
        },
    },
});

globalStyle(`${container} > input`, {
    height: '100%',
    padding: '0 12px',

    '@media': {
        [media.mobile]: {
            height: '44px',
        },
    },
});

export const row = style({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '8px',
    marginTop: '12px',
    width: '100%',
});

export const typeSelect = style({
    minWidth: '120px',
    flex: '0 0 auto',
    '@media': {
        [media.mobile]: {
            width: '100%',
        },
    },
});

export const searchButton = style({
    height: '100%',
    fontSize: '1.4rem',

    '@media': {
        [media.mobile]: {
            height: '44px',
        },
    },
});
