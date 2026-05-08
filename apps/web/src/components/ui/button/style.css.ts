import { recipe } from '@vanilla-extract/recipes';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const button = recipe({
    base: [
        textStyles.headingSemibold,
        {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '52px',
            gap: '8px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',

            ':disabled': {
                backgroundColor: vars.color.gray['20'],
                color: vars.color.gray['50'],
                cursor: 'not-allowed',
            },

            selectors: {
                '&:hover:not(:disabled)': {
                    opacity: 0.85,
                },
            },

            '@media': {
                [media.desktop]: {
                    height: '63px',
                },
            },
        },
    ],
    variants: {
        visual: {
            primary: {
                color: vars.color.white,
                backgroundColor: vars.color.primary,
            },
            secondary: {
                color: vars.color.white,
                backgroundColor: vars.color.secondary,
            },
            tertiary: {
                color: vars.color.black,
                backgroundColor: vars.color.green['20'],
            },
            green: {
                color: vars.color.white,
                backgroundColor: vars.color.green['100'],
            },
            brick: {
                color: vars.color.white,
                backgroundColor: vars.color.brick,
            },
            kakao: {
                color: vars.color.black,
                backgroundColor: vars.color.kakao,
            },
            'kakao-sync': {
                color: vars.color.black,
                backgroundColor: vars.color.kakao,
            },
            naver: {
                color: vars.color.white,
                backgroundColor: vars.color.naver,
            },
            apple: {
                color: vars.color.white,
                backgroundColor: vars.color.apple,
            },
            facebook: {
                color: vars.color.white,
                backgroundColor: vars.color.facebook,
            },
            line: {
                color: vars.color.white,
                backgroundColor: vars.color.line,
            },
            google: {
                color: vars.color.black,
                backgroundColor: vars.color.google,
                border: `1px solid ${vars.color.gray[50]}`,
            },
        },
    },
});

export const outlinedButton = recipe({
    base: [
        textStyles.headingSemibold,
        {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '52px',
            color: vars.color.black,
            border: `1px solid ${vars.color.gray['50']}`,
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',

            ':disabled': {
                backgroundColor: vars.color.gray['20'],
                color: vars.color.gray['50'],
                cursor: 'not-allowed',
            },

            selectors: {
                '&:hover:not(:disabled)': {
                    opacity: 0.7,
                    backgroundColor: vars.color.gray['10'],
                },
            },

            '@media': {
                [media.desktop]: {
                    height: '63px',
                },
            },
        },
    ],
    variants: {
        visual: {
            primary: {
                borderColor: vars.color.primary,
                color: vars.color.primary,
            },
            secondary: {
                // Default styles
            },
            white: {
                borderColor: vars.color.white,
                color: vars.color.white,
            },
        },
    },
});

export const textButtonStyle = recipe({
    base: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        height: '52px',
        padding: 0,
        gap: '2px',
        color: 'inherit',
        fontSize: 'inherit',
        fontWeight: 'inherit',
        background: 'none',
        border: 'none',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        transition: 'color 0.2s, font-weight 0.2s, opacity 0.2s',

        ':disabled': {
            cursor: 'not-allowed',
            opacity: 0.4,
        },

        selectors: {
            '&:hover:not(:disabled)': {
                opacity: 0.6,
            },
        },

        '@media': {
            [media.desktop]: {
                height: '63px',
            },
        },
    },
    variants: {
        visual: {
            primary: {
                color: vars.color.gray[80],
                fontSize: '1.4rem',
                fontWeight: '400',
                lineHeight: '1.5',
            },
        },
    },
});
