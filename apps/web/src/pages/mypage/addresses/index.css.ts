import { globalStyle, style } from '@vanilla-extract/css';

import { cell } from '@/components/mypage/common/mypage-list-card/index.css';
import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const countRow = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    flexWrap: 'wrap',
    marginBottom: '20px',
    width: '100%',
    '@media': {
        [media.mobile]: {
            marginBottom: '16px',
        },
    },
});

export const countHtml = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['80'],
        fontSize: '1.4rem',
    },
]);

globalStyle(`${countHtml} b`, {
    fontWeight: 600,
    color: vars.color.black,
});

export const registerButton = style({
    flexShrink: 0,
    width: 'auto',
    minWidth: '86px',
    height: '30px',
    fontSize: '1.4rem',
});

export const statusBadge = style([
    textStyles.caption1Semibold,
    {
        flexShrink: 0,
        padding: '4px 8px',
        borderRadius: '4px',
        backgroundColor: vars.color.gray['10'],
        border: `1px solid ${vars.color.gray['30']}`,
        color: vars.color.gray['80'],
        fontSize: '1.2rem',
    },
]);

export const addressNameBlock = style({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',
    width: '100%',

    '@media': {
        [media.mobile]: {
            alignItems: 'flex-start',
        },
    },
});

export const addressActionsCell = style([
    cell,
    {
        alignItems: 'flex-end',
        textAlign: 'right',
        width: '100%',

        '@media': {
            [media.tablet]: {
                height: '100%',
                alignItems: 'flex-end',
            },
            [media.desktop]: {
                height: '100%',
                alignItems: 'flex-end',
            },
        },
    },
]);

export const addressName = style([
    textStyles.body1Bold,
    {
        margin: 0,
        fontSize: '1.6rem',
        color: vars.color.black,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        maxWidth: '100%',

        '@media': {
            [media.mobile]: {
                fontSize: '1.4rem',
                lineHeight: '26px',
                maxWidth: '60%',
            },
        },
    },
]);

export const addressLines = style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '6px',
    minWidth: 0,
    width: '100%',
    '@media': {
        [media.mobile]: {
            gap: '10px',
            justifyContent: 'start',
            alignItems: 'start',
        },
    },
});

export const addressLine = style([
    textStyles.body2Regular,
    {
        margin: 0,
        fontSize: '1.4rem',
        lineHeight: '18px',
        color: vars.color.black,
        textAlign: 'left',
        selectors: {
            '&:last-of-type': {
                color: vars.color.gray['70'],
            },
        },
    },
]);

export const inlineButtonRow = style({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexWrap: 'wrap',
    columnGap: '10px',
    rowGap: '4px',
    width: '100%',
    '@media': {
        [media.mobile]: {
            columnGap: '15px',
        },
    },
});

export const textButton = style([
    textStyles.body2Regular,
    {
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        padding: 0,
        color: vars.color.gray['70'],
        selectors: {
            '&:focus-visible': {
                outline: `2px solid ${vars.color.primary}`,
                outlineOffset: 2,
                borderRadius: '2px',
            },
        },
        '@media': {
            [media.mobile]: {
                fontSize: '1.4rem',
            },
        },
    },
]);

export const defaultChangeButton = style([
    textStyles.body2Regular,
    {
        position: 'absolute',
        right: '12px',
        bottom: '16px',
        padding: 0,
        border: 'none',
        borderBottom: `1px solid ${vars.color.black}`,
        background: 'none',
        cursor: 'pointer',
        color: vars.color.black,

        '@media': {
            [media.mobile]: {
                top: '16px',
                right: '0',
                bottom: 'auto',
                height: 'auto',
                fontSize: '1.4rem',
            },
        },

        selectors: {
            '&:focus-visible': {
                outline: `2px solid ${vars.color.primary}`,
                outlineOffset: 2,
            },
        },
    },
]);
