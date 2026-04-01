import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const section = style({
    backgroundColor: vars.color.white,
    border: `1px solid ${vars.color.gray['30']}`,
    borderRadius: '4px',
    padding: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
});

export const title = style([
    textStyles.body1Bold,
    {
        marginBottom: '10px',
        color: vars.color.black,
    },
]);

export const list = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
});

export const item = style({
    backgroundColor: vars.color.gray['10'],
    border: `1px solid ${vars.color.gray['30']}`,
    borderRadius: '4px',
    padding: '12px',
});

export const link = style([
    textStyles.body2Regular,
    {
        color: vars.color.black,
    },
]);

