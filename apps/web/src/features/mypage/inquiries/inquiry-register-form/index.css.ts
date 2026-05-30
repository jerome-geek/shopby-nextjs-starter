import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const emailRow = style({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
});

export const emailAt = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['70'],
        flexShrink: 0,
    },
]);

export const emailField = style({
    flex: '1 1 120px',
    minWidth: 0,
});

export const textArea = style({
    minHeight: '220px',
    resize: 'vertical',
});
