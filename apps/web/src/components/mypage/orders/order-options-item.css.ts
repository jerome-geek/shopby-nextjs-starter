import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

/** 데스크톱 3열 — `productInfoContainer` / `statusContainer` / `actionsContainer` 너비와 동일하게 유지 */
export const ORDER_OPTIONS_DESKTOP_GRID_TEMPLATE =
    'minmax(0, 55%) minmax(0, 15%) minmax(0, 30%)';

export const itemContainer = style({
    display: 'flex',
    borderTop: `1px solid ${vars.color.gray[20]}`,
    flexDirection: 'row',
    alignItems: 'center',
    padding: '24px 0',

    selectors: {
        '&:first-child': {
            borderTop: 'none',
        },
    },

    '@media': {
        [media.mobile]: {
            alignItems: 'flex-start',
            flexDirection: 'column',
            padding: '16px 0',
        },
    },
});

export const productInfoContainer = style({
    display: 'flex',
    flex: '1',
    width: '55%',
    gap: '16px',

    '@media': {
        [media.mobile]: {
            width: '100%',
            gap: '12px',
        },
    },
});

export const imageLink = style({
    flexShrink: 0,
});

export const thumbnail = style({
    objectFit: 'cover',
    borderRadius: '4px',
    border: `1px solid ${vars.color.gray[20]}`,
    backgroundColor: vars.color.gray[10],
    width: '90px',
    height: '90px',

    '@media': {
        [media.mobile]: {
            width: '80px',
            height: '80px',
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
    fontWeight: '700',
    color: vars.color.gray[80],
    fontSize: '14px',
    marginBottom: '0',
    textAlign: 'center',

    '@media': {
        [media.mobile]: {
            textAlign: 'left',
            marginBottom: '4px',
            fontSize: '12px',
        },
    },
});

export const statusTextPrimary = style({
    color: vars.color.primary,
});

export const productBadge = style([
    textStyles.caption1Regular,
    {
        width: 'fit-content',
        padding: '2px 6px',
        color: vars.color.white,
        backgroundColor: vars.color.black,
        marginRight: '4px',

        '@media': {
            [media.desktop]: {
                padding: '2px 8px',
                ...textStyleTokens.body1Medium,
            },
        },
    },
]);

export const baseProductName = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.body1Regular,
            },
        },
    },
]);

export const productName = style({
    fontSize: '15px',
    fontWeight: '500',
    color: vars.color.black,
    lineHeight: '1.4',
    wordBreak: 'break-all',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    '@media': {
        [media.mobile]: {
            fontSize: '14px',
        },
    },
});

export const optionText = style({
    color: vars.color.gray[60],
    fontSize: '13px',
    marginTop: '4px',

    '@media': {
        [media.mobile]: {
            fontSize: '12px',
            marginTop: '2px',
        },
    },
});

export const priceText = style({
    fontSize: '16px',
    fontWeight: '700',
    color: vars.color.black,
    marginTop: '4px',

    '@media': {
        [media.mobile]: {
            fontSize: '14px',
        },
    },
});

export const statusContainer = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '15%',
    padding: '0 10px',

    '@media': {
        [media.mobile]: {
            display: 'none',
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

            selectors: {
                '&:empty': {
                    display: 'none',
                },
            },
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
    maxWidth: '120px',

    '@media': {
        [media.mobile]: {
            maxWidth: 'none',
        },
    },
});

export const actionButtonPrimary = style({
    color: vars.color.white,
    backgroundColor: vars.color.black,
    borderColor: vars.color.black,
});
