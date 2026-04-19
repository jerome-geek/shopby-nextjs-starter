import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

export const container = style({
    backgroundColor: vars.color.gray['10'],
    borderRadius: '8px',
    padding: '16px',
});

export const item = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',

    selectors: {
        '& + &': {
            marginTop: '12px',
            paddingTop: '12px',
            borderTop: `1px solid ${vars.color.gray['20']}`,
        },
    },
});

export const authorRow = style({
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: '12px',
});

export const author = style([
    textStyles.body1Medium,
    {
        color: vars.color.gray['80'],
        '@media': {
            [media.mobile]: {
                ...textStyleTokens.body2Medium,
            },
        },
    },
]);

export const date = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
        whiteSpace: 'nowrap',
        flexShrink: 0,
        '@media': {
            [media.mobile]: {
                ...textStyleTokens.caption2Regular,
            },
        },
    },
]);

export const content = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['80'],
        lineHeight: 1.6,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        '@media': {
            [media.mobile]: {
                ...textStyleTokens.body2Regular,
            },
        },
    },
]);
