import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const section = style({
    backgroundColor: vars.color.white,
    border: `1px solid ${vars.color.gray['30']}`,
    borderRadius: '4px',
    padding: '20px',
});

export const title = style([
    textStyles.body1Bold,
    {
        marginBottom: '12px',
        color: vars.color.black,
    },
]);

export const row = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: '10px 0',
    borderTop: `1px solid ${vars.color.gray['20']}`,
});

export const label = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['70'],
    },
]);

export const value = style([
    textStyles.body1Bold,
    {
        color: vars.color.black,
    },
]);

export const link = style([
    textStyles.caption1Semibold,
    {
        display: 'inline-block',
        marginTop: '14px',
        color: vars.color.black,
        textDecoration: 'underline',
    },
]);

