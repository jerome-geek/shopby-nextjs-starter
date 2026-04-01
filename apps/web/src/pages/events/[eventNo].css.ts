import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const pageContainer = style({
    minHeight: '100vh',
    backgroundColor: vars.color.white,
    marginTop: '0',
    '@media': {
        'screen and (min-width: 768px)': {
            marginTop: '8px',
        },
    },
});

export const contentWrapper = style({
    maxWidth: '1200px',
    margin: '0 auto',
});

export const topSection = style({
    marginBottom: '48px',
    width: 'calc(100% + 40px)',
    marginLeft: '-20px',
    '@media': {
        'screen and (min-width: 768px)': {
            width: '100%',
            marginLeft: '0',
        },
    },
});

export const divisor = style({
    height: '1px',
    backgroundColor: vars.color.gray[20],
    width: 'calc(100% + 40px)',
    marginLeft: '-20px',

    '@media': {
        'screen and (min-width: 768px)': {
            width: '100vw',
            position: 'absolute',
            left: 0,
        },
    },
});

const MOBILE_BREAKPOINT = 768;

export const productsSection = style({
    padding: '24px 16px',
    margin: 0,
    listStyle: 'none',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '36px 15px',

    '@media': {
        [`screen and (min-width: ${MOBILE_BREAKPOINT}px)`]: {
            padding: '40px 0 0',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '48px 25px',
        },
    },
});

export const noResult = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    gap: '12px',
    color: vars.color.gray[60],
    fontSize: '1.5rem',
});
