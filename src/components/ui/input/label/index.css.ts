import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/styles/theme.css';

export const labelStyles = recipe({
    base: {
        position: 'relative',
        alignSelf: 'flex-start',
        fontSize: '1.4rem',
        fontWeight: '400',
        lineHeight: '1.5',
        display: 'flex',
        gap: '8px',
    },
    variants: {
        isRequired: {
            true: {
                '::after': {
                    content: "''",
                    backgroundColor: '#EF4444', // red-500
                    position: 'absolute',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    right: '-6px',
                    top: '0',
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
