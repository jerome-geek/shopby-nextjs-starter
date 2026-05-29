import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const group = style({
    backgroundColor: vars.color.gray['10'],
    border: `1px solid ${vars.color.gray['30']}`,
    borderRadius: '4px',
    padding: '2px',
    maxWidth: 'calc(100% - 192px)',

    '@media': {
        [media.mobile]: {
            maxWidth: '100%',
        },
    },
});

export const button = style([
    textStyles.body2Semibold,
    {
        position: 'relative',
        border: 0,
        background: 'transparent',
        padding: '0 14px',
        borderRadius: '4px',
        cursor: 'pointer',
        color: vars.color.gray['80'],
        transition:
            'background-color 0.15s ease, color 0.15s ease, opacity 0.15s ease',
        selectors: {
            '&:hover': {
                backgroundColor: vars.color.gray['20'],
            },
            '&[data-selected=true]': {
                color: vars.color.white,
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

export const label = style({
    position: 'relative',
    zIndex: 2,
    whiteSpace: 'nowrap',
});

export const indicator = style({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: vars.color.black,
    borderRadius: '4px',
    zIndex: 1,
});
