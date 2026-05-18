import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const target = style({
    height: '1px',
    width: '100%',
});

export const endMessage = style([
    textStyles.body2Regular,
    {
        marginTop: '16px',
        color: vars.color.gray['70'],
        textAlign: 'center',
    },
]);
