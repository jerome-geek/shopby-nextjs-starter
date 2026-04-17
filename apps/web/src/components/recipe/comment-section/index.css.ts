import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

export const commentSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',

    '@media': {
        [media.desktop]: {
            gap: '24px',
        },
    },
});

export const commentTitle = style([
    textStyles.title1Bold,
    {
        color: vars.color.black,
        display: 'flex',
        gap: '6px',
        alignItems: 'center',
    },
]);

export const commentCount = style([
    textStyles.title1Bold,
    {
        color: vars.color.gray['60'],
    },
]);

export const commentList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    listStyle: 'none',
    padding: 0,
    margin: 0,

    '@media': {
        [media.desktop]: {
            gap: '24px',
        },
    },
});

export const commentItem = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    paddingBottom: '20px',
    borderBottom: `1px solid ${vars.color.gray['20']}`,

    '@media': {
        [media.desktop]: {
            gap: '8px',
            paddingBottom: '24px',
        },
    },
});

export const commentHeader = style({
    display: 'flex',
    justifyContent: 'space-between',
});

export const commentAuthorInfo = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

export const commentAuthor = style([
    textStyles.body1Semibold,
    {
        color: vars.color.gray['90'],

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.headlineSemibold,
            },
        },
    },
]);

export const commentDate = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['60'],
    },
]);

export const commentReportBtn = style([
    textStyles.caption2Regular,
    {
        color: vars.color.gray['60'],

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.caption1Regular,
            },
        },
    },
]);

export const commentText = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['80'],

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.body1Regular,
            },
        },
    },
]);

export const commentImages = style({
    display: 'flex',
    gap: '8px',
    marginTop: '12px',
    overflowX: 'auto',
    listStyle: 'none',
    padding: 0,
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    selectors: {
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
});

export const commentImageItem = style({
    position: 'relative',
    flexShrink: 0,
    width: '88px',
    height: '88px',

    '@media': {
        [media.desktop]: {
            width: '98px',
            height: '98px',
        },
    },
});

export const commentInputArea = style({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: vars.color.ivory['10'],
    borderRadius: '8px',
    gap: '14px',
    padding: '20px 16px',
});

export const commentTextArea = style({
    width: '100%',
    minHeight: '100px',
    padding: '12px',

    '@media': {
        [media.desktop]: {
            padding: '16px',
        },
    },
});

export const commentToolbar = style({
    display: 'flex',
    justifyContent: 'space-between',
});

export const attachButton = style([
    textStyles.body1Semibold,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        borderRadius: '2px',
        cursor: 'pointer',
        color: vars.color.gray['80'],
        backgroundColor: vars.color.green['40'],
        padding: '6px 8px',

        '@media': {
            [media.desktop]: {
                gap: '6px',
                padding: '8px 10px',
            },
        },
    },
]);

export const submitButton = style([
    textStyles.body1Semibold,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        borderRadius: '2px',
        cursor: 'pointer',
        color: vars.color.gray['60'],
        backgroundColor: vars.color.gray['20'],
        padding: '6px 8px',
        border: 'none',
        transition: 'all 0.2s ease-in-out',

        selectors: {
            '&:disabled': {
                backgroundColor: vars.color.gray['20'],
                color: vars.color.gray['40'],
                cursor: 'not-allowed',
            },
        },

        '@media': {
            [media.desktop]: {
                padding: '8px 10px',
            },
        },
    },
]);
