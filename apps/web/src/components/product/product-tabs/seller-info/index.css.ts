import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const wrapper = style({
    width: '100%',
    backgroundColor: vars.color.white,
});

export const accordionRoot = style({
    width: '100%',
});

export const accordionItem = style({
    borderBottom: 'none !important',
});

export const trigger = style({
    height: '53px',
});

export const title = style([
    textStyles.headlineSemibold,
    {
        color: vars.color.black,
    },
]);

export const content = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['80'],
        padding: '8px 0',
    },
]);

export const sellerDl = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    margin: 0,
});

export const sellerRow = style({
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
});

export const sellerDt = style([
    textStyles.body1Medium,
    {
        flex: '0 0 120px',
        color: vars.color.gray['60'],
        margin: 0,
    },
]);

export const sellerDd = style([
    textStyles.body1Regular,
    {
        flex: 1,
        color: vars.color.gray['80'],
        margin: 0,
        wordBreak: 'break-word',
    },
]);
