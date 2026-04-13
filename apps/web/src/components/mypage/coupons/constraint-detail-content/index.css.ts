import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const list = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
});

export const item = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
});

export const title = style([
    textStyles.body2Semibold,
    {
        color: vars.color.black,
        fontSize: '14px',
    },
]);

export const valueList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: 0,
    margin: 0,
    listStyle: 'none',
});

export const valueItem = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['80'],
        fontSize: '13px',
        lineHeight: 1.5,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
    },
]);

export const valueItemWrap = style([
    valueItem,
    {
        whiteSpace: 'normal',
    },
]);
