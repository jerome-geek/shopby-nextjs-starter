import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    width: '100%',
    position: 'relative',
    transition: 'all 0.2s',
    minWidth: 0,
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
        padding: '12px 12px',
        backgroundColor: vars.color.white,
        boxSizing: 'border-box',
        cursor: 'pointer',
        minWidth: 0,

        '@media': {
            [media.desktop]: {
                height: '52px',
            },
        },
    },
    variants: {
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
    minWidth: 0,
});

export const menu = style([
    textStyles.body1Medium,
    {
        color: vars.color.gray['80'],
        backgroundColor: vars.color.white,
        border: `1px solid ${vars.color.gray['50']}`,
        boxShadow: vars.shadow.sm,
        overflow: 'hidden',
        animation: 'slideDownFade 0.2s ease-out forwards',
        zIndex: 10,
    },
]);

export const menuBottom = style({
    borderRadius: '0 0 4px 4px',
    marginTop: '-3px',
});

export const menuTop = style({
    borderRadius: '4px 4px 0 0',
    marginBottom: '-3px',
});

export const menuList = style({
    padding: 0,

    selectors: {
        '&::-webkit-scrollbar': {
            width: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: vars.color.gray['30'],
            borderRadius: '10px',
        },
    },
});

export const option = recipe({
    base: [
        {
            position: 'relative',
            display: 'block',
            width: '100%',
            padding: '12px',
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

            '@media': {
                [media.desktop]: {
                    padding: '16px',
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
    },
]);

export const singleValue = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['80'],
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        flex: 1,
        minWidth: 0,
    },
]);

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
    zIndex: '9999 !important',
});
