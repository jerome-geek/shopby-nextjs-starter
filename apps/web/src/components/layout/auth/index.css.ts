import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    maxWidth: '600px',
    margin: '0 auto',

    '@media': {
        [media.mobile]: {
            paddingTop: '20px',
        },
    },
});

export const heading = style([
    textStyles.display2Bold,
    {
        color: vars.color.black,

        '@media': {
            [media.mobile]: {
                display: 'none',
            },
        },
    },
]);
