import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
});

export const description = style([
    textStyles.body2Regular,
    { color: vars.color.gray['70'] },
]);

export const calendarWrapper = style({
    width: '100%',
});

export const footer = style({
    display: 'flex',
    gap: 8,
    marginTop: 12,
    alignItems: 'stretch',
});

export const footerButton = style({
    flex: 1,
    minWidth: 0,
});
