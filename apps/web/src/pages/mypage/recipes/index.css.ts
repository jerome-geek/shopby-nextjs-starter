import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '24px 0',
    width: '100%',
    margin: '0 auto',

    '@media': {
        [media.desktop]: {
            gap: '32px',
            padding: '12px 0 40px',
        },
    },
});

export const header = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    '@media': {
        [media.mobile]: {
            justifyContent: 'end',
        },
    },
});

export const title = style([
    textStyles.title1Bold,
    {
        color: vars.color.black,
        '@media': {
            [media.mobile]: {
                display: 'none',
            },
        },
    },
]);

// Recipe Card Styles (Used by Skeleton and potentially other components)
export const recipeCard = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    cursor: 'pointer',
});

export const thumbArea = style({
    position: 'relative',
    aspectRatio: '3 / 4',
    borderRadius: '16px',
    overflow: 'hidden',
    backgroundColor: vars.color.gray['10'],
});

export const thumbImg = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.4s ease',
    selectors: {
        [`${recipeCard}:hover &`]: {
            transform: 'scale(1.05)',
        },
    },
});

export const recipeInfo = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
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
    },
]);

export const authorName = style([
    textStyles.body2Regular,
    { color: vars.color.gray['60'] },
]);
