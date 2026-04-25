import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

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
    },
});

export const title = style([
    textStyles.display1Semibold,
    {
        color: vars.color.black,
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
    padding: '0 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',

    '@media': {
        [media.desktop]: {
            padding: '20px 20px 0 20px',
        },
    },
});

export const titleArea = style({
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',

    '@media': {
        [media.desktop]: {
            gap: '40px',
        },
    },
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

export const headingBold = textStyles.headingBold;
export const body2Regular = textStyles.body2Regular;

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
