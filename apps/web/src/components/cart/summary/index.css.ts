import { keyframes, style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

/* Right side summary layout */
export const summaryArea = style({
    width: '100%',

    '@media': {
        [media.desktop]: {
            width: '486px',
            position: 'sticky',
            top: '120px',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
        },
    },
});

export const summaryBox = style({
    display: 'flex',
    flexDirection: 'column',

    '@media': {
        [media.desktop]: {
            gap: '24px',
        },
    },
});

export const summaryListContainer = style({
    display: 'flex',
    flexDirection: 'column',

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
    textStyles.title1Semibold,
    {
        color: vars.color.black,
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
    textStyles.headlineRegular,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: vars.color.gray['80'],
    },
]);

export const summaryValue = style([
    textStyles.headlineRegular,
    {
        color: vars.color.black,
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
    textStyles.body1Semibold,
    {
        color: vars.color.black,
    },
]);

export const totalValue = style([
    textStyles.display2Semibold,
    {
        color: vars.color.red,
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
    textStyles.headingSemibold,
    {
        color: vars.color.black,
    },
]);

export const totalPrice = style([
    textStyles.title1Bold,
    {
        color: vars.color.pink['100'],
    },
]);

export const orderButton = style([
    textStyles.body1Semibold,
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

