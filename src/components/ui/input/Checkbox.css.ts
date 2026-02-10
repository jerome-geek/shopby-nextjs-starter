import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/styles/theme.css';

export const checkboxRoot = recipe({
    base: {
        width: 'var(--checkbox-size, 18px)',
        height: 'var(--checkbox-size, 18px)',
        backgroundColor: vars.color.white,
        color: vars.color.white,
        border: `1px solid ${vars.color.gray[50]}`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0',
        position: 'relative',
        cursor: 'pointer',
    },
    variants: {
        disabled: {
            true: {
                cursor: 'not-allowed',
                backgroundColor: vars.color.gray[20],
            },
        },
    },
});

export const checkboxIndicator = recipe({
    base: {
        color: vars.color.black,
        backgroundColor: vars.color.black,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    variants: {
        disabled: {
            true: {
                opacity: 0.5,
            },
        },
    },
});

export const checkIcon = style({
    color: vars.color.white,
});
