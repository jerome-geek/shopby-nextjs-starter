import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { media } from '@/styles/media';
import { textStyles } from '@/styles/typography.css';

export const footer = style({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '64px',
    backgroundColor: vars.color.white,
    borderTop: `1px solid ${vars.color.gray['20']}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    paddingBottom: 'calc(20px + env(safe-area-inset-bottom))',
    zIndex: 1000,
    boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',

    '@media': {
        [media.tablet]: {
            display: 'none',
        },
        [media.desktop]: {
            display: 'none',
        },
    },
});

export const buttonContainer = style({
    display: 'flex',
    gap: '16px',
});

export const actionButton = style([
    textStyles.body2Regular,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        color: vars.color.gray['60'],
        background: 'none',
        border: 'none',
        cursor: 'pointer',

        selectors: {
            '&[data-active="true"][data-type="like"]': {
                color: vars.color.pink['80'],
            },
            '&[data-active="true"][data-type="bookmark"]': {
                color: vars.color.green['100'],
            },
        },
    },
]);
