import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '4px',
});

export const button = style({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '16px',
    height: '16px',
    color: vars.color.gray['60'],
    selectors: {
        '&:disabled': {
            opacity: 0.5,
            cursor: 'not-allowed',
        },
    },
});

export const text = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

export const current = style([
    textStyles.body1Semibold,
    {
        color: vars.color.black,
        fontVariantNumeric: 'tabular-nums',
    },
]);

export const separator = style([
    textStyles.body1Medium,
    {
        color: vars.color.gray['60'],
    },
]);

export const total = style([
    textStyles.body1Medium,
    {
        color: vars.color.gray['60'],
        fontVariantNumeric: 'tabular-nums',
    },
]);
