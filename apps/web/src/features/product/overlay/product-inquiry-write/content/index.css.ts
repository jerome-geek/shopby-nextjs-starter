import { globalStyle, style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

export const form = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%',
});

export const content = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
});

export const actions = style({
    display: 'flex',
    gap: '12px',
    paddingTop: '20px',
    borderTop: `1px solid ${vars.color.gray['30']}`,
});

export const actionButton = style({
    width: '100%',
});

export const postcodeButton = style({
    whiteSpace: 'nowrap',
    fontSize: '1.6rem',
    height: '100%',
    minWidth: '100px',

    '@media': {
        [media.mobile]: {
            fontSize: '1.4rem',
        },
    },
});

export const checkboxLabel = style([
    textStyles.body2Regular,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        color: vars.color.gray['80'],
    },
]);

globalStyle(`.${checkboxLabel} > span`, {
    lineHeight: '13px',
});

export const description = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['90'],
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',

        '@media': {
            [media.mobile]: {
                ...textStyleTokens.body2Regular,
            },
        },
    },
]);
