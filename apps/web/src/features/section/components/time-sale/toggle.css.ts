import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
    display: 'flex',
    gap: '2px',
    backgroundColor: vars.color.gray['20'],
    borderRadius: '100px',
    padding: '2px',
    width: '100%',
    position: 'relative',

    '@media': {
        [media.desktop]: {
            width: '384px',
            margin: '0 auto',
        },
    },
});

export const button = recipe({
    base: {
        position: 'relative',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '36px',
        borderRadius: '100px',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        minWidth: '160px',
        outline: 'none',
        zIndex: 1,

        '@media': {
            [media.desktop]: {
                height: '41px',
            },
        },
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
        textStyles.body1Medium,
        {
            position: 'relative',
            zIndex: 2,
            transition: 'color 0.2s ease',
            '@media': {
                [media.desktop]: {
                    fontSize: '1.5rem',
                    lineHeight: '1.4',
                    letterSpacing: '-0.2%',
                },
            },
        },
    ],
    variants: {
        active: {
            true: {
                color: vars.color.white,
                fontWeight: 600,
                letterSpacing: '-1.3%',
            },
            false: {
                color: vars.color.gray['60'],
            },
        },
    },
});
