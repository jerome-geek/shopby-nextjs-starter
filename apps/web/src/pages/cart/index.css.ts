import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    padding: '40px 0',

    '@media': {
        [media.mobile]: {
            padding: '20px',
            paddingBottom: 'calc(72px + env(safe-area-inset-bottom, 0px))',
        },
    },
});

export const title = style([
    textStyles.display1Semibold,
    {
        color: vars.color.black,
    },
]);

export const contentWrapper = style({
    display: 'flex',
    flexDirection: 'row',
    gap: '48px',
    maxWidth: '1200px',
    alignItems: 'flex-start',
    width: '100%',

    '@media': {
        [media.mobile]: {
            flexDirection: 'column',
            gap: '24px',
        },
    },
});

export const cartListArea = style({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%',
});

export const selectAllArea = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: vars.color.gray['10'],
});

export const partnerGroup = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    paddingBottom: '24px',
    borderBottom: `1px solid ${vars.color.gray['20']}`,
    selectors: {
        '&:last-child': {
            borderBottom: 'none',
        },
    },
});

export const partnerHeader = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

export const partnerName = style([
    textStyles.body1Semibold,
    {
        color: vars.color.black,
    },
]);

export const cartItem = style({
    display: 'flex',
    gap: '16px',
    position: 'relative',
    paddingLeft: '32px',
});

export const itemCheckbox = style({
    position: 'absolute',
    left: 0,
    top: 0,
});

export const itemImage = style({
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '4px',
    border: `1px solid ${vars.color.gray['20']}`,
});

export const itemDetails = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1,
});

export const itemTop = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
});

export const itemTextInfo = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
});

export const itemBrand = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['50'],
    },
]);

export const itemName = style([
    textStyles.body2Semibold,
    {
        color: vars.color.black,
    },
]);

export const itemOption = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['50'],
    },
]);

export const itemXButton = style({
    padding: '4px',
    color: vars.color.gray['40'],
    cursor: 'pointer',
    background: 'none',
    border: 'none',
});

export const quantityController = style({
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
    border: `1px solid ${vars.color.gray['30']}`,
    borderRadius: '4px',
    padding: '4px',
});

export const quantityButton = style({
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: vars.color.gray['60'],
});

export const quantityValue = style([
    textStyles.body2Semibold,
    {
        width: '32px',
        textAlign: 'center',
    },
]);

export const itemPriceArea = style({
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px',
    marginTop: '4px',
});

export const itemDiscount = style([
    textStyles.body1Semibold,
    {
        color: vars.color.red,
    },
]);

export const itemPrice = style([
    textStyles.body1Semibold,
    {
        color: vars.color.black,
    },
]);

export const recommendArea = style({
    marginTop: '60px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
});

export const recommendTitle = style([
    textStyles.display2Semibold,
    {
        color: vars.color.black,
    },
]);

/* Right side summary layout */
export const summaryArea = style({
    width: '320px',
    position: 'sticky',
    top: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    '@media': {
        [media.mobile]: {
            width: '100%',
            position: 'static',
        },
    },
});

export const summaryBox = style({
    padding: '24px',
    backgroundColor: vars.color.gray['10'],
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
});

export const summaryHeader = style([
    textStyles.display2Semibold,
    {
        color: vars.color.black,
    },
]);

export const summaryRow = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export const summaryLabel = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['60'],
    },
]);

export const summaryValue = style([
    textStyles.body2Regular,
    {
        color: vars.color.black,
    },
]);

export const summaryDivider = style({
    borderTop: `1px solid ${vars.color.gray['20']}`,
    margin: '8px 0',
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
