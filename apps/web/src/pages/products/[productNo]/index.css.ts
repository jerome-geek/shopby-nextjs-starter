import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';
import { globalVars } from '@/styles/global.css';

export const container = style({
    backgroundColor: vars.color.white,
    minHeight: '100vh',
    paddingBottom: 'calc(80px + env(safe-area-inset-bottom))',
    maxWidth: '1200px',
    margin: '0 auto',

    '@media': {
        [media.desktop]: {
            padding: '40px 20px',
        },
    },
});

export const mainSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',

    '@media': {
        [media.desktop]: {
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 450px',
            gap: '40px',
            alignItems: 'flex-start',
        },
        'screen and (min-width: 1280px)': {
            gap: '60px',
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
        },
    },
});

export const thumbnailContainer = style({
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
            gap: '32px',
            position: 'sticky',
            top: `calc(var(--header-height, ${globalVars.header.height}) + 20px)`,
            width: '100%',
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

export const actionButtons = style({
    display: 'flex',
    gap: '12px',
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
    textStyles.title1Semibold,
    {
        color: vars.color.black,
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
    gap: '8px',
    marginTop: '4px',
});

export const discountRate = style({
    fontSize: '20px',
    fontWeight: 700,
    color: vars.color.pink['100'],
});

export const finalPrice = style({
    fontSize: '20px',
    fontWeight: 700,
    color: vars.color.black,
});

export const originalPrice = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['50'],
        textDecoration: 'line-through',
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

export const couponButton = style({
    backgroundColor: vars.color.black,
    color: vars.color.white,
    padding: '8px 16px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
});

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
    },
]);

export const reviewCount = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['60'],
    },
]);

export const deliveryBox = style({
    backgroundColor: vars.color.gray['10'],
    padding: '16px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
});

export const deliveryTitle = style({
    fontSize: '14px',
    fontWeight: 600,
    color: vars.color.black,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

export const badgeList = style({
    display: 'flex',
    gap: '6px',
});

export const badge = style({
    padding: '4px 8px',
    fontSize: '11px',
    borderRadius: '4px',
    backgroundColor: vars.color.gray[20],
    color: vars.color.gray[60],
});

export const badgeActive = style({
    backgroundColor: vars.color.secondary,
    color: vars.color.white,
});

export const bottomBar = style({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: vars.color.white,
    borderTop: `1px solid ${vars.color.gray[20]}`,
    padding: '12px 20px',
    display: 'flex',
    gap: '12px',
    zIndex: 100,
    paddingBottom: 'max(12px, env(safe-area-inset-bottom))', // For iOS Home Indicator

    '@media': {
        [media.desktop]: {
            display: 'none',
        },
    },
});

export const giftButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '63px',
    height: '63px',
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
        display: 'flex',
        gap: '12px',
        color: vars.color.gray['90'],
        background: vars.color.pink['20'],
    },
]);

export const optionDivider = style({
    width: '100%',
    border: `1px solid ${vars.color.gray['20']}`,
});

export const buttonDivider = style({
    width: '100%',
    border: `2px solid ${vars.color.green['80']}`,
});

export const totalPriceContainer = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export const totalPriceTitle = style([
    textStyles.headingSemibold,
    { color: vars.color.black },
]);

export const totalPrice = style([
    textStyles.title1Bold,
    {
        color: vars.color.pink['100'],
    },
]);

export const orderContainer = style({
    display: 'flex',
    flexDirection: 'column',
    '@media': {
        [media.desktop]: {
            gap: '12px',
            position: 'sticky',
            bottom: 0,
            backgroundColor: vars.color.white,
            paddingTop: '12px',
            zIndex: 1,
            // 버튼 영역에 그림자를 주어 경계를 명확히 함
            boxShadow: `0 -10px 10px -5px ${vars.color.white}`,
        },
    },
});

export const optionContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',

    '@media': {
        [media.desktop]: {
            gap: '24px',
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
