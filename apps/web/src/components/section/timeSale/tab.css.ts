import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';
import { globalVars } from '@/styles/global.css';

export const container = style({
    display: 'flex',
    justifyContent: 'center',
    gap: '32px',
    borderBottom: `1px solid ${vars.color.gray['20']}`,
    width: '100%',
    marginTop: '40px',
    position: 'sticky',
    top: globalVars.header.height,
    zIndex: 10,
    backgroundColor: vars.color.white,
    
    '@media': {
        [media.mobile]: {
            top: globalVars.header.mobileHeight,
            gap: '16px',
        },
    },
});

export const button = recipe({
    base: {
        position: 'relative',
        padding: '12px 4px',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        transition: 'color 0.2s ease',
    },
    variants: {
        active: {
            true: {
                color: vars.color.black,
            },
            false: {
                color: vars.color.gray['50'],
            },
        },
    },
});

export const label = recipe({
    base: [
        textStyles.title2Semibold,
        {
            display: 'block',
        },
    ],
    variants: {
        active: {
            true: {
                fontWeight: 700,
            },
            false: {
                fontWeight: 500,
            },
        },
    },
});

export const underline = style({
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: '3px',
    backgroundColor: vars.color.secondary, // Greenish color from theme
    zIndex: 1,
});
