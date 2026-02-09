import { style } from '@vanilla-extract/css';

export const header = style({
    position: 'sticky',
    top: 0,
    zIndex: 50,
    width: '100%',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e5e5e5',
});

export const headerInner = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px 24px',
    gap: '32px',

    '@media': {
        '(max-width: 768px)': {
            padding: '12px 16px',
            gap: '16px',
        },
    },
});

export const logoSection = style({
    display: 'flex',
    alignItems: 'center',
    gap: '32px',

    '@media': {
        '(max-width: 768px)': {
            gap: '16px',
        },
    },
});

export const logo = style({
    fontSize: '20px',
    fontWeight: 700,
    color: '#111111',
    textDecoration: 'none',
    transition: 'opacity 0.2s ease',

    ':hover': {
        opacity: 0.7,
    },
});

export const nav = style({
    display: 'flex',
    alignItems: 'center',
    gap: '24px',

    '@media': {
        '(max-width: 768px)': {
            display: 'none',
        },
    },
});

export const navLink = style({
    fontSize: '14px',
    fontWeight: 500,
    color: '#333333',
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'all 0.2s ease',

    ':hover': {
        backgroundColor: '#f5f5f5',
        color: '#000000',
    },
});

export const navLinkActive = style({
    backgroundColor: '#111111',
    color: '#ffffff',

    ':hover': {
        backgroundColor: '#333333',
        color: '#ffffff',
    },
});

export const utilitySection = style({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
});

export const iconButton = style({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    border: 'none',
    background: 'transparent',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',

    ':hover': {
        backgroundColor: '#f5f5f5',
    },
});

export const iconLink = style({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    transition: 'background-color 0.2s ease',

    ':hover': {
        backgroundColor: '#f5f5f5',
    },
});

export const cartBadge = style({
    position: 'absolute',
    top: '2px',
    right: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '18px',
    height: '18px',
    padding: '0 4px',
    fontSize: '11px',
    fontWeight: 600,
    color: '#ffffff',
    backgroundColor: '#ef4444',
    borderRadius: '9px',
});

export const mobileMenuButton = style({
    display: 'none',

    '@media': {
        '(max-width: 768px)': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            border: 'none',
            background: 'transparent',
            borderRadius: '50%',
            cursor: 'pointer',
        },
    },
});
