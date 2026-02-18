import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const container = style({
    position: 'absolute',
    top: '5px',
    left: '5px',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2px 4px',
    borderRadius: '2px',
    backgroundColor: vars.color.ivory['10'],
    backdropFilter: 'blur(6px)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

export const timeText = style([
    textStyles.caption2Semibold,
    {
        color: vars.color.pink['100'],
        fontVariantNumeric: 'tabular-nums', // 숫자 너비 고정으로 떨림 방지
    },
]);

export const detailContainer = style([
    textStyles.body1Semibold,
    {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        padding: '12px 0',
        color: vars.color.gray['90'],
        backgroundColor: '#FFEBEECC',
        backdropFilter: 'blur(6px)',
    },
]);

export const detailTimeText = style([
    textStyles.body1Semibold,
    {
        color: vars.color.gray['90'],
        fontVariantNumeric: 'tabular-nums', // 숫자 너비 고정으로 떨림 방지
    },
]);
