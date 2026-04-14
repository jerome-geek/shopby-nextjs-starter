import { style } from '@vanilla-extract/css';

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

    '@media': {
        [media.mobile]: {
            gap: '15px',
        },
    },
});

export const RecipeListItem = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
});

export const RecipeImage = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 180ms ease-out',
    willChange: 'transform',
});

export const RecipeContentsContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
});
