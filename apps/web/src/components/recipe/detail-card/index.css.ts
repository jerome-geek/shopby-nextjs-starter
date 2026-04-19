import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';

export const recipeLink = style({
    display: 'flex',
    flexDirection: 'column',
    textDecoration: 'none',
    color: 'inherit',
    height: '100%',
    backgroundColor: vars.color.ivory['10'],
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


export const cardHeader = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px',
    marginBottom: '12px',
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
    gap: '8px',
    position: 'relative',
});

export const moreButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    color: vars.color.gray['40'],
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    selectors: {
        '&:hover': {
            backgroundColor: vars.color.gray['10'],
            color: vars.color.gray['90'],
        },
        '&:active': {
            transform: 'scale(0.92)',
        },
    },
});

export const actionMenu = style({
    position: 'absolute',
    top: '28px',
    right: '0',
    zIndex: 100,
    minWidth: '110px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(16px)',
    borderRadius: '12px',
    padding: '6px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
});

export const menuItem = style([
    textStyles.body2Regular,
    {
        padding: '10px 12px',
        borderRadius: '8px',
        textAlign: 'left',
        cursor: 'pointer',
        color: vars.color.gray['90'],
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: 'transparent',
        border: 'none',
        selectors: {
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
            '&[data-variant="danger"]': {
                color: '#ff4d4d',
            },
        },
    },
]);

export const recipeTitle = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        transition: 'text-decoration-color 120ms ease, opacity 120ms ease',
        '@media': {
            [media.mobile]: {
                fontSize: '1.5rem',
                fontWeight: 600,
                lineHeight: '1.4',
                letterSpacing: '-0.2%',
            },
        },
    },
]);

globalStyle(`${recipeLink} a:hover ${recipeTitle}`, {
    textDecoration: 'underline',
    textDecorationColor: vars.color.gray['50'],
});

export const recipeAuthor = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['80'],
        '@media': {
            [media.mobile]: {
                fontSize: '1.2rem',
                fontWeight: 400,
                lineHeight: '1.4',
                letterSpacing: '-2%',
            },
        },
    },
]);

export const recipeMeta = style({
    display: 'flex',
    gap: '12px',
    fontSize: '13px',
    flexWrap: 'wrap',
    marginBottom: '20px',
});

export const iconTimerText = style([
    textStyles.body2Semibold,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color: vars.color.gray['80'],
        '@media': {
            [media.mobile]: {
                fontSize: '1.2rem',
                fontWeight: 600,
                lineHeight: '1.4',
                letterSpacing: '-2%',
            },
        },
    },
]);

export const iconText = style([
    textStyles.body2Regular,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color: vars.color.gray['60'],
        '@media': {
            [media.mobile]: {
                fontSize: '1.2rem',
                fontWeight: 400,
                lineHeight: '1.4',
                letterSpacing: '-2%',
            },
        },
    },
]);

export const ingredientHeader = style({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '12px',
    height: '20px',
    '@media': {
        [media.mobile]: {
            height: '17px',
        },
    },
});

export const ingredientTitle = style([
    textStyles.body2Semibold,
    {
        color: vars.color.gray['90'],
    },
]);

// TODO: 툴팁 추가
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
});

export const ingredientContent = style({
    display: 'flex',
    gap: '16px',
    marginBottom: '16px',
    paddingBottom: '16px',
    borderBottom: `1px solid ${vars.color.gray['20']}`,
});

export const recipeThumbArea = style({
    width: '100%',
    maxWidth: '137px',
    maxHeight: '182px',
    aspectRatio: '137 / 182',
    borderRadius: '4px',
    overflow: 'hidden',
    flexShrink: 0,
    backgroundColor: vars.color.gray['10'],
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
});

export const ingredientList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
});

export const ingredientListItem = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['80'],
        display: 'flex',
        gap: '8px',
        height: '20px',
        alignContent: 'center',
        '@media': {
            [media.mobile]: {
                fontSize: '1.3rem',
                lineHeight: '1.3',
                letterSpacing: '-1.3%',
                height: '17px',
            },
        },
    },
]);

export const ingredientName = style({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textDecoration: 'underline',

    selectors: {
        '&:before': {
            content: '',
            width: '3px',
            height: '3px',
            backgroundColor: vars.color.green['80'],
            borderRadius: '50%',
            display: 'inline-block',
            marginRight: '6px',
            marginBottom: '4px',
        },
    },
});

export const ingredientAmount = style({
    flexShrink: 0,
});

export const moreText = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
        marginTop: '8px',
    },
]);

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
        minWidth: '20px',
        borderRadius: '50%',
        backgroundColor: vars.color.green['80'],
        color: vars.color.white,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',

        '@media': {
            [media.desktop]: {
                width: '20px',
                height: '20px',
            },
        },
    },
]);

export const stepText = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['80'],
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        minWidth: 0,
        display: '-webkit-box',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical',
    },
]);

export const bookmarkIcon = style({
    flexShrink: 0,
    color: vars.color.green['100'],
});
