import { keyframes, style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

const shimmer = keyframes({
    '0%': { backgroundPosition: '200% 0' },
    '100%': { backgroundPosition: '-200% 0' },
});
export const container = style({
    position: 'relative',
    width: '100vw',
    maxWidth: '1440px',
    left: '50%',
    transform: 'translateX(-50%)',
    overflow: 'hidden',
    padding: '0 20px 40px',
    marginBottom: '-40px',

    '@media': {
        [media.desktop]: {
            padding: 0,
            marginBottom: 0,
        },
    },
});

export const heroBanner = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%',

    '@media': {
        [media.desktop]: {
            gap: '32px',
        },
    },
});

export const swiperContainer = style({
    width: '100%',
    position: 'relative',
    maxWidth: '1200px',
    margin: '0 auto',
    overflow: 'visible',
});

export const loadingOverlay = style({
    position: 'absolute',
    inset: 0,
    zIndex: 1,
});

export const swiperHiddenWhileLoading = style({
    visibility: 'hidden',
});

export const swiper = style({
    width: '100%',
    height: '100%',
    overflow: 'visible !important',
});

export const slide = style({
    aspectRatio: '320 / 427',
    height: 'auto',
    borderRadius: '12px',
    overflow: 'hidden',
    transition:
        'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: 0.6,
    selectors: {
        '&.swiper-slide-active, &.swiper-slide-prev, &.swiper-slide-next': {
            opacity: 1,
            boxShadow:
                '0px 20px 20px 0px rgba(91, 100, 91, 0.1), 0px 8px 10px 0px rgba(91, 100, 91, 0.15)',
        },
    },

    '@media': {
        [media.mobile]: {
            borderRadius: '8px',
        },
    },
});

export const card = style({
    display: 'block',
    position: 'relative',
    width: '100%',
    height: '100%',
    textDecoration: 'none',
    backgroundColor: vars.color.white,
});

export const cardImage = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
});

export const cardContent = style({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '36px 24px',
    zIndex: 2,
    background:
        'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0) 100%)',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',

    '@media': {
        '(min-width: 768px)': {
            padding: '48px 28px',
        },
    },
});

export const cardTitle = style([
    textStyles.display2Bold,
    {
        color: vars.color.white,
        fontSize: 'clamp(2rem, 2.5vw, 3rem)',

        '@media': {
            [media.mobile]: {
                fontSize: '3rem',
            },
        },
    },
]);

export const cardDescription = style([
    textStyles.headlineRegular,
    {
        color: vars.color.white,

        '@media': {
            [media.mobile]: {
                fontSize: '1.4rem',
                lineHeight: '1.4',
                letterSpacing: '-2%',
            },
        },
    },
]);

export const controls = style({
    display: 'none',

    '@media': {
        [media.desktop]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
        },
    },
});

export const progressBox = style({
    flex: 1,
    position: 'relative',
    height: '40px',
    display: 'flex',
    alignItems: 'center',

    vars: {
        '--swiper-pagination-progressbar-size': '3px',
        '--swiper-pagination-progressbar-bg-color': vars.color.gray['20'],
        '--swiper-pagination-color': vars.color.gray['80'],
    },
});

export const swiperPagination = style({
    width: '100%',
    backgroundColor: vars.color.gray['20'],
    top: '50% !important',
    transform: 'translateY(-50%) !important',
});

export const arrowBox = style({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
});

export const navButton = style({
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    color: vars.color.black,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.2s',
});

export const controlButton = style({
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    color: vars.color.black,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const separator = style({
    width: '1px',
    height: '12px',
    backgroundColor: vars.color.gray['50'],
});

// Since the JS uses class names like .navPrev and .navNext for Swiper navigation,
// we need to export these class names or use global styles targeting them if they were custom.
// However, looking at the TSX:
// navigation={{ prevEl: `.${styles.navPrev}`, nextEl: `.${styles.navNext}` }}
// BUT, in the module.css provided, navPrev and navNext were NOT defined!
// They were likely using default swiper classes or just missing.
// Wait, looking at module.css content again... lines 1-223.
// checking module.css content...
// I don't see .navPrev or .navNext in the module.css content I read!
// It seems the original code might have been broken or relying on something else?
// Ah, allow me to re-read the module.css.
// It ends at line 223.
// It has .controls, .controlButton, .pageIndicator.
// But the TSX has:
// navigation={{
//     prevEl: `.${styles.navPrev}`,
//     nextEl: `.${styles.navNext}`,
// }}
// If these didn't exist in module.css, `styles.navPrev` would be undefined.
// If it's undefined, Swiper navigation buttons might not work properly if they rely on custom selectors.
// BUT, the custom control buttons in the TSX use `onClick={() => swiperInstance?.slidePrev()}`.
// So the Swiper's internal navigation config might be unused or redundant if they have custom buttons.
// I will verify this. The TSX has custom buttons below the swiper.
// So the navigation prop might be a leftover. I'll keep it safe by adding empty styles or just removing the navigation prop if it's not needed, but better to support what's there.
// I'll add navPrev and navNext styles just in case to avoid undefined.

export const navPrev = style({});
export const navNext = style({});

export const pageIndicator = style({
    fontSize: '0.875rem',
    color: '#666',
    minWidth: '48px',
    textAlign: 'center',
});

export const skeletonWrapper = style({
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    perspective: '1000px',

    '@media': {
        '(min-width: 768px)': {
            gap: '24px',
            perspective: 'none',
        },
    },
});

export const skeletonCard = style({
    flexShrink: 0,
    width: 'calc(100% / 1.05 - 2px)',
    aspectRatio: '320 / 427',
    borderRadius: '8px',
    backgroundColor: vars.color.gray['30'],
    position: 'relative',
    overflow: 'hidden',

    transformOrigin: 'center center',
    willChange: 'transform',
    selectors: {
        [`${skeletonWrapper} &:nth-child(1), ${skeletonWrapper} &:nth-child(3)`]:
            {
                transform:
                    'translate3d(0px, 0px, -61.4736px) rotateX(0deg) rotateY(0deg) scale(0.948772)',
            },
        [`${skeletonWrapper} &:nth-child(2)`]: {
            transform:
                'translate3d(0px, 0px, -0.0597411px) rotateX(0deg) rotateY(0deg) scale(0.99995)',
        },
    },

    '@media': {
        '(min-width: 768px)': {
            borderRadius: '12px',
            width: 'calc((100% - 48px) / 3)',
            transform: 'none',

            selectors: {
                [`${skeletonWrapper} &:nth-child(1), ${skeletonWrapper} &:nth-child(3)`]:
                    {
                        transform: 'none',
                    },
                [`${skeletonWrapper} &:nth-child(2)`]: {
                    transform: 'none',
                },
            },
        },
    },
});

export const skeletonImage = style({
    position: 'absolute',
    inset: 0,
    background:
        'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100%)',
    backgroundSize: '200% 100%',
    animation: `${shimmer} 1.5s infinite`,
});

export const skeletonContent = style({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
});

export const skeletonTitle = style({
    width: '60%',
    height: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '4px',
});

export const skeletonDescription = style({
    width: '80%',
    height: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
});

export const skeletonControls = style({
    display: 'none',

    '@media': {
        [media.desktop]: {
            display: 'block',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            height: '40px',
        },
    },
});
