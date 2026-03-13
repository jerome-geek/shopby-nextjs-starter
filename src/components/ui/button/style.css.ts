import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const button = recipe({
    base: [
        textStyles.headingSemibold,
        {
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            border: 'none',
            cursor: 'pointer',
            height: '52px',
            width: '100%',
            transition: 'all 0.3s ease',
            ':disabled': {
                backgroundColor: vars.color.gray['20'],
                color: vars.color.gray['500'],
                cursor: 'not-allowed',
            },
        },
    ],
    variants: {
        visual: {
            primary: {
                color: vars.color.white,
                backgroundColor: vars.color.primary,
                ':hover:not(:disabled)': {
                    color: vars.color.gray['60'],
                    backgroundColor: vars.color.gray['20'],
                },
            },
            secondary: {
                color: vars.color.white,
                backgroundColor: vars.color.secondary,
                ':hover:not(:disabled)': {
                    color: vars.color.gray['60'],
                    backgroundColor: vars.color.gray['20'],
                },
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
    base: {
        borderRadius: '8px',
        fontSize: '1.6rem',
        fontWeight: '700',
        lineHeight: '1.5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        height: '52px',
        width: '100%',
        transition: 'all 0.3s ease',
        ':disabled': {
            backgroundColor: vars.color.gray['20'],
            color: vars.color.gray['500'],
            cursor: 'not-allowed',
        },
        border: `1px solid ${vars.color.gray[50]}`,
        color: vars.color.black,
    },
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
        alignItems: 'center',
        position: 'relative',
        transition: 'color 0.2s, font-weight 0.2s',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        gap: '2px',
        color: 'inherit',
        fontSize: 'inherit',
        fontWeight: 'inherit',
        background: 'none',
        border: 'none',
        padding: 0,
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
