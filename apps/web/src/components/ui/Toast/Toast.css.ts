import { style } from '@vanilla-extract/css';

export const toastWrapper = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    backgroundColor: '#666666',
    color: '#ffffff',
    padding: '16px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '400',
    minWidth: '320px',
    maxWidth: 'calc(100vw - 40px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
});

export const toastMessage = style({
    flex: 1,
    textAlign: 'center',
});

export const toastMessageWithLink = style([
    toastMessage,
    {
        textAlign: 'left',
    },
]);

export const toastLink = style({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    ':hover': {
        opacity: 0.8,
    },
});
