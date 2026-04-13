import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
});

export const swiperContainer = style({
    width: 'calc(100% + 40px)',
    margin: '0 -20px',
    padding: '0 20px',
    borderBottom: `1px solid ${vars.color.gray['20']}`,
});

globalStyle(`${swiperContainer} .swiper`, {
    width: '100%',
});

globalStyle(`${swiperContainer} .swiper-slide`, {
    width: 'auto',
});

export const tabButton = style([
    textStyles.body1Medium,
    {
        padding: '0 2px 12px',
        color: vars.color.gray['60'],
        whiteSpace: 'nowrap',
        selectors: {
            '&[data-selected="true"]': {
                fontWeight: 500,
                color: vars.color.black,
                borderBottom: `2px solid ${vars.color.green['80']}`,
            },
        },
    },
]);

export const filterScrollArea = style({
    width: '100%',
    maxHeight: 'min(50vh, 280px)',
    minHeight: '228px',
    overflowY: 'auto',
});

export const chipWrap = style({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
    alignItems: 'flex-start',
});

export const customPriceField = style({
    paddingRight: '36px',
});

export const customPriceFieldWrap = style({
    position: 'relative',
    width: '100%',
});

export const customPriceUnit = style([
    textStyles.body1Regular,
    {
        position: 'absolute',
        top: '50%',
        right: '12px',
        transform: 'translateY(-50%)',
        color: vars.color.gray['80'],
        pointerEvents: 'none',
    },
]);

export const filterChip = style([
    textStyles.body2Regular,
    {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '29px',
        padding: '0 14px',
        borderRadius: '999px',
        background: vars.color.gray['20'],
        color: vars.color.gray['80'],
        whiteSpace: 'nowrap',
        selectors: {
            '&[data-state="checked"]': {
                background: vars.color.gray['60'],
                color: vars.color.white,
            },
            '&[aria-pressed="true"]': {
                background: vars.color.gray['60'],
                color: vars.color.white,
            },
            '&:disabled, &[data-disabled]': {
                opacity: 0.45,
                cursor: 'not-allowed',
            },
        },
    },
]);

/** 브랜드 목록이 길 때 스크롤 */
export const brandChipScroll = style({
    width: '100%',
    maxHeight: 'min(45vh, 240px)',
    overflowY: 'auto',
});

export const selectedFilterContainer = style({
    width: 'calc(100% + 40px)',
    margin: '0 -20px',
    padding: '12px 20px 0',
    borderTop: `1px solid ${vars.color.gray['20']}`,
});

globalStyle(`${selectedFilterContainer} .swiper`, {
    width: '100%',
});

globalStyle(`${selectedFilterContainer} .swiper-slide`, {
    width: 'auto',
});

export const selectedFilterButton = style([
    textStyles.body2Regular,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        width: 'fit-content',
        minHeight: '32px',
        padding: '0 10px 0 12px',
        borderRadius: '999px',
        color: vars.color.white,
        background: vars.color.gray['60'],
        border: 'none',
        cursor: 'pointer',
        selectors: {
            '&:hover': {
                opacity: 0.92,
            },
        },
    },
]);

export const resetButton = style([
    textStyles.headlineSemibold,
    {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: '0 0 100px',
        width: '100px',
        height: '44px',
        borderRadius: '4px',
        background: vars.color.white,
        border: `1px solid ${vars.color.gray['50']}`,
        color: vars.color.black,
        selectors: {
            '&:hover': {
                opacity: 0.85,
            },
        },
    },
]);

export const registerButton = style([
    textStyles.headlineSemibold,
    {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: '1',
        height: '44px',
        borderRadius: '4px',
        background: vars.color.green['80'],
        color: vars.color.white,
        selectors: {
            '&:hover': {
                opacity: 0.85,
            },
        },
    },
]);
