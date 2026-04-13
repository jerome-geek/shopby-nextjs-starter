import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const stickyTabWrapper = style({
    position: 'sticky',
    top: 0,
    zIndex: 10,
    marginBottom: '12px',
});

export const tabInner = style({
    display: 'flex',
    overflowX: 'auto',
    gap: '0 6px',
    scrollbarWidth: 'none',
    selectors: {
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
    '@media': {
        'screen and (min-width: 768px)': {
            padding: '0',
            justifyContent: 'flex-start',
        },
    },
});

export const sectionTabButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px 12px',
    fontSize: '1.4rem',
    fontWeight: 400,
    letterSpacing: '-2%',
    cursor: 'pointer',
    borderRadius: '16px',
    backgroundColor: vars.color.green[20],
    color: vars.color.gray[80],
    whiteSpace: 'nowrap',
    transition: 'all 0.2s ease',
    lineHeight: '140%',
    '@media': {
        'screen and (min-width: 768px)': {
            padding: '8px 16px',
            fontSize: '1.4rem',
        },
    },
    selectors: {
        '&:hover': {
            backgroundColor: vars.color.secondary,
            color: vars.color.white,
            borderColor: 'transparent',
        },
    },
});

globalStyle(`${sectionTabButton} img`, {
    minWidth: '20px',
    maxHeight: '20px',
    objectFit: 'cover',
});

export const sectionTabButtonActive = style({
    backgroundColor: vars.color.secondary,
    color: vars.color.white,
    fontWeight: 500,
});
