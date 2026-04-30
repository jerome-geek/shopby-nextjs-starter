import { keyframes, style } from '@vanilla-extract/css';

import { mediaQuery } from '@/hooks/utils/useResponsive';
import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

const spin = keyframes({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
});

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
});

export const scrollArea = style({
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '12px 0',
    maxHeight: '388px',

    selectors: {
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
});

export const imageGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    listStyle: 'none',
    padding: 0,
    margin: 0,

    '@media': {
        [mediaQuery.desktop]: {
            gap: '18px',
        },
    },
});

export const imageItem = style({
    position: 'relative',
    aspectRatio: '1',
});

export const imageAddCell = style({
    width: '100%',
    height: '100%',
    borderRadius: '4px',
    border: `1px dashed ${vars.color.gray['50']}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: 'pointer',
    backgroundColor: vars.color.gray['10'],
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    outline: 'none',

    ':hover': {
        borderColor: vars.color.green['80'],
        backgroundColor: vars.color.green['20'],
        transform: 'translateY(-2px)',
    },
});

export const imageAddLabel = style([
    textStyles.caption1Semibold,
    {
        color: vars.color.gray['60'],
    },
]);

export const imageWrapper = style({
    width: '100%',
    height: '100%',
    borderRadius: '4px',
    position: 'relative',
    border: `1px solid ${vars.color.gray['20']}`,
    // 모바일에서 터치 스크롤 제스처가 드래그를 가로채지 않도록 함
    touchAction: 'none',
    WebkitUserSelect: 'none',
});

export const imageThumb = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const imageBadge = style([
    textStyles.caption1Semibold,
    {
        position: 'absolute',
        top: '8px',
        left: '8px',
        width: '26px',
        height: '26px',
        borderRadius: '50%',
        backgroundColor: '#1a1a1a',
        color: vars.color.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        fontSize: '13px',
    },
]);

export const imageDeleteBtn = style({
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: vars.color.white,
    color: vars.color.gray['40'],
    border: `2.5px solid ${vars.color.gray['40']}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 2,
    boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
    transition: 'all 0.2s ease',

    ':hover': {
        backgroundColor: vars.color.white,
        transform: 'scale(1.1) rotate(90deg)',
    },
});

export const nextButtonContainer = style({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    backgroundColor: vars.color.white,
    borderTop: `1px solid ${vars.color.gray['20']}`,
    paddingTop: '12px',

    '@media': {
        [mediaQuery.desktop]: {
            padding: 0,
            gap: '16px',
            borderTop: 'none',
        },
    },
});

export const hint = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['60'],
        textAlign: 'center',

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.body2Medium,
            },
        },
    },
]);

export const nextButton = style([
    textStyles.headlineSemibold,
    {
        width: '100%',
        height: '56px',
        backgroundColor: vars.color.gray['10'],
        color: vars.color.gray['40'],
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        selectors: {
            '&:not(:disabled)': {
                backgroundColor: vars.color.pink['50'],
                color: vars.color.white,
            },
        },

        ':hover': {
            opacity: 0.9,
        },
        ':disabled': {
            cursor: 'not-allowed',
        },
    },
]);

export const spinner = style({
    display: 'block',
    animation: `${spin} 1s linear infinite`,
});
