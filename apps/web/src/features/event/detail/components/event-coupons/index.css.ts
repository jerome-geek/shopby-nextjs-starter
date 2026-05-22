import { globalStyle, style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%',
    margin: '40px 0',

    '@media': {
        [media.desktop]: {
            margin: '60px 0',
        },
    },
});

export const couponList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    alignItems: 'center',
    width: '100%',
});

export const couponItem = style({
    display: 'flex',
    alignItems: 'stretch',
    backgroundColor: vars.color.gray['10'],
    borderRadius: '20px',
    overflow: 'hidden',
    width: '90%',
    minHeight: '130px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    border: `1px solid ${vars.color.gray['10']}`,

    selectors: {
        '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
        },
    },

    '@media': {
        [media.desktop]: {
            width: '500px',
        },
    },
});

export const couponInfo = style({
    flex: 1,
    padding: '24px 28px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '6px',

    '@media': {
        [media.mobile]: {
            padding: '16px',
            gap: '8px',
        },
    },
});

export const couponNameContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',

    '@media': {
        [media.mobile]: {
            gap: '0',
        },
    },
});

export const discountValue = style([
    textStyles.title1Bold,
    {
        color: vars.color.pink['100'],
    },
    {
        '@media': {
            [media.mobile]: {
                fontSize: '1.8rem',
                lineHeight: '1.5',
            },
        },
    },
]);

export const couponName = style([
    textStyles.headlineMedium,
    {
        color: vars.color.black,
    },
    {
        '@media': {
            [media.mobile]: {
                fontSize: '1.4rem',
            },
        },
    },
]);

export const couponCondition = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray[60],
        lineHeight: '1.4',
    },
]);

export const downloadBtn = style({
    width: '108px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: vars.color.green['40'],
    borderTop: 'none',
    borderRight: 'none',
    borderBottom: 'none',
    borderLeft: `1px dashed ${vars.color.gray['20']}`,
    padding: '0 12px',
    cursor: 'pointer',
    gap: '4px',
    transition: 'background-color 0.2s ease',
    flexShrink: 0,

    selectors: {
        '&:disabled': {
            backgroundColor: vars.color.gray['20'],
            cursor: 'default',
        },
    },

    ':hover': {
        filter: 'brightness(0.98)',
    },

    '@media': {
        [media.mobile]: {
            width: 'auto',
            padding: '0 16px',
        },
    },
});

export const downloadText = style([
    textStyles.caption1Semibold,
    {
        color: vars.color.gray['60'],
    },
]);

export const downloadAllButton = style([
    textStyles.headlineSemibold,
    {
        width: '90%',
        height: '53px',
        margin: '0 auto',
        background: vars.color.green[100],
        color: vars.color.white,
        borderRadius: '4px',
        cursor: 'pointer',

        selectors: {
            '&:disabled': {
                cursor: 'not-allowed',
                background: vars.color.gray[20],
                color: vars.color.gray[60],
            },
        },

        '@media': {
            [media.desktop]: {
                width: '500px',
                height: '59px',
                ...textStyleTokens.headlineSemibold,
            },
        },
    },
]);

export const guideSection = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    gap: '12px',
});

export const guideToggleButton = style([
    textStyles.body2Semibold,
    {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        width: 'fit-content',
        padding: 0,
        border: 'none',
        background: 'none',
        color: vars.color.gray[60],
        cursor: 'pointer',

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.body1Semibold,
            },
        },
    },
]);

export const guideToggleIcon = style({
    width: '16px',
    height: '16px',
    color: vars.color.gray[60],
    transition: 'transform 0.2s ease',
});

export const guideToggleIconOpen = style({
    transform: 'rotate(180deg)',
});

export const guideContent = style([
    textStyles.body2Regular,
    {
        width: '100%',
        overflow: 'hidden',
        textAlign: 'initial',
        color: vars.color.gray[90],

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.body1Regular,
            },
        },
    },
]);

globalStyle(`${guideContent} *`, {
    maxWidth: '100% !important',
});

globalStyle(`${guideContent} img`, {
    maxWidth: '100% !important',
    height: 'auto',
});
