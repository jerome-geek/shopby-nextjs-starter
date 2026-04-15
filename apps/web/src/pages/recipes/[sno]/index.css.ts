import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { media } from '@/styles/media';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '48px',

    '@media': {
        [media.desktop]: {
            padding: '0 16px 40px',
            gap: '60px',
        },
    },
});

// --- Header Area ---
export const headerArea = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',

    '@media': {
        [media.desktop]: {
            flexDirection: 'row',
            gap: '40px',
        },
    },
});

export const imageCarouselContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
});

export const imageCarousel = style({
    width: 'calc(100% + 40px)',
    margin: '0 -20px',
    aspectRatio: '1 / 1',
    overflow: 'hidden',
    position: 'relative',

    '@media': {
        [media.desktop]: {
            width: '600px',
            margin: '0',
            flexShrink: 0,
            borderRadius: '12px',
        },
    },
});

export const carouselImage = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

// --- Swiper 커스텀 ---
globalStyle('.recipe-thumbnail-pagination', {
    width: 'fit-content !important',
    margin: '0 auto',
    vars: {
        '--swiper-pagination-color': vars.color.green['80'],
        '--swiper-pagination-bullet-inactive-color': vars.color.gray['40'],
        '--swiper-pagination-bullet-inactive-opacity': '1',
        '--swiper-pagination-bullet-size': '6px',
        '--swiper-pagination-bullet-horizontal-gap': '3px',
    },
});

export const carouselNavButton = style({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: vars.color.white,
    boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
    border: 'none',
    cursor: 'pointer',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    color: vars.color.green['100'],
    transition: 'box-shadow 0.2s ease, transform 0.2s ease',

    selectors: {
        '&:hover': {
            boxShadow: '0 4px 20px rgba(0,0,0,0.22)',
            transform: 'translateY(-50%) scale(1.05)',
        },
    },

    '@media': {
        [media.desktop]: {
            display: 'flex',
        },
    },
});

export const carouselNavPrev = style({
    left: '16px',
});

export const carouselNavNext = style({
    right: '16px',
});

export const headerInfo = style({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',

    '@media': {
        [media.desktop]: {
            gap: '24px',
            alignSelf: 'flex-start',
        },
    },
});

export const recipeInfo = style({
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
});

export const title = style({
    fontSize: '32px',
    fontWeight: 'bold',
    color: vars.color.black,
});

export const actionButtons = style({
    display: 'none',
    '@media': {
        [media.desktop]: {
            display: 'flex',
            gap: '16px',
            flexShrink: 0,
            marginLeft: '24px',
        },
    },
});

export const actionButton = style([
    textStyles.body1Medium,
    {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: vars.color.gray['60'],
        flexShrink: 0,
        transition: 'all 0.2s ease',

        selectors: {
            // 좋아요 활성화 상태 (Pink)
            '&[data-active="true"][data-type="like"]': {
                color: vars.color.pink['80'],
            },
            // 북마크 활성화 상태 (Green)
            '&[data-active="true"][data-type="bookmark"]': {
                color: vars.color.green['100'],
            },
        },
    },
]);

export const author = style([
    textStyles.headlineRegular,
    {
        color: vars.color.gray['80'],
    },
]);

export const description = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['60'],
    },
]);

export const metaList = style({
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    padding: '0',

    '@media': {
        [media.desktop]: {
            gap: '12px',
            paddingTop: '12px',
        },
    },
});

export const IconTimerText = style([
    textStyles.body2Semibold,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color: vars.color.gray['80'],
    },
]);

export const IconText = style([
    textStyles.body2Regular,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color: vars.color.gray['60'],
    },
]);

export const durationMetaItem = style([
    textStyles.body1Semibold,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color: vars.color.gray['80'],
    },
]);

export const metaItem = style([
    textStyles.body1Semibold,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color: vars.color.gray['60'],
    },
]);

