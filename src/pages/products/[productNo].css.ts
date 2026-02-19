import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    backgroundColor: vars.color.white,
    minHeight: '100vh',
    padding: '0 20px',
});

export const thumbnailContainer = style({
    width: '100%',
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
    objectFit: 'cover',
});

export const content = style({
    // padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
});

export const brand = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray[60],
    },
]);

export const productName = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
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
    color: '#FF3366',
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
    backgroundColor: '#FCE4EC', // Light pink
    color: '#D81B60',
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
    backgroundColor: '#F8F9F8',
    padding: '16px',
    borderRadius: '8px',
    marginTop: '20px',
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
    backgroundColor: '#A8B7A8',
    color: vars.color.white,
});
