import { globalStyle, style } from '@vanilla-extract/css';

import { media } from '@/styles/media';

export const section = style({});

export const swiperContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    alignItems: 'center',
    marginLeft: -20,
    width: 'calc(100% + 40px)',

    '@media': {
        [media.tablet]: {
            marginLeft: 0,
            width: '100%',
        },
        [media.desktop]: {
            marginLeft: 0,
            width: '100%',
        },
    },
});

globalStyle(`${swiperContainer} .swiper`, {
    width: '100%',
    padding: '0 20px',
});

globalStyle(`${swiperContainer} .swiper-wrapper`, {
    width: 'fit-content',
});

globalStyle(`${swiperContainer} .swiper`, {
    '@media': {
        [media.tablet]: { padding: 0 },
        [media.desktop]: { padding: 0 },
    },
});

export const bannerImage = style({
    width: 'auto',
    height: 40,
    borderRadius: 4,
    objectFit: 'contain',
    display: 'block',

    '@media': {
        [media.tablet]: {
            height: 48,
        },
        [media.desktop]: {
            height: 48,
        },
    },
});

export const skeletonBanner = style({
    width: 72,
    height: 40,
    borderRadius: 4,
    display: 'block',

    '@media': {
        [media.tablet]: {
            height: 48,
        },
        [media.desktop]: {
            height: 48,
        },
    },
});
