import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
});

export const title = style([
    textStyles.headingSemibold,
    {
        margin: 0,
        color: vars.color.black,
    },
]);

export const checkboxLabel = style([
    textStyles.body1Regular,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        color: vars.color.gray['80'],
    },
]);

export const fieldGroup = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    borderRadius: '8px',
});

