import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
});

export const pageList = style({
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    listStyle: 'none',
    gap: '8px',

    selectors: {
        '&[data-type="simple"]': {
            gap: '1.2rem',
        },
    },
});

export const slash = style({
    fontSize: '2rem',
    color: vars.color.gray[60],
    margin: '0 0.8rem',
});

export const pageButton = style([
    textStyles.body1Medium,
    {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '20px',
        padding: 0,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: vars.color.gray['60'],
        transition: 'color 0.2s ease',

        selectors: {
            '&[data-selected="true"]': {
                color: vars.color.black,
            },
            '&:hover:not([data-selected="true"])': {
                color: vars.color.black,
            },
        },
    },
]);

export const arrowButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: vars.color.gray['60'],
    transition: 'color 0.2s ease',

    selectors: {
        '&:hover:not(:disabled)': {
            color: vars.color.black,
        },
        '&:disabled': {
            cursor: 'default',
            opacity: 0.3,
        },
    },
});

export const arrowGroup = style({
    display: 'flex',
    alignItems: 'center',
    gap: vars.spacing.md,
});
