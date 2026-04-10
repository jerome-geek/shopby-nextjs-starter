import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';

export const textArea = style({
    border: `1px solid ${vars.color.gray[50]}`,
    borderRadius: '8px',
    padding: '12px',
    fontSize: '1.3rem',
    fontWeight: '400',
    lineHeight: '1.5',
    color: vars.color.gray[80],
    resize: 'none',
    minHeight: '150px',
    width: '100%',
    '::placeholder': {
        fontSize: '1.4rem',
        fontWeight: '400',
        lineHeight: '1.5',
        color: vars.color.gray[60],
    },
    ':focus': {
        outline: 'none',
        borderColor: vars.color.gray[60],
    },
    selectors: {
        '&[data-error=true]': {
            borderColor: vars.color.pink[80],
        },
    },
});
