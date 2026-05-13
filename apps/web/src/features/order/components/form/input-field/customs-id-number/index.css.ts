import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const customsIdNumberLink = style([
    textStyles.body1Semibold,
    {
        color: vars.color.gray['60'],
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    },
]);
