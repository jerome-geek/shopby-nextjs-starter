import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const labelStyles = recipe({
    base: [
        textStyles.headlineSemibold,
        {
            position: 'relative',
            alignSelf: 'flex-start',
            width: 'fit-content',
            display: 'inline-flex',
            alignItems: 'flex-start',
            gap: '4px',
        },
    ],
    variants: {
        isRequired: {
            true: {
                '::after': {
                    content: '"*"',
                    color: vars.color.pink['100'],
                    marginLeft: '2px',
                    fontSize: '1.2rem',
                    lineHeight: '1',
                    marginTop: '2px',
                },
            },
            false: {
                '::after': {
                    content: 'none',
                },
            },
        },
        isCheckbox: {
            true: {
                fontWeight: '400',
                color: vars.color.gray[80],
            },
        },
    },
    defaultVariants: {
        isRequired: false,
        isCheckbox: false,
    },
});
