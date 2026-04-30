import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';

export const list = style({
    marginTop: 0,
});

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
        [media.tablet]: {
            borderTop: 'none',
        },
        [media.desktop]: {
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
        [media.tablet]: {
            justifyContent: 'flex-start',
            gap: '16px',
            padding: '0 0 16px',
        },
        [media.desktop]: {
            justifyContent: 'flex-start',
            gap: '16px',
            padding: '0 0 16px',
        },
    },
});

export const orderNoText = style({
    textDecoration: 'underline',
    fontSize: '14px',
    fontWeight: '500',
});

export const orderDate = style({
    color: vars.color.gray[80],
    fontSize: '12px',
    '@media': {
        [media.tablet]: {
            fontSize: '14px',
        },
        [media.desktop]: {
            fontSize: '14px',
        },
    },
});

export const orderProductsContainer = style({
    borderBottom: '1px solid #f0f0f0',
});

export const orderOptionList = style({
    display: 'flex',
    flexDirection: 'column',
});

export const backSection = style({
    display: 'flex',
    justifyContent: 'center',
    padding: '40px 0',
    '@media': {
        [media.mobile]: {
            padding: '16px',
        },
    },
});

export const backButton = style({
    padding: '12px 60px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    background: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
});
