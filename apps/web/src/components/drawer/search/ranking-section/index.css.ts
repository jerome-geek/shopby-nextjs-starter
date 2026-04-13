import { style } from '@vanilla-extract/css';

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

export const dotButton = style({
    flexShrink: 0,
    width: '6px',
    height: '6px',
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
