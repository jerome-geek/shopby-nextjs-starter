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

export const summaryLabel = style([
    textStyles.body1Medium,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: vars.color.gray['90'],
    },
]);

export const contentWrapper = style({
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100% + 40px)',
    marginLeft: '-20px',

    '@media': {
        [media.desktop]: {
            width: '100%',
            marginLeft: '0',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 486px',
            gap: '48px',
            maxWidth: '1200px',
        },
    },

    selectors: {
        '&[data-empty="true"]': {
            gridTemplateColumns: 'minmax(0, 1fr)',
        },
    },
});

export const cartListArea = style({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    order: 1,

    '@media': {
        [media.desktop]: {
            gridColumn: '1 / 2',
            gridRow: '1 / 2',
            gap: '32px',
        },
    },
});

export const cartList = style({
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0',

    '@media': {
        [media.desktop]: {
            gap: '32px',
        },
    },
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
    padding: '12px 20px',
    borderBottom: `1px solid ${vars.color.gray['20']}`,

    '@media': {
        [media.desktop]: {
            padding: '16px 20px',
            backgroundColor: vars.color.gray['10'],
        },
    },
});

export const partnerGroup = style({
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 20px',
    gap: '16px',

    '@media': {
        [media.desktop]: {
            padding: '0 20px 32px 20px',
            gap: '24px',
            borderBottom: `1px solid ${vars.color.gray['20']}`,
        },
    },
});

export const partnerHeader = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    paddingBottom: '16px',
    borderBottom: `1px solid ${vars.color.gray['20']}`,

    '@media': {
        [media.desktop]: {
            gap: '12px',
            paddingBottom: 0,
            borderBottom: 'none',
        },
    },
});

export const partnerName = style([
    textStyles.headingSemibold,
    {
        color: vars.color.gray['90'],
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
]);

export const cartItem = style({
    display: 'flex',
    gap: '12px',
    position: 'relative',
    alignItems: 'flex-start',
    '@media': {
        [media.desktop]: {
            gap: '16px',
            paddingLeft: '32px',
        },
    },
});

export const itemCheckbox = style({
    flexShrink: 0,
    marginTop: '2px', // align with the text visual center if needed
    '@media': {
        [media.desktop]: {
            position: 'absolute',
            left: 0,
            top: 0,
        },
    },
});

export const itemContent = style({
    display: 'flex',
    flex: 1,
    minWidth: 0,
    gap: '16px',
    alignItems: 'flex-start',
});

export const itemImageLink = style({
    width: '72px',
    height: '72px',
    borderRadius: '4px',
    overflow: 'hidden',
    display: 'block',
    flexShrink: 0,

    '@media': {
        [media.desktop]: {
            width: '128px',
            height: '128px',
            borderRadius: '4px',
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
    gap: '10px',
    flex: 1,
    minWidth: 0,

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
    gap: '1px',
    padding: '2px 0',
});

export const itemBrand = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
    },
]);

export const itemName = style([
    textStyles.body1Medium,
    {
        color: vars.color.black,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
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
    flexShrink: 0,
    width: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
});

export const quantityController = style({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: 'fit-content',
    border: `1px solid ${vars.color.gray['20']}`,
    backgroundColor: vars.color.white,
    borderRadius: '2px',
    padding: '6px',
    '@media': {
        [media.desktop]: {
            border: `1px solid ${vars.color.gray['30']}`,
            borderRadius: '4px',
            padding: '4px',
        },
    },
});

export const quantityButton = style({
    width: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: vars.color.gray['90'],
    '@media': {
        [media.desktop]: {
            width: '24px',
            height: '24px',
            color: vars.color.gray['60'],
        },
    },
});

export const quantityValue = style([
    textStyles.caption1Regular,
    {
        width: '15px',
        textAlign: 'center',
        color: vars.color.gray['80'],
        '@media': {
            [media.desktop]: {
                width: '32px',
            },
        },
    },
]);

export const itemPriceArea = style({
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    '@media': {
        [media.desktop]: {
            alignItems: 'baseline',
        },
    },
});

export const itemDiscount = style([
    textStyles.headlineBold,
    {
        color: vars.color.pink['100'],
    },
]);

export const itemPrice = style([
    textStyles.headlineBold,
    {
        color: vars.color.black,
    },
]);

export const recommendArea = style({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '24px 20px',
    order: 3,

    '@media': {
        [media.desktop]: {
            gridColumn: '1 / 2',
            gridRow: '2 / 3',
            marginTop: '100px',
            padding: '0',
            gap: '24px',
        },
    },
});

export const recommendTitle = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
    },
]);

export const thickDivider = style({
    height: '6px',
    backgroundColor: vars.color.gray['20'],
    width: '100%',
    '@media': {
        [media.desktop]: {
            display: 'none',
        },
    },
});

export const emptyCartContainer = style({
    display: 'flex',
    flexDirection: 'column',
    padding: '40px 20px',
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
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: vars.color.black,
        color: vars.color.white,
        padding: '16px',
        borderRadius: '4px',
        marginTop: '20px',
    },
]);

export const deleteAllButton = style([
    textStyles.caption1Semibold,
    {
        color: vars.color.gray['60'],
        background: 'none',
        border: 'none',
        cursor: 'pointer',
    },
]);
