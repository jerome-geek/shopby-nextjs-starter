import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
    width: '100%',
});

export const filterList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
});

export const filterAccordionItem = style({
    paddingBottom: '28px',
    borderBottom: `1px solid ${vars.color.gray['20']}`,
});

export const filterBrandAccordionItem = style({
    borderBottom: 'none !important',
});

export const filterTitle = style([
    textStyles.headlineSemibold,
    {
        color: vars.color.black,
    },
]);

export const filterContentList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '16px',
});

export const filterLabel = style([
    textStyles.body1Regular,
    {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        color: vars.color.gray['80'],
    },
]);

export const disabledFilterLabel = style({
    color: vars.color.gray['50'],
    cursor: 'not-allowed',
});

export const radioContainer = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
});

export const priceRadioRoot = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
});

export const priceUnit = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['80'],
    },
]);

export const resetButton = style([
    textStyles.body1Semibold,
    {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '44px',
        borderRadius: '2px',
        background: vars.color.white,
        border: `1px solid ${vars.color.gray['50']}`,
        color: vars.color.black,
        selectors: {
            '&:hover': {
                opacity: 0.85,
            },
        },
    },
]);

export const registerButton = style([
    textStyles.body1Semibold,
    {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '44px',
        borderRadius: '2px',
        background: vars.color.green['100'],
        color: vars.color.white,
        selectors: {
            '&:hover': {
                opacity: 0.85,
            },
        },
    },
]);
