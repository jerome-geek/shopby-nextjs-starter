import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const container = style({
    padding: '0 0 20px',
});

export const list = style({
    listStyle: 'none',
    padding: 0,
    margin: 0,
});

export const listItem = style({
    padding: '20px 0',
    selectors: {
        '&:not(:last-child)': {
            borderBottom: `1px solid ${vars.color.gray['20']}`,
        },
    },
});

export const listTitle = style([
    textStyles.headlineSemibold,
    {
        marginBottom: '12px',
        color: vars.color.black,
    },
]);

export const couponContainer = style({
    width: '100%',
});

export const productCouponList = style({
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
});

export const productInfoContainer = style({
    display: 'flex',
    gap: '12px',
    marginBottom: '12px',
});

export const productImageContainer = style({
    width: '72px',
    height: '72px',
    flexShrink: 0,
    borderRadius: '4px',
    overflow: 'hidden',
    backgroundColor: vars.color.gray['10'],
});

export const productTextContainer = style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '4px',
});

export const brandName = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
    },
]);

export const productName = style([
    textStyles.body1Regular,
    {
        color: vars.color.black,
        lineHeight: '1.4',
    },
]);

export const productDetailText = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['40'],
    },
]);

export const productPrice = style([
    textStyles.body1Semibold,
    {
        color: vars.color.black,
    },
]);

export const couponLabel = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
});

export const couponNameContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    textAlign: 'left',
});

export const couponName = style([
    textStyles.body1Regular,
    {
        color: vars.color.black,
    },
]);

export const couponNotice = style([
    textStyles.caption1Regular,
    {
        color: vars.color.red['100'],
    },
]);

export const couponPrice = style([
    textStyles.body1Semibold,
    {
        color: vars.color.green['100'],
    },
]);

export const footerButtonContainer = style({
    width: '100%',
    padding: '20px',
});
