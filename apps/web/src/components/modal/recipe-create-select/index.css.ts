import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '8px 0 0',
});

export const button = style([
    textStyles.body1Semibold,
    {
        width: '100%',
        height: '56px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
        ':active': {
            transform: 'scale(0.98)',
        },
    },
]);

export const aiButton = style([
    button,
    {
        backgroundColor: vars.color.pink['20'],
        color: vars.color.pink['80'],
        ':hover': {
            backgroundColor: vars.color.pink['50'],
        },
    },
]);

export const directButton = style([
    button,
    {
        backgroundColor: vars.color.green['80'],
        color: vars.color.white,
        ':hover': {
            backgroundColor: vars.color.green['100'],
        },
    },
]);
