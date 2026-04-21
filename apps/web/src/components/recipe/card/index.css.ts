import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const recipeCard = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'inherit',

    '@media': {
        [media.desktop]: {
            gap: '16px',
        },
    },
});

export const recipeThumbWrapper = style({
    position: 'relative',
    width: '100%',
    aspectRatio: '3 / 4',
    borderRadius: '8px',
    overflow: 'hidden',
    background: vars.color.gray['10'],
});

export const recipeThumb = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',

    selectors: {
        [`${recipeCard}:hover &`]: {
            transform: 'scale(1.04)',
        },
    },
});

export const recipeBookmarkButton = style({
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,

    '@media': {
        [media.desktop]: {
            bottom: '14px',
            right: '14px',
        },
    },
});

export const recipeTitle = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        height: '3em',
        '@media': {
            [media.mobile]: {
                fontSize: '1.4rem',
                lineHeight: '1.4',
                letterSpacing: '-1.3%',
                height: 'auto',
            },
        },
    },
]);

export const recipeAuthor = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['60'],
        '@media': {
            [media.mobile]: {
                fontSize: '1.2rem',
                lineHeight: '1.4',
                letterSpacing: '-2%',
            },
        },
    },
]);

export const recipeInfo = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
});

export const recipeHeader = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',

    '@media': {
        [media.desktop]: {
            gap: '2px',
        },
    },
});

export const recipeMeta = style([
    textStyles.body2Semibold,
    {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        color: vars.color.gray['60'],
        listStyle: 'none',
        padding: 0,
        margin: 0,

        '@media': {
            [media.desktop]: {
                gap: '12px',
            },
            [media.mobile]: {
                fontSize: '1.2rem',
                lineHeight: '1.4',
                letterSpacing: '-2%',
            },
        },
    },
]);

export const recipeTimerMetaItem = style({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    color: vars.color.gray['80'],
});

export const recipeServingsMetaItem = style({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    color: vars.color.gray['60'],
});
