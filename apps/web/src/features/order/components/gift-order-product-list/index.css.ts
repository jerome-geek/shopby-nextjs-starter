import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const partnerName = style([
    textStyles.body2Semibold,
    {
        padding: '12px 0',
        borderBottom: `1px solid ${vars.color.gray['20']}`,
        color: vars.color.black,
    },
]);

export const productList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px 0',
    borderBottom: `1px solid ${vars.color.gray['20']}`,
});
