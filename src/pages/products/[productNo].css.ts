import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const container = style({
    backgroundColor: vars.color.white,
    minHeight: '100vh',
});

export const thumbnailContainer = style({
    width: '100%',
    aspectRatio: '1 / 1',
    position: 'relative',
    backgroundColor: vars.color.gray[10],
});

globalStyle(`${thumbnailContainer} .swiper-pagination-bullet`, {
    backgroundColor: vars.color.white,
    opacity: 0.5,
});

globalStyle(`${thumbnailContainer} .swiper-pagination-bullet-active`, {
    opacity: 1,
});

export const thumbnail = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const content = style({
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
});

export const brand = style({
    fontSize: '14px',
    color: vars.color.gray[60],
});

export const title = style({
    fontSize: '20px',
    fontWeight: 700,
    color: vars.color.black,
    lineHeight: '1.4',
});

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

export const originalPrice = style({
    fontSize: '14px',
    color: vars.color.gray[40],
    textDecoration: 'line-through',
});

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
    color: vars.color.gray[60],
    marginTop: '4px',
});

export const starIcon = style({
    color: '#FFD700',
});

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
