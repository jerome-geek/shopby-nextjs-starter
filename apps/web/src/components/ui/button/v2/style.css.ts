import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';

export const buttonRecipe = recipe({
    base: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 'var(--btn-height, 52px)',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        whiteSpace: 'nowrap',

        '@media': {
            [media.desktop]: {
                height: 'var(--btn-height, 63px)',
            },
        },
    },

    variants: {
        frame: {
            solid: [
                textStyles.headingSemibold,
                {
                    border: 'none',
                    gap: '8px',
                    ':disabled': {
                        backgroundColor: vars.color.gray['20'],
                        color: vars.color.gray['50'],
                        cursor: 'not-allowed',
                        opacity: 1, // disabled 시 hover opacity 해제 또는 기본 상태를 유지
                    },
                    selectors: {
                        '&:hover:not(:disabled)': {
                            opacity: 0.85,
                        },
                    },
                },
            ],
            outlined: [
                textStyles.headingSemibold,
                {
                    background: 'transparent',
                    gap: '8px',
                    border: `1px solid ${vars.color.gray['50']}`,
                    ':disabled': {
                        backgroundColor: vars.color.gray['20'],
                        color: vars.color.gray['50'],
                        cursor: 'not-allowed',
                        opacity: 1,
                    },
                    selectors: {
                        '&:hover:not(:disabled)': {
                            opacity: 0.7,
                            backgroundColor: vars.color.gray['10'],
                        },
                    },
                },
            ],
            text: {
                background: 'none',
                border: 'none',
                gap: '2px',
                padding: 0,
                color: 'inherit',
                fontSize: 'inherit',
                fontWeight: 'inherit',
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
            },
        },

        // 여기서 각각의 고유 시각적 테마들의 빈 껍데기를 정의
        variant: {
            primary: {},
            secondary: {},
            tertiary: {},
            kakao: {},
            'kakao-sync': {},
            naver: {},
            apple: {},
            facebook: {},
            google: {},
            line: {},
            white: {},
        },
    },

    compoundVariants: [
        // ---------- Solid Variants ----------
        {
            variants: { frame: 'solid', variant: 'primary' },
            style: {
                color: vars.color.white,
                backgroundColor: vars.color.primary,
            },
        },
        {
            variants: { frame: 'solid', variant: 'secondary' },
            style: {
                color: vars.color.white,
                backgroundColor: vars.color.secondary,
            },
        },
        {
            variants: { frame: 'solid', variant: 'tertiary' },
            style: {
                color: vars.color.white,
                backgroundColor: vars.color.black,
            },
        },
        {
            variants: { frame: 'solid', variant: 'kakao' },
            style: {
                color: vars.color.black,
                backgroundColor: vars.color.kakao,
            },
        },
        {
            variants: { frame: 'solid', variant: 'kakao-sync' },
            style: {
                color: vars.color.black,
                backgroundColor: vars.color.kakao,
            },
        },
        {
            variants: { frame: 'solid', variant: 'naver' },
            style: {
                color: vars.color.white,
                backgroundColor: vars.color.naver,
            },
        },
        {
            variants: { frame: 'solid', variant: 'apple' },
            style: {
                color: vars.color.white,
                backgroundColor: vars.color.apple,
            },
        },
        {
            variants: { frame: 'solid', variant: 'facebook' },
            style: {
                color: vars.color.white,
                backgroundColor: vars.color.facebook,
            },
        },
        {
            variants: { frame: 'solid', variant: 'line' },
            style: {
                color: vars.color.white,
                backgroundColor: vars.color.line,
            },
        },
        {
            variants: { frame: 'solid', variant: 'google' },
            style: {
                color: vars.color.black,
                backgroundColor: vars.color.google,
                border: `1px solid ${vars.color.gray[50]}`,
            },
        },

        // ---------- Outlined Variants ----------
        {
            variants: { frame: 'outlined', variant: 'primary' },
            style: {
                borderColor: vars.color.primary,
                color: vars.color.primary,
            },
        },
        {
            variants: { frame: 'outlined', variant: 'secondary' },
            style: { color: vars.color.black },
        },
        {
            variants: { frame: 'outlined', variant: 'white' },
            style: { borderColor: vars.color.white, color: vars.color.white },
        },

        // ---------- Text Variants ----------
        {
            variants: { frame: 'text', variant: 'primary' },
            style: {
                color: vars.color.gray[80],
                fontSize: '1.4rem',
                fontWeight: 400,
                lineHeight: 1.5,
            },
        },
    ],

    defaultVariants: {
        frame: 'solid',
        variant: 'primary',
    },
});

export type ButtonRecipeVariants = NonNullable<
    RecipeVariants<typeof buttonRecipe>
>;
