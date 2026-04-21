import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const dimmed = style({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
});

export const container = style({
    position: 'fixed',
    top: 0,
    right: 0,
    width: '100%',
    height: 'calc(100dvh - 58px)',
    maxHeight: '100vh',
    backgroundColor: vars.color.white,
    willChange: 'transform',
    '@media': {
        [media.desktop]: {
            width: '810px',
            height: '100vh',
            paddingTop: '180px',
            boxShadow: '-1px 0 5px rgba(0, 0, 0, 0.1)',
        },
        [media.tablet]: {
            width: '600px',
            height: '100vh',
            paddingTop: '60px',
            boxShadow: '-1px 0 5px rgba(0, 0, 0, 0.1)',
        },
    },
});

export const innerContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%',
    height: '100%',
    minHeight: 0,
    padding: 0,
    '@media': {
        [media.desktop]: {
            gap: '48px',
            width: '588px',
            margin: '0 auto',
            padding: 0,
        },
    },
});

export const scrollArea = style({
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',

    '::-webkit-scrollbar': {
        width: '4px',
    },
    '::-webkit-scrollbar-thumb': {
        backgroundColor: vars.color.gray['30'],
        borderRadius: '10px',
    },

    '@media': {
        [media.desktop]: {
            paddingRight: '8px',
            marginBottom: '60px',
        },
    },
});

export const drawerContentInset = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '48px',
    width: '100%',
    padding: '0 20px',
    boxSizing: 'border-box',
    '@media': {
        [media.desktop]: {
            gap: '60px',
            padding: 0,
        },
    },
});

export const closeButton = style({
    position: 'absolute',
    top: '90px',
    right: '60px',

    '@media': {
        [media.tablet]: {
            right: '8px',
            top: '8px',
        },
    },
});

export const section = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
});

export const sectionHeader = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
});

export const title = style([
    textStyles.headlineSemibold,
    {
        color: vars.color.black,
        '@media': {
            [media.desktop]: {
                fontSize: '1.8rem',
            },
        },
    },
]);

export const deleteAllButton = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
    },
]);

export const historySwiperContainer = style({
    width: '100%',
});

globalStyle(`${historySwiperContainer} .swiper`, {
    width: 'calc(100% + 20px)',
});

globalStyle(`${historySwiperContainer} .swiper-slide`, {
    width: 'auto',
});

export const historyItem = style({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    height: '29px',
    padding: '0 10px 0 14px',
    borderRadius: '999px',
    border: `1px solid ${vars.color.gray['50']}`,
    color: vars.color.gray['80'],
    '@media': {
        [media.desktop]: {
            height: '36px',
            borderColor: vars.color.gray['60'],
            color: vars.color.gray['60'],
        },
    },
});

export const historyKeywordButton = style([
    textStyles.body2Regular,
    {
        display: 'inline-flex',
        alignItems: 'center',
        color: 'inherit',
    },
]);

export const historyDeleteButton = style({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '18px',
    height: '18px',
    color: vars.color.gray['60'],
});

export const divider = style({
    width: 'calc(100% + 20px)',
    height: '1px',
    backgroundColor: vars.color.gray['20'],
});

export const productSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    flex: 1,
    minHeight: 0,
});

export const productListWrapper = style({
    minHeight: 0,
});

globalStyle(`${productListWrapper} .swiper`, {
    width: 'calc(100% + 20px)',
});

export const productListContainer = style({
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    columnGap: '12px',
    rowGap: '24px',
});

export const sectionTitle = style([
    textStyles.headlineSemibold,
    {
        color: vars.color.black,
        fontSize: '1.8rem', // Figma: 18px
        lineHeight: 1.5,
        letterSpacing: '-1.3%',
        '@media': {
            [media.mobile]: {
                padding: '0 20px',
            },
        },
    },
]);

export const rankingSection = style({
    gap: '12px',

    '@media': {
        [media.desktop]: {
            gap: '20px',
        },
    },
});

export const rankingSectionTitle = style([
    textStyles.headlineSemibold,
    {
        color: vars.color.black,

        '@media': {
            [media.desktop]: {
                fontWeight: '600',
                fontSize: '1.8rem',
                lineHeight: '1.5',
                letterSpacing: '-1.3%',
            },
        },
    },
]);

export const rankingList = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gridTemplateRows: 'repeat(3, auto)',
    gridAutoFlow: 'column',
    rowGap: '10px',
    columnGap: '15px',

    '@media': {
        [media.desktop]: {
            rowGap: '12px',
            columnGap: '24px',
        },
    },
});

export const rankingItemLink = style([
    textStyles.body1Regular,
    {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        textAlign: 'left',
        color: vars.color.gray['80'],

        '@media': {
            [media.desktop]: {
                fontSize: '1.5rem',
                letterSpacing: '-0.2%',
            },
        },
    },
]);

export const rankingNumber = style([
    textStyles.body1Medium,
    {
        display: 'inline-flex',
        flexShrink: 0,
        justifyContent: 'flex-start',
        minWidth: '2ch',
        color: vars.color.green['80'],
        fontVariantNumeric: 'tabular-nums',

        '@media': {
            [media.desktop]: {
                fontSize: '1.5rem',
                letterSpacing: '-0.2%',
            },
        },
    },
]);

export const rankingKeyword = style([
    textStyles.headlineRegular,
    {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
]);

export const pagination = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '4px',

    '@media': {
        [media.desktop]: {
            margin: '0',
        },
    },
});

export const paginationButton = style({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '16px',
    height: '16px',
    color: vars.color.gray['60'],
    selectors: {
        '&:disabled': {
            opacity: 0.5,
            cursor: 'not-allowed',
        },
    },
});

export const paginationText = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

export const paginationCurrent = style([
    textStyles.body1Semibold,
    {
        color: vars.color.black,
        fontVariantNumeric: 'tabular-nums',
    },
]);

export const paginationSeparator = style([
    textStyles.body1Medium,
    {
        color: vars.color.gray['60'],
    },
]);

export const paginationTotal = style([
    textStyles.body1Medium,
    {
        color: vars.color.gray['60'],
        fontVariantNumeric: 'tabular-nums',
    },
]);

export const productGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    columnGap: '24px',
    rowGap: '24px',
});

export const recommendSwiper = style({
    width: 'calc(100% - 40px)',
    paddingRight: '20px',
    display: 'flex',
    overflowX: 'auto',
    gap: '16px',
    marginLeft: '20px',
    boxSizing: 'content-box',
    scrollSnapType: 'x mandatory',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
    selectors: {
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
});

export const recommendSlide = style({
    flex: '0 0 auto',
    width: '144px',
    height: 'auto',
    scrollSnapAlign: 'start',
});

export const recommendCardWrap = style({
    minWidth: 0,
    width: '100%',
});

export const productSectionContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
    margin: 0,
    padding: '24px 0 0 0',
    borderTop: `6px solid ${vars.color.gray['20']}`,
    boxSizing: 'border-box',

    '@media': {
        [media.desktop]: {
            gap: '24px',
            borderTop: 'none',
            padding: '0',
        },
        [media.tablet]: {
            padding: '20px',
        },
    },
});
