import { keyframes, style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

const shimmer = keyframes({
    '0%': { backgroundPosition: '-200% 0' },
    '100%': { backgroundPosition: '200% 0' },
});

const skeletonBase = style({
    background: `linear-gradient(90deg, ${vars.color.gray[10]} 25%, ${vars.color.gray[20]} 50%, ${vars.color.gray[10]} 75%)`,
    backgroundSize: '200% 100%',
    animation: `${shimmer} 1.5s ease-in-out infinite`,
    borderRadius: '4px',
});

export const card = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
});

export const thumb = style([
    skeletonBase,
    {
        width: '100%',
        aspectRatio: '1/1',
        borderRadius: '4px',
    },
]);

export const info = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    minHeight: '100px',
});

export const brandLine = style([
    skeletonBase,
    {
        height: '12px',
        width: '40%',
    },
]);

export const nameLine1 = style([
    skeletonBase,
    {
        height: '14px',
        width: '100%',
    },
]);

export const nameLine2 = style([
    skeletonBase,
    {
        height: '14px',
        width: '70%',
    },
]);

export const priceLine = style([
    skeletonBase,
    {
        height: '16px',
        width: '50%',
        marginTop: '4px',
    },
]);
