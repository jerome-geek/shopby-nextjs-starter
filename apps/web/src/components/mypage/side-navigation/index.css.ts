import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const nav = style({
    flexShrink: 0,
    width: '200px',
    backgroundColor: vars.color.white,
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    padding: '80px 20px 0',
    borderRight: `1px solid ${vars.color.gray['40']}`,
    zIndex: 3,

    '@media': {
        [media.desktop]: {
            borderRight: 'none',
            height: 'auto',
            padding: 0,
            position: 'static',
            transform: 'translateX(0) !important',
            transition: 'none !important',
        },
    },
});

export const menuButtonContainer = style({
    position: 'absolute',
    top: `calc(var(--header-height) + 20px)`,
    right: '-60px',
    zIndex: 1000,
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const menuButton = style({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease',
    background: vars.color.white,
    border: `1px solid ${vars.color.gray['40']}`,
    borderRadius: '50%',

    selectors: {
        '&:hover': {
            background: vars.color.gray['20'],
        },
    },
});

export const group = style({
    marginBottom: '24px',
    selectors: {
        '&:last-child': {
            marginBottom: 0,
        },
    },
});

export const groupTitle = style([
    textStyles.headingSemibold,
    {
        marginBottom: '10px',
        color: vars.color.black,
    },
]);

export const list = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    margin: 0,
    padding: 0,
    listStyle: 'none',
});

export const link = style([
    textStyles.body1Regular,
    {
        display: 'block',
        padding: '4px 0',
        color: vars.color.gray['80'],
        textDecoration: 'none',
        transition: 'color 0.2s ease, transform 0.2s ease',

        ':hover': {
            color: vars.color.black,
            transform: 'translateX(2px)',
        },
    },
]);

export const linkActive = style({
    fontWeight: vars.typography.fontWeight.semibold,
    color: vars.color.black,
});

export const buttonLink = style([
    link,
    {
        width: '100%',
        textAlign: 'left',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'inherit',
    },
]);
