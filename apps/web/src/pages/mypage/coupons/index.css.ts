import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const registerCouponButton = style({
    flexShrink: 0,
    width: 'auto',
    minWidth: '86px',
    height: '30px',
    fontSize: '1.4rem',
});

export const name = style([
    textStyles.body1Bold,
    {
        color: vars.color.black,
        paddingLeft: '8px',
        wordBreak: 'break-word',
        textAlign: 'left',
        selectors: {
            '&::before': {
                content: '""',
                display: 'inline-block',
                width: '6px',
                height: '6px',
                borderRadius: '999px',
                backgroundColor: vars.color.primary,
                marginRight: '8px',
                verticalAlign: 'middle',
            },
        },

        '@media': {
            [media.tablet]: {
                paddingLeft: 0,
                width: '100%',
                textAlign: 'left',
            },
            [media.desktop]: {
                paddingLeft: 0,
                width: '100%',
                textAlign: 'left',
            },
        },
    },
]);

export const mobileDateLabel = style([
    textStyles.body2Semibold,
    {
        display: 'none',
        color: vars.color.gray['80'],
        fontSize: '13px',
        lineHeight: 1.35,
        '@media': {
            [media.mobile]: {
                display: 'block',
            },
        },
    },
]);

export const benefitText = style([
    textStyles.body1Bold,
    {
        color: vars.color.primary,
        fontSize: '14px',
        lineHeight: '1.4',
        letterSpacing: '-1.3%',
    },
]);

export const benefitCouponType = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['70'],
        fontSize: '1.4rem',
        lineHeight: 1.4,
    },
]);

export const detailCell = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 0,
    width: '100%',

    '@media': {
        [media.mobile]: {
            alignItems: 'flex-start',
        },
    },
});

export const detailAnchor = style({
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: 'fit-content',
    maxWidth: '100%',
});

export const detailButton = style([
    textStyles.body2Semibold,
    {
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        color: vars.color.gray['80'],
        textDecoration: 'underline',
        textUnderlineOffset: '3px',

        '@media': {
            [media.tablet]: {
                padding: '4px 8px',
                fontSize: '1.4rem',
            },
            [media.desktop]: {
                padding: '4px 8px',
                fontSize: '1.4rem',
            },
        },
        selectors: {
            '&:focus-visible': {
                outline: `2px solid ${vars.color.primary}`,
                outlineOffset: 2,
                borderRadius: '2px',
            },
        },
    },
]);

export const detailPopup = style({
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    marginTop: '6px',
    minWidth: '280px',
    maxWidth: 'min(360px, calc(100vw - 32px))',
    padding: '16px',
    backgroundColor: vars.color.white,
    border: `1px solid ${vars.color.gray['30']}`,
    borderRadius: '4px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    zIndex: 30,
    textAlign: 'left',

    '@media': {
        [media.mobile]: {
            left: 0,
            right: 'auto',
            transform: 'none',
        },
    },
});

export const detailPopupHeader = style([
    textStyles.body2Semibold,
    {
        marginBottom: '12px',
        paddingBottom: '10px',
        borderBottom: `1px solid ${vars.color.gray['20']}`,
        color: vars.color.black,
        fontSize: '14px',
    },
]);
