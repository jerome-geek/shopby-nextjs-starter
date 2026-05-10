import { style } from '@vanilla-extract/css';

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
    alignItems: 'flex-end',
    flexShrink: 0,
    gap: '12px',
    height: globalVars.header.mobileHeight,
    padding: '0 20px 8px',
    position: 'sticky',
    top: 0,
    backgroundColor: vars.color.white,
    zIndex: 1003,
});

export const searchRowInner = style({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
});

export const searchInputOverride = style({
    flex: 1,
    width: 'auto',
    flexShrink: 1,
    padding: 0,
});

export const cartButton = style({
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
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
