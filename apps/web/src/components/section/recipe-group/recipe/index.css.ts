import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%',
});

export const recipeSectionHeader = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
});

export const recipeSectionTitleContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',

    '@media': {
        [media.desktop]: {
            gap: '4px',
        },
    },
});

export const recipeSectionTitle = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.title1Bold,
            },
        },
    },
]);

export const recipeSectionSubTitle = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.headlineRegular,
            },
        },
    },
]);

export const detailLink = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['60'],
        display: 'flex',
        alignItems: 'center',
        gap: '4px',

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

export const recipeList = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',

    '@media': {
        [media.mobile]: {
            gap: '15px',
        },
    },
});

export const recipeListItem = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
});

export const recipeImage = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 180ms ease-out',
    willChange: 'transform',
});

export const recipeContentsContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
});
