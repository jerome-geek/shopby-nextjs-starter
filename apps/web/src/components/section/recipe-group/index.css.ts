import { keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { media } from '@/styles/media';

export const RecipeGroupSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '48px',
    width: '100%',

    '@media': {
        [media.desktop]: {
            flexDirection: 'row',
            gap: '80px',
        },
    },
});

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

export const SkeletonTitleBlock = style([
    SkeletonBlockSoft,
    {
        width: '180px',
        height: '22px',
    },
]);

export const SkeletonSubTitleBlock = style([
    SkeletonBlockSoft,
    {
        width: '260px',
        height: '18px',
    },
]);

export const SkeletonLinkBlock = style([
    SkeletonBlockSoft,
    {
        width: '76px',
        height: '18px',
        borderRadius: '999px',
    },
]);

export const SkeletonTextLineLong = style([
    SkeletonBlockSoft,
    {
        width: '80%',
        height: '14px',
        borderRadius: '6px',
    },
]);

export const SkeletonTextLineShort = style([
    SkeletonBlockSoft,
    {
        width: '55%',
        height: '14px',
        borderRadius: '6px',
    },
]);

export const SkeletonMetaRow = style({
    display: 'flex',
    gap: '10px',
    marginTop: '4px',
});

export const SkeletonMetaChip = style([
    SkeletonBlockSoft,
    {
        width: '56px',
        height: '14px',
        borderRadius: '999px',
    },
]);
