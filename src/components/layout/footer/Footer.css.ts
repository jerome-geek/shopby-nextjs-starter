import { style } from '@vanilla-extract/css';

export const footer = style({
    width: '100%',
    backgroundColor: '#111111',
    color: '#ffffff',
    marginTop: 'auto',
});

export const footerInner = style({
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '48px 24px',

    '@media': {
        '(max-width: 768px)': {
            padding: '32px 16px',
        },
    },
});

export const footerTop = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '32px',
    paddingBottom: '32px',
    borderBottom: '1px solid #333333',

    '@media': {
        '(max-width: 768px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
        },
    },
});

export const footerSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
});

export const footerTitle = style({
    fontSize: '14px',
    fontWeight: 600,
    color: '#ffffff',
    marginBottom: '4px',
});

export const footerLink = style({
    fontSize: '13px',
    color: '#999999',
    textDecoration: 'none',
    transition: 'color 0.2s ease',

    ':hover': {
        color: '#ffffff',
    },
});

export const footerBottom = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '24px',
    gap: '16px',

    '@media': {
        '(max-width: 768px)': {
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
    },
});

export const copyright = style({
    fontSize: '12px',
    color: '#666666',
});

export const socialLinks = style({
    display: 'flex',
    gap: '12px',
});

export const socialLink = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#333333',
    color: '#ffffff',
    transition: 'background-color 0.2s ease',

    ':hover': {
        backgroundColor: '#555555',
    },
});
