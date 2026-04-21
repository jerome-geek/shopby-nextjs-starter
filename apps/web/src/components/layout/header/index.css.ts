import { globalStyle, style } from '@vanilla-extract/css';

import { globalVars } from '@/styles/global.css';
import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const header = style({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: vars.color.white,
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',

    '@media': {
        [media.tablet]: {
            borderBottom: `1px solid ${vars.color.gray['30']}`,
        },
        [media.desktop]: {
            borderBottom: `1px solid ${vars.color.gray['30']}`,
            flexDirection: 'row',
            padding: 0,
            height: globalVars.header.height,
        },
    },
});

export const headerInner = style({
    alignItems: 'center',
    maxWidth: '1240px',
    height: globalVars.header.mobileHeight,
    margin: '0 auto',
    width: '100%',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '32px',

    '@media': {
        [media.tablet]: {
            gap: '16px',
        },
        [media.mobile]: {
            alignItems: 'flex-end',
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            padding: '0 0 16px',
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
    justifyContent: 'center',
    width: '90px',
    height: '21px',
    flexShrink: 0,
    position: 'relative',

    '@media': {
        [media.tablet]: {
            order: 1,
            justifyContent: 'flex-start',
            marginRight: '16px',
            width: '90px',
            height: '21px',
        },
        [media.desktop]: {
            order: 1,
            justifyContent: 'flex-start',
            marginRight: '16px',
            width: '107px',
            height: '40px',
        },
    },
});

globalStyle(`${logo} > img`, {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
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
    backgroundColor: vars.color.gray['80'],
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
    justifyContent: 'flex-end',

    '@media': {
        [media.tablet]: {
            order: 3,
        },
        [media.desktop]: {
            order: 3,
        },
    },
});

export const iconList = style({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',

    '@media': {
        [media.desktop]: {
            gap: '16px',
        },
    },
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
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',

    ':hover': {
        opacity: 0.7,
    },

    '@media': {
        [media.tablet]: {
            display: 'flex',
        },
        [media.desktop]: {
            display: 'flex',
        },
    },
});

export const mobileVisibleIcon = style({
    display: 'flex !important',
});

export const mobileHiddenItem = style({
    display: 'none',

    '@media': {
        [media.tablet]: {
            display: 'list-item',
        },
        [media.desktop]: {
            display: 'list-item',
        },
    },
});

export const cartBadge = style([
    textStyles.caption2Semibold,
    {
        position: 'absolute',
        top: '-4px',
        right: '-4px',
        width: '15px',
        height: '15px',
        color: vars.color.white,
        backgroundColor: vars.color.pink['100'],
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
]);

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
