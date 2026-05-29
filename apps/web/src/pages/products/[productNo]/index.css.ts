import { globalStyle, style } from '@vanilla-extract/css';

import { globalVars } from '@/styles/global.css';
import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

export const container = style({
    backgroundColor: vars.color.white,
    minHeight: '100vh',
    paddingBottom: `calc(${globalVars.bottomNav.height} + 80px)`,
    maxWidth: '1200px',
    margin: '0 auto',

    '@media': {
        [media.desktop]: {
            padding: '0',
        },
    },
});

export const mainSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',

    '@media': {
        [media.desktop]: {
            display: 'flex',
            flexDirection: 'row',
            // gridTemplateColumns: 'minmax(0, 1fr) 450px',
            gap: '48px',
            alignItems: 'flex-start',
        },
    },
});

export const leftColumn = style({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minWidth: 0,

    '@media': {
        [media.desktop]: {
            flex: 1,
            maxWidth: '666px',
            gap: '40px',
        },
    },
});

export const thumbnailContainer = style({
    position: 'relative',
    margin: '0 -20px',

    '@media': {
        [media.desktop]: {
            margin: 0,
            width: '100%',
        },
    },
});

export const content = style({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: 0,
    gap: '20px',

    '@media': {
        [media.desktop]: {
            maxWidth: '487px',
            gap: '32px',
            position: 'sticky',
            top: `calc(var(--header-height, ${globalVars.header.height}) + 20px)`,
            width: '100%',
            overflow: 'auto',
            maxHeight: `calc(100vh - var(--header-height, ${globalVars.header.height}) - 40px)`,
            paddingRight: '20px',
            marginRight: '-20px',
            marginLeft: '0px',
            scrollBehavior: 'smooth',
            overscrollBehavior: 'contain',

            selectors: {
                '&::-webkit-scrollbar': {
                    width: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: vars.color.gray['30'],
                    borderRadius: '10px',
                },
            },
        },
    },
});

export const header = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
});

export const titleInfo = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
});

export const priceSection = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
});

export const priceInfo = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
});

export const brand = style([
    textStyles.headlineMedium,
    {
        color: vars.color.gray[60],
    },
]);

export const productName = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
    },
    {
        '@media': {
            [media.desktop]: {
                ...textStyleTokens.title1Semibold,
            },
        },
    },
]);

export const promotionText = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
    },
]);

export const likeButton = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
});

export const likeCount = style([
    textStyles.body1Medium,
    {
        color: vars.color.green['100'],
    },
]);

export const priceContainer = style({
    display: 'flex',
    alignItems: 'baseline',
    gap: '6px',
});

export const discountRate = style([
    textStyles.headingBold,
    {
        color: vars.color.pink['100'],

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.title1Bold,
            },
        },
    },
]);

export const finalPrice = style([
    textStyles.headingBold,
    {
        color: vars.color.black,

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.title1Bold,
            },
        },
    },
]);

export const salePrice = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['50'],
        textDecoration: 'line-through',

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.body1Regular,
            },
        },
    },
]);

export const couponButton = style([
    textStyles.body2Semibold,
    {
        backgroundColor: vars.color.black,
        color: vars.color.white,
        padding: '8px 16px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.headlineSemibold,
            },
        },
    },
]);

export const ratingContainer = style({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '14px',
});

export const reviewRate = style([
    textStyles.body2Semibold,
    {
        color: vars.color.gray['80'],

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.body1Semibold,
            },
        },
    },
]);

export const reviewCount = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['60'],

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.body1Regular,
            },
        },
    },
]);

export const deliveryBox = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '16px 0',
    borderTop: `1px solid ${vars.color.gray['20']}`,
    borderBottom: `1px solid ${vars.color.gray['20']}`,
});

export const deliveryRow = style({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
});

export const deliveryLabel = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['60'],
        display: 'inline-flex',
        alignItems: 'center',
        width: '80px',
        flexShrink: 0,
        margin: 0,
    },
]);

export const deliveryValue = style([
    textStyles.body2Regular,
    {
        color: vars.color.black,
        margin: 0,
    },
]);

export const bottomSticky = style({
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: vars.color.white,
    borderTop: `1px solid ${vars.color.gray[20]}`,
    padding: '12px 20px',
    display: 'flex',
    gap: '6px',
    zIndex: 100,
    willChange: 'transform',
    transition: 'transform 0.2s ease-in-out',

    '@media': {
        [media.tablet]: {
            bottom: 0,
        },
        [media.desktop]: {
            display: 'none',
        },
    },
});

globalStyle(`${bottomSticky} > button`, {
    height: '53px',
});

export const giftButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '53px',
    height: '53px',
    border: `1px solid ${vars.color.gray['50']}`,
    borderRadius: '4px',
    backgroundColor: vars.color.white,
    flexShrink: 0,
});

export const additionalInfoContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',

    selectors: {
        '&:empty': {
            display: 'none',
        },
    },
});

export const timeSaleContainer = style([
    textStyles.body1Semibold,
    {
        position: 'absolute',
        bottom: '0',
        left: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '44px',
        background: vars.color.pink['20'],
        opacity: '0.8',
        zIndex: 1,
    },
]);

export const optionDivider = style({
    width: '100%',
    border: `1px solid ${vars.color.gray['20']}`,
});

export const optionContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',

    '@media': {
        [media.desktop]: {
            gap: '20px',
        },
    },
});

export const topButtonContainer = style({
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    flexShrink: '0',
});
