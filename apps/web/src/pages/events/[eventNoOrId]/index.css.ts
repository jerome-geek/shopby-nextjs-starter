import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
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

export const productsSection = style({
    listStyle: 'none',
    display: 'grid',
    padding: '40px 0 0',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '48px 25px',
    margin: 0,

    '@media': {
        [media.mobile]: {
            padding: '20px 0',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '36px 15px',
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
