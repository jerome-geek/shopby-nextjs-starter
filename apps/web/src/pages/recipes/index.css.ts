import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '24px 0',
    maxWidth: '1200px',
    margin: '0 auto',

    '@media': {
        [media.desktop]: {
            gap: '32px',
            padding: '40px 0',
        },
    },
});

export const header = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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

export const viewToggle = style({
    display: 'flex',
    backgroundColor: '#f2f5f1',
    padding: '2px',
    borderRadius: '36px',
    gap: '2px',
    position: 'relative',
    border: '1px solid rgba(0, 0, 0, 0.02)',
    cursor: 'pointer',
    width: 'fit-content',
    outline: 'none',
    transition: 'all 0.2s ease',
    selectors: {
        '&:active': { transform: 'scale(0.96)' },
    },
});

export const toggleItem = style({
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '36px',
    position: 'relative',
    zIndex: 1,

    '@media': {
        [media.desktop]: {
            width: '36px',
            height: '36px',
        },
    },
});

export const toggleActiveBg = style({
    position: 'absolute',
    top: '2px',
    left: '2px',
    width: '32px',
    height: '32px',
    borderRadius: '32px',
    backgroundColor: vars.color.white,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    zIndex: 0,

    '@media': {
        [media.desktop]: {
            width: '36px',
            height: '36px',
        },
    },
});

export const gridList = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    listStyle: 'none',
    padding: 0,
    margin: 0,

    '@media': {
        [media.desktop]: {
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
        },
    },
});

export const detailList = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '32px',
    listStyle: 'none',
    padding: 0,
    margin: 0,

    '@media': {
        [media.desktop]: {
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '40px',
        },
    },
});

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

export const listContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    transition: 'opacity 0.2s',
});

export const isPending = style({
    opacity: 0.5,
    pointerEvents: 'none',
});
