import { globalStyle, style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

export const section = style({
    padding: '0',
    backgroundColor: vars.color.white,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',

    '@media': {
        [media.mobile]: {
            gap: '20px',
        },
    },
});

export const header = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
});

export const titleWrapper = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
});

export const title = style([
    textStyles.title1Bold,
    {
        color: vars.color.black,
    },
]);

export const subtitle = style([
    textStyles.headlineRegular,
    {
        color: vars.color.gray[60],
    },
]);

export const viewAll = style([
    textStyles.body1Regular,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        color: vars.color.gray['60'],
        textDecoration: 'none',
        '@media': {
            [media.mobile]: {
                ...textStyleTokens.caption1Regular,
            },
        },
    },
]);

export const categoryList = style({
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    marginBottom: '8px',

    selectors: {
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
    '@media': {
        [media.mobile]: {
            marginBottom: '0',
            marginLeft: '-20px',
            width: 'calc(100% + 40px)',
        },
    },
});

globalStyle(`${categoryList} > .swiper`, {
    '@media': {
        [media.mobile]: {
            padding: '0 20px',
        },
    },
});

export const categoryTab = style({
    padding: '10px 20px',
    borderRadius: '24px',
    fontSize: '15px',
    fontWeight: 500,
    backgroundColor: vars.color.gray[10],
    color: vars.color.gray[60],
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s ease',
});

export const categoryTabActive = style({
    backgroundColor: vars.color.secondary, // Muted green matching the image
    color: vars.color.white,
    fontWeight: 600,
});

export const swiperContainer = style({
    width: '100%',
});

export const productGridItem = style({
    height: 'auto',
    position: 'relative',
});

export const rankBadge = style([
    textStyles.caption1Semibold,
    {
        position: 'absolute',
        top: '0',
        left: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: vars.color.white,
        zIndex: 2,
        borderTopLeftRadius: '4px',
        width: '24px',
        height: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
]);

export const moreLink = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
        backgroundColor: vars.color.green['20'],
        borderRadius: '8px',
        width: '100%',
        maxWidth: '588px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        padding: '16px 0',
        margin: '0 auto',
        transition: 'opacity 0.2s ease-in-out',
        selectors: {
            '&:hover': {
                opacity: 0.8,
            },
        },
        '@media': {
            [media.mobile]: {
                fontSize: '1.5rem',
                lineHeight: '1.4',
                letterSpacing: '-0.2%',
            },
        },
    },
]);

export const emptyMessage = style([
    textStyles.headlineRegular,
    {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: '40px 0',
        color: vars.color.gray[60],
        backgroundColor: vars.color.gray[10],
        borderRadius: '4px',
        '@media': {
            [media.mobile]: {
                fontSize: '1.4rem',
                lineHeight: '1.4',
                letterSpacing: '-2%',
            },
        },
    },
]);
