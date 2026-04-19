import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const gallery = style({
    marginTop: '12px',
});

export const gallerySwiper = style({
    width: '100%',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: vars.color.gray['20'],
});

export const slideButton = style({
    display: 'block',
    width: '100%',
    border: 0,
    padding: 0,
    background: 'transparent',
    cursor: 'pointer',
});

export const slideInner = style({
    position: 'relative',
    width: '100%',
    minWidth: '100%',
    aspectRatio: '1 / 1',
    height: 'fit-content',
});

export const slideImg = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
});

export const fraction = style([
    textStyles.body2Regular,
    {
        position: 'absolute',
        right: '10px',
        bottom: '10px',
        padding: '6px 10px 5px',
        borderRadius: '999px',
        backgroundColor: 'rgba(0,0,0,0.55)',
        color: vars.color.white,
        zIndex: 2,
        pointerEvents: 'none',
    },
]);
