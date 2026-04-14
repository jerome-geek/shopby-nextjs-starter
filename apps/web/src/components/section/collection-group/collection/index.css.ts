import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';

export const Container = style({
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

export const CollectionSectionHeader = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export const CollectionSectionTitleContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
});

export const CollectionSectionTitle = style([
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

export const CollectionSectionSubTitle = style([
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

export const DetailLink = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['60'],
        display: 'flex',
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

export const RecipeList = style({
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

export const RecipeListItem = style({
    display: 'grid',
    width: '100%',
});

export const RecipeListSwiperContainer = style({
    marginLeft: '-20px',
    width: 'calc(100% + 40px)',
});
