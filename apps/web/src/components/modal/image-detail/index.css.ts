import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const dimmed = style({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1000,
});

export const modalContainer = style({
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: vars.color.white,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1000,
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
    borderRadius: '4px',
    maxWidth: '90%',
    maxHeight: '90%',
    overflow: 'auto',
});
