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

export const title = style({
    fontSize: '24px',
    fontWeight: 800,
    color: vars.color.black,
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

export const categoryList = style({
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
    paddingBottom: '24px',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    selectors: {
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
});

export const categoryTab = style({
    padding: '10px 20px',
    borderRadius: '24px',
    fontSize: '15px',
    fontWeight: 500,
    backgroundColor: vars.color.gray[10],
    color: vars.color.gray[60],
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s ease',
});

export const categoryTabActive = style({
    backgroundColor: '#869D8A', // Muted green matching the image
    color: vars.color.white,
    fontWeight: 600,
});

export const swiperContainer = style({
    width: '100%',
    paddingBottom: '40px !important',
});

export const productGridItem = style({
    height: 'auto',
    position: 'relative',
});

export const rankBadge = style({
    position: 'absolute',
    top: '0',
    left: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: vars.color.white,
    padding: '4px 10px',
    fontSize: '14px',
    fontWeight: 700,
    borderBottomRightRadius: '8px',
    zIndex: 2,
});

export const moreButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    padding: '16px',
    marginTop: '32px',
    backgroundColor: '#F7F9F7',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 600,
    color: vars.color.black,
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    selectors: {
        '&:hover': {
            backgroundColor: '#EEF2EE',
        },
    },
});
