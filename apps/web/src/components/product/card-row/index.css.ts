import { keyframes, style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

const fadeIn = keyframes({
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
});

export const container = style({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '24px',
    '@media': {
        [media.mobile]: {
            gap: '12px',
        },
    },
});

export const thumbWrapper = style({
    display: 'block',
    width: '30%',
    maxWidth: '128px',
    position: 'relative',
    aspectRatio: '1/1',
    backgroundColor: vars.color.gray[10],
    borderRadius: '4px',
    overflow: 'hidden',
    contain: 'layout',
    transform: 'translateZ(0)',
    '@media': {
        [media.mobile]: {
            width: '26.5%',
        },
    },
});

export const thumb = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    animation: `${fadeIn} 0.25s ease-in-out forwards`,
});

export const likeButton = style({
    height: 'fit-content',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    padding: 0,
});

export const productInfoContainer = style({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    gap: '4px',
});

export const brandInfoWrapper = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '4px',
});

export const brand = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray[60],
        display: 'flex',
        alignItems: 'center',
        '@media': {
            [media.mobile]: {
                fontSize: '1.2rem',
                lineHeight: '1.4',
                letterSpacing: '-2%',
            },
        },
    },
]);

export const productName = style([
    textStyles.headlineMedium,
    {
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        '@media': {
            [media.mobile]: {
                fontSize: '1.4rem',
                lineHeight: '1.4',
                letterSpacing: '-2%',
            },
        },
    },
]);

export const priceWrapper = style({
    display: 'flex',
    gap: '4px',
});

export const productPrice = style([
    textStyles.headingBold,
    {
        '@media': {
            [media.mobile]: {
                fontSize: '1.5rem',
                lineHeight: '1.4',
                letterSpacing: '-0.2%',
            },
        },
    },
]);

export const discountPrice = style({
    fontSize: '1.7rem',
    fontWeight: '700',
    lineHeight: '1.5',
    letterSpacing: '-1.3%',
    color: vars.color.red,
});

export const stickerList = style({
    display: 'flex',
    gap: '2px',
    alignItems: 'center',
    marginTop: '4px',
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
