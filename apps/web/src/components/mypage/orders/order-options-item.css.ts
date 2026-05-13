import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';

export const itemContainer = style({
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 0',
    borderTop: `1px solid ${vars.color.gray[20]}`,
    selectors: {
        '&:first-child': {
            borderTop: 'none',
        },
    },
    '@media': {
        'screen and (min-width: 769px)': {
            flexDirection: 'row',
            alignItems: 'center',
            padding: '24px 0',
        },
    },
});

export const productInfoContainer = style({
    display: 'flex',
    gap: '12px',
    flex: '1',
    width: '100%',
    '@media': {
        'screen and (min-width: 769px)': {
            width: '55%',
            gap: '16px',
        },
    },
});

export const imageLink = style({
    flexShrink: 0,
});

export const thumbnail = style({
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '4px',
    border: `1px solid ${vars.color.gray[20]}`,
    backgroundColor: vars.color.gray[10],
    '@media': {
        'screen and (min-width: 769px)': {
            width: '90px',
            height: '90px',
        },
    },
});

export const productContentContainer = style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '4px',
    width: '100%',
});

export const statusText = style({
    fontSize: '12px',
    fontWeight: '700',
    color: vars.color.gray[80],
    marginBottom: '4px',
    '@media': {
        'screen and (min-width: 769px)': {
            fontSize: '14px',
            marginBottom: '0',
            textAlign: 'center',
        },
    },
});

export const statusTextPrimary = style({
    color: vars.color.primary,
});

export const productBadge = style({
    fontWeight: '700',
});

export const baseProductName = style({
    fontSize: '13px',
    color: vars.color.gray[80],
    '@media': {
        'screen and (min-width: 769px)': {
            fontSize: '14px',
        },
    },
});

export const productName = style({
    fontSize: '14px',
    fontWeight: '500',
    color: vars.color.black,
    lineHeight: '1.4',
    wordBreak: 'break-all',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    '@media': {
        'screen and (min-width: 769px)': {
            fontSize: '15px',
        },
    },
});

export const optionText = style({
    fontSize: '12px',
    color: vars.color.gray[60],
    marginTop: '2px',
    '@media': {
        'screen and (min-width: 769px)': {
            fontSize: '13px',
            marginTop: '4px',
        },
    },
});

export const priceText = style({
    fontSize: '14px',
    fontWeight: '700',
    color: vars.color.black,
    marginTop: '4px',
    '@media': {
        'screen and (min-width: 769px)': {
            fontSize: '16px',
        },
    },
});

export const statusContainer = style({
    display: 'none',
    '@media': {
        'screen and (min-width: 769px)': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '15%',
            padding: '0 10px',
        },
    },
});

export const actionsContainer = style({
    display: 'flex',
    gap: '8px',
    width: '30%',
    marginTop: '0',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '20px',

    '@media': {
        [media.mobile]: {
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '8px',
            marginTop: '16px',
            padding: '0',
        },
    },
});

export const actionButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '36px',
    fontSize: '13px',
    fontWeight: '500',
    color: vars.color.black,
    backgroundColor: vars.color.white,
    border: `1px solid ${vars.color.gray[40]}`,
    borderRadius: '4px',
    cursor: 'pointer',
    '@media': {
        'screen and (min-width: 769px)': {
            maxWidth: '120px',
        },
    },
});

export const actionButtonPrimary = style({
    color: vars.color.white,
    backgroundColor: vars.color.black,
    borderColor: vars.color.black,
});
