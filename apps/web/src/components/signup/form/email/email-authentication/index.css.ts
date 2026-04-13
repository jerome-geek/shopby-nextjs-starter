import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const timerContainer = style({
    position: 'relative',
});

export const timerText = style({
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: vars.color.red[500],
    fontWeight: '500',
    fontSize: '0.875rem',
});
