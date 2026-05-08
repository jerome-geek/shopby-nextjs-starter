import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

export const detailContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '0',

    '@media': {
        [media.desktop]: {
            gap: '60px',
        },
    },
});

export const detailHeader = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px',
});

export const detailTitleContainer = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '6px',

    '@media': {
        [media.desktop]: {
            gap: '4px',
        },
    },
});

export const detailTitleArea = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',

    '@media': {
        [media.desktop]: {
            gap: '12px',
        },
    },
});

export const detailTitle = style([
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

export const detailSubtitle = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['80'],

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.headlineRegular,
            },
        },
    },
]);

export const detailMeta = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.body2Regular,
            },
        },
    },
]);




export const recipeGrid = style({
    display: 'grid',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    '@media': {
        [media.desktop]: {
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '20px',
        },
    },
});

export const recipeDetailGrid = style({
    display: 'grid',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
    gap: '48px 24px',

    '@media': {
        'screen and (min-width: 769px)': {
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '24px',
        },
        [media.desktop]: {
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '24px',
        },
    },
});

export const emptyContainer = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '80px 0',
    width: '100%',

    '@media': {
        [media.desktop]: {
            padding: '120px 0',
        },
    },
});

export const emptyIconWrapper = style({
    width: '80px',
    height: '80px',
    borderRadius: '24px',
    backgroundColor: '#f2f5f1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#8da287',
    marginBottom: '24px',
    boxShadow: '0 8px 24px rgba(141, 162, 135, 0.12)',
    border: '1px solid rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(10px)',
});

export const emptyTextContainer = style({
    textAlign: 'center',
});

export const emptyTitle = style([
    textStyles.title2Semibold,
    {
        color: vars.color.black,
    },
]);

export const emptyDescription = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['40'],
        marginTop: '12px',
    },
]);

export const primaryButton = style([
    textStyles.body1Semibold,
    {
        width: 'auto',
        padding: '16px 40px',
        marginTop: '12px',
        borderRadius: '16px',
        border: 'none',
        backgroundColor: '#f1b3bc',
        color: vars.color.white,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textAlign: 'center',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)',
        selectors: {
            '&:hover': {
                filter: 'brightness(0.95)',
            },
        },
    },
]);
