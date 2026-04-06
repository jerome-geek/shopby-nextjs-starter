import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { textStyles } from '@/styles/typography.css';

export const noResult = style([
    textStyles.body2Semibold,
    {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '8px',
        width: '100%',
        height: '300px',

        '@media': {
            [media.desktop]: {
                gap: '20px',
            },
        },
    },
]);
