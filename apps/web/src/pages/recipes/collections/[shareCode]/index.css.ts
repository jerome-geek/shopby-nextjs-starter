import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

// --- Layout ---
export const container = style({
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 16px 120px',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',

    '@media': {
        [media.desktop]: {
            gap: '60px',
            padding: '0 24px 80px',
        },
    },
});

// --- Hero Section ---
export const heroSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    paddingTop: '32px',

    '@media': {
        [media.desktop]: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: '48px',
            paddingTop: '48px',
        },
    },
});

export const collageWrapper = style({
    width: '100%',
    aspectRatio: '4 / 3',
    borderRadius: '16px',
    overflow: 'hidden',
    background: vars.color.gray['10'],
    flexShrink: 0,

    '@media': {
        [media.desktop]: {
            width: '480px',
            aspectRatio: '1 / 1',
        },
    },
});

export const collageMain = style({
    width: '100%',
    height: '100%',
    objectFit: 'fill',
});

export const collageSub = style({
    width: '100%',
    height: '100%',
    objectFit: 'fill',
});

export const collagePlaceholder = style({
    gridRow: '1 / 3',
    gridColumn: '1 / 3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: vars.color.gray['10'],
    color: vars.color.gray['30'],
});

export const heroInfo = style({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',

    '@media': {
        [media.desktop]: {
            paddingTop: '32px',
        },
    },
});

export const badge = style([
    textStyles.caption1Semibold,
    {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 10px',
        borderRadius: '100px',
        background: vars.color.green['20'],
        color: vars.color.green['80'],
        width: 'fit-content',
    },
]);

export const collectionTitle = style([
    textStyles.display1Semibold,
    {
        color: vars.color.black,
    },
]);

export const collectionDescription = style([
    textStyles.headingMedium,
    {
        color: vars.color.gray['80'],
    },
]);

export const metaRow = style({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
});

export const metaItem = style([
    textStyles.body2Regular,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        color: vars.color.gray['60'],
    },
]);

export const metaItemStrong = style([
    textStyles.body2Semibold,
    {
        color: vars.color.gray['80'],
    },
]);

export const divider = style({
    color: vars.color.gray['30'],
});

export const actionRow = style({
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
});

export const bookmarkButton = style([
    textStyles.body1Semibold,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 24px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        background: vars.color.green['80'],
        color: vars.color.white,

        ':hover': {
            background: vars.color.green['100'],
        },

        selectors: {
            '&[data-bookmarked="true"]': {
                background: vars.color.gray['10'],
                color: vars.color.gray['80'],
                border: `1px solid ${vars.color.gray['30']}`,
            },
            '&[data-bookmarked="true"]:hover': {
                background: vars.color.gray['20'],
            },
        },
    },
]);

export const shareButton = style([
    textStyles.body1Semibold,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 20px',
        borderRadius: '8px',
        background: vars.color.gray['10'],
        color: vars.color.gray['80'],
        border: `1px solid ${vars.color.gray['20']}`,
        cursor: 'pointer',
        transition: 'all 0.2s ease',

        ':hover': {
            background: vars.color.gray['20'],
        },
    },
]);

// --- Recipe Grid Section ---
export const recipeSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
});

export const sectionHeader = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
});

export const sectionTitle = style([
    textStyles.title1Bold,
    {
        color: vars.color.black,
    },
]);

export const recipeCount = style([
    textStyles.headlineRegular,
    {
        color: vars.color.gray['50'],
        marginLeft: '8px',
    },
]);

export const recipeGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px 12px',

    '@media': {
        [media.desktop]: {
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px 24px',
        },
    },
});

export const recipeCard = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'inherit',

    ':hover': {
        textDecoration: 'none',
    },
});

export const recipeThumbWrapper = style({
    position: 'relative',
    width: '100%',
    aspectRatio: '3 / 4',
    borderRadius: '8px',
    overflow: 'hidden',
    background: vars.color.gray['10'],
});

export const recipeThumb = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',

    selectors: {
        [`${recipeCard}:hover &`]: {
            transform: 'scale(1.04)',
        },
    },
});

export const recipeBookmarkBadge = style({
    position: 'absolute',
    bottom: '8px',
    right: '8px',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'rgba(0,0,0,0.35)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    color: vars.color.white,
    transition: 'background 0.2s',

    ':hover': {
        background: 'rgba(0,0,0,0.55)',
    },
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

export const recipeAuthor = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['60'],
    },
]);

export const recipeMeta = style([
    textStyles.body2Regular,
    {
        display: 'flex',
        gap: '8px',
        color: vars.color.gray['40'],
    },
]);

// --- Empty State ---
export const emptyState = style({
    padding: '80px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    color: vars.color.gray['40'],
});

export const emptyStateText = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['50'],
    },
]);

// --- Skeleton ---
export const skeletonBar = style({
    borderRadius: '6px',
    background: `linear-gradient(135deg, ${vars.color.gray['10']} 0%, #f2f5f1 50%, ${vars.color.gray['10']} 100%)`,
    backgroundSize: '200% 200%',
});

export const skeletonThumb = style([
    skeletonBar,
    {
        width: '100%',
        aspectRatio: '4 / 3',
        borderRadius: '8px',
    },
]);

export const skeletonTitle = style([
    skeletonBar,
    { width: '120px', height: '18px' },
]);

export const skeletonText = style([
    skeletonBar,
    { width: '80px', height: '14px' },
]);
