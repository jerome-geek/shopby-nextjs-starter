import { keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';

const shimmer = keyframes({
    '0%': { backgroundPosition: '200% 0' },
    '100%': { backgroundPosition: '-200% 0' },
});

export const SkeletonBlock = style({
    borderRadius: '8px',
    backgroundColor: vars.color.gray['40'],
});

export const SkeletonBlockSoft = style({
    borderRadius: '8px',
    backgroundColor: vars.color.gray['20'],
});

export const SkeletonShimmer = style({
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    background:
        'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.35) 50%, rgba(255, 255, 255, 0) 100%)',
    backgroundSize: '200% 100%',
    animation: `${shimmer} 1.8s infinite`,
});