import { keyframes, style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

/* Right side summary layout */
export const summaryArea = style({
    width: '100%',
    order: 2,
    padding: '36px 20px',
    borderBottom: `6px solid ${vars.color.gray['20']}`,

    '@media': {
        [media.desktop]: {
            width: '100%',
            position: 'sticky',
            top: '120px',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            padding: 0,
            gridColumn: '2 / 3',
            gridRow: '1 / 3',
            borderBottom: `none`,
        },
    },
});

export const summaryBox = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',

    '@media': {
        [media.desktop]: {
            gap: '24px',
            paddingTop: '8px',
        },
    },
});

export const summaryListContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',

    '@media': {
        [media.desktop]: {
            gap: '12px',
        },
    },
});

const spin = keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
});

export const spinner = style({
    animation: `${spin} 1s linear infinite`,
    width: '20px',
    height: '20px',
});

export const summaryHeader = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,

        '@media': {
            [media.desktop]: {
                fontSize: '2.2rem',
                lineHeight: '1.32',
                letterSpacing: '-2%',
            },
        },
    },
]);

export const summaryList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
});

export const summaryRow = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export const summaryLabel = style([
    textStyles.body1Regular,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: vars.color.gray['80'],

        '@media': {
            [media.desktop]: {
                fontSize: '1.5rem',
                lineHeight: '1.4',
                letterSpacing: '-0.2%',
            },
        },
    },
]);

export const summaryValue = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['80'],

        '@media': {
            [media.desktop]: {
                fontSize: '1.5rem',
                lineHeight: '1.4',
                letterSpacing: '-0.2%',
            },
        },
    },
]);

export const deleteAllButton = style([
    textStyles.body2Semibold,
    {
        color: vars.color.gray['60'],
    },
]);

export const summaryDivider = style({
    width: '100%',
    border: 'none',
    borderTop: `1px solid ${vars.color.gray['20']}`,
});

export const totalLabel = style([
    textStyles.headlineSemibold,
    {
        color: vars.color.black,
    },
]);

export const totalValue = style([
    textStyles.headingBold,
    {
        color: vars.color.pink['100'],
    },
]);

export const priceRow = style([
    textStyles.headlineRegular,
    {
        display: 'flex',
        justifyContent: 'space-between',
        color: vars.color.gray['80'],
    },
]);
export const totalPriceTitle = style([
    textStyles.headlineSemibold,
    {
        color: vars.color.black,

        '@media': {
            [media.desktop]: {
                fontSize: '1.8rem',
                lineHeight: '1.5',
                letterSpacing: '-1.3%',
            },
        },
    },
]);

export const totalPrice = style([
    textStyles.headingBold,
    {
        color: vars.color.pink['100'],

        '@media': {
            [media.desktop]: {
                fontSize: '2.2rem',
                lineHeight: '1.32',
                letterSpacing: '-2%',
            },
        },
    },
]);

export const bottomSticky = style({
    position: 'fixed',
    bottom: `var(--bottom-nav-active-height, 0px)`,
    left: 0,
    width: '100%',
    backgroundColor: vars.color.white,
    padding: '12px 20px',
    borderTop: `1px solid ${vars.color.gray['20']}`,
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
    transition: 'bottom 0.2s ease-in-out',

    '@media': {
        [media.tablet]: {
            bottom: 'env(safe-area-inset-bottom)',
        },
        [media.desktop]: {
            position: 'static',
            padding: 0,
            borderTop: 'none',
        },
    },
});

export const orderButton = style([
    textStyles.headlineSemibold,
    {
        width: '100%',
        padding: '16px',
        backgroundColor: '#E5A5A4',
        color: vars.color.white,
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'background-color 0.2s',
        ':hover': {
            backgroundColor: '#d89493',
        },

        '@media': {
            [media.desktop]: {
                fontWeight: '600',
                fontSize: '1.8rem',
                lineHeight: '1.5',
                letterSpacing: '-1.3%',
            },
        },
    },
]);

export const emptyCartContainer = style({
    display: 'flex',
    flexDirection: 'column',
    '@media': {
        [media.desktop]: {
            gap: '10px',
        },
    },
});

export const emptyCartTitle = style([
    textStyles.headingSemibold,
    { color: vars.color.black },
]);

export const emptyCartDesc = style([
    textStyles.body1Regular,
    { color: vars.color.gray['60'] },
]);

export const emptyCartLink = style([
    textStyles.headlineSemibold,
    {
        backgroundColor: vars.color.black,
        color: vars.color.white,
        padding: '16px',
        borderRadius: '4px',
    },
]);
