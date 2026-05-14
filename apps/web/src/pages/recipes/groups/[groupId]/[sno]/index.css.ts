import { style } from '@vanilla-extract/css';

import { globalVars } from '@/styles/global.css';
import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

// --- Layout ---
export const container = style({
    display: 'flex',
    flexDirection: 'column',

    '@media': {
        [media.desktop]: {
            flexDirection: 'row',
            alignItems: 'stretch',
            minHeight: '100vh',
            gap: '40px',
        },
    },
});

export const leftPanel = style({
    width: '100%',

    '@media': {
        [media.desktop]: {
            flex: '0 1 560px',
            minWidth: '320px',
            flexShrink: 0,
        },
    },
});

export const stickyWrapper = style({
    display: 'flex',
    flexDirection: 'column',

    '@media': {
        [media.desktop]: {
            position: 'sticky',
            top: globalVars.header.height,
            height: `calc(100vh - ${globalVars.header.height})`,
            overflowY: 'auto',
            paddingBottom: '60px',
            paddingTop: '20px',
        },
    },
});

export const rightPanel = style({
    flex: 1,
});

export const divider = style({
    border: 'none',
    backgroundColor: vars.color.gray['20'],

    // --- Mobile (가로선) ---
    width: '100%',
    height: '1px',
    margin: '24px 0',
    '@media': {
        [media.desktop]: {
            width: '1px',
            height: 'auto',
            alignSelf: 'stretch',
            margin: '0',
            display: 'block',
        },
    },
});

// --- Group Thumbnail ---
export const groupThumbnail = style({
    width: 'calc(100% + 40px)',
    margin: '0 -20px',
    borderRadius: 0,
    maxWidth: 'none',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    display: 'block',

    '@media': {
        [media.desktop]: {
            width: '100%',
            margin: 0,
            borderRadius: '16px',
            maxWidth: '100%',
        },
    },
});

export const groupThumbnailPlaceholder = style({
    width: 'calc(100% + 40px)',
    margin: '0 -20px',
    borderRadius: 0,
    aspectRatio: '1 / 1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: vars.color.gray['10'],
    color: vars.color.gray['30'],

    '@media': {
        [media.desktop]: {
            width: '100%',
            margin: 0,
            borderRadius: '16px',
        },
    },
});

// --- Group Info ---
export const groupInfo = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    padding: '24px 0 0',

    '@media': {
        [media.desktop]: {
            gap: '12px',
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

export const groupTitle = style([
    textStyles.display1Semibold,
    {
        color: vars.color.black,
    },
]);

export const groupDescription = style([
    textStyles.headingMedium,
    {
        color: vars.color.gray['80'],
    },
]);

export const metaRow = style({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
});

export const metaItem = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['60'],
    },
]);

export const metaStrong = style([
    textStyles.body2Semibold,
    {
        color: vars.color.gray['80'],
    },
]);

export const shareButton = style([
    textStyles.body1Semibold,
    {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '12px 20px',
        borderRadius: '8px',
        background: vars.color.gray['10'],
        color: vars.color.gray['80'],
        border: `1px solid ${vars.color.gray['20']}`,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        width: '100%',

        ':hover': {
            background: vars.color.gray['20'],
        },

        '@media': {
            [media.desktop]: {
                width: 'fit-content',
            },
        },
    },
]);

// --- Recipe Grid ---
export const recipeGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '36px 15px',

    '@media': {
        [media.desktop]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '48px 24px',
        },
    },
});

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
});

export const skeletonThumb = style([
    skeletonBar,
    {
        width: '100%',
        aspectRatio: '3 / 4',
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
