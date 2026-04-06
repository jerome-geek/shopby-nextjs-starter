import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    padding: '16px',
    width: '100%',
    backgroundColor: vars.color.gray['10'],
});

export const body = style([
    textStyles.body2Regular,
    {
        whiteSpace: 'pre-wrap',
        color: vars.color.gray['80'],
        wordBreak: 'break-word',
    },
]);

globalStyle(`${body} p`, {
    margin: 0,
});

export const actions = style({
    display: 'flex',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '16px',
});

export const textButton = style([
    textStyles.body2Regular,
    {
        padding: '6px 12px',
        border: `1px solid ${vars.color.gray['40']}`,
        borderRadius: '4px',
        background: vars.color.white,
        color: vars.color.gray['80'],
        cursor: 'pointer',
    },
]);

export const answerList = style({
    marginTop: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
});

export const answerItem = style({
    padding: '12px',
    borderRadius: '4px',
    backgroundColor: vars.color.gray['10'],
    border: `1px solid ${vars.color.gray['20']}`,
});

export const answerBadge = style([
    textStyles.caption1Semibold,
    {
        display: 'inline-block',
        marginBottom: '8px',
        color: vars.color.primary,
    },
]);

export const answerBody = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['80'],
        wordBreak: 'break-word',
        whiteSpace: 'pre-wrap',
    },
]);

globalStyle(`${answerBody} p`, {
    margin: 0,
});

export const answerDate = style([
    textStyles.caption1Regular,
    {
        marginTop: '8px',
        color: vars.color.gray['70'],
    },
]);
