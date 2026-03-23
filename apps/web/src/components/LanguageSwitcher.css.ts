import { style } from '@vanilla-extract/css';

export const container = style({
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
});

export const button = style({
    transition: 'opacity 0.2s ease',
});
