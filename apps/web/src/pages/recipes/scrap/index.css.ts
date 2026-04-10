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
    padding: '16px',
    '@media': {
        [media.desktop]: {
            gap: '32px',
            padding: '40px 0',
        },
    },
});

export const title = style([
    textStyles.display1Semibold,
    {
        color: vars.color.black,
        fontSize: '24px',
        '@media': {
            [media.desktop]: {
                fontSize: '32px',
            },
        },
    },
]);

export const headerTop = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
});

export const headerIcons = style({
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
});

export const cartBadge = style([
    textStyles.caption1Semibold,
    {
        position: 'absolute',
        top: '-4px',
        right: '-4px',
        width: '16px',
        height: '16px',
        backgroundColor: '#ff4d4d',
        color: vars.color.white,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '10px',
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

export const detailContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    marginTop: '20px',
});

export const detailHeader = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottom: `1px solid ${vars.color.gray['10']}`,
    paddingBottom: '24px',
    gap: '12px',
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
    textStyles.title1Bold,
    { color: vars.color.black },
]);

export const detailSubtitle = style([
    textStyles.headlineRegular,
    { color: vars.color.gray['80'] },
]);

export const detailMeta = style([
    textStyles.body2Regular,
    { color: vars.color.gray['60'] },
]);

export const viewToggle = style({
    display: 'flex',
    backgroundColor: '#f2f5f1',
    padding: '4px',
    borderRadius: '10px',
    gap: '4px',
});

export const toggleItem = style({
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    selectors: {
        '&[data-active="true"]': {
            backgroundColor: vars.color.white,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        },
    },
});

/* Recipe Detail Card */
export const recipeDetailGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '24px',
    '@media': {
        [media.desktop]: {
            gridTemplateColumns: 'repeat(3, 1fr)',
        },
    },
});

export const recipeDetailCard = style({
    backgroundColor: vars.color.white,
    borderRadius: '24px',
    border: '1px solid rgba(0, 0, 0, 0.03)',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
});

export const cardContent = style({
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
});

export const cardHeader = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
});

export const cardTitleArea = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
});

export const recipeDetailTitle = style([
    textStyles.title2Semibold,
    { color: vars.color.black },
]);

export const recipeDetailAuthor = style([
    textStyles.caption1Regular,
    { color: vars.color.gray['40'] },
]);

export const recipeDetailMeta = style({
    display: 'flex',
    gap: '12px',
    color: vars.color.gray['40'],
    fontSize: '13px',
});

export const ingredientSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
});

export const ingredientHeader = style({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
});

export const ingredientTitle = style([
    textStyles.body2Semibold,
    { color: vars.color.black },
]);

export const ingredientContent = style({
    display: 'flex',
    gap: '12px',
    '@media': {
        [media.desktop]: {
            gap: '16px',
        },
    },
});

export const recipeDetailImgArea = style({
    width: '80px',
    height: '80px',
    borderRadius: '12px',
    overflow: 'hidden',
    flexShrink: 0,
    '@media': {
        [media.desktop]: {
            width: '100px',
            height: '100px',
        },
    },
});

export const recipeDetailImg = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const ingredientsList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: 1,
});

export const ingredientItem = style([
    textStyles.caption1Regular,
    {
        display: 'flex',
        justifyContent: 'space-between',
        color: vars.color.black,
    },
]);

export const stepSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '8px',
});

export const stepTitle = style([
    textStyles.body2Semibold,
    { color: vars.color.black },
]);

export const stepList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
});

export const stepItem = style({
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
});

export const stepNumber = style([
    textStyles.caption1Semibold,
    {
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: '#8da287',
        color: vars.color.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontSize: '11px',
    },
]);

export const stepText = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['80'],
        lineHeight: '1.5',
    },
]);

export const fab = style({
    position: 'fixed',
    bottom: '80px', // 바텀 탭바 고려
    right: '20px',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: 'rgba(141, 162, 135, 0.8)',
    color: vars.color.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    backdropFilter: 'blur(4px)',
    cursor: 'pointer',
    zIndex: 100,
    '@media': {
        [media.desktop]: {
            bottom: '40px',
            right: '40px',
            width: '56px',
            height: '56px',
        },
    },
});
