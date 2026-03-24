import { style } from '@vanilla-extract/css';

import { textStyles } from '@/styles/typography.css';
import { vars } from '@/styles/theme.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    maxWidth: '600px',
    margin: '0 auto',
});

export const heading = style([
    textStyles.display2Bold,
    {
        color: vars.color.black,
    },
]);
