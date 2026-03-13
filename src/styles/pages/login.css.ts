import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '60px',
});

export const loginFormSection = style({
    backgroundColor: vars.color.white,
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    '@media': {
        'screen and (min-width: 768px)': {
            gap: '32px',
        },
    },
});

export const form = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    '@media': {
        'screen and (min-width: 768px)': {
            gap: '20px',
        },
    },
});

export const heading = style({
    fontSize: '1.875rem', // 3xl
    fontWeight: 'bold',
    color: vars.color.black,
});

export const inputGroup = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
});

export const checkboxGroup = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

export const buttonContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
});

export const linkList = style({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    fontSize: '0.875rem', // sm
    padding: 0,
    margin: 0,
    listStyle: 'none',
});

export const linkItem = style({
    position: 'relative',
    selectors: {
        '&:not(:last-child)::after': {
            content: '""',
            position: 'absolute',
            right: '-8.5px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '1px',
            height: '10px',
            backgroundColor: vars.color.gray['400'],
        },
    },
    '@media': {
        'screen and (min-width: 768px)': {
            selectors: {
                '&:not(:last-child)::after': {
                    height: '12px',
                },
            },
        },
    },
});

export const link = style({
    color: vars.color.gray['600'],
    textDecoration: 'none',
    ':hover': {
        color: vars.color.black,
    },
});

export const socialLoginList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    listStyle: 'none',
    padding: 0,
    margin: 0,
});
