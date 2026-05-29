import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';

export const wrapper = style({
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
});

export const image = style({
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.3s ease',
    zIndex: 2,
    position: 'relative',
    opacity: 0,

    selectors: {
        '&[data-status="loaded"]': {
            opacity: 1,
        },
        '&[data-status="error"]': {
            opacity: 0,
        },
    },
});

export const skeletonContainer = style({
    position: 'absolute',
    inset: 0,
    opacity: 1,
    visibility: 'visible',
    zIndex: 1,
    // NOTE : opacity 전환 후 visibility를 hidden으로 전환하여 페인트 비용 제거
    transition: 'opacity 0.3s ease, visibility 0s linear 0s',

    selectors: {
        '&[data-status="loaded"]': {
            opacity: 0,
            visibility: 'hidden',
            transition: 'opacity 0.3s ease, visibility 0s linear 0.3s',
        },
        '&[data-status="error"]': {
            opacity: 0,
            visibility: 'hidden',
            transition: 'opacity 0.3s ease, visibility 0s linear 0.3s',
        },
    },
});

export const errorOverlay = style({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.spacing.sm,
    backgroundColor: vars.color.gray['20'],
    zIndex: 2,
});

export const errorText = style({
    fontSize: '1.2rem',
    color: vars.color.gray['60'],
    lineHeight: '1.4',
});

export const retryButton = style({
    fontSize: '1.2rem',
    fontWeight: 500,
    color: vars.color.gray['80'],
    padding: `${vars.spacing.xs} ${vars.spacing.sm}`,
    border: `1px solid ${vars.color.gray['50']}`,
    borderRadius: '4px',
    backgroundColor: vars.color.white,
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
    ':hover': {
        backgroundColor: vars.color.gray['10'],
    },
    ':active': {
        backgroundColor: vars.color.gray['30'],
    },
});
