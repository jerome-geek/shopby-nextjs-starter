import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const dimmed = style({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    zIndex: 1005,
});

export const modalContainer = style({
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1006,
    borderRadius: '12px',
    maxWidth: '90%',
    maxHeight: '90%',
    overflow: 'visible',
    outline: 'none',
});

export const image = style({
    maxWidth: '85vw',
    maxHeight: '80vh',
    objectFit: 'contain',
    borderRadius: '8px',
});

export const closeBtn = style({
    position: 'absolute',
    top: '-40px',
    right: 0,
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(4px)',
    color: vars.color.white,
    borderRadius: '50%',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    selectors: {
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            transform: 'scale(1.1)',
        },
    },
});
