import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/styles/theme.css';

export const button = recipe({
    base: {
        borderRadius: '8px',
        fontSize: '1.6rem',
        fontWeight: '700',
        lineHeight: '1.5',
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
            backgroundColor: '#F4F3F3',
            color: '#8A8684',
            cursor: 'not-allowed',
        },
    },
    variants: {
        visual: {
            primary: {
                color: '#ffffff',
                backgroundColor: vars.color.primary,
                ':hover:not(:disabled)': {
                    backgroundColor: '#333333',
                },
            },
            kakao: {
                color: '#000000',
                backgroundColor: vars.color.kakao,
            },
            'kakao-sync': {
                color: '#000000',
                backgroundColor: vars.color.kakao,
            },
            naver: {
                color: '#ffffff',
                backgroundColor: vars.color.naver,
            },
            apple: {
                color: '#ffffff',
                backgroundColor: vars.color.apple,
            },
            facebook: {
                color: '#ffffff',
                backgroundColor: vars.color.facebook,
            },
            line: {
                color: '#ffffff',
                backgroundColor: vars.color.line,
            },
            google: {
                color: '#000000',
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
            backgroundColor: '#F4F3F3',
            color: '#8A8684',
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
