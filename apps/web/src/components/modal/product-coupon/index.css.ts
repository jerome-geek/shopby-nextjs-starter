import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
});

export const scrollArea = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    listStyle: 'none',
    padding: 0,
    margin: 0,
});

export const couponItem = style({
    display: 'flex',
    alignItems: 'stretch',
    backgroundColor: vars.color.gray['10'],
    borderRadius: '20px', // More rounded for premium feel
    overflow: 'hidden',
    minHeight: '130px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
    border: `1px solid ${vars.color.gray['10']}`,
    ':hover': {
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    },
});

export const couponInfo = style({
    flex: 1,
    padding: '24px 28px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '6px',
});

export const discountValue = style([
    textStyles.title1Bold,
    {
        color: vars.color.pink['100'],
    },
]);

export const couponNameContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
});

export const couponName = style([
    textStyles.headlineMedium,
    {
        color: vars.color.black,
    },
]);

export const couponCondition = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray[60],
        lineHeight: '1.4',
    },
]);

export const downloadBtn = style({
    width: '108px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: vars.color.green['40'],
    borderLeft: `1px dashed ${vars.color.gray['20']}`,
    padding: '0 12px',
    cursor: 'pointer',
    gap: '4px',
    transition: 'background-color 0.2s ease',
    border: 'none',

    selectors: {
        '&:disabled': {
            backgroundColor: vars.color.gray['20'],
            cursor: 'default',
        },
    },

    ':hover': {
        filter: 'brightness(0.98)',
    },
});

export const downloadText = style([
    textStyles.caption1Semibold,
    {
        color: vars.color.gray['60'],
    },
]);

export const footerButton = style([
    textStyles.title2Semibold,
    {
        width: '100%',
        height: '64px',
        backgroundColor: '#3b4d2f', // 스크린샷의 짙은 녹색
        color: vars.color.white,
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        border: 'none',
        transition: 'opacity 0.2s ease',
        ':hover': {
            opacity: 0.9,
        },
    },
]);
