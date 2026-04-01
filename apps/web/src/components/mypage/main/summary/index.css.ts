import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';

export const section = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
});

export const header = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: vars.color.black,
    color: vars.color.white,
    padding: '20px',
    borderRadius: '4px',
});

export const welcome = style({
    margin: 0,
    lineHeight: vars.typography.lineHeight.base,
    fontSize: '1.8rem',

    '@media': {
        [media.mobile]: {
            fontSize: '1.6rem',
        },
    },
});

export const badge = style([
    textStyles.caption1Semibold,
    {
        fontSize: '1.6rem',
        display: 'inline-block',
        padding: '6px 10px',
        backgroundColor: vars.color.primary,
        color: vars.color.white,
        marginRight: '16px',

        '@media': {
            [media.mobile]: {
                fontSize: '1.4rem',
                marginRight: '12px',
            },
        },
    },
]);

export const logoutButton = style([
    textStyles.caption1Semibold,
    {
        fontSize: '1.4rem',
        background: 'transparent',
        color: vars.color.white,
        textDecoration: 'underline',
        cursor: 'pointer',
    },
]);

export const list = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
    backgroundColor: vars.color.white,

    '@media': {
        [media.mobile]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },
    },
});

export const item = style({
    backgroundColor: vars.color.gray['10'],
    border: `1px solid ${vars.color.gray['30']}`,
    borderRadius: '4px',
    padding: '14px 12px',
    textAlign: 'left',
});

export const title = style([
    textStyles.headlineRegular,
    {
        display: 'block',
        color: vars.color.gray['80'],
        marginBottom: '8px',

        '@media': {
            [media.mobile]: {
                fontSize: '1.2rem',
            },
        },
    },
]);

export const value = style([
    textStyles.headlineBold,
    {
        display: 'block',
        color: vars.color.black,

        '@media': {
            [media.mobile]: {
                fontSize: '1.4rem',
            },
        },
    },
]);
