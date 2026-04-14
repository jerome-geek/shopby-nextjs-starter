import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';

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

const skeletonBase = style({
    background: vars.color.gray['10'],
    borderRadius: '8px',
});

export const SkeletonTitleBlock = style([
    skeletonBase,
    {
        width: '160px',
        height: '22px',
    },
]);

export const SkeletonSubTitleBlock = style([
    skeletonBase,
    {
        width: '220px',
        height: '18px',
        opacity: 0.75,
    },
]);

export const SkeletonLinkBlock = style([
    skeletonBase,
    {
        width: '92px',
        height: '18px',
        opacity: 0.65,
    },
]);

export const SkeletonImage = style([
    skeletonBase,
    {
        width: '100%',
    },
]);

export const SkeletonTextLine = style([
    skeletonBase,
    {
        height: '16px',
        opacity: 0.75,
    },
]);

export const SkeletonTextLineShort = style([
    SkeletonTextLine,
    {
        width: '140px',
    },
]);

export const SkeletonTextLineLong = style([
    SkeletonTextLine,
    {
        width: '200px',
    },
]);

export const SkeletonMetaRow = style({
    display: 'flex',
    gap: '12px',
});

export const SkeletonMetaChip = style([
    skeletonBase,
    {
        width: '72px',
        height: '16px',
        borderRadius: '999px',
        opacity: 0.6,
    },
]);
