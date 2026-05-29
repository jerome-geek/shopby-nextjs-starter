import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';

export const imageCarouselContainer = recipe({
    base: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginBottom: '24px',
        backgroundColor: vars.color.white,

        '@media': {
            [media.desktop]: {
                position: 'static',
                zIndex: 'auto',
                gap: '16px',
                marginBottom: 0,
                backgroundColor: 'transparent',
            },
        },
    },
    variants: {
        sticky: {
            true: {
                position: 'sticky',
                top: 0,
                zIndex: 1000,
            },
            false: {
                position: 'relative',
                top: 'auto',
                zIndex: 'auto',
            },
        },
    },
    defaultVariants: {
        sticky: false,
    },
});

export const imageCarousel = recipe({
    base: {
        width: 'calc(100% + 40px)',
        margin: '0 -20px',
        overflow: 'hidden',
        position: 'relative',

        '@media': {
            [media.desktop]: {
                width: '600px',
                margin: '0',
                flexShrink: 0,
                borderRadius: '12px',
            },
        },
    },
    variants: {
        ratio: {
            square: {
                aspectRatio: '1 / 1',
            },
            wide: {
                aspectRatio: '16 / 9',
            },
        },
    },
    defaultVariants: {
        ratio: 'square',
    },
});

export const carouselImage = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const carouselVideo = style({
    width: '100%',
    height: '100%',
    border: 0,
    display: 'block',
});

export const carouselExternalLink = style({
    display: 'block',
    width: '100%',
    height: '100%',
});
