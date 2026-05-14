import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

// --- Layout ---
export const container = style({
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 0 120px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',

    '@media': {
        [media.desktop]: {
            gap: '40px',
            padding: '0 24px 80px',
        },
    },
});

// --- Hero Section ---
export const heroSection = style({
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '48px',
    paddingTop: '0',
    display: 'flex',

    '@media': {
        [media.mobile]: {
            flexDirection: 'column',
            gap: '20px',
            paddingTop: '24px',
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

export const titleWrapper = style({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
});

export const collectionTitle = style([
    textStyles.title1Bold,
    {
        color: vars.color.black,
        flexShrink: 1,

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.display1Semibold,
            },
        },
    },
]);

export const moreButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    color: vars.color.gray['40'],
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',

    ':hover': {
        backgroundColor: vars.color.gray['10'],
        color: vars.color.gray['90'],
    },

    ':active': {
        transform: 'scale(0.92)',
    },
});

export const dropdownContent = style({
    zIndex: 1000,
    minWidth: '160px',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    backdropFilter: 'blur(16px)',
    borderRadius: '12px',
    padding: '6px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    animationDuration: '200ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
});

export const dropdownItem = style([
    textStyles.body1Regular,
    {
        padding: '10px 12px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        color: vars.color.gray['80'],
        outline: 'none',
        border: 'none',
        backgroundColor: 'transparent',
        width: '100%',
        transition: 'all 0.15s ease',

        selectors: {
            '&:hover, &[data-highlighted]': {
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                color: vars.color.black,
                transform: 'translateX(2px)',
            },
            '&[data-variant="danger"]': {
                color: '#ff4d4d',
            },
            '&[data-variant="danger"]:hover, &[data-variant="danger"][data-highlighted]':
                {
                    backgroundColor: 'rgba(255, 77, 77, 0.08)',
                    color: '#ff4d4d',
                },
        },
    },
]);

export const collectionDescription = style([
    textStyles.headlineRegular,
    {
        color: vars.color.gray['80'],

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.headingMedium,
            },
        },
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
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '24px',

    '@media': {
        [media.desktop]: {
            gridTemplateColumns: 'repeat(3, 1fr)',
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
