import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const queryList = style({
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 0 40px',
});

export const queryListItem = style({
    width: '100%',
    borderBottom: `1px solid ${vars.color.gray['20']}`,
    selectors: {
        '&:last-child': {
            borderBottom: 'none',
        },
    },
});

export const optionButton = recipe({
    base: [
        textStyles.body1Regular,
        {
            width: '100%',
            padding: '12px 0',
            textAlign: 'left',
        },
    ],
    variants: {
        isSelected: {
            true: {
                color: vars.color.gray['90'],
                fontWeight: '500',
            },
            false: {
                color: vars.color.gray['80'],
            },
        },
    },
    defaultVariants: {
        isSelected: false,
    },
});
