import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const timer = style([
    textStyles.headingBold,
    {
        color: vars.color.pink['100'],
        fontVariantNumeric: 'tabular-nums',

        '@media': {
            [media.desktop]: {
                fontSize: '2.2rem',
                lineHeight: '1.32',
                letterSpacing: '-2%',
            },
        },
    },
]);
