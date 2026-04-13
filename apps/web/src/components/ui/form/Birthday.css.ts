import { style, globalStyle } from '@vanilla-extract/css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
});

export const inputRow = style({
    display: 'flex',
    gap: '8px',
});

globalStyle(`${inputRow} > *`, {
    flex: 1,
    minWidth: 0,
});
