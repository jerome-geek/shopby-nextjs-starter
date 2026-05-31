import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
});

export const title = style([
    textStyles.headingMedium,
    {
        color: vars.color.black,
        textAlign: 'center',

        '@media': {
            [media.mobile]: {
                ...textStyleTokens.headlineMedium,
            },
        },
    },
]);

export const list = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    listStyle: 'none',
    padding: 0,
    margin: 0,
});

export const item = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    padding: '16px',
    border: `1px solid ${vars.color.gray['30']}`,
    borderRadius: '8px',
    backgroundColor: vars.color.gray['10'],
});

export const itemId = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
    },
]);

export const itemMeta = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['60'],
    },
]);
