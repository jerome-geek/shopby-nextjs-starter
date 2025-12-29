import { css, cva } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';

export const bottomSheetDimmedStyle = css({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: token('colors.black'),
    opacity: 0.6,
});

export const bottomSheetHeaderStyle = css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '19px',
});

export const bottomSheetContainerStyle = cva({
    base: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 99,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        // webkit-scrollbar 스타일
        '&::-webkit-scrollbar': {
            width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: token('colors.gray50'),
            backgroundClip: 'padding-box',
            borderRadius: '999px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: token('colors.gray20'),
        },
        // _webkitScrollbar: {
        //     width: '6px',
        // },
        // _webkitScrollbarThumb: {
        //     backgroundColor: token('colors.gray50'), // var(--color-gray-400) 대신
        //     backgroundClip: 'padding-box',
        //     borderRadius: '999px', // var(--spacing-999) 대신
        // },
        // _webkitScrollbarTrack: {
        //     backgroundColor: token('colors.gray20'), // var(--color-gray-200) 대신
        // },
    },
    variants: {
        type: {
            partial: {
                height: 'auto',
                borderRadius: '16px 16px 0 0',
                padding: '16px 16px 0',
            },
            fullscreen: {
                height: 'calc(var(--vh, 1vh) * 100)',
                borderRadius: '0',
                padding: '19px 16px 12px',
            },
        },
    },
    defaultVariants: {
        type: 'partial',
    },
});

export const bottomSheetContentStyle = cva({
    base: {
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        marginLeft: '-16px',
        width: 'calc(100% + 32px)',
        padding: '0 16px',
    },
    variants: {
        hasHeader: {
            true: {
                maxHeight: 'calc(100% - 108px)',
            },
            false: {
                maxHeight: 'calc(100% - 45px)',
            },
        },
        hasFooter: {
            true: {
                maxHeight: '100%',
            },
            false: {
                maxHeight: '100%',
            },
        },
    },
    compoundVariants: [
        {
            hasHeader: true,
            hasFooter: true,
            css: {
                maxHeight: 'calc(100% - 108px)',
            },
        },
        {
            hasHeader: true,
            hasFooter: false,
            css: {
                maxHeight: 'calc(100% - 45px)',
            },
        },
        {
            hasHeader: false,
            hasFooter: false,
            css: {
                maxHeight: '100%',
            },
        },
        {
            hasHeader: false,
            hasFooter: true,
            css: {
                maxHeight: '100%',
            },
        },
    ],
});

export const bottomSheetFooterStyle = css({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    paddingTop: '12px',

    '& button': {
        flex: 1,
    },
});
