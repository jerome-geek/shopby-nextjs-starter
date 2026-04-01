import { keyframes, style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

const spin = keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
});

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
});

export const loadingContainer = style({
    display: 'flex',
    width: '100%',
    height: '250px',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '15px',
    fontSize: '1.2rem',
    color: vars.color.gray[80],
});

export const spinner = style({
    width: '36px',
    aspectRatio: '1',
    borderRadius: '50%',
    border: `4px solid ${vars.color.primary}`,
    background: 'transparent',
    borderLeftColor: vars.color.gray[40],
    animation: `${spin} 1s linear infinite`,
});
