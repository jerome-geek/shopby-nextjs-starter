import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';

export const rankingSwiper = style({
    width: '100%',
    margin: 0,
    padding: 0,
});

export const dotPagination = style({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: 0,
    marginTop: '4px',
    minHeight: '6px',
});

const dotVisualBase = style({
    flexShrink: 0,
    padding: 0,
    border: 'none',
    borderRadius: '999px',
    cursor: 'pointer',
    backgroundColor: vars.color.gray['50'],
    transition: 'background-color 0.2s ease',
    selectors: {
        '&[data-active="true"]': {
            backgroundColor: vars.color.green['100'],
        },
    },
});

/** 피그마: 6px / 4px / 2px — 페이지가 많을 때 양끝이 축소 */
export const dotButton = styleVariants({
    lg: [
        dotVisualBase,
        {
            width: '6px',
            height: '6px',
        },
    ],
    md: [
        dotVisualBase,
        {
            width: '4px',
            height: '4px',
        },
    ],
    sm: [
        dotVisualBase,
        {
            width: '2px',
            height: '2px',
        },
    ],
});
