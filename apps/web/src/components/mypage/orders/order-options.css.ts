import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const orderList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
});

export const orderListItem = style({
    display: 'flex',
    flexDirection: 'column',
    borderTop: `1px solid ${vars.color.gray[50]}`,
    '@media': {
        'screen and (min-width: 769px)': {
            borderTop: 'none',
        },
    },
});

export const orderTitleContainer = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '4px',
    padding: '16px 0',
    width: '100%',
    borderBottom: `1px solid ${vars.color.gray[20]}`,
    '@media': {
        'screen and (min-width: 769px)': {
            justifyContent: 'flex-start',
            gap: '16px',
        },
    },
});

export const orderDate = style({
    color: vars.color.gray[80],
    fontSize: '12px',
    '@media': {
        'screen and (min-width: 769px)': {
            fontSize: '14px',
        },
    },
});

export const orderNoLink = style({
    textDecoration: 'underline',
    fontSize: '14px',
    fontWeight: '500',
    '@media': {
        'screen and (min-width: 769px)': {
            fontSize: '14px',
        },
    },
});

export const orderOptionList = style({
    display: 'flex',
    flexDirection: 'column',
});
