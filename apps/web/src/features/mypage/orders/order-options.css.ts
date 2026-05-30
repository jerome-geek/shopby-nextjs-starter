import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';

export const orderList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
});

export const orderListItem = style({
    display: 'flex',
    flexDirection: 'column',
    borderTop: 'none',

    '@media': {
        [media.mobile]: {
            borderTop: `1px solid ${vars.color.gray[50]}`,
        },
    },
});

export const orderTitleContainer = style({
    display: 'flex',
    alignItems: 'center',
    padding: '16px 0',
    width: '100%',
    borderBottom: `1px solid ${vars.color.gray[20]}`,

    justifyContent: 'flex-start',
    gap: '16px',

    '@media': {
        [media.mobile]: {
            justifyContent: 'space-between',
            gap: '4px',
        },
    },
});

export const orderDate = style({
    color: vars.color.gray[80],
    fontSize: '14px',

    '@media': {
        [media.mobile]: {
            fontSize: '12px',
        },
    },
});

export const orderNoLink = style({
    textDecoration: 'underline',
    fontSize: '14px',
    fontWeight: '500',
});

export const orderOptionList = style({
    display: 'flex',
    flexDirection: 'column',
});
