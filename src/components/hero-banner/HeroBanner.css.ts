import { style, globalStyle, keyframes } from '@vanilla-extract/css';

const shimmer = keyframes({
    '0%': { backgroundPosition: '200% 0' },
    '100%': { backgroundPosition: '-200% 0' },
});

export const heroBanner = style({
    position: 'relative',
    width: '100vw',
    marginLeft: 'calc(50% - 50vw)',
    marginRight: 'calc(50% - 50vw)',
    padding: '24px 0',
    backgroundColor: '#f5f5f5',
    '@media': {
        '(max-width: 768px)': {
            padding: '16px 0',
        },
    },
});

export const swiperContainer = style({
    width: '100%',
    // Removed max-width and margin: 0 auto to make it full width
    padding: '0 24px',
    '@media': {
        '(max-width: 768px)': {
            padding: '0 16px',
        },
    },
});

export const swiper = style({
    width: '100%',
    overflow: 'visible !important' as any,
});

export const slide = style({
    width: '70vw !important' as any,
    aspectRatio: '320 / 427',
    height: 'auto',
    borderRadius: '12px',
    overflow: 'hidden',
    '@media': {
        '(min-width: 768px)': {
            width: '320px !important' as any,
        },
        '(min-width: 1024px)': {
            width: '320px !important' as any,
        },
    },
});

export const card = style({
    display: 'block',
    position: 'relative',
    width: '100%',
    height: '100%',
    textDecoration: 'none',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    selectors: {
        '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
        },
    },
});

export const cardImage = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const cardContent = style({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '24px',
    background:
        'linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)',
    '@media': {
        '(max-width: 768px)': {
            padding: '16px',
        },
    },
});

export const cardTitle = style({
    fontSize: '1.5rem',
    fontWeight: 700,
    margin: '0 0 8px',
    lineHeight: 1.3,
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
    '@media': {
        '(max-width: 768px)': {
            fontSize: '1.25rem',
        },
    },
});

export const cardDescription = style({
    fontSize: '0.875rem',
    margin: 0,
    lineHeight: 1.5,
    opacity: 0.9,
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
    '@media': {
        '(max-width: 768px)': {
            fontSize: '0.8125rem',
        },
    },
});

export const controls = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    marginTop: '20px',
});

export const controlButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    border: 'none',
    background: 'transparent',
    color: '#666',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    selectors: {
        '&:hover': {
            color: '#333',
        },
    },
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
    gap: '16px',
    overflow: 'hidden',
});

export const skeletonCard = style({
    flexShrink: 0,
    width: '320px',
    height: '380px',
    borderRadius: '16px',
    backgroundColor: '#e0e0e0',
    position: 'relative',
    overflow: 'hidden',
    '@media': {
        '(max-width: 768px)': {
            width: '280px',
            height: '320px',
        },
        '(max-width: 480px)': {
            width: '240px',
            height: '280px',
        },
    },
});

export const skeletonImage = style({
    width: '100%',
    height: '100%',
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
});

export const skeletonTitle = style({
    width: '60%',
    height: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '4px',
    marginBottom: '8px',
});

export const skeletonDescription = style({
    width: '80%',
    height: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
});
