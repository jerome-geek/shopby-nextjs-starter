import { globalStyle, style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%',
});

export const form = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%',
});

export const accumulationContainer = style({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '16px',
    padding: '20px',
    borderRadius: '4px',
    backgroundColor: vars.color.gray['10'],
    border: `1px solid ${vars.color.gray['20']}`,
});

export const accumulationText = style([
    textStyles.body2Regular,
    {
        lineHeight: '1.4',
        color: vars.color.gray['70'],
    },
]);

globalStyle(`.${accumulationText} b`, {
    color: vars.color.gray['90'],
});

export const contentContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%',

    '@media': {
        [media.tablet]: {
            maxWidth: '500px',
        },
    },
});

export const reasonMessageContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
});

export const reasonMessage = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['70'],
    },
]);
