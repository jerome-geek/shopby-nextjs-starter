import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';

export const RecipeLink = style({
    display: 'block',
    textDecoration: 'none',
    color: 'inherit',
    height: '100%',
    backgroundColor: vars.color.ivory['10'],
    borderRadius: '8px',
    overflow: 'hidden',
    width: '100%',
});

export const CardContent = style({
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
});

export const CardHeader = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px',
    marginBottom: '12px',
});

export const CardTitleArea = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    minWidth: 0,
});

export const RecipeTitle = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
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

export const RecipeAuthor = style([
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

export const RecipeMeta = style({
    display: 'flex',
    gap: '12px',
    fontSize: '13px',
    flexWrap: 'wrap',
    marginBottom: '20px',
});

export const IconTimerText = style([
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

export const IconText = style([
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

export const IngredientHeader = style({
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

export const IngredientTitle = style([
    textStyles.body2Semibold,
    { color: vars.color.black, lineHeight: '13px' },
]);

export const InfoDot = style({
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

export const IngredientContent = style({
    display: 'flex',
    gap: '16px',
    marginBottom: '16px',
    paddingBottom: '16px',
    borderBottom: `1px solid ${vars.color.gray['20']}`,
});

export const RecipeThumbArea = style({
    width: '100%',
    maxWidth: '137px',
    maxHeight: '182px',
    aspectRatio: '137 / 182',
    borderRadius: '4px',
    overflow: 'hidden',
    flexShrink: 0,
    backgroundColor: vars.color.gray['10'],
});

export const RecipeThumb = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const IngredientContainer = style({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
});

export const IngredientList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
});

export const IngredientListItem = style([
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

export const IngredientName = style({
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

export const IngredientAmount = style({
    flexShrink: 0,
});

export const MoreText = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
        marginTop: '8px',
    },
]);

export const StepSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
});

export const StepTitle = style([
    textStyles.body2Semibold,
    {
        color: vars.color.black,
        '@media': {
            [media.mobile]: {
                fontSize: '1.3rem',
                lineHeight: '1.3',
                letterSpacing: '-1.3%',
            },
        },
    },
]);

export const StepList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    listStyle: 'none',
    padding: 0,
    margin: 0,
});

export const StepItem = style({
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
});

export const StepNumber = style([
    textStyles.caption2Semibold,
    {
        width: '20px',
        height: '20px',
        aspectRatio: '1 / 1',
        minWidth: '20px',
        borderRadius: '50%',
        backgroundColor: '#8da287',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
]);

globalStyle(`${StepNumber} > span`, {
    color: vars.color.white,
});

export const StepText = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['80'],
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical',
        '@media': {
            [media.mobile]: {
                fontSize: '1.3rem',
                lineHeight: '1.3',
                letterSpacing: '-1.3%',
            },
        },
    },
]);

export const BookmarkIcon = style({
    flexShrink: 0,
    color: vars.color.green['100'],
});
