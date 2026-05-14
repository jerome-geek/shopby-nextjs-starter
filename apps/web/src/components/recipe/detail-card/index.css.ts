import { globalStyle, style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

/** ───────────────────────────────────────────────────────
 * 1. Root & Base Styles
 * ────────────────────────────────────────────────────── */

export const recipeLink = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    color: 'inherit',
    height: '100%',
    backgroundColor: vars.color.ivory['20'],
    border: `1px solid ${vars.color.ivory['30']}`,
    borderRadius: '8px',
    overflow: 'hidden',
    padding: '16px',
    width: '100%',
});

globalStyle(`${recipeLink} a`, {
    color: 'inherit',
    textDecoration: 'none',
});

globalStyle(`${recipeLink} a:hover`, {
    cursor: 'pointer',
});

globalStyle(`${recipeLink} a:focus-visible`, {
    outline: `2px solid ${vars.color.green['80']}`,
    outlineOffset: 2,
    borderRadius: 4,
});

/** ───────────────────────────────────────────────────────
 * 2. Layout Structure
 * ────────────────────────────────────────────────────── */

export const cardBody = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',

    '@media': {
        [media.desktop]: {
            gap: '20px',
        },
    },
});

export const headerSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
});

export const cardHeader = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px',
});

export const cardTitleArea = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    minWidth: 0,
    flex: 1,
});

export const titleRow = style({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '12px',
    position: 'relative',
});

export const titleLink = style({
    flex: 1,
    minWidth: 0,
});

/** ───────────────────────────────────────────────────────
 * 3. Content Elements
 * ────────────────────────────────────────────────────── */

export const recipeTitle = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        height: '2.8em',
        transition: 'text-decoration-color 120ms ease, opacity 120ms ease',
    },
]);

globalStyle(`${recipeLink} a:hover ${recipeTitle}`, {
    textDecoration: 'underline',
    textDecorationColor: vars.color.gray['50'],
});

export const recipeAuthor = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
        '@media': {
            [media.desktop]: {
                ...textStyleTokens.body2Regular,
            },
        },
    },
]);

export const recipeMeta = style([
    textStyles.caption1Regular,
    {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.body2Semibold,
            },
        },
    },
]);

export const iconTimerText = style([
    textStyles.caption1Semibold,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color: vars.color.gray['80'],

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.body2Semibold,
            },
        },
    },
]);

export const iconText = style({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    color: vars.color.gray['60'],
});

/** ───────────────────────────────────────────────────────
 * 4. Ingredients Section
 * ────────────────────────────────────────────────────── */

export const ingredientContent = style({
    display: 'flex',
    gap: '10px',

    '@media': {
        [media.desktop]: {
            gap: '12px',
        },
    },
});

export const recipeThumbArea = style({
    width: '112px',
    height: '149px',
    aspectRatio: '112 / 149',
    borderRadius: '4px',
    overflow: 'hidden',
    flexShrink: 0,
    backgroundColor: vars.color.gray['10'],

    '@media': {
        [media.desktop]: {
            width: '137px',
            height: '182px',
            aspectRatio: '137 / 182',
        },
    },
});

export const recipeThumb = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 160ms ease, filter 160ms ease',
});

globalStyle(`${recipeLink} a:hover ${recipeThumb}`, {
    transform: 'scale(1.02)',
    filter: 'brightness(0.95)',
});

export const ingredientContainer = style({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: '10px',
    width: 'calc(100% - 122px)',

    '@media': {
        [media.desktop]: {
            gap: '12px',
            width: 'calc(100% - 149px)',
        },
    },
});

export const ingredientHeader = style({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',

    '@media': {
        [media.desktop]: {
            gap: '6px',
        },
    },
});

export const ingredientTitle = style([
    textStyles.body1Semibold,
    {
        color: vars.color.gray['90'],

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.body1Semibold,
            },
        },
    },
]);

export const infoDot = style({
    width: 13,
    height: 13,
    borderRadius: '50%',
    backgroundColor: vars.color.gray['50'],
    color: vars.color.white,
    fontSize: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    cursor: 'help',
});

export const ingredientList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',

    '@media': {
        [media.desktop]: {
            gap: '6px',
        },
    },
});

export const ingredientListItem = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['80'],
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        minWidth: 0,

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.body1Regular,
                gap: '8px',
            },
        },

        selectors: {
            '&:before': {
                content: "''",
                width: '3px',
                height: '3px',
                backgroundColor: vars.color.green['80'],
                borderRadius: '50%',
                display: 'inline-block',
                marginRight: '8px',
                flexShrink: 0,

                '@media': {
                    [media.desktop]: {
                        marginRight: '6px',
                    },
                },
            },
        },
    },
]);

export const ingredientName = style({
    display: 'block',
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textDecoration: 'underline',
    textDecorationStyle: 'solid',
    textDecorationSkipInk: 'auto',
    textUnderlineOffset: '15%',
    textDecorationThickness: '5%',
    lineHeight: '1.4',

    selectors: {
        '&:hover': {
            color: vars.color.green['80'],
        },
    },

    '@media': {
        [media.desktop]: {
            textUnderlineOffset: '15%',
            textDecorationThickness: '5%',
        },
    },
});

export const ingredientSeparator = style({
    color: vars.color.gray['50'],
    flexShrink: 0,
});

export const ingredientAmount = style({
    flexShrink: 0,
    color: vars.color.gray['80'],
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
});

/** ───────────────────────────────────────────────────────
 * 5. Steps Section
 * ────────────────────────────────────────────────────── */

export const stepSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
});

export const stepTitle = style([
    textStyles.body1Semibold,
    {
        color: vars.color.gray['90'],
    },
]);

export const stepList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    listStyle: 'none',
    padding: 0,
    margin: 0,

    '@media': {
        [media.desktop]: {
            gap: '10px',
        },
    },
});

export const stepItem = style({
    display: 'flex',
    gap: '6px',
    alignItems: 'flex-start',
    minWidth: 0,

    '@media': {
        [media.desktop]: {
            gap: '8px',
        },
    },
});

export const stepNumber = style([
    textStyles.caption2Semibold,
    {
        width: '17px',
        height: '17px',
        aspectRatio: '1 / 1',
        borderRadius: '50%',
        backgroundColor: vars.color.green['80'],
        color: vars.color.white,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginTop: '3px',

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.caption1Semibold,
                width: '20px',
                height: '20px',
                marginTop: '0',
            },
        },
    },
]);

export const stepText = style([
    textStyles.headlineRegular,
    {
        color: vars.color.gray['80'],
        flex: 1,
        minWidth: 0,
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        lineHeight: '1.5',

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.body1Regular,
            },
        },
    },
]);

export const buttonContainer = style({
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    gap: '2px',
});

/** ───────────────────────────────────────────────────────
 * 6. Utilities
 * ────────────────────────────────────────────────────── */

export const bookmarkIcon = style({
    flexShrink: 0,
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const divider = style({
    width: '100%',
    height: '1px',
    border: 'none',
    backgroundColor: vars.color.gray['20'],
});
