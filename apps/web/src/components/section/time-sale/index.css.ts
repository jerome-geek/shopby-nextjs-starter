import { globalStyle, style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

export const section = style({
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
    alignItems: 'center',
});

export const titleWrapper = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
});

export const titleRow = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

export const title = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
    },
]);

export const timer = style([
    textStyles.headingBold,
    {
        color: vars.color.pink['100'],
        fontVariantNumeric: 'tabular-nums',
    },
]);

export const subtitle = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
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

export const productGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    listStyle: 'none',
    padding: 0,
    margin: 0,

    '@media': {
        [media.desktop]: {
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '48px 24px',
        },
    },
});

// Custom sticker for the timer badge on top of image
export const timerBadge = style({
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: vars.color.pink['100'],
    color: vars.color.white,
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 700,
    zIndex: 2,
});

export const swiperContainer = style({
    width: '100%',

    '@media': {
        [media.mobile]: {
            marginLeft: '-20px',
            width: 'calc(100% + 40px)',
        },
        [media.tablet]: {
            marginLeft: '-20px',
            width: 'calc(100% + 40px)',
        },
    },
});

globalStyle(`${swiperContainer} .swiper`, {
    width: '100%',
    '@media': {
        [media.mobile]: {
            padding: '0 20px',
        },
        [media.tablet]: {
            padding: '0 20px',
        },
    },
});

export const productItem = style({
    position: 'relative',
});

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
