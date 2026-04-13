import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const container = style({
    position: 'fixed',
    bottom: '80px',
    right: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    zIndex: 999,
});

export const button = style({
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: vars.color.green['80'], // Replace with precise theme color if needed
    color: vars.color.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0px 6px 10px 0px #0000001A',
    transition: 'background-color 0.2s',

    ':hover': {
        backgroundColor: vars.color.green['80'],
    },
});

export const writeButton = style({
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: vars.color.primary,
    color: vars.color.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0px 6px 10px 0px #0000001A',
    transition: 'background-color 0.2s',
});
