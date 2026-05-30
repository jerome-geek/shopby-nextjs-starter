import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
});

export const title = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
    },
]);

export const productList = style({
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    margin: '0',
    padding: '0',
    gap: '12px',

    '@media': {
        [media.desktop]: {
            gap: '24px',
        },
    },
});

export const productItem = style({
    display: 'flex',
    gap: '16px',

    '@media': {
        [media.desktop]: {
            gap: '24px',
        },
    },
});

export const thumbnail = style({
    width: '72px',
    height: '72px',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    borderRadius: '4px',
    flexShrink: 0,
    backgroundColor: vars.color.gray['20'],

    '@media': {
        [media.desktop]: {
            width: '128px',
            height: '128px',
        },
    },
});

export const productInfo = style({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
});

export const productTextContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
});

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

// 기존 optionText 제거 (optionLabel, optionValue로 대체됨)

export const priceContainer = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
