import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%',

    '@media': {
        [media.mobile]: {
            gap: '20px',
        },
    },
});

export const collectionSectionHeader = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export const collectionSectionTitleContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
});

export const collectionSectionTitle = style([
    textStyles.title1Bold,
    {
        color: vars.color.black,
        '@media': {
            [media.mobile]: {
                fontSize: '1.8rem',
                fontWeight: 600,
                lineHeight: '1.5',
                letterSpacing: '-1.3%',
            },
        },
    },
]);

export const collectionSectionSubTitle = style([
    textStyles.headlineRegular,
    {
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

export const detailLink = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['60'],
        display: 'flex',
        alignItems: 'center',
        lineHeight: 1,
        gap: '4px',
    },
]);

export const recipeList = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',

    '@media': {
        [media.tablet]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
        },
    },
});

export const recipeListItem = style({
    display: 'grid',
    width: '100%',
});

export const recipeListSwiperContainer = style({
    marginLeft: '-20px',
    width: 'calc(100% + 40px)',
});
