import { globalStyle, style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%',

    '@media': {
        [media.mobile]: {
            gap: '20px',
        },
    },
});

export const headerContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',

    '@media': {
        [media.mobile]: {
            gap: '12px',
        },
    },
});

export const header = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
});

export const title = style([
    textStyles.title1Bold,
    {
        color: vars.color.black,
        '@media': {
            [media.mobile]: {
                fontSize: '1.8rem',
                fontWeight: 600,
                lineHeight: '1.5',
                letterSpacing: '-1.3%',
            },
        },
    },
]);

export const createInquiryButton = style([
    textStyles.body1Regular,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        '@media': {
            [media.mobile]: {
                gap: '2px',
                ...textStyleTokens.caption1Regular,
            },
        },
    },
]);

export const list = style({
    display: 'flex',
    flexDirection: 'column',
});

export const item = style({
    padding: '24px 0',
    borderBottom: `1px solid ${vars.color.gray['20']}`,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',

    '@media': {
        [media.mobile]: {
            padding: '20px 0',
        },
    },

    selectors: {
        '&:first-of-type': {
            paddingTop: 0,
        },
        '&:last-of-type': {
            paddingBottom: 0,
            borderBottom: 'none',
        },
    },
});

export const itemHeader = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '10px',
    position: 'relative',
});

export const contentContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',

    selectors: {
        '&:empty': {
            display: 'none',
        },
    },
});

export const metaRight = style({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    flexShrink: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    color: vars.color.gray['60'],
});

export const metaRightButton = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
        '@media': {
            [media.mobile]: {
                ...textStyleTokens.caption2Regular,
            },
        },
    },
]);

export const contentText = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['80'],
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        '@media': {
            [media.mobile]: {
                ...textStyleTokens.body2Regular,
            },
        },
    },
]);

export const metaText = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
    },
]);

export const statusBadge = style([
    textStyles.caption1Semibold,
    {
        marginLeft: '4px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3px 6px',
        borderRadius: '2px',
        color: vars.color.gray['60'],
        backgroundColor: vars.color.gray['20'],
        flexShrink: 0,
        whiteSpace: 'nowrap',
        '@media': {
            [media.mobile]: {
                ...textStyleTokens.caption2Semibold,
            },
        },
    },
]);

export const statusBadgeDone = style({
    backgroundColor: vars.color.green['40'],
    color: vars.color.green['100'],
});

export const titleRow = style({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    minWidth: 0,
});

export const titleText = style([
    textStyles.body1Medium,
    {
        minWidth: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        '@media': {
            [media.mobile]: {
                ...textStyleTokens.body2Medium,
            },
        },
    },
]);

export const contentBox = style({
    backgroundColor: vars.color.gray['10'],
    borderRadius: '8px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',

    '@media': {
        [media.mobile]: {
            padding: '12px',
        },
    },
});

globalStyle(`${contentBox} p:after`, {
    content: '""',
    display: 'block',
    width: '100%',
    borderBottom: `1px dashed ${vars.color.gray['40']}`,
    margin: '16px 0',
});

globalStyle(`${contentBox} p:last-of-type:after`, {
    display: 'none',
});

export const contentPreview = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['80'],
        wordBreak: 'break-word',
        whiteSpace: 'pre-wrap',
        '@media': {
            [media.mobile]: {
                ...textStyleTokens.body2Regular,
            },
        },
    },
]);

export const loadMoreButton = style([
    textStyles.headingSemibold,
    {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        height: '63px',
        borderRadius: '8px',
        border: `1px solid ${vars.color.gray['50']}`,
        backgroundColor: vars.color.white,
        color: vars.color.black,

        selectors: {
            '&:disabled': {
                cursor: 'not-allowed',
                opacity: 0.6,
            },
        },

        '@media': {
            [media.mobile]: {
                height: '53px',
                ...textStyleTokens.headlineSemibold,
            },
        },
    },
]);
