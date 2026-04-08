import { style } from '@vanilla-extract/css';

import { textStyles } from '@/styles/typography.css';
import { vars } from '@/styles/theme.css';

export const termContainer = style({
    padding: 20,
    borderRadius: 8,
    backgroundColor: vars.color.gray['20'],
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
});

export const termList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: '100%',
});

export const termListItem = style({
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    width: '100%',
});

export const termLabel = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
});

export const termLabelSpan = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['90'],
    },
]);

export const termLabelTitle = style([
    textStyles.body1Regular,
    {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        color: vars.color.gray['90'],
    },
]);

export const termLabelSubText = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['70'],
    },
]);

