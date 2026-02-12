import { createGlobalTheme } from '@vanilla-extract/css';

// 색상 토큰 정의
export const vars = createGlobalTheme(':root', {
    color: {
        // 기본 색상
        white: '#FFFFFF',
        black: '#000000',
        red: '#FB5047',

        // Primary 색상
        primary: '#000000',

        // Gray 스케일
        gray: {
            10: '#FAFAFA',
            20: '#F1F1F1',
            30: '#EEEEEE',
            40: '#E0E0E0',
            50: '#B3B7B4',
            60: '#656966',
            70: '#757575',
            80: '#3A403C',
            90: '#1E231F',
            100: '#212121',
            200: '#E5E5E5',
            300: '#D4D4D4',
            400: '#A3A3A3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
        },

        // 추가된 색상 (Pink, Green, Ivory)
        pink: {
            20: '#FFEBEE',
            50: '#ECB2BB',
            80: '#E2808F',
            100: '#F12345',
        },
        green: {
            20: '#F5FAF2',
            40: '#EBF7E6',
            80: '#89A17F',
            100: '#39532E',
        },
        ivory: {
            10: '#FFFBF9',
        },

        // 소셜 로그인 색상
        kakao: '#FEE500',
        naver: '#03C75A',
        apple: '#000000',
        facebook: '#1877F2',
        google: '#FFFFFF',
        line: '#00B900',
    },

    // 그림자
    shadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },

    // 간격
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
    },

    // 타이포그래피 (Figma Text Styles)
    typography: {
        fontSize: {
            'display-1': '40px',
            'display-2': '30px',
            'title-1': '24px',
            'title-2': '20px',
            heading: '18px',
            headline: '16px',
            'body-1': '16px',
            'body-2': '14px',
            'caption-1': '12px',
            'caption-2': '11px',
        },
        fontWeight: {
            regular: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
        },
        lineHeight: {
            base: '1.5',
            tight: '1.32', // 132%
        },
    },
});
