import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';

export const Container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%',
});

export const RecipeSectionHeader = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export const RecipeSectionTitleContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
});

export const RecipeSectionTitle = style([
    textStyles.title1Bold,
    {
        color: vars.color.black,
    },
]);

export const RecipeSectionSubTitle = style([
    textStyles.headlineRegular,
    {
        color: vars.color.gray['60'],
    },
]);

export const DetailLink = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['60'],
        display: 'flex',
        gap: '4px',
    },
]);

export const RecipeList = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
});

export const RecipeListItem = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
});

export const RecipeCardLink = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
    color: 'inherit',
    textDecoration: 'none',
});

export const RecipeCardThumbWrapper = style({
    width: '100%',
    aspectRatio: '268/357',
    borderRadius: '8px',
    overflow: 'hidden',
    objectFit: 'cover',

    '@media': {
        [media.mobile]: {
            aspectRatio: '160/213',
            borderRadius: '4px',
        },
    },
});

export const RecipeImage = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 180ms ease-out',
    willChange: 'transform',

    selectors: {
        [`${RecipeCardLink}:hover &`]: {
            transform: 'scale(1.04)',
        },
        [`${RecipeCardLink}:focus-visible &`]: {
            transform: 'scale(1.04)',
        },
    },
});

export const RecipeContentsContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
});

export const RecipeTitle = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical',
    },
]);

export const RecipeDescription = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['60'],
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical',
    },
]);

export const RecipeMetaList = style({
    display: 'flex',
    gap: '12px',
});

export const RecipeMetaItem = style({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
});

export const RecipeMetaItemText = style([textStyles.body2Regular]);
