import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '8px 0',

    '@media': {
        [media.mobile]: {
            padding: '8px 0 0',
        },
    },
});

export const description = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['60'],
        marginBottom: '4px',
    },
]);

export const inputWrapper = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
});

export const input = style([
    textStyles.body1Regular,
    {
        width: '100%',
        height: '52px',
        padding: '0 16px',
        borderRadius: '8px',
        border: `1px solid ${vars.color.gray['20']}`,
        backgroundColor: vars.color.white,
        transition: 'all 0.2s ease-in-out',
        outline: 'none',

        ':focus': {
            borderColor: vars.color.pink['50'],
            boxShadow: `0 0 0 2px ${vars.color.pink['20']}`,
        },

        '::placeholder': {
            color: vars.color.gray['30'],
        },
    },
]);

export const submitButton = style([
    textStyles.body1Bold,
    {
        width: '100%',
        height: '52px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: vars.color.gray['20'],
        color: vars.color.gray['50'],
        cursor: 'not-allowed',
        transition: 'all 0.2s ease-in-out',

        selectors: {
            '&:not(:disabled)': {
                backgroundColor: vars.color.pink['50'],
                color: vars.color.white,
                cursor: 'pointer',
            },
            '&:not(:disabled):hover': {
                backgroundColor: vars.color.pink['80'],
            },
            '&:not(:disabled):active': {
                transform: 'scale(0.98)',
            },
        },
    },
]);
