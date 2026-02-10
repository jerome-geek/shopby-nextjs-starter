import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const inputField = style({
    width: '100%',
    height: '44px',
    padding: '16px 12px',
    borderRadius: '8px',
    backgroundColor: vars.color.white,
    border: `1px solid ${vars.color.gray[50]}`,
    fontSize: '1.4rem',
    fontWeight: '500',
    color: vars.color.black,
    '::placeholder': {
        color: vars.color.gray[50],
    },
    selectors: {
        '&:read-only': {
            backgroundColor: vars.color.gray[20],
            pointerEvents: 'none',
        },
    },
    '@media': {
        'screen and (min-width: 768px)': {
            height: '50px',
        },
    },
});
