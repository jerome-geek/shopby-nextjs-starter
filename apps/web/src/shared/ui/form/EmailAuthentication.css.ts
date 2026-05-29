import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
});

export const inputWrapper = style({
    position: 'relative',
    width: '100%',
});

export const timerText = style({
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    // color: 'red.500', -> need to check theme vars or hardcode
    color: '#EF4444',
    fontWeight: '500',
    fontSize: '0.875rem', // sm
});
