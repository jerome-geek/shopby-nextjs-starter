import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';
import { media } from '@/styles/media';
import { textStyles } from '@/styles/typography.css';
import { globalVars } from '@/styles/global.css';

export const header = style({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: globalVars.header.mobileHeight,
    zIndex: 1000,
    backgroundColor: vars.color.white,
    borderBottom: `1px solid ${vars.color.gray['30']}`,
    padding: '0 20px',

    '@media': {
        [media.desktop]: {
            padding: 0,
            height: globalVars.header.height,
        },
    },
});

export const headerInner = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    height: '100%',
    margin: '0 auto',
    gap: '16px',

    '@media': {
        [media.tablet]: {
            gap: '32px',
        },
        [media.desktop]: {
            gap: '32px',
        },
    },
});

export const logoSection = style({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',

    '@media': {
        [media.tablet]: {
            gap: '24px',
        },
        [media.desktop]: {
            gap: '24px',
        },
    },
});

export const logo = style({
    display: 'flex',
    alignItems: 'center',
    width: '107px',
    height: '40px',
    flexShrink: 0,
});

export const recipeButton = style([
    textStyles.headlineSemibold,
    {
        display: 'none',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 10px',
        backgroundColor: vars.color.green['100'],
        color: vars.color.white,
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        whiteSpace: 'nowrap',

        ':hover': {
            backgroundColor: vars.color.gray['90'],
        },

        '@media': {
            [media.desktop]: {
                display: 'flex',
            },
        },
    },
]);

export const nav = style({
    display: 'none',
    alignItems: 'center',
    gap: '24px',

    '@media': {
        [media.tablet]: {
            display: 'flex',
        },
        [media.desktop]: {
            display: 'flex',
        },
    },
});

export const navLink = style({
    fontSize: '14px',
    fontWeight: 500,
    color: vars.color.gray['80'],
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'all 0.2s ease',

    ':hover': {
        backgroundColor: vars.color.gray['20'],
        color: vars.color.black,
    },
});

export const navLinkActive = style({
    backgroundColor: vars.color.gray['100'],
    color: vars.color.white,

    ':hover': {
        backgroundColor: vars.color.gray['80'],
        color: vars.color.white,
    },
});

export const utilitySection = style({
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
});

export const iconList = style({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
});

export const iconButton = style({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    border: 'none',
    background: 'transparent',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',

    ':hover': {
        backgroundColor: vars.color.gray['20'],
    },
});

export const mobileMenuButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    border: 'none',
    background: 'transparent',
    borderRadius: '50%',
    cursor: 'pointer',

    '@media': {
        [media.tablet]: {
            display: 'none',
        },
        [media.desktop]: {
            display: 'none',
        },
    },
});

export const iconLink = style({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',

    ':hover': {
        opacity: 0.7,
    },
});

export const cartBadge = style({
    position: 'absolute',
    top: '-6px',
    right: '-6px',
    width: '20px',
    height: '20px',
    color: vars.color.white,
    backgroundColor: vars.color.red,
    borderRadius: '50%',

    fontWeight: 600,
    fontSize: '1rem',
    lineHeight: '150%',
    letterSpacing: '-2%',
    textAlign: 'center',
});

export const searchIcon = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
    order: 1,

    ':hover': {
        opacity: 0.7,
    },

    '@media': {
        [media.tablet]: {
            order: 2,
        },
        [media.desktop]: {
            order: 2,
        },
    },
});

export const alarmIcon = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
    order: 2,

    ':hover': {
        opacity: 0.7,
    },

    '@media': {
        [media.tablet]: {
            display: 'none',
        },
        [media.desktop]: {
            display: 'none',
        },
    },
});
