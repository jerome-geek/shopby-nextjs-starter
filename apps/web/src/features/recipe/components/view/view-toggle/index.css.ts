import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';

export const viewToggleArea = style({
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
});

export const viewToggle = style({
    display: 'flex',
    backgroundColor: '#f2f5f1',
    padding: '2px',
    borderRadius: '36px',
    gap: '2px',
    position: 'relative',
    border: '1px solid rgba(0, 0, 0, 0.02)',
    cursor: 'pointer',
    width: 'fit-content',
    outline: 'none',
    transition: 'all 0.2s ease',
    selectors: {
        '&:active': {
            transform: 'scale(0.96)',
        },
    },
});

export const toggleItem = style({
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '36px',
    position: 'relative',
    zIndex: 1,
    pointerEvents: 'none',

    '@media': {
        [media.desktop]: {
            width: '36px',
            height: '36px',
        },
    },
});

export const toggleActiveBg = style({
    position: 'absolute',
    top: '2px',
    left: '2px',
    width: '24px',
    height: '24px',
    borderRadius: '24px',
    backgroundColor: vars.color.white,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    zIndex: 0,

    '@media': {
        [media.desktop]: {
            width: '36px',
            height: '36px',
        },
    },
});
