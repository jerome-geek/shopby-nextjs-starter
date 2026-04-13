import { style } from '@vanilla-extract/css';

import { textStyles } from '@/styles/typography.css';
import { vars } from '@/styles/theme.css';
import { media } from '@/styles/media';

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
                fontSize: '24px',
            },
        },
    },
]);
