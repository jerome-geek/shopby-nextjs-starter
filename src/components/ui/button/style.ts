import { cva } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';

export const button = cva({
    base: {
        borderRadius: '8px',
        textStyle: 'heading.bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        border: 'none',
        cursor: 'pointer',
        height: '52px',
        width: '100%',
        transition: 'all 0.3s ease',
        '&:disabled': {
            backgroundColor: '#F4F3F3',
            color: '#8A8684',
            cursor: 'not-allowed',
        },
    },
    variants: {
        visual: {
            primary: {
                color: '#ffffff',
                backgroundColor: token('colors.primary'),
                '&:hover:not(:disabled)': {
                    backgroundColor: '#333333',
                },
            },
            kakao: {
                color: '#000000',
                backgroundColor: token('colors.kakao'),
            },
            'kakao-sync': {
                color: '#000000',
                backgroundColor: token('colors.kakao'),
            },
            naver: { color: '#ffffff', backgroundColor: token('colors.naver') },
            apple: { color: '#ffffff', backgroundColor: token('colors.apple') },
            facebook: {
                color: '#ffffff',
                backgroundColor: token('colors.facebook'),
            },
            line: { color: '#ffffff', backgroundColor: token('colors.line') },
            google: {
                color: '#000000',
                backgroundColor: token('colors.google'),
                border: `1px solid ${token('colors.gray50')}`,
            },
        },
    },
});

export const outlinedButton = cva({
    base: {
        borderRadius: '8px',
        textStyle: 'heading.bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        height: '52px',
        width: '100%',
        transition: 'all 0.3s ease',
        '&:disabled': {
            backgroundColor: '#F4F3F3',
            color: '#8A8684',
            cursor: 'not-allowed',
        },
        border: `1px solid ${token('colors.gray50')}`,
        color: token('colors.black'),
    },
});

export const textButtonStyle = cva({
    base: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        transition: 'color 0.2s, font-weight 0.2s',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        gap: '2px',
        color: token('colors.gray80'),
        textStyle: 'body1.regular',
        // _hover: {
        //     color: hoverColor,
        // },
        // _after: {
        //     content: '""',
        //     position: 'absolute',
        //     right: '0',
        //     top: '50%',
        //     width: '8px',
        //     height: '8px',
        //     borderTop: '1px solid currentColor',
        //     borderRight: '1px solid currentColor',
        //     transform: 'translateY(-50%) rotate(45deg)',
        //     marginTop: '1px',
        //     transition: 'transform 0.2s',
        //     color: token('colors.gray70'),
        // },
    },
});
