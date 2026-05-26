import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
});

export const title = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
    },
]);

export const form = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
});
