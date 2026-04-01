import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const errorMessage = style([
    textStyles.caption1Regular,
    {
        color: vars.color.red,
    },
]);
