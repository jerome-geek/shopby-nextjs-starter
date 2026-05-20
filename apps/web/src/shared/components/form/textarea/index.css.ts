import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const textArea = style([
    textStyles.body1Regular,
    {
        border: `1px solid ${vars.color.gray[50]}`,
        borderRadius: '4px',
        padding: '16px',
        color: vars.color.black,
        resize: 'none',
        minHeight: '150px',
        width: '100%',

        '::placeholder': {
            color: vars.color.gray['50'],
        },
        ':focus': {
            borderColor: vars.color.black,
        },
        selectors: {
            '&[data-error=true]': {
                borderColor: vars.color.pink['80'],
            },
        },
    },
]);
