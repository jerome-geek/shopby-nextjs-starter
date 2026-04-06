import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';

export const selectWrap = style({
    width: '100%',
});

export const skeleton = style({
    height: '44px',
    borderRadius: '4px',
    backgroundColor: vars.color.gray['20'],
    '@media': {
        '(min-width: 768px)': {
            height: '50px',
        },
    },
});
