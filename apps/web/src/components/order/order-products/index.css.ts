import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';

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
    gap: '24px',
});

export const productItem = style({
    display: 'flex',
    gap: '24px',
});

export const thumbnail = style({
    width: '80px',
    height: '80px',
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
    gap: '2px',
});

export const optionList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    marginTop: '4px',
});

export const brandName = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['60'],
    },
]);

export const productName = style([
    textStyles.headlineMedium,
    {
        color: vars.color.black,
    },
]);

export const optionText = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
        marginTop: '4px',
    },
]);

export const priceContainer = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export const orderCnt = style([
    textStyles.body2Semibold,
    {
        color: vars.color.gray['60'],
    },
]);

export const buyAmt = style([
    textStyles.headingBold,
    {
        color: vars.color.black,
    },
]);
