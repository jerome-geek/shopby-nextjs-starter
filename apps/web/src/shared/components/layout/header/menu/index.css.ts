import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const container = style({
    position: 'static',
    display: 'flex',
    alignItems: 'center',
    gap: '24px',

    '@media': {
        [media.mobile]: {
            gap: 0,
        },
        [media.tablet]: {
            order: 2,
            flex: 1,
            gap: '12px',
        },
        [media.desktop]: {
            order: 2,
            flex: 1,
        },
    },
});

export const categoryButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    minWidth: '20px',

    '@media': {
        [media.desktop]: {
            gap: '8px',
            padding: '7.5px 10px',
            backgroundColor: vars.color.white,
            color: vars.color.black,
            border: `1px solid ${vars.color.gray['60']}`,
            borderRadius: '4px',
            transition: 'all 0.2s ease',
            zIndex: 101,

            ':hover': {
                backgroundColor: vars.color.gray['80'],
                borderColor: vars.color.gray['80'],
                color: vars.color.white,
            },

            selectors: {
                '&[aria-expanded="true"]': {
                    backgroundColor: vars.color.gray['80'],
                    borderColor: vars.color.gray['80'],
                    color: vars.color.white,
                },
                // headlineSemibold properties manually added here to avoid spread error
                '&': {
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    lineHeight: '1.399999976158142',
                    letterSpacing: '-0.20000000298023224%',
                },
            },
        },
    },
});

export const categoryText = style({
    display: 'none',

    '@media': {
        [media.desktop]: {
            display: 'inline',
        },
    },
});

export const menuListContainer = style({
    display: 'flex',
    alignItems: 'center',
    gap: '18px',

    '@media': {
        [media.mobile]: {
            display: 'none',
        },
    },
});

export const menuList = style({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
});

export const menuItem = style([
    textStyles.headlineSemibold,
    {
        color: vars.color.gray['80'],
        textDecoration: 'none',
        transition: 'color 0.2s ease',
        whiteSpace: 'nowrap',

        ':hover': {
            color: vars.color.black,
        },

        selectors: {
            '&[data-selected="true"]': {
                color: vars.color.black,
                fontWeight: 700,
            },
        },
    },
]);

export const separator = style({
    width: '1px',
    height: '12px',
    backgroundColor: vars.color.gray['50'],
});

export const homeItem = style([menuItem, { color: vars.color.black }]);
