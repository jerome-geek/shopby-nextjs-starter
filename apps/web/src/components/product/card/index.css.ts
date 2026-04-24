import { keyframes, style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

const fadeIn = keyframes({
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
});

export const container = style({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '12px',
});

export const thumbWrapper = style({
    display: 'block',
    width: '100%',
    position: 'relative',
    aspectRatio: '1/1',
    backgroundColor: vars.color.gray[10],
    borderRadius: '4px',
    overflow: 'hidden',
    contain: 'layout',
    transform: 'translateZ(0)',
});

export const thumb = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    animation: `${fadeIn} 0.25s ease-in-out forwards`,
});

export const likeButton = style({
    position: 'absolute',
    bottom: '5px',
    right: '6px',
    zIndex: 1,
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    padding: 0,
});

export const productInfoContainer = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '4px',
    minHeight: '100px',
    '@media': {
        'screen and (min-width: 768px)': {
            gap: '6px',
            minHeight: '110px',
        },
    },
});

export const brandInfoWrapper = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 0,
    // minHeight: '48px',

    '@media': {
        [media.desktop]: {
            gap: '4px',
        },
    },
});

export const brand = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
        display: 'flex',
        alignItems: 'center',
    },
]);

export const productName = style([
    textStyles.body1Medium,
    {
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: vars.color.black,
        lineHeight: '1.4',
        height: '2.8em', // line-height(1.4) * 2 lines

        '@media': {
            [media.desktop]: {
                fontSize: '1.4rem',
            },
        },
    },
]);

export const priceWrapper = style({
    display: 'flex',
    gap: '4px',
});

export const productPrice = style([
    textStyles.headlineBold,
    {
        color: vars.color.black,
    },
]);

export const discountPrice = style([
    textStyles.headlineBold,
    {
        color: vars.color.pink['100'],
    },
]);

export const stickerList = style({
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: '2px',
    rowGap: '4px',
    alignItems: 'center',
});

export const textSticker = style([
    textStyles.caption2Semibold,
    {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 0.6rem',
        backgroundColor: vars.color.gray[20],
        color: vars.color.gray[60],
        borderRadius: '2px',
        height: '20px',
    },
]);

export const statsList = style({
    display: 'flex',
    gap: '8px',
    color: vars.color.gray[70],
    fontSize: '1.1rem',
});

export const statItem = style({
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
});

export const rank = style([
    textStyles.caption1Semibold,
    {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '24px',
        height: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: vars.color.white,
        zIndex: 2,

        '@media': {
            [media.desktop]: {
                width: '28px',
                height: '28px',
                fontSize: '1.4rem',
                letterSpacing: '-1.3%',
            },
        },
    },
]);
