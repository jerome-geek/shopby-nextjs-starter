import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const dimmed = style({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: vars.color.black,
    zIndex: 1004,
});

export const bottomSheetContainer = recipe({
    base: {
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: vars.color.white,
        padding: 0,
        zIndex: 1004,
        paddingBottom: 'env(safe-area-inset-bottom)',
    },
    variants: {
        type: {
            partial: {
                height: 'auto',
                borderRadius: '12px 12px 0 0',
            },
            fullscreen: {
                height: 'calc(var(--vh, 1vh) * 100)',
                borderRadius: 0,
            },
        },
    },
    defaultVariants: {
        type: 'partial',
    },
});

export const bottomSheetHeaderContainer = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 20px',
});

export const bottomSheetHeader = style([textStyles.headingSemibold]);

export const noTitleCloseButton = style({
    width: '100%',
    margin: '8px auto 12px',
    background: 'transparent',
    border: 'none',
    padding: 0,
});

globalStyle(`${noTitleCloseButton} > span`, {
    display: 'block',
    width: '56px',
    height: '4px',
    borderRadius: '999px',
    backgroundColor: vars.color.gray['40'],
    margin: '0 auto',
});

export const bottomSheetContent = recipe({
    base: {
        flex: 1,
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
    },
    variants: {
        isHeader: {
            true: {},
            false: {},
        },
        isFooter: {
            true: { padding: '0 20px 20px' },
            false: { padding: '0 20px 12px' },
        },
    },
    compoundVariants: [
        {
            variants: { isHeader: true, isFooter: true },
            style: { maxHeight: 'calc(100% - 116px)' },
        },
        {
            variants: { isHeader: true, isFooter: false },
            style: { maxHeight: 'calc(100% - 44px)' },
        },
        {
            variants: { isHeader: false, isFooter: true },
            style: { maxHeight: 'calc(100% - 72px)' },
        },
        {
            variants: { isHeader: false, isFooter: false },
            style: { maxHeight: '100%' },
        },
    ],
});

export const bottomSheetFooter = style({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 20px',
    borderTop: `1px solid ${vars.color.gray['20']}`,
});

globalStyle(`${bottomSheetFooter} button`, {
    flex: 1,
});
