import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';

export const ContentContainerStyle = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    whiteSpace: 'nowrap',

    '& > svg': { width: '72px', height: '72px' },
});

export const titleContainerStyle = css({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    whiteSpace: 'break-spaces',
    textAlign: 'center',
    padding: '0',
    wordBreak: 'break-word',
    '& > div': {
        maxHeight: '40vh',
        overflowY: 'auto',
        marginTop: '6px',
        '&::-webkit-scrollbar': {
            width: '6px',
        },
    },
});

export const dialogFooterStyle = css({
    display: 'flex',
    gap: '8px',
    height: '52px',

    '& button': {
        flex: 1,
        width: '100%',
        minWidth: '0',
        border: `1px solid ${token('colors.black')}`,
        '&:last-child': {
            backgroundColor: token('colors.black'),
            color: token('colors.white'),
        },
    },
});
