import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

const fadeIn = keyframes({
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
});

export const container = style({
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
    minHeight: '48px',
    '@media': {
        'screen and (min-width: 768px)': {
            gap: '4px',
            minHeight: '56px',
        },
    },
});

export const brand = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray[60],
        display: 'flex',
        alignItems: 'center',
        fontSize: '1.2rem',
        fontWeight: 600,
    },
]);

export const productName = style([
    textStyles.body2Medium,
    {
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: vars.color.black,
        '@media': {
            'screen and (min-width: 768px)': {
                fontSize: '1.4rem',
            },
        },
    },
]);

export const priceWrapper = style({
    display: 'flex',
    gap: '4px',
});

export const productPrice = style({
    fontSize: '1.7rem',
    fontWeight: '700',
    lineHeight: '1.5',
    letterSpacing: '-1.3%',
    color: vars.color.black,
});

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
});

export const textSticker = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 0.6rem',
    backgroundColor: vars.color.gray[90],
    color: vars.color.white,
    fontSize: '1rem',
    fontWeight: '600',
    lineHeight: '1.5',
    letterSpacing: '-2%',
    borderRadius: '9999px',
    height: '20px',
});

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
