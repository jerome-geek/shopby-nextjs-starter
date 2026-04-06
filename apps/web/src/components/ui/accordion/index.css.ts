import { keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';

const slideDown = keyframes({
    from: { height: 0, opacity: 0 },
    to: {
        height: 'var(--radix-accordion-content-height)',
        opacity: 1,
    },
});

const slideUp = keyframes({
    from: {
        height: 'var(--radix-accordion-content-height)',
        opacity: 1,
    },
    to: { height: 0, opacity: 0 },
});

export const root = style({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
});

export const item = style({
    position: 'relative',
    borderBottom: `1px solid ${vars.color.gray['20']}`,
});

export const header = style({
    margin: 0,
});

export const trigger = style({
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
    padding: 0,
    border: 0,
    background: 'transparent',
    cursor: 'pointer',
    textAlign: 'left',
    position: 'relative',
});

export const iconWrapper = style({
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.3s ease',
    transform: 'rotate(180deg)',
    selectors: {
        [`${trigger}[data-state="closed"] &`]: {
            transform: 'rotate(360deg)',
        },
        [`${trigger}[data-icon-placement="overlay"] &`]: {
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%) rotate(180deg)',
        },
        [`${trigger}[data-icon-placement="overlay"][data-state="closed"] &`]: {
            transform: 'translateY(-50%) rotate(360deg)',
        },
    },
});

export const content = style({
    overflow: 'hidden',
    transition: 'height 0.3s ease, opacity 0.3s ease',
    selectors: {
        '&[data-state="open"]': {
            animation: `${slideDown} 0.3s ease`,
        },
        '&[data-state="closed"]': {
            animation: `${slideUp} 0.3s ease forwards`,
        },
        '&[data-state="closed"][data-mount-state="true"]': {
            position: 'absolute',
            visibility: 'hidden',
        },
    },
});

export const contentInner = style({
    width: '100%',
});
