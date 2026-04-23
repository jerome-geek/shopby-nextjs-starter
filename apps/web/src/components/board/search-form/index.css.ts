import { globalStyle, style } from '@vanilla-extract/css';

import { media } from '@/styles/media';

export const searchTypeSelect = style({
    width: '160px',
    minWidth: '160px',

    '@media': {
        [media.mobile]: {
            width: '120px',
            minWidth: '120px',
            flexShrink: 0,
        },
    },
});

export const searchInputWrapper = style({
    flex: 'none',
    width: 'auto',
    maxWidth: '180px',

    '@media': {
        [media.mobile]: {
            flex: 1,
            width: '100%',
            maxWidth: 'none',
        },
    },
});

globalStyle(`${searchInputWrapper} input`, {
    height: '46px !important',
    minHeight: '46px !important',
});

export const searchSelectControl = style({
    height: '46px !important',
    minHeight: '46px !important',
});

export const searchSubmitButton = style({
    width: '46px !important',
    height: '46px !important',
    minWidth: '46px !important',
    minHeight: '46px !important',
    flexShrink: 0,
    padding: 0,
});

export const searchForm = style({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    flexWrap: 'nowrap',
    zIndex: 2,
    width: 'auto',

    '@media': {
        [media.mobile]: {
            width: '100%',
        },
    },
});
