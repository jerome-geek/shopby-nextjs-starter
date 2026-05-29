import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const inputField = style([
    textStyles.body1Medium,
    {
        width: '100%',
        height: '44px',
        padding: '16px 12px',
        borderRadius: '4px',
        backgroundColor: vars.color.white,
        border: `1px solid ${vars.color.gray['50']}`,
        color: vars.color.black,
        boxSizing: 'border-box',
        transition: 'all 0.2s ease-in-out',

        '::placeholder': {
            color: vars.color.gray['50'],
            transition: 'opacity 0.2s ease',
        },

        ':focus': {
            outline: 'none',
            borderColor: vars.color.black,
            boxShadow: `0 0 0 4px ${vars.color.gray['10']}`, // 은은한 프리미엄 링 효과
        },

        selectors: {
            '&:focus::placeholder': {
                opacity: 0.5,
            },
            '&:read-only': {
                backgroundColor: vars.color.gray['20'],
                pointerEvents: 'none',
            },
            '&[data-error=true]': {
                borderColor: vars.color.pink[80],
            },
        },

        '@media': {
            [media.desktop]: {
                height: '52px',
            },
        },
    },
]);
