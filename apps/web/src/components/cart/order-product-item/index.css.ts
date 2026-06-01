import { style } from '@vanilla-extract/css';

import { PRODUCT_IMAGE_CSS_SIZE } from '@/entities/product/constants';
import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

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

export const cartItemInvalid = style({
    '@media': {
        [media.desktop]: {
            paddingLeft: '0',
        },
    },
});

export const itemCheckbox = style({
    flexShrink: 0,
    marginTop: '2px',
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
    position: 'relative',
    width: PRODUCT_IMAGE_CSS_SIZE.MOBILE,
    height: PRODUCT_IMAGE_CSS_SIZE.MOBILE,
    borderRadius: '4px',
    overflow: 'hidden',
    display: 'block',
    flexShrink: 0,

    '@media': {
        [media.desktop]: {
            width: PRODUCT_IMAGE_CSS_SIZE.DESKTOP,
            height: PRODUCT_IMAGE_CSS_SIZE.DESKTOP,
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

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.body1Regular,
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

export const itemExtraProductBadge = style([
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

export const itemName = style([
    textStyles.body1Medium,
    {
        color: vars.color.black,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.headlineMedium,
            },
        },
    },
]);

export const itemOptionList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
});

export const itemOption = style([
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
                ...textStyleTokens.body2Regular,
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
        '@media': {
            [media.desktop]: {
                ...textStyleTokens.headingBold,
            },
        },
    },
]);

export const itemPrice = style([
    textStyles.headlineBold,
    {
        color: vars.color.black,

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.headingBold,
            },
        },
    },
]);

export const invalidMessage = style([
    textStyles.headlineSemibold,
    {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: vars.color.white,
        textAlign: 'center',
        zIndex: '2',
    },
]);
