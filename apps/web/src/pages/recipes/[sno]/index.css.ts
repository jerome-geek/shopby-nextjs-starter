import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { media } from '@/styles/media';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 16px 40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',

    '@media': {
        [media.desktop]: {
            gap: '60px',
        },
    },
});

// --- Header Area ---
export const headerArea = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    '@media': {
        [media.desktop]: {
            flexDirection: 'row',
            gap: '40px',
        },
    },
});

export const imageCarousel = style({
    width: 'calc(100% + 32px)',
    marginLeft: '-16px',
    aspectRatio: '1/1',
    borderRadius: '0',
    overflow: 'hidden',
    position: 'relative',
    '@media': {
        [media.desktop]: {
            width: '600px',
            marginLeft: '0',
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

export const headerInfo = style({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',

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
    gap: '0',
    marginTop: '16px',

    '@media': {
        [media.desktop]: {
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px 32px',
        },
    },
});

export const ingredientItem = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 0',
    background: 'none',
    '@media': {
        [media.desktop]: {
            padding: '12px 16px',
            background: vars.color.gray['10'],
            borderRadius: '8px',
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

    '@media': {
        [media.desktop]: { gap: '16px' },
    },
});

export const stepItem = style({
    display: 'flex',
    alignItems: 'center',

    '@media': {
        [media.desktop]: { gap: '12px' },
    },
});

export const stepNumber = style([
    textStyles.body1Semibold,
    {
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        background: vars.color.green['80'],
        color: vars.color.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
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

// --- Recommended ---
export const recommendedGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
    '@media': {
        [media.desktop]: {
            gridTemplateColumns: 'repeat(4, 1fr)',
        },
    },
});

export const recipeCard = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    cursor: 'pointer',
    marginBottom: '80px', // Footer 여백 확보
    '@media': {
        [media.desktop]: {
            marginBottom: '0',
        },
    },
});

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

// (SVG 아이콘 색상은 컴포넌트 레벨에서 fill prop으로 제어함)

export const recipeCardThumbWrapper = style({
    position: 'relative',
    width: '100%',
    aspectRatio: '1/1',
    borderRadius: '8px',
    overflow: 'hidden',
});

export const recipeCardThumb = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const recipeCardBookmarkBtn = style({
    position: 'absolute',
    bottom: '8px',
    right: '8px',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'rgba(0,0,0,0.4)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
});

export const recipeCardTitle = style({
    fontSize: '16px',
    fontWeight: 'bold',
    color: vars.color.black,
});

export const recipeCardAuthor = style({
    fontSize: '14px',
    color: vars.color.gray['60'],
});

export const recipeCardMeta = style({
    display: 'flex',
    gap: '12px',
    fontSize: '12px',
    color: vars.color.gray['50'],
});
