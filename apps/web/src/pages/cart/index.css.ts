import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 'calc(72px + env(safe-area-inset-bottom, 0px))',

    '@media': {
        [media.desktop]: {
            gap: '32px',
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
    flexDirection: 'column',
    gap: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
    alignItems: 'flex-start',
    width: '100%',

    '@media': {
        [media.desktop]: {
            flexDirection: 'row',
            gap: '48px',
        },
    },
});

export const cartListArea = style({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',

    '@media': {
        [media.desktop]: {
            maxWidth: '666px',
            flex: '1 0 auto',
            gap: '32px',
        },
    },

    selectors: {
        '&[data-empty="true"]': {
            '@media': {
                [media.desktop]: {
                    maxWidth: 'none',
                },
            },
        },
    },
});

export const cartList = style({
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
});

export const itemList = style({
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',

    '@media': {
        [media.desktop]: {
            gap: '24px',
        },
    },
});

export const selectAllArea = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: vars.color.gray['10'],

    '@media': {
        [media.desktop]: {
            padding: '16px 20px',
        },
    },
});

export const partnerGroup = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    // paddingBottom: '24px',
    borderBottom: `1px solid ${vars.color.gray['20']}`,
    selectors: {
        '&:last-child': {
            borderBottom: 'none',
        },
    },

    '@media': {
        [media.desktop]: {
            padding: '0 20px 32px 20px',
            gap: '24px',
        },
    },
});

export const partnerHeader = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',

    '@media': {
        [media.desktop]: {
            gap: '12px',
        },
    },
});

export const partnerName = style([
    textStyles.headingSemibold,
    {
        color: vars.color.gray['90'],
        display: 'flex',
        alignItems: 'center',

        '@media': {
            [media.desktop]: {
                gap: '12px',
            },
        },
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

export const itemImageLink = style({
    width: '80px',
    height: '80px',
    borderRadius: '4px',
    overflow: 'hidden',
    display: 'block',

    '@media': {
        [media.desktop]: {
            width: '128px',
            height: '128px',
        },
    },
});

export const itemImage = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const itemDetails = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1,

    '@media': {
        [media.desktop]: {
            gap: '12px',
        },
    },
});

export const itemTop = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
});

export const itemTextInfo = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
});

export const itemBrand = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['60'],
    },
]);

export const itemName = style([
    textStyles.headlineMedium,
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
    color: vars.color.gray['60'],
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
    gap: '3px',
});

export const itemDiscount = style([
    textStyles.headingBold,
    {
        color: vars.color.pink['100'],
    },
]);

export const itemPrice = style([
    textStyles.headingBold,
    {
        color: vars.color.black,
    },
]);

export const recommendArea = style({
    marginTop: '60px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',

    '@media': {
        [media.desktop]: {
            marginTop: '100px',
        },
    },
});

export const recommendTitle = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
    },
]);

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

export const summaryHeader = style([
    textStyles.title1Semibold,
    {
        color: vars.color.black,
    },
]);

export const summaryList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
});

export const summaryRow = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export const summaryLabel = style([
    textStyles.headlineMedium,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: vars.color.black,
    },
]);

export const deleteAllButton = style([
    textStyles.body2Semibold,
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