// --- Section General ---
export const sectionTitleRow = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '24px',
});

export const sectionContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',

    '@media': {
        [media.desktop]: {
            gap: '24px',
        },
    },
});

export const sectionTitle = style([
    textStyles.title1Bold,
    {
        color: vars.color.black,
    },
]);

// --- Ingredients ---
export const ingredientsGrid = style({
    display: 'grid',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '8px',

    '@media': {
        [media.desktop]: {
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px 32px',
        },
    },
});

export const ingredientItem = style({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'none',
    paddingLeft: '13px',

    selectors: {
        '&::before': {
            content: '""',
            position: 'absolute',
            left: '0',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: vars.color.green['80'],
        },
    },

    '@media': {
        [media.desktop]: {
            padding: '4px 2px 4px 13px',
        },
    },
});

export const ingredientExpandBtn = style({
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: vars.color.secondary,
    color: vars.color.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
});

export const ingredientInfo = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

export const ingredientName = style({
    fontSize: '15px',
    color: vars.color.black,
});

export const ingredientAmount = style({
    fontSize: '14px',
    color: vars.color.gray['50'],
});

export const buyButton = style([
    textStyles.body2Semibold,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 10px',
        borderRadius: '2px',
        background: vars.color.green['40'],
        color: vars.color.gray['80'],
        cursor: 'pointer',
    },
]);

// --- Tools ---
export const toolsGrid = style({
    display: 'flex',
    gap: '16px',
    overflowX: 'auto',
    paddingBottom: '16px',
    scrollSnapType: 'x mandatory',
});

export const toolCard = style({
    width: '200px',
    flexShrink: 0,
    scrollSnapAlign: 'start',
});

// --- Steps ---
export const stepList = style({
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    gap: '16px',
});

export const stepItem = style({
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
});

export const stepNumber = style([
    textStyles.body1Semibold,
    {
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        background: vars.color.green['80'],
        color: vars.color.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,

        '@media': {
            [media.desktop]: {
                width: '28px',
                height: '28px',
            },
        },
    },
]);

export const stepContent = style({
    // flex: 1,
});

export const stepDescription = style([
    textStyles.headlineRegular,
    {
        color: vars.color.gray['80'],
    },
]);

export const stepTime = style([
    textStyles.headlineRegular,
    {
        color: vars.color.green['80'],
        marginLeft: '8px',
        display: 'inline-block',
        textDecoration: 'none',
        cursor: 'pointer',
        ':hover': {
            textDecoration: 'underline',
        },
    },
]);

export const stepImage = style({
    width: '200px',
    height: '200px',
    borderRadius: '8px',
    objectFit: 'cover',
    marginTop: '12px',
});

// --- Comments ---

// --- Mobile Sticky Footer ---

// TODO: 전역 BottomNavigation과 레이아웃이 겹칠 수 있으므로 추후 공통 레이아웃 작업 시 높이(bottom) 확인 필요
export const mobileStickyFooter = style({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '64px',
    backgroundColor: vars.color.white,
    borderTop: `1px solid ${vars.color.gray['20']}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '0 16px',
    paddingBottom: 'env(safe-area-inset-bottom)',
    zIndex: 100,
    boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',

    '@media': {
        [media.desktop]: {
            display: 'none',
        },
    },
});

export const mobileActionButton = style([
    textStyles.body2Medium,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        color: vars.color.gray['80'],
        background: 'none',
        border: 'none',
        padding: '8px',
        cursor: 'pointer',

        selectors: {
            '&[data-active="true"][data-type="like"]': {
                color: vars.color.pink['80'],
            },
            '&[data-active="true"][data-type="bookmark"]': {
                color: vars.color.green['100'],
            },
        },
    },
]);

export const mobileDivider = style({
    backgroundColor: vars.color.gray['20'],
    height: '6px',
    border: 'none',
    width: 'calc(100% + 40px)',
    margin: '0 -20px',
    padding: 0,
});
