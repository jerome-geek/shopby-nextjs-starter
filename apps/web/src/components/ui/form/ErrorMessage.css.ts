import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const errorMessage = style({
    color: '#EF4444', // red-500
    fontSize: '1.2rem',
    fontWeight: '500',
    marginTop: '4px',
    '@media': {
        'screen and (min-width: 768px)': {
            fontSize: '1.4rem',
        },
    },
});
