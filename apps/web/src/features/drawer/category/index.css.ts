import { globalStyle, style } from '@vanilla-extract/css';

import { globalVars } from '@/styles/global.css';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const overlay = style({
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1001,
});

export const drawer = style({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100dvh',
    backgroundColor: vars.color.white,
    zIndex: 1002,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    overflowX: 'hidden',

    selectors: {
        '&::-webkit-scrollbar': {
            width: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: vars.color.gray['30'],
            borderRadius: '10px',
        },
    },
});

export const searchRow = style({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
    gap: '12px',
    height: globalVars.header.mobileHeight,
    padding: '0 20px',
    position: 'sticky',
    top: 0,
    backgroundColor: vars.color.white,
    zIndex: 1003,
});

export const backButton = style({
    flexShrink: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    color: vars.color.black,
});

// wrapper div용 - flex:1+minWidth:0+overflow:hidden으로 내부 searchKeywordFormContainer가
// width:100%/padding이 있어도 이 wrapper를 넘어 cart 영역을 침범하지 못하도록 강제
export const searchInputOverride = style({
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
});

// searchKeywordFormContainer의 padding:22px을 드로어 컨텍스트에서 제거
// → 세로 중앙 정렬이 올바르게 동작하도록
globalStyle(`${searchInputOverride} > *`, {
    padding: 0,
    width: '100%',
    flexShrink: 1,
});

export const cartButton = style({
    flexShrink: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    position: 'relative',
    color: vars.color.black,
});

export const cartBadge = style([
    textStyles.caption2Semibold,
    {
        position: 'absolute',
        top: '-4px',
        right: '-4px',
        width: '15px',
        height: '15px',
        color: vars.color.white,
        backgroundColor: vars.color.pink['100'],
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
]);

export const tabBar = style({
    display: 'flex',
    gap: '8px',
    padding: '12px 20px',
    flexShrink: 0,
    border: `1px solid ${vars.color.gray['20']}`,
});

export const tabBarInner = style({
    width: '100%',
    display: 'flex',
    gap: '8px',
    backgroundColor: vars.color.gray['20'],
    borderRadius: '100px',
});

export const tabItem = style([
    textStyles.body2Semibold,
    {
        position: 'relative',
        flex: 1,
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100px',
        border: 'none',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        color: vars.color.gray['60'],
        transition: 'color 0.3s ease',
        userSelect: 'none',

        selectors: {
            '&[data-active="true"]': {
                color: vars.color.white,
                backgroundColor: 'transparent',
            },
        },
    },
]);

export const activeIndicator = style({
    position: 'absolute',
    inset: 0,
    borderRadius: '100px',
    backgroundColor: vars.color.black,
    zIndex: 1,
});

export const content = style({
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '0 0 24px',
});

export const tabContentViewport = style({
    position: 'relative',
    width: '100%',
    flex: 1,
});

export const tabContentTrack = style({
    display: 'flex',
    width: '200%',
    height: '100%',

    selectors: {
        '&[data-active-tab="쇼핑"]': {
            justifyContent: 'start',
        },
        '&[data-active-tab="레시피"]': {
            justifyContent: 'end',
        },
    },
});

export const tabPane = style({
    width: '50%',
    minWidth: '50%',
    height: '100%',

    selectors: {
        '&[aria-hidden="true"]': {
            overflow: 'hidden',
            height: '500px',
        },
    },
});
