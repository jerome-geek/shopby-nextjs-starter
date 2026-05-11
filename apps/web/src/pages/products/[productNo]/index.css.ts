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

export const imageWrapper = style({
    width: '100%',
    aspectRatio: '1 / 1',
    position: 'relative',
    overflow: 'hidden',
});

export const swiperContainer = style({
    width: '100%',
    height: '100%',
});

export const paginationContainer = style({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '6px',
    padding: '16px 0',
});

export const bullet = style({
    width: '6px',
    height: '6px',
    backgroundColor: vars.color.gray['50'],
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.2s',
    margin: '0 !important',
    opacity: 1,
    selectors: {
        // 이 라이브러리 클래스는 Swiper가 활성화될 때 자동으로 붙여주므로 여기서 타겟팅 가능
        '&.swiper-pagination-bullet-active': {
            backgroundColor: vars.color.green['100'],
        },
    },
});

export const thumbnail = style({
    width: '100%',
    height: '100%',
    maxWidth: '564px',
    aspectRatio: 1 / 1,
    objectFit: 'cover',
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

export const cartButton = style({
    flex: 1,
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

export const timeSaleBar = style({
    backgroundColor: vars.color.pink['20'], // Light pink
    color: vars.color.pink['100'],
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: 600,
});

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
    backgroundColor: vars.color.green['20'],
    padding: '12px',
    borderRadius: '8px',
    display: 'flex',
    gap: '12px',

    '@media': {
        [media.desktop]: {
            padding: '16px',
        },
    },
});

export const deliveryContentContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
});

export const deliveryTitle = style([
    textStyles.body2Semibold,
    {
        color: vars.color.gray['90'],

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.body1Semibold,
            },
        },
    },
]);

export const badgeList = style({
    display: 'flex',
    gap: '4px',
});

export const badge = style([
    textStyles.caption2Semibold,
    {
        padding: '3px 6px',
        borderRadius: '2px',
        backgroundColor: vars.color.secondary,
        color: vars.color.white,

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.caption1Semibold,
            },
        },
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

export const buyButton = style([
    textStyles.body1Semibold,
    {
        flex: 1,
        backgroundColor: vars.color.primary,
        color: vars.color.white,
        border: 'none',
        borderRadius: '4px',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
]);

export const purchaseButtonDesktop = style([
    buyButton,
    {
        display: 'none',
        '@media': {
            [media.desktop]: {
                display: 'flex',
                width: '100%',
                marginTop: '16px',
            },
        },
    },
]);

export const giftButtonDesktop = style([
    giftButton,
    {
        display: 'none',

        '@media': {
            [media.desktop]: {
                display: 'flex',
                width: '63px',
                height: '63px',
            },
        },
    },
]);

export const additionalInfoContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
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

export const detailsSection = style({
    width: '100%',
    gridColumn: '1 / span 2', // 데스크탑에서 양쪽 열을 모두 차지하도록 (Grid 사용 시)

    '@media': {
        [media.desktop]: {
            padding: '0 20px',
        },
    },
});

export const topButtonContainer = style({
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    flexShrink: '0',
});
