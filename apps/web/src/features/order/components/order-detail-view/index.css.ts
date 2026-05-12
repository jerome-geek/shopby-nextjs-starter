import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
});

export const orderTitleContainer = style({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderBottom: `1px solid ${vars.color.gray[20]}`,
    justifyContent: 'flex-start',
    gap: '16px',
    padding: '0 0 20px',

    '@media': {
        [media.mobile]: {
            justifyContent: 'space-between',
            gap: '4px',
            padding: '4px 0 16px',
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

export const orderNo = style({
    fontSize: '14px',
    fontWeight: '500',
    '@media': {
        'screen and (min-width: 769px)': {
            fontSize: '14px',
        },
    },
});
