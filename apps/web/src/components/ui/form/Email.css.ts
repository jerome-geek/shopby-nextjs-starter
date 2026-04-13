import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
});

export const inputRow = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

globalStyle(`${inputRow} > *`, {
    flex: 1,
    minWidth: 0,
});

globalStyle(`${inputRow} > span`, {
    flex: 'none',
});

export const atSign = style({
    fontSize: '1.2rem',
    '@media': {
        'screen and (min-width: 768px)': {
            fontSize: '1.4rem',
        },
    },
});
