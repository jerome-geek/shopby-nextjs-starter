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
    gap: '24px',

    '@media': {
        [media.desktop]: {
            gap: '32px',
            padding: '40px 0',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        [media.mobile]: {
            padding: '24px 20px',
        },
    },
});

export const title = style([
    textStyles.display1Semibold,
    {
        color: vars.color.black,
    },
]);

export const headerTop = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
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
    width: '100vw',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    borderBottom: `1px solid ${vars.color.gray['20']}`,
    backgroundColor: vars.color.white,
    paddingTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
});

export const titleArea = style({
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
});

export const tabList = style({
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
    padding: '12px 0',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',

    selectors: {
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
});

export const addCollectionButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: `1px solid ${vars.color.gray['40']}`,
    backgroundColor: vars.color.white,
    color: vars.color.gray['60'],
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    selectors: {
        '&:hover': {
            backgroundColor: vars.color.green['40'],
            borderColor: vars.color.green['80'],
            color: vars.color.green['80'],
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
            gap: '24px',
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
    textStyles.headingSemibold,
    {
        width: '100%',
        maxWidth: '588px',
        padding: '18px 0',
        margin: '0 auto',
        borderRadius: '4px',
        border: `1px solid ${vars.color.gray['50']}`,
        backgroundColor: vars.color.white,
        color: vars.color.black,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
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

export const cardTitleContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
});

export const productName = style([
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

export const brandName = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['60'],
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
    gap: '60px',
    padding: '32px 0',

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
    textStyles.title1Bold,
    { color: vars.color.black },
]);

export const detailSubtitle = style([
    textStyles.body2Regular,
    { color: vars.color.gray['80'] },
]);

export const detailMeta = style([
    textStyles.caption1Regular,
    { color: vars.color.gray['60'] },
]);

export const viewToggleArea = style({
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
});

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
    pointerEvents: 'none', // 부모 버튼의 클릭을 방해하지 않도록 처리

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

/* Recipe Detail Card */
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

export const recipeDetailCard = style({
    backgroundColor: vars.color.ivory['10'],
    borderRadius: '8px',
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

export const recipeLink = style({
    display: 'block',
    textDecoration: 'none',
    color: 'inherit',
    height: '100%',
});

/* Empty State */
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
