import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const timer = style([
    textStyles.headingBold,
    {
        color: vars.color.pink['100'],
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: '0.02em',
    },
]);
