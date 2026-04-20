import { globalVars } from '@/styles/global.css';
import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
    display: 'flex',
    justifyContent: 'center',
    gap: '0',
    borderBottom: `1px solid ${vars.color.gray['20']}`,
    width: 'calc(100% + 40px)',
    margin: '0 -20px',
    marginTop: '4px',
    position: 'sticky',
    top: globalVars.header.mobileHeight,
    zIndex: 10,
    backgroundColor: vars.color.white,

    '@media': {
        [media.desktop]: {
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            borderBottom: `1px solid ${vars.color.gray['20']}`,
            width: '100%',
            marginTop: '8px',
            position: 'sticky',
            top: globalVars.header.height,
            zIndex: 10,
            backgroundColor: vars.color.white,
        },
    },
});

export const button = recipe({
    base: {
        position: 'relative',
        flex: '1',
        height: '44px',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        transition: 'color 0.2s ease',

        '@media': {
            [media.desktop]: {
                flex: 'none',
                position: 'relative',
                height: '45px',
            },
        },
    },
    variants: {
        active: {
            true: {
                color: vars.color.black,
            },
            false: {
                color: vars.color.gray['60'],
            },
        },
    },
});

export const label = recipe({
    base: [
        textStyles.body1Regular,
        {
            display: 'block',

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
                fontWeight: 500,
            },
            false: {
                fontWeight: 400,
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
