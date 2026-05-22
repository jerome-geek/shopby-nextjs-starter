import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',

    '@media': {
        [media.desktop]: {
            gap: '12px',
        },
    },
});

export const optionLabel = recipe({
    base: [
        textStyles.headlineSemibold,
        {
            color: vars.color.gray['90'],
        },
    ],
    variants: {
        required: {
            true: {
                selectors: {
                    '&::after': {
                        content: '*',
                        color: vars.color.pink['100'],
                        marginLeft: '2px',
                    },
                },
            },
        },
    },
});
