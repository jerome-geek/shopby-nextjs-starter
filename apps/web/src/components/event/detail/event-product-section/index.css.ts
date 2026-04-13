import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

const MOBILE_BREAKPOINT = 768;

export const sectionContainer = style({
    width: '100%',
});

export const sectionLabel = style({
    fontSize: '1.6rem',
    fontWeight: 700,
    color: vars.color.black,
    marginBottom: '16px',
    '@media': {
        [`screen and (min-width: ${MOBILE_BREAKPOINT}px)`]: {
            fontSize: '2rem',
            marginBottom: '24px',
        },
    },
});

export const productGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(var(--mobile-per-row, 2), 1fr)',
    gap: '16px 12px',
    '@media': {
        [`screen and (min-width: ${MOBILE_BREAKPOINT}px)`]: {
            gridTemplateColumns: 'repeat(var(--pc-per-row, 5), 1fr)',
            gap: '32px 20px',
        },
    },
});

export const emptyContainer = style({
    display: 'none',
});
