import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',

    '@media': {
        [media.mobile]: {
            gap: '12px',
        },
    },
});

export const section = style({
    backgroundColor: vars.color.white,
    border: `1px solid ${vars.color.gray['30']}`,
    borderRadius: '4px',
    padding: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',

    '@media': {
        [media.mobile]: {
            padding: '16px',
            borderRadius: '4px',
            boxShadow: '0 8px 18px rgba(0, 0, 0, 0.04)',
        },
    },
});

export const toolbar = style({
    display: 'flex',
    gap: '8px',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
});

export const toolbarTop = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',

    '@media': {
        [media.mobile]: {
            alignItems: 'stretch',
            flexDirection: 'column',
        },
    },
});

export const toolbarBottom = style({
    display: 'flex',
    justifyContent: 'flex-start',
});

export const toggleGroup = style({
    display: 'inline-flex',
    backgroundColor: vars.color.gray['10'],
    border: `1px solid ${vars.color.gray['30']}`,
    borderRadius: '4px',
    padding: '2px',
    gap: '2px',
    height: '44px', // Select(control) 모바일 높이와 맞춤

    '@media': {
        [media.desktop]: {
            height: '52px', // Select(control) 데스크탑 높이와 맞춤
        },
    },
});

export const toggleButton = style([
    textStyles.body2Semibold,
    {
        border: 0,
        background: 'transparent',
        height: '100%',
        padding: '0 14px',
        borderRadius: '4px',
        cursor: 'pointer',
        color: vars.color.gray['80'],
        transition: 'background-color 0.15s ease, color 0.15s ease',
        selectors: {
            '&:hover': {
                backgroundColor: vars.color.gray['20'],
            },
            '&:focus-visible': {
                outline: `2px solid ${vars.color.primary}`,
                outlineOffset: 2,
            },
        },
        '@media': {
            [media.tablet]: {
                fontSize: '1.4rem', // 최소 14px
                fontWeight: 600,
                lineHeight: '1.4',
                letterSpacing: '-1.3%',
            },
            [media.desktop]: {
                fontSize: '1.4rem', // 최소 14px
                fontWeight: 600,
                lineHeight: '1.4',
                letterSpacing: '-1.3%',
            },
        },
    },
]);

export const period = style({
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
});

export const metaRow = style({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    marginTop: '10px',
    flexWrap: 'wrap',
});

export const metaRowRight = style({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
});

export const metaRowLeft = style({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
});

export const registerCouponButton = style({
    flexShrink: 0,
    width: 'auto',
    minWidth: '96px',
    height: '40px',
});

export const periodSelectRow = style({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
});

export const periodLabel = style([
    textStyles.body2Semibold,
    {
        color: vars.color.gray['80'],
        whiteSpace: 'nowrap',
        '@media': {
            [media.tablet]: { fontSize: '1.4rem' },
            [media.desktop]: { fontSize: '1.4rem' },
        },
    },
]);

export const periodSelect = style([
    textStyles.body2Regular,
    {
        width: '180px',
        '@media': {
            [media.mobile]: {
                width: '160px',
            },
        },
    },
]);

export const selectedRangeText = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['70'],
        '@media': {
            [media.tablet]: {
                fontSize: '1.4rem', // 최소 14px
                fontWeight: 400,
                lineHeight: '1.4',
                letterSpacing: '-2%',
            },
            [media.desktop]: {
                fontSize: '1.4rem', // 최소 14px
                fontWeight: 400,
                lineHeight: '1.4',
                letterSpacing: '-2%',
            },
        },
    },
]);

export const dateInput = style([
    textStyles.body2Regular,
    {
        height: '36px',
        padding: '0 10px',
        borderRadius: '4px',
        border: `1px solid ${vars.color.gray['30']}`,
        backgroundColor: vars.color.white,
        color: vars.color.black,
    },
]);

export const summaryRow = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    marginTop: '8px',
});

export const count = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['80'],
        '@media': {
            '(min-width: 768px)': {
                fontSize: '1.4rem', // 최소 14px
                fontWeight: 400,
                lineHeight: '1.4',
                letterSpacing: '-2%',
            },
        },
    },
]);

export const list = style({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '12px',
});

export const listItem = style({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '10px',
    padding: '16px 0',
    borderBottom: `1px solid ${vars.color.gray['20']}`,
    selectors: {
        '&:hover': {
            backgroundColor: vars.color.gray['10'],
        },
    },

    '@media': {
        '(min-width: 768px)': {
            gridTemplateColumns: '1.3fr 1fr 1fr 0.8fr 0.9fr',
            alignItems: 'center',
            gap: '16px',
            padding: '16px 12px',
        },
    },
});

export const headerRow = style([
    textStyles.caption1Semibold,
    {
        display: 'none',

        '@media': {
            '(min-width: 768px)': {
                display: 'grid',
                gridTemplateColumns: '1.3fr 1fr 1fr 0.8fr 0.9fr',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 0',
                borderTop: `1px solid ${vars.color.black}`,
                borderBottom: `1px solid ${vars.color.gray['20']}`,
                color: vars.color.gray['80'],
                fontSize: '1.4rem', // 데스크탑 최소 14px
                fontWeight: 600,
                lineHeight: '1.4',
                letterSpacing: '-1.3%',
            },
        },
    },
]);

export const headerCell = style({
    textAlign: 'center',
    ':first-child': {
        textAlign: 'left',
        paddingLeft: '8px',
    },
});

export const cell = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    minWidth: 0,

    '@media': {
        '(min-width: 768px)': {
            textAlign: 'center',
            alignItems: 'center',
        },
    },
});

export const name = style([
    textStyles.body1Bold,
    {
        color: vars.color.black,
        paddingLeft: '8px',
        wordBreak: 'break-word',
        // rem 베이스(예: 1rem=10px) 설정과 무관하게 쿠폰명은 최소 14px로 보이도록 고정합니다.
        fontSize: '14px',
        lineHeight: '1.4',
        letterSpacing: '-1.3%',
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
            '(min-width: 768px)': {
                paddingLeft: 0,
                width: '100%',
                textAlign: 'left',
            },
        },
    },
]);

export const subText = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['70'],
        '@media': {
            '(min-width: 768px)': {
                fontSize: '1.4rem', // 데스크탑 최소 14px
                fontWeight: 400,
                lineHeight: '1.4',
                letterSpacing: '-2%',
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

export const benefitContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    minWidth: 0,

    '@media': {
        [media.mobile]: {
            flexDirection: 'row',
            gap: '8px',
        },
    },
});

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
        fontSize: '13px',
        lineHeight: 1.4,
        '@media': {
            [media.tablet]: {
                fontSize: '1.4rem',
            },
            [media.desktop]: {
                fontSize: '1.4rem',
            },
        },
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

export const empty = style([
    textStyles.body1Regular,
    {
        padding: '80px 0',
        textAlign: 'center',
        color: vars.color.gray['70'],
    },
]);

export const pagination = style({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    paddingTop: '12px',
});

export const pageButton = style([
    textStyles.caption1Semibold,
    {
        border: `1px solid ${vars.color.gray['30']}`,
        backgroundColor: vars.color.white,
        borderRadius: '4px',
        padding: '10px 12px',
        cursor: 'pointer',
        color: vars.color.black,
        selectors: {
            '&:focus-visible': {
                outline: `2px solid ${vars.color.primary}`,
                outlineOffset: 2,
            },
        },
    },
]);

export const pageButtonDisabled = style({
    opacity: 0.5,
    cursor: 'not-allowed',
});
