import { style, globalStyle } from '@vanilla-extract/css';

export const closeButton = style({
    position: 'absolute',
    top: '26px',
    right: '26px',
    zIndex: 10,
    '@media': {
        'screen and (min-width: 768px)': {
            top: '32px',
            right: '32px',
        },
    },
});

export const titleContainer = style({
    padding: '33px 32px 25px 32px',
    position: 'relative',
});

export const contentContainer = style({
    padding: '0 32px 32px 32px',
    height: '100%',
    maxHeight: '70vh',
    overflowY: 'scroll',
});

globalStyle(`${contentContainer} *`, {
    all: 'revert',
});
