import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const noResult = style([
    textStyles.body2Semibold,
    {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        width: '100%',
        height: '300px',
        color: vars.color.gray['60'],

        '@media': {
            [media.desktop]: {
                fontWeight: 400,
                fontSize: '1.5rem',
                lineHeight: 1.4,
                letterSpacing: '-0.2%',
            },
        },
    },
]);
