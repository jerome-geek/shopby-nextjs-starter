import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    padding: '32px 0',

    '@media': {
        [media.desktop]: {
            gap: '60px',
        },
    },
});

export const header = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px',
});

export const titleArea = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',

    '@media': {
        [media.desktop]: {
            gap: '12px',
        },
    },
});

export const titleRow = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

export const title = style([
    textStyles.title1Bold,
    { color: vars.color.black },
]);

export const removeButton = style({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: vars.color.gray['40'],
    transition: 'color 0.2s ease',

    selectors: {
        '&:hover': {
            color: vars.color.gray['60'],
        },
    },
});

export const subtitle = style([
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

export const metaText = style([
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

export const viewToggle = style({
    display: 'flex',
    backgroundColor: '#f2f5f1',
    padding: '2px',
    borderRadius: '36px',
    gap: '2px',
    position: 'relative',
    border: '1px solid rgba(0, 0, 0, 0.02)',
    cursor: 'pointer',
    width: 'fit-content',
    outline: 'none',
    transition: 'all 0.2s ease',
    selectors: {
        '&:active': {
            transform: 'scale(0.96)',
        },
    },
});

export const toggleItem = style({
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '36px',
    position: 'relative',
    zIndex: 1,
    pointerEvents: 'none',

    '@media': {
        [media.desktop]: {
            width: '36px',
            height: '36px',
        },
    },
});

export const toggleActiveBg = style({
    position: 'absolute',
    top: '2px',
    left: '2px',
    width: '24px',
    height: '24px',
    borderRadius: '24px',
    backgroundColor: vars.color.white,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    zIndex: 0,

    '@media': {
        [media.desktop]: {
            width: '36px',
            height: '36px',
        },
    },
});

export const grid = style({
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

export const detailsGrid = style({
    display: 'grid',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
    gap: '48px 24px',

    '@media': {
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
    justifyContent: 'center',
    padding: '100px 0',
    gap: '20px',
    textAlign: 'center',
});

export const emptyIconWrapper = style({
    width: '64px',
    height: '64px',
    borderRadius: '20px',
    backgroundColor: '#f2f5f1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#8da287',
    boxShadow: '0 8px 24px rgba(141, 162, 135, 0.12)',
});

export const emptyTitle = style([
    textStyles.headingBold,
    { color: vars.color.black },
]);

export const emptyDescription = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['40'],
        marginTop: '8px',
    },
]);

export const primaryButton = style([
    textStyles.body1Semibold,
    {
        width: 'auto',
        padding: '14px 32px',
        marginTop: '20px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#f1b3bc',
        color: vars.color.white,
        cursor: 'pointer',
        transition: 'all 0.3s ease',

        selectors: {
            '&:hover': {
                filter: 'brightness(0.95)',
            },
        },
    },
]);
