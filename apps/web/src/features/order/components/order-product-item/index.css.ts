import { style } from '@vanilla-extract/css';

import { PRODUCT_IMAGE_CSS_SIZE } from '@/entities/product/constants';
import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

export const productItem = style({
    display: 'flex',
    gap: '16px',
    width: '100%',

    '@media': {
        [media.desktop]: {
            gap: '24px',
        },
    },
});

export const thumbnail = style({
    width: PRODUCT_IMAGE_CSS_SIZE.MOBILE,
    height: PRODUCT_IMAGE_CSS_SIZE.MOBILE,
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    borderRadius: '4px',
    flexShrink: 0,
    backgroundColor: vars.color.gray['20'],

    '@media': {
        [media.desktop]: {
            width: PRODUCT_IMAGE_CSS_SIZE.DESKTOP,
            height: PRODUCT_IMAGE_CSS_SIZE.DESKTOP,
        },
    },
});

export const productInfo = style({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minWidth: 0,
    gap: '8px',
});

export const productTextContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
});

export const brandName = style([
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

export const productName = style([
    textStyles.body1Medium,
    {
        color: vars.color.black,

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.headlineMedium,
            },
        },
    },
]);

export const optionList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
});

export const optionItem = style({
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
});

export const optionLabel = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
        '::after': {
            content: '":"',
        },
    },
]);

export const optionValue = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
    },
]);

export const priceContainer = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
});

export const orderCnt = style([
    textStyles.caption1Semibold,
    {
        color: vars.color.gray['60'],

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.body2Semibold,
            },
        },
    },
]);

export const buyAmt = style([
    textStyles.headlineSemibold,
    {
        color: vars.color.black,

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.headingBold,
            },
        },
    },
]);
