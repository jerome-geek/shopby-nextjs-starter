import { keyframes, style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { textStyleTokens } from '@/styles/typography.css';

const slideUpAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateY(2px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateX(-2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateY(-2px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateX(2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
});

export const tooltipContent = style({
    borderRadius: '12px',
    padding: '12px 14px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
    color: vars.color.gray['90'],
    ...textStyleTokens.caption1Regular,
    lineHeight: '1.5',
    whiteSpace: 'pre-line',
    userSelect: 'none',
    zIndex: 1000,
    animationDuration: '200ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform, opacity',
    selectors: {
        '&[data-state="delayed-open"][data-side="top"]': { animationName: slideUpAndFade },
        '&[data-state="delayed-open"][data-side="right"]': { animationName: slideRightAndFade },
        '&[data-state="delayed-open"][data-side="bottom"]': { animationName: slideDownAndFade },
        '&[data-state="delayed-open"][data-side="left"]': { animationName: slideLeftAndFade },
    },
});

export const tooltipArrow = style({
    fill: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(16px)',
});
