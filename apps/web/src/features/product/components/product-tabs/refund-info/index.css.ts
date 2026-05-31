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
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        color: vars.color.gray['80'],
        padding: '8px 0',
    },
]);

export const section = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
});

export const subTitle = style([
    textStyles.body1Semibold,
    {
        color: vars.color.black,
        margin: 0,
    },
]);
