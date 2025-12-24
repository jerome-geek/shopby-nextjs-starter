import { defineConfig } from '@pandacss/dev';

export default defineConfig({
    // Whether to use css reset
    preflight: true,

    // Where to look for your css declarations
    include: ['./src/**/*.{js,jsx,ts,tsx}'],

    // Files to exclude
    exclude: [],

    // The output directory for your css system
    outdir: 'src/styled-system',

    // JSX framework to use
    jsxFramework: 'react',

    // Global CSS
    globalCss: {
        '*, *::before, *::after': {
            boxSizing: 'border-box',
        },
        html: {
            fontSize: 'calc(10 / 16 * 100%)', // 기본 폰트 크기 (375px 기준)
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
        },
        body: {
            margin: 0,
            padding: 0,
            fontFamily:
                'Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
            fontSize: '16px',
            lineHeight: '1.5',
            color: '{colors.foreground}',
            backgroundColor: '{colors.background}',
            minHeight: '100vh',
            WebkitTapHighlightColor: 'transparent',
        },
        '#__next': {
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
        },
        'img, picture, video, canvas, svg': {
            display: 'block',
            maxWidth: '100%',
        },
        'input, button, textarea, select': {
            font: 'inherit',
        },
        button: { cursor: 'pointer' },
        'p, h1, h2, h3, h4, h5, h6': {
            overflowWrap: 'break-word',
        },
        'ul, ol': {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },

    // Theme configuration
    theme: {
        extend: {
            breakpoints: {
                sm: '375px', // 모바일 기준 (375px 이상)
                md: '768px', // 태블릿
                lg: '1024px', // 데스크톱
                xl: '1280px', // 와이드
            },
            tokens: {
                colors: {
                    background: { value: '#ffffff' },
                    foreground: { value: '#171717' },
                    primary: { value: '#000000' },
                    secondary: { value: '#666666' },
                    accent: { value: '#f5f5f5' },
                    border: { value: '#e5e5e5' },
                    muted: { value: '#f9f9f9' },
                    red: { value: '#FB5047' },
                    black: {
                        value: '#000000',
                    },
                    gray90: { value: '#433F3D' },
                    gray80: { value: '#5A5552' },
                    gray70: { value: '#777472' },
                    gray60: { value: '#8A8684' },
                    gray50: { value: '#A7A6A5' },
                    gray20: { value: '#F4F3F3' },
                    gray10: { value: '#F9F9F9' },
                    white: { value: '#FFFFFF' },
                    pink: { value: '#FFDBE2' },
                    skyblue: { value: '#BDE0F5' },
                    salmon: { value: 'FFE2CC' },
                    kakao: {
                        value: '#fee500',
                    },
                    naver: { value: '#03c75a' },
                    apple: { value: '#fff' },
                    facebook: { value: '#0766FF' },
                    line: { value: '#03C75A' },
                },
                fonts: {
                    sans: {
                        value: 'Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
                    },
                    mono: {
                        value: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                    },
                },
                fontSizes: {
                    xs: { value: '0.75rem' }, // 12px
                    sm: { value: '0.875rem' }, // 14px
                    base: { value: '1rem' }, // 16px
                    lg: { value: '1.125rem' }, // 18px
                    xl: { value: '1.25rem' }, // 20px
                    '2xl': { value: '1.5rem' }, // 24px
                    '3xl': { value: '1.875rem' }, // 30px
                    '4xl': { value: '2.25rem' }, // 36px
                    '5xl': { value: '3rem' }, // 48px
                },
                spacing: {
                    0: { value: '0' },
                    1: { value: '0.25rem' }, // 4px
                    2: { value: '0.5rem' }, // 8px
                    3: { value: '0.75rem' }, // 12px
                    4: { value: '1rem' }, // 16px
                    5: { value: '1.25rem' }, // 20px
                    6: { value: '1.5rem' }, // 24px
                    8: { value: '2rem' }, // 32px
                    10: { value: '2.5rem' }, // 40px
                    12: { value: '3rem' }, // 48px
                    16: { value: '4rem' }, // 64px
                    20: { value: '5rem' }, // 80px
                    24: { value: '6rem' }, // 96px
                },
                sizes: {
                    container: {
                        mobile: { value: '100%' },
                        tablet: { value: '768px' },
                        desktop: { value: '1024px' },
                        wide: { value: '1280px' },
                    },
                },
            },
            semanticTokens: {
                colors: {
                    background: {
                        value: {
                            base: '#ffffff',
                            _dark: '#0a0a0a',
                        },
                    },
                    foreground: {
                        value: {
                            base: '#171717',
                            _dark: '#ededed',
                        },
                    },
                    primary: {
                        value: {
                            base: '#000000',
                            _dark: '#ffffff',
                        },
                    },
                    secondary: {
                        value: {
                            base: '#666666',
                            _dark: '#a0a0a0',
                        },
                    },
                    border: {
                        value: {
                            base: '#e5e5e5',
                            _dark: '#333333',
                        },
                    },
                },
            },
        },
    },
});
