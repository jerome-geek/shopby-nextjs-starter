import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';

export const itemContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px 0',
    borderTop: `1px solid ${vars.color.gray[20]}`,
    selectors: {
        '&:first-child': {
            borderTop: 'none',
        },
    },
    '@media': {
        [media.tablet]: {
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(120px, 160px)',
            alignItems: 'center',
            padding: '24px 0',
        },
        [media.desktop]: {
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(120px, 160px)',
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
        [media.tablet]: {
            width: 'auto',
            gap: '16px',
        },
        [media.desktop]: {
            width: 'auto',
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
        [media.tablet]: {
            width: '90px',
            height: '90px',
        },
        [media.desktop]: {
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
        [media.tablet]: {
            fontSize: '14px',
            marginBottom: '0',
            textAlign: 'center',
        },
        [media.desktop]: {
            fontSize: '14px',
            marginBottom: '0',
            textAlign: 'center',
        },
    },
});

export const statusTextPrimary = style({
    color: vars.color.primary,
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
        [media.tablet]: {
            fontSize: '15px',
        },
        [media.desktop]: {
            fontSize: '15px',
        },
    },
});

export const optionText = style({
    fontSize: '12px',
    color: vars.color.gray[60],
    marginTop: '2px',
    '@media': {
        [media.tablet]: {
            fontSize: '13px',
            marginTop: '4px',
        },
        [media.desktop]: {
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
        [media.tablet]: {
            fontSize: '16px',
        },
        [media.desktop]: {
            fontSize: '16px',
        },
    },
});

export const statusContainer = style({
    display: 'none',
    '@media': {
        [media.tablet]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 0,
        },
        [media.desktop]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 0,
        },
    },
});
