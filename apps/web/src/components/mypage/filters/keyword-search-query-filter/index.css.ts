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

globalStyle(`${container} > div > input`, {
    height: '42px',
    padding: '0 12px',
    paddingRight: '44px',
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

export const typeSelectContainer = style({
    height: '42px',
});

export const inputWrapper = style({
    position: 'relative',
});

export const searchButton = style({
    height: '100%',
    fontSize: '1.4rem',
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    padding: '6px 0',
    border: 0,
    background: 'transparent',
    cursor: 'pointer',

    '@media': {
        [media.mobile]: {
            height: '44px',
        },
    },
});
