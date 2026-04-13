import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const title = style([
    textStyles.body1Medium,
    {
        fontSize: '1.6rem',
        wordBreak: 'break-word',
        whiteSpace: 'normal',
        color: vars.color.black,
    },
]);

export const description = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray[80],
        marginTop: '8px',
        margin: 0,
    },
]);
