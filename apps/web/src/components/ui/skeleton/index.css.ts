import { style, keyframes } from '@vanilla-extract/css';

const shimmer = keyframes({
    '0%': {
        backgroundPosition: '-200% 0',
    },
    '100%': {
        backgroundPosition: '200% 0',
    },
});

export const skeleton = style({
    backgroundColor: '#e5e7eb',
    backgroundImage:
        'linear-gradient(90deg, #e5e7eb 0%, #f3f4f6 50%, #e5e7eb 100%)',
    backgroundSize: '200% 100%',
    animation: `${shimmer} 1.5s infinite linear`,
    borderRadius: '0.25rem',
    width: '100%',
    height: '100%',
    display: 'inline-block',
});

export const skeletonContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
});

export const skeletonRow = style({
    display: 'flex',
    gap: '12px',
    width: '100%',
});
