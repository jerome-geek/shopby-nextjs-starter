import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    backgroundColor: vars.color.gray['20'],
    borderRadius: '100px',
    padding: '4px',
    width: 'fit-content',
    margin: '0 auto',
    position: 'relative',
});

export const button = recipe({
    base: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px 24px',
        borderRadius: '100px',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        minWidth: '160px',
        outline: 'none',
        zIndex: 1,
    },
    variants: {
        active: {
            true: {
                // background is handled by motion.div
            },
            false: {},
        },
    },
});

export const activeBg = style({
    position: 'absolute',
    inset: 0,
    backgroundColor: vars.color.black,
    borderRadius: '100px',
    zIndex: -1,
});

export const label = recipe({
    base: [
        textStyles.body2Semibold,
        {
            position: 'relative',
            zIndex: 2,
            transition: 'color 0.2s ease',
        },
    ],
    variants: {
        active: {
            true: {
                color: vars.color.white,
            },
            false: {
                color: vars.color.gray['50'],
            },
        },
    },
});
