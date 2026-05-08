import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
});

export const linkContainer = style({
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    marginTop: '8px',
});

export const link = style([
    textStyles.body2Regular,
    {
        color: vars.color.black,
        textDecoration: 'none',

        selectors: {
            '&[data-color="muted"]': {
                color: vars.color.gray['60'],
            },
        },

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.body1Regular,
            },
        },
    },
]);
