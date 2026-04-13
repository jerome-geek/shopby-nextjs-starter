import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const Container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
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
    display: 'flex',
    gap: '24px',
});

export const RecipeListItem = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
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
    },
]);

export const RecipeDescription = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['60'],
    },
]);
