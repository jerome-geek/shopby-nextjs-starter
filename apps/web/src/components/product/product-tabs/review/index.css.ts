import { globalStyle, style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

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

export const stars = style({
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
});

export const photoRow = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '10px',
    overflowX: 'auto',

    '@media': {
        [media.mobile]: {
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '4px',
        },
    },
});

export const photoTile = style({
    width: '100%',
    aspectRatio: '1 / 1',
    height: 'fit-content',
    borderRadius: '4px',
    overflow: 'hidden',
    display: 'block',
    position: 'relative',
});

export const photoImg = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
});

export const moreTileButton = style([
    textStyles.caption1Regular,
    {
        width: '100%',
        aspectRatio: '1 / 1',
        height: 'fit-content',
        borderRadius: '4px',
        border: `1px solid ${vars.color.gray['20']}`,
        backgroundColor: vars.color.gray['10'],
        color: vars.color.gray['80'],
        cursor: 'pointer',
    },
]);

export const moreTileButtonText = style([
    textStyles.headingSemibold,
    {
        position: 'absolute',
        bottom: '0',
        left: '0',
        backgroundColor: '#00000080',
        color: vars.color.white,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '@media': {
            [media.mobile]: {
                fontSize: '1.5rem',
                lineHeight: '1.4',
                letterSpacing: '-0.2%',
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
    borderTop: `1px solid ${vars.color.gray['20']}`,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',

    '@media': {
        [media.mobile]: {
            padding: '20px 0',
        },
    },
});

export const itemHeader = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '10px',
});

export const contentContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',

    selectors: {
        '&:empty': {
            display: 'none',
        },
    },
});

export const metaRight = style({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexShrink: 0,
});

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

export const reportButton = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
        background: 'transparent',
        border: 0,
        padding: 0,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
    },
]);

export const optionText = style([
    textStyles.body1Semibold,
    {
        '@media': {
            [media.mobile]: {
                fontSize: '1.3rem',
                lineHeight: '1.3',
                letterSpacing: '-1.3%',
            },
        },
    },
]);

export const content = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['80'],
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',

        '@media': {
            [media.mobile]: {
                fontSize: '1.3rem',
                lineHeight: '1.3',
                letterSpacing: '-1.3%',
            },
        },
    },
]);

export const reviewImageList = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '10px',

    '@media': {
        [media.mobile]: {
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '4px',
        },
    },
});

export const reviewImageItem = style({
    width: '100%',
    aspectRatio: '1 / 1',
    height: 'fit-content',
    borderRadius: '4px',
    overflow: 'hidden',
    backgroundColor: vars.color.gray['20'],
    border: `1px solid ${vars.color.gray['20']}`,
});

globalStyle(`${reviewImageItem} > button`, {
    width: '100%',
    height: '100%',
});

export const footer = style({
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    color: vars.color.gray['60'],
});

export const footerItem = style([
    textStyles.body2Medium,
    {
        display: 'inline-flex',
        alignItems: 'center',
        lineHeight: 0,
        gap: '6px',

        selectors: {
            '&:disabled': {
                cursor: 'not-allowed',
            },
        },
    },
]);

export const recommendButton = style({
    color: vars.color.primary,
});

export const paging = style({
    marginTop: '14px',
});
