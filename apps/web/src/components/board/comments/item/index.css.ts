import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';

export const commentListItem = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    paddingBottom: '20px',
    borderBottom: `1px solid ${vars.color.gray['20']}`,

    '@media': {
        [media.desktop]: {
            gap: '8px',
            paddingBottom: '24px',
        },
    },
});

export const commentItemHeader = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
});

export const registerName = style([
    textStyles.body1Semibold,
    {
        color: vars.color.gray['90'],
        '@media': {
            [media.desktop]: {
                fontSize: '1.5rem',
                letterSpacing: '-0.2%',
            },
        },
    },
]);

export const date = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
        '@media': {
            [media.desktop]: {
                fontSize: '1.3rem',
                lineHeight: '1.3',
                letterSpacing: '-1.3%',
            },
        },
    },
]);

export const headerButton = style([
    textStyles.caption2Regular,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color: vars.color.gray['60'],
        '@media': {
            [media.desktop]: {
                fontSize: '1.2rem',
                letterSpacing: '-2%',
            },
        },
    },
]);

export const content = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['80'],
        whiteSpace: 'pre-wrap',
        '@media': {
            [media.desktop]: {
                fontSize: '1.4rem',
                lineHeight: '1.4',
                letterSpacing: '-2%',
            },
        },
    },
]);

export const commentContainer = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '14px',
    padding: '20px 16px',
    borderRadius: '8px',
    background: vars.color.ivory['10'],
});

export const registerButton = style([
    textStyles.body2Semibold,
    {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '29px',
        padding: '0 8px',
        color: vars.color.gray['60'],
        borderRadius: '2px',
        background: vars.color.gray['20'],

        ':hover': {
            background: vars.color.gray['80'],
            color: vars.color.white,
        },

        '@media': {
            [media.desktop]: {
                fontSize: '1.4rem',
                lineHeight: '1.4',
            },
        },
    },
]);
