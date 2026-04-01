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

export const list = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
});

export const item = style({
    padding: '12px',
    borderRadius: '4px',
    backgroundColor: vars.color.gray['10'],
    border: `1px solid ${vars.color.gray['30']}`,
});

export const link = style([
    textStyles.body2Regular,
    {
        color: vars.color.black,
        textDecoration: 'none',
    },
]);

export const empty = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['70'],
    },
]);

