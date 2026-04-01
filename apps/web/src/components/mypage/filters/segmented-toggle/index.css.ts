import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const group = style({
    display: 'inline-flex',
    backgroundColor: vars.color.gray['10'],
    border: `1px solid ${vars.color.gray['30']}`,
    borderRadius: '4px',
    padding: '2px',
    gap: '2px',
});

export const button = style([
    textStyles.body2Semibold,
    {
        border: 0,
        background: 'transparent',
        padding: '0 14px',
        borderRadius: '4px',
        cursor: 'pointer',
        color: vars.color.gray['80'],
        transition: 'background-color 0.15s ease, color 0.15s ease',
        selectors: {
            '&:hover': {
                backgroundColor: vars.color.gray['20'],
            },
            '&[data-selected]': {
                backgroundColor: vars.color.white,
                color: vars.color.black,
            },
            '&[data-selected]:hover': {
                backgroundColor: vars.color.white,
            },
            '&:focus-visible': {
                outline: `2px solid ${vars.color.primary}`,
                outlineOffset: 2,
            },
        },
        '@media': {
            [media.tablet]: {
                fontSize: '1.4rem',
                fontWeight: 600,
                lineHeight: '1.4',
                letterSpacing: '-1.3%',
            },
            [media.desktop]: {
                fontSize: '1.4rem',
                fontWeight: 600,
                lineHeight: '1.4',
                letterSpacing: '-1.3%',
            },
        },
    },
]);

