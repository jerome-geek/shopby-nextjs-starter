import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';

export const container = style({
    width: '100%',
    position: 'relative',
    transition: 'all 0.2s',
});

export const control = recipe({
    base: {
        border: `1px solid ${vars.color.gray['50']}`,
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '44px',
        padding: '0 2px 0 12px',
        backgroundColor: vars.color.white,
        transition: 'all 0.2s',
        cursor: 'pointer',

        '@media': {
            [media.desktop]: {
                height: '52px',
            },
        },
    },
    variants: {
        isFocused: {
            true: {
                borderColor: vars.color.gray['70'],
            },
        },
        isDisabled: {
            true: {
                cursor: 'not-allowed',
                opacity: 0.5,
            },
        },
    },
});

export const valueContainer = style({
    display: 'flex',
    gap: '4px',
    flex: 1,
});

export const menu = style([
    textStyles.body1Medium,
    {
        backgroundColor: vars.color.white,
        border: `1px solid ${vars.color.gray['50']}`,
        borderRadius: '4px',
        boxShadow: vars.shadow.sm,
        overflow: 'hidden',
        animation: 'slideDownFade 0.2s ease-out forwards',
        zIndex: 10,
        marginTop: 0,
    },
]);

export const menuList = style({
    padding: 0,
});

export const option = recipe({
    base: [
        {
            position: 'relative',
            display: 'block',
            width: '100%',
            padding: '16px',
            cursor: 'pointer',
            color: vars.color.gray['80'],
            transition: 'all 0.2s',
            pointerEvents: 'auto',
            selectors: {
                '&:hover': {
                    cursor: 'pointer',
                },
                '&:not(:last-child)::after': {
                    content: '""',
                    position: 'absolute',
                    left: '50%',
                    bottom: 0,
                    width: '95%',
                    transform: 'translateX(-50%)',
                    height: '1px',
                    backgroundColor: vars.color.gray['20'],
                },
            },
        },
    ],
    variants: {
        isFocused: {
            true: {
                cursor: 'pointer',
                backgroundColor: vars.color.gray['10'],
                color: vars.color.black,
            },
        },
        isSelected: {
            true: {
                cursor: 'pointer',
                backgroundColor: vars.color.gray['10'],
            },
        },
        isDisabled: {
            true: {
                cursor: 'not-allowed',
                color: vars.color.gray[50],
                textDecoration: 'line-through',
            },
        },
    },
});

export const placeholder = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['50'],
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        // '@media': {
        //     'screen and (min-width: 768px)': {
        //         fontSize: '1.5rem',
        //     },
        // },
    },
]);

export const singleValue = style({
    fontSize: '1.4rem',
    fontWeight: '500',
    color: vars.color.gray[70],
    '@media': {
        'screen and (min-width: 768px)': {
            fontSize: '1.5rem',
        },
    },
});

export const dropdownIndicator = recipe({
    base: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '16px',
        height: '16px',
        padding: 0,
        margin: '0 8px',
        color: vars.color.gray['60'],
        transition: 'transform 0.3s ease-in-out',
    },
    variants: {
        isOpened: {
            true: {
                transform: 'rotate(180deg)',
            },
        },
    },
});

export const noOptionsMessage = style([
    textStyles.body1Regular,
    {
        color: vars.color.black,
        padding: '16px',
    },
]);

export const menuPortal = style({
    zIndex: 9999,
});
