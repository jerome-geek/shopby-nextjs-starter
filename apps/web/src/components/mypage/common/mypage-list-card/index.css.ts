/**
 * 마이페이지 목록형 화면 공통 카드 레이아웃 (쿠폰/적립금 등)
 * — toolbar, 메타(기간·총 개수), 테이블형 헤더 + 카드 행, 페이징
 */
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

    '@media': {
        [media.mobile]: {
            padding: '16px',
            borderRadius: '4px',

            selectors: {
                '&[data-type="form"]': {
                    padding: '0',
                    border: 'none',
                },
            },
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
    maxWidth: '100%',

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
    height: '44px',

    '@media': {
        [media.desktop]: {
            height: '52px',
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
                fontSize: '1.4rem',
                fontWeight: 600,
                lineHeight: '1.4',
                letterSpacing: '-1.3%',
            },
            [media.desktop]: {
                fontSize: '1.4rem',
                fontWeight: 600,
                lineHeight: '1.4',
                letterSpacing: '-1.3%',
            },
        },
    },
]);

export const metaRow = style({
    width: '100%',
    display: 'flex',
    alignItems: 'end',
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

export const selectedRangeText = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['70'],
        fontSize: '1.4rem',
    },
]);

export const count = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['80'],
        fontSize: '1.4rem',
    },
]);

export const list = style({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '12px',
});

export const listItem = style({
    position: 'relative',
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
        [media.tablet]: {
            gridTemplateColumns: '1.3fr 1fr 1fr 0.8fr 0.9fr',
            alignItems: 'center',
            gap: '16px',
            padding: '16px 12px',
        },
        [media.desktop]: {
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
        display: 'grid',
        gridTemplateColumns: '1.3fr 1fr 1fr 0.8fr 0.9fr',
        alignItems: 'center',
        gap: '16px',
        padding: '12px 0',
        borderTop: `1px solid ${vars.color.black}`,
        borderBottom: `1px solid ${vars.color.gray['20']}`,
        color: vars.color.gray['80'],
        fontSize: '1.4rem',
        fontWeight: 600,
        lineHeight: '1.4',
        letterSpacing: '-1.3%',

        '@media': {
            [media.mobile]: {
                display: 'none',
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
    textAlign: 'center',
    alignItems: 'center',

    '@media': {
        [media.mobile]: {
            flexDirection: 'row',
        },
    },
});

/** 본문/설명 컬럼 — 태블릿·데스크탑에서 좌측 정렬 */
export const cellAlignStart = style([
    cell,
    {
        '@media': {
            [media.tablet]: {
                alignItems: 'flex-start',
                textAlign: 'left',
            },
            [media.desktop]: {
                alignItems: 'flex-start',
                textAlign: 'left',
            },
        },
    },
]);

/** 목록 보조 텍스트(날짜·시간 등) */
export const listCaption = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['70'],
        '@media': {
            [media.tablet]: {
                fontSize: '1.4rem',
                fontWeight: 400,
                lineHeight: '1.4',
                letterSpacing: '-2%',
            },
            [media.desktop]: {
                fontSize: '1.4rem',
                fontWeight: 400,
                lineHeight: '1.4',
                letterSpacing: '-2%',
            },
        },
    },
]);

export const paging = style({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '40px 0 20px',

    selectors: {
        '&:empty': {
            display: 'none',
        },
    },
});

export const registerButton = style({
    flexShrink: 0,
    width: 'auto',
    minWidth: '86px',
    height: '30px',
    fontSize: '1.4rem',
});
