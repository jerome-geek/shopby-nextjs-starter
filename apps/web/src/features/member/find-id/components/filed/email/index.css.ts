import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const emailRow = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

export const atSign = style([
    textStyles.body1Medium,
    {
        color: vars.color.gray['80'],
    },
]);
