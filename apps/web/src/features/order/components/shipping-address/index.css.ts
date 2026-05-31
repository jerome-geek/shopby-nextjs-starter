import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
});

export const titleContainer = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export const title = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
    },
]);

export const selectAddressButton = style([
    textStyles.body1Semibold,
    {
        color: vars.color.gray['60'],
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    },
]);

export const shippingAddressContainer = style({
    padding: '16px',
    border: `1px solid ${vars.color.gray['50']}`,
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
});

export const addressNameContainer = style({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
});

export const addressName = style([
    textStyles.headingSemibold,
    {
        color: vars.color.gray['90'],
    },
]);

export const defaultAddressBadge = style([
    textStyles.caption1Semibold,
    {
        color: vars.color.white,
        padding: '3px 6px',
        backgroundColor: vars.color.green['80'],
        borderRadius: '2px',
    },
]);

export const addressContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
});

export const address = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['80'],
    },
]);

export const addressContact = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['60'],
    },
]);
