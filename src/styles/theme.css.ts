import { createGlobalTheme } from '@vanilla-extract/css';

// 색상 토큰 정의
export const vars = createGlobalTheme(':root', {
    color: {
        // 기본 색상
        white: '#FFFFFF',
        black: '#000000',

        // Primary 색상
        primary: '#000000',

        // Gray 스케일
        gray: {
            10: '#F9F9F9',
            20: '#F4F4F4',
            30: '#EEEEEE',
            40: '#E0E0E0',
            50: '#BDBDBD',
            60: '#9E9E9E',
            70: '#757575',
            80: '#616161',
            90: '#424242',
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
});
