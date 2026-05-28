import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

export const quantityController = style({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: 'fit-content',
    border: `1px solid ${vars.color.gray['20']}`,
    backgroundColor: vars.color.white,
    borderRadius: '2px',
    padding: '6px',

    '@media': {
        [media.desktop]: {
            border: `1px solid ${vars.color.gray['30']}`,
            borderRadius: '4px',
            padding: '4px',
        },
    },
});

export const quantityButton = style({
    width: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: vars.color.gray['90'],

    '@media': {
        [media.desktop]: {
            width: '24px',
            height: '24px',
            color: vars.color.gray['60'],
        },
    },

    selectors: {
        '&:disabled': {
            opacity: 0.2,
            cursor: 'not-allowed',
        },
    },
});

export const quantityValue = style([
    textStyles.caption1Regular,
    {
        width: '15px',
        textAlign: 'center',
        color: vars.color.gray['80'],

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.body2Regular,
            },
        },
    },
]);
