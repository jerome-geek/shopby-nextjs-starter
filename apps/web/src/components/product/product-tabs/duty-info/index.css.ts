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

export const row = style({
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    padding: '8px 0 0',

    selectors: {
        '&:last-of-type': {
            paddingBottom: '8px',
        },
    },
});

export const keyCell = style([
    textStyles.body1Medium,
    {
        flex: '0 1 42%',
        maxWidth: '30%',
        color: vars.color.gray['80'],
        wordBreak: 'keep-all',
    },
]);

export const valueCell = style([
    textStyles.body1Regular,
    {
        flex: 1,
        minWidth: 0,
        color: vars.color.gray['80'],
        wordBreak: 'break-word',
    },
]);
