import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

/** 주문 번호 링크 */
export const orderNoLink = style([
    textStyles.body2Semibold,
    {
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
        color: vars.color.black,
        fontSize: '1.3rem',

        '@media': {
            [media.tablet]: {
                fontSize: '1.4rem',
            },
            [media.desktop]: {
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

/** 주문일자 텍스트 */
export const orderDate = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['70'],
        fontSize: '1.3rem',

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

/** 각 주문 아이템 그룹 컨테이너 */
export const orderGroup = style({
    display: 'flex',
    flexDirection: 'column',
    borderBottom: `1px solid ${vars.color.gray['20']}`,

    selectors: {
        '&:last-child': {
            borderBottom: 'none',
        },
    },
});

/** 주문번호/날짜 헤더 행 */
export const orderGroupHeader = style({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 0 10px',
    borderBottom: `1px solid ${vars.color.gray['20']}`,

    '@media': {
        [media.tablet]: {
            padding: '16px 12px 12px',
        },
        [media.desktop]: {
            padding: '16px 12px 12px',
        },
    },
});

/** 주문 내 단일 상품 아이템 행 */
export const orderItemRow = style({
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '10px',
    padding: '14px 0',

    selectors: {
        '&:hover': {
            backgroundColor: vars.color.gray['10'],
        },
        '&:not(:last-child)': {
            borderBottom: `1px solid ${vars.color.gray['20']}`,
        },
    },

    '@media': {
        [media.tablet]: {
            gridTemplateColumns: '1.8fr 0.8fr 0.8fr',
            alignItems: 'center',
            gap: '16px',
            padding: '16px 12px',
        },
        [media.desktop]: {
            gridTemplateColumns: '1.8fr 0.8fr 0.8fr',
            alignItems: 'center',
            gap: '16px',
            padding: '16px 12px',
        },
    },
});

/** 상품 이미지 + 텍스트 영역 */
export const productCell = style({
    display: 'flex',
    flexDirection: 'row',
    gap: '12px',
    alignItems: 'flex-start',
    minWidth: 0,
});

export const thumbnail = style({
    flexShrink: 0,
    width: '72px',
    height: '72px',
    objectFit: 'cover',
    borderRadius: '4px',
    border: `1px solid ${vars.color.gray['20']}`,
    backgroundColor: vars.color.gray['10'],

    '@media': {
        [media.tablet]: {
            width: '80px',
            height: '80px',
        },
        [media.desktop]: {
            width: '80px',
            height: '80px',
        },
    },
});

export const productInfo = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    minWidth: 0,
    flex: 1,
});

export const mobileStatusBadge = style([
    textStyles.caption1Semibold,
    {
        display: 'block',
        color: vars.color.gray['80'],
        fontSize: '1.2rem',

        '@media': {
            [media.tablet]: {
                display: 'none',
            },
            [media.desktop]: {
                display: 'none',
            },
        },
    },
]);

export const mobileStatusBadgePrimary = style({
    color: vars.color.primary,
});

export const productBadge = style([
    textStyles.caption1Semibold,
    {
        color: vars.color.gray['70'],
        fontSize: '1.2rem',
    },
]);

export const productName = style([
    textStyles.body2Semibold,
    {
        color: vars.color.black,
        wordBreak: 'break-all',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textAlign: 'left',
    },
]);

export const optionText = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
        fontSize: '1.2rem',
        textAlign: 'left',
    },
]);

export const priceText = style([
    textStyles.body2Semibold,
    {
        color: vars.color.black,
        textAlign: 'left',
    },
]);

/** 주문 상태 셀 (데스크탑만 표시) */
export const statusCell = style({
    display: 'none',

    '@media': {
        [media.tablet]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
        },
        [media.desktop]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
        },
    },
});

export const statusText = style([
    textStyles.body2Semibold,
    {
        color: vars.color.gray['80'],
        fontSize: '1.4rem',
        textAlign: 'center',
    },
]);

export const statusTextPrimary = style({
    color: vars.color.primary,
});

/** 액션 버튼 셀 (데스크탑만 표시) */
export const actionsCell = style({
    display: 'none',

    '@media': {
        [media.tablet]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
        },
        [media.desktop]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
        },
    },
});

export const actionButton = style([
    textStyles.body2Semibold,
    {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '112px',
        height: '34px',
        fontSize: '1.3rem',
        color: vars.color.gray['80'],
        backgroundColor: vars.color.white,
        border: `1px solid ${vars.color.gray['40']}`,
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.15s ease, border-color 0.15s ease',

        selectors: {
            '&:hover': {
                backgroundColor: vars.color.gray['10'],
            },
            '&:focus-visible': {
                outline: `2px solid ${vars.color.primary}`,
                outlineOffset: 2,
            },
        },
    },
]);

export const actionButtonPrimary = style({
    color: vars.color.white,
    backgroundColor: vars.color.black,
    borderColor: vars.color.black,

    selectors: {
        '&:hover': {
            backgroundColor: vars.color.gray['90'],
        },
    },
});
