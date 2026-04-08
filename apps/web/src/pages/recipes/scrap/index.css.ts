import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';

export const headingBold = textStyles.headingBold;
export const body2Semibold = textStyles.body2Semibold;
export const body2Regular = textStyles.body2Regular;

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    '@media': {
        [media.desktop]: {
            gap: '32px',
        },
    },
});

export const title = style([
    textStyles.display1Semibold,
    {
        color: vars.color.black,
    },
]);

export const titleContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '20px',
    '@media': {
        [media.desktop]: {
            gap: '32px',
            marginBottom: '40px',
        },
    },
});

export const tabList = style({
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
    paddingBottom: '8px',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    selectors: {
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
});

export const tabItem = style([
    textStyles.body2Semibold,
    {
        position: 'relative',
        padding: '10px 20px',
        borderRadius: '100px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        color: vars.color.gray['60'],
        backgroundColor: 'rgba(242, 245, 241, 0.8)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(0, 0, 0, 0.02)',
        transition: 'color 0.3s ease',
        userSelect: 'none',
        selectors: {
            '&:hover': {
                color: vars.color.black,
            },
            '&[data-active="true"]': {
                color: vars.color.white,
                backgroundColor: 'transparent',
            },
        },
    },
]);

export const activeIndicator = style({
    position: 'absolute',
    inset: 0,
    borderRadius: '100px',
    backgroundColor: '#8da287', // 레퍼런스의 세이지 그린 톤
    zIndex: -1,
    boxShadow: '0 4px 12px rgba(141, 162, 135, 0.3)',
});

export const section = style({
    display: 'flex',
    flexDirection: 'column',

    '@media': {
        [media.desktop]: {
            gap: '16px',
        },
    },
});

export const sectionHeader = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export const sectionTitle = style([
    textStyles.title1Bold,
    { color: vars.color.black },
]);

export const viewAll = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['40'],
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        cursor: 'pointer',
    },
]);

/* Collection Styles */
export const collectionGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '16px',
    '@media': {
        [media.desktop]: {
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
        },
    },
});

export const collectionCard = style({
    borderRadius: '16px',
    overflow: 'hidden',
    backgroundColor: vars.color.white,
    border: '1px solid rgba(0, 0, 0, 0.05)',
    transition: 'box-shadow 0.3s ease',
    cursor: 'pointer',
    selectors: {
        '&:hover': {
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
        },
    },
});

export const collageGrid = style({
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gridTemplateRows: 'repeat(2, 80px)',
    gap: '2px',
    '@media': {
        [media.desktop]: {
            gridTemplateRows: 'repeat(2, 100px)',
        },
    },
});

export const collageMain = style({
    gridRow: '1 / span 2',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const collageSub = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const collectionInfo = style({
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    backgroundColor: '#f9fbf8',
});

export const collectionTitleArea = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
});

export const collectionDesc = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
        lineHeight: '1.5',
    },
]);

export const collectionFooter = style([
    textStyles.caption2Regular,
    {
        color: vars.color.gray['40'],
        marginTop: '8px',
    },
]);

export const createButton = style([
    textStyles.body2Semibold,
    {
        width: '100%',
        padding: '16px',
        borderRadius: '12px',
        border: `1px solid ${vars.color.gray['20']}`,
        backgroundColor: vars.color.white,
        color: vars.color.gray['60'],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '12px',
        cursor: 'pointer',
    },
]);

/* Product Grid */
export const productGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    '@media': {
        [media.desktop]: {
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '20px',
        },
    },
});

export const productThumb = style({
    position: 'relative',
    aspectRatio: '1 / 1',
    borderRadius: '12px',
    overflow: 'hidden',
});

export const productImg = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const soldOutOverlay = style([
    textStyles.body1Semibold,
    {
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: vars.color.white,
        backdropFilter: 'blur(2px)',
    },
]);

export const productInfo = style({
    marginTop: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
});

export const brandName = style([
    textStyles.caption2Regular,
    {
        color: vars.color.gray['40'],
    },
]);

export const productName = style([
    textStyles.body2Regular,
    {
        color: vars.color.black,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
    },
]);

export const priceArea = style({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginTop: '4px',
});

export const discount = style([
    textStyles.body2Semibold,
    {
        color: '#ff4d4d',
    },
]);

export const price = style([
    textStyles.body2Semibold,
    {
        color: vars.color.black,
    },
]);

export const badgeArea = style({
    display: 'flex',
    gap: '4px',
    marginTop: '8px',
});

export const badge = style([
    textStyles.caption2Regular,
    {
        padding: '2px 6px',
        backgroundColor: vars.color.gray['10'],
        color: vars.color.gray['60'],
        borderRadius: '4px',
    },
]);

/* Recipe Cards */
export const recipeGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    '@media': {
        [media.desktop]: {
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '20px',
        },
    },
});

export const recipeImgArea = style({
    position: 'relative',
    aspectRatio: '3 / 4',
    borderRadius: '16px',
    overflow: 'hidden',
});

export const recipeMeta = style([
    textStyles.caption2Regular,
    {
        display: 'flex',
        gap: '8px',
        color: vars.color.gray['40'],
        marginTop: '4px',
    },
]);

export const iconText = style({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
});

/* Pagination */
export const pagination = style({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    marginTop: '32px',
    color: vars.color.gray['30'],
});

export const primaryButton = style([
    textStyles.body1Semibold,
    {
        width: '100%',
        padding: '18px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#f1b3bc',
        color: vars.color.white,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textAlign: 'center',
        selectors: {
            '&:hover': {
                filter: 'brightness(0.95)',
            },
        },
    },
]);

