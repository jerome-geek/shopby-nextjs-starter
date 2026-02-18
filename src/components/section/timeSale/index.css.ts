import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const section = style({
    padding: '40px 20px',
    backgroundColor: vars.color.white,
    '@media': {
        'screen and (min-width: 768px)': {
            padding: '60px 40px',
            maxWidth: '1200px',
            margin: '0 auto',
        },
    },
});

export const header = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
});

export const titleWrapper = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
});

export const titleRow = style({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
});

export const title = style({
    fontSize: '24px',
    fontWeight: 800,
    color: vars.color.black,
});

export const timer = style({
    fontSize: '24px',
    fontWeight: 800,
    color: '#FF3366', // Adjust to match the red in image
    fontVariantNumeric: 'tabular-nums',
});

export const subtitle = style({
    fontSize: '14px',
    color: vars.color.gray[60],
});

export const viewAll = style({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '14px',
    color: vars.color.gray[50],
    textDecoration: 'none',
});

export const productGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    '@media': {
        'screen and (max-width: 480px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
        },
    },
});

// Custom sticker for the timer badge on top of image
export const timerBadge = style({
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: 'rgba(255, 51, 102, 0.9)',
    color: vars.color.white,
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 700,
    zIndex: 2,
});

export const productItem = style({
    position: 'relative',
});
