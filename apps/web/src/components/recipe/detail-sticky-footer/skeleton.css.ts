import { keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { media } from '@/styles/media';

const shimmer = keyframes({
    '0%': { backgroundPosition: '-200px 0' },
    '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
});

export const skeletonBase = style({
    background: `linear-gradient(90deg, ${vars.color.gray['10']} 25%, ${vars.color.gray['20']} 50%, ${vars.color.gray['10']} 75%)`,
    backgroundSize: '400px 100%',
    animation: `${shimmer} 1.4s ease infinite`,
    borderRadius: '8px',
});

export const footer = style({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '64px',
    backgroundColor: vars.color.white,
    borderTop: `1px solid ${vars.color.gray['20']}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    paddingBottom: 'calc(20px + env(safe-area-inset-bottom))',
    zIndex: 1000,
    boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',

    '@media': {
        [media.tablet]: {
            display: 'none',
        },
        [media.desktop]: {
            display: 'none',
        },
    },
});

export const buttonGroup = style({
    display: 'flex',
    gap: '16px',
});

export const iconCircle = style([
    skeletonBase,
    {
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        flexShrink: 0,
    },
]);

export const countRect = style([
    skeletonBase,
    {
        width: '20px',
        height: '14px',
        borderRadius: '4px',
    },
]);

export const actionButton = style({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
});
