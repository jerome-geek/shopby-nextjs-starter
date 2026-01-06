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
        '*': {
            boxSizing: 'border-box',
            lineHeight: '1.2',
            workbreak: 'keep-all',
            wordWrap: 'break-word',
            WebkitTapHighlightColor: 'transparent', // 모바일에서 터치시 파란색 하이라이트 제거
            touchAction: 'manipulation', // 터치 동작 최적화 (더블탭 줌 방지, 스크롤/핀치 성능 향상)
        },
        '*::before, *::after': {
            boxSizing: 'border-box',
        },
        html: {
            fontSize: 'calc(10 / 16 * 100%)',
            margin: 0,
            padding: 0,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
        },
        body: {
            fontFamily:
                'Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
            color: 'colors.black',
            backgroundColor: 'colors.white',
            minHeight: '100vh',
            letterSpacing: '-0.02em',
        },
        '#__next': {
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
        },
        a: {
            display: 'block',
            color: 'inherit',
            textDecoration: 'none',
        },
        'img, picture, video, canvas, svg': {
            display: 'block',
            maxWidth: '100%',
        },
        'input, button, textarea, select': {
            font: 'inherit',
        },
        'input, button': {
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            fontFamily: 'inherit',
        },
        /** Input 기본 스타일 초기화 */
        input: {
            WebkitBorderRadius: '0',
            borderRadius: '0',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none',
        },
        'input:focus': {
            outline: 'non',
        },
        /* input[type=number]에서 화살표 제거 (Chrome, Safari, Edge, Opera) */
        'input[type="number"]::-webkit-outer-spin-button': {
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none',
        },
        /* Firefox */
        'input[type="number"]': {
            MozAppearance: 'textfield',
        },
        /* IE10 이상에서 input box 에 추가된 지우기 버튼 제거 */
        'input::-ms-clear': {
            display: 'none',
        },
        /** 크롬에서 자동완성 사용시 배경색 제거 */
        'input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 1000px transparent inset',
        },
        'input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active':
            {
                transition: 'background-color 5000s ease-in-out 0s',
            },

        /** 버튼 기본 스타일 초기화 */
        button: {
            padding: '0',
            color: 'inherit',
            fontSize: 'inherit',
            cursor: 'pointer',
        },

        'p, h1, h2, h3, h4, h5, h6': {
            overflowWrap: 'break-word',
        },
        'ul, ol': {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
        b: { fontWeight: 'bold' },
        label: { cursor: 'pointer' },
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
                    salmon: { value: '#FFE2CC' },
                    kakao: {
                        value: '#fee500',
                    },
                    naver: { value: '#03c75a' },
                    apple: { value: '#000000' },
                    facebook: { value: '#0766FF' },
                    line: { value: '#03C75A' },
                    google: { value: '#ffffff' },
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
                    xs: { value: '1.2rem' }, // 12px (10px 기준)
                    sm: { value: '1.4rem' }, // 14px (10px 기준)
                    base: { value: '1.6rem' }, // 16px (10px 기준)
                    lg: { value: '1.8rem' }, // 18px (10px 기준)
                    xl: { value: '2rem' }, // 20px (10px 기준)
                    '2xl': { value: '2.4rem' }, // 24px (10px 기준)
                    '3xl': { value: '3rem' }, // 30px (10px 기준)
                    '4xl': { value: '3.6rem' }, // 36px (10px 기준)
                    '5xl': { value: '4.8rem' }, // 48px (10px 기준)
                },
                spacing: {
                    0: { value: '0' },
                    1: { value: '0.4rem' }, // 4px (10px 기준)
                    2: { value: '0.8rem' }, // 8px (10px 기준)
                    3: { value: '1.2rem' }, // 12px (10px 기준)
                    4: { value: '1.6rem' }, // 16px (10px 기준)
                    5: { value: '2rem' }, // 20px (10px 기준)
                    6: { value: '2.4rem' }, // 24px (10px 기준)
                    8: { value: '3.2rem' }, // 32px (10px 기준)
                    10: { value: '4rem' }, // 40px (10px 기준)
                    12: { value: '4.8rem' }, // 48px (10px 기준)
                    16: { value: '6.4rem' }, // 64px (10px 기준)
                    20: { value: '8rem' }, // 80px (10px 기준)
                    24: { value: '9.6rem' }, // 96px (10px 기준)
                },
                sizes: {
                    checkbox: { value: '1.8rem' }, // 18px (10px 기준)
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
            recipes: {
                text: {
                    className: 'text',
                    base: {
                        fontFamily: 'sans',
                        color: 'gray90',
                        leadingTrim: 'none',
                    },
                    variants: {
                        size: {
                            title1: {
                                fontSize: '2.2rem',
                            },
                            title2: {
                                fontSize: '2rem',
                                lineHeight: '1.4',
                                letterSpacing: '-0.005em', // -0.5%
                            },
                            headline2: {
                                fontSize: '1.5rem',
                                lineHeight: '1.3',
                                letterSpacing: '-0.013em', // -1.3%
                            },
                            headline1: {
                                fontSize: '1.5rem',
                                lineHeight: '1.4',
                                letterSpacing: '-0.002em', // -0.2%
                            },
                            body1: {
                                fontSize: '1.4rem',
                                lineHeight: '1.4',
                                letterSpacing: '-0.02em', // -2%
                            },
                            heading: {
                                fontSize: '1.7rem',
                                lineHeight: '1.5',
                                letterSpacing: '-0.013em', // -1.3%
                            },
                            caption: {
                                fontSize: '1.2rem',
                                lineHeight: '1.4',
                                letterSpacing: '-0.002em', // -0.2%
                            },
                        },
                        weight: {
                            bold: { fontWeight: '700' },
                            semibold: { fontWeight: '600' },
                            medium: { fontWeight: '500' },
                            regular: { fontWeight: '400' },
                        },
                        color: {
                            primary: { color: 'primary' },
                            secondary: { color: 'secondary' },
                            red: { color: 'red' },
                            black: { color: 'black' },
                            gray90: { color: 'gray90' },
                            gray80: { color: 'gray80' },
                            gray70: { color: 'gray70' },
                            gray60: { color: 'gray60' },
                            gray50: { color: 'gray50' },
                            gray20: { color: 'gray20' },
                            gray10: { color: 'gray10' },
                            white: { color: 'white' },
                            pink: { color: 'pink' },
                            skyblue: { color: 'skyblue' },
                            salmon: { color: 'salmon' },
                        },
                    },
                },
            },
        },
    },
});
