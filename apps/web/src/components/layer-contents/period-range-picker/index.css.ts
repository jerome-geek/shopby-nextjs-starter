import { globalStyle, style } from '@vanilla-extract/css';

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

globalStyle(`.${calendarWrapper} .rdp-root`, {
    '--rdp-accent-color': vars.color.black,
    '--rdp-accent-background-color': vars.color.black,
} as unknown as Record<string, string>);

globalStyle(`.${calendarWrapper} .rdp-months`, {
    width: '100%',
});

globalStyle(`.${calendarWrapper} .rdp-month`, {
    width: '100%',
});

globalStyle(`.${calendarWrapper} .rdp-month_grid`, {
    margin: '20px auto 0',
});

globalStyle(`.${calendarWrapper} .rdp-day_button`, {
    borderRadius: '999px',
    fontSize: '14px',
});

globalStyle(`.${calendarWrapper} .rdp-weekday`, {
    fontSize: '14px',
    padding: '12px 6px',
});

globalStyle(`.${calendarWrapper} .rdp-weekdays .rdp-weekday:first-child`, {
    color: vars.color.red,
});

globalStyle(`.${calendarWrapper} .rdp-weekdays .rdp-weekday:last-child`, {
    color: vars.color.facebook,
});

globalStyle(
    `.${calendarWrapper} .rdp-week td:first-child .rdp-day_button:not([disabled]):not([aria-selected='true'])`,
    {
        color: vars.color.red,
    },
);

globalStyle(
    `.${calendarWrapper} .rdp-week td:last-child .rdp-day_button:not([disabled]):not([aria-selected='true'])`,
    {
        color: vars.color.facebook,
    },
);

globalStyle(`.${calendarWrapper} .rdp-month_caption`, {
    display: 'flex',
    justifyContent: 'center',
    padding: '24px 0',
});

globalStyle(`.${calendarWrapper} .rdp-dropdowns`, {
    width: '100%',
    display: 'flex',
    gap: 8,
});

globalStyle(`.${calendarWrapper} .rdp-dropdown_root`, {
    flex: '1 1 0',
    width: '50%',
    padding: '0 6px',
});

globalStyle(
    `.${calendarWrapper} .rdp-selected.rdp-range_middle .rdp-day_button`,
    {
        backgroundColor: 'transparent',
        color: vars.color.black,
    },
);

globalStyle(
    `.${calendarWrapper} .rdp-today:not(.rdp-selected) .rdp-day_button`,
    {
        outlineOffset: '-2px',
        background: vars.color.primary,
    },
);
