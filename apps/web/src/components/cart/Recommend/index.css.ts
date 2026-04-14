import { style } from '@vanilla-extract/css';
import { textStyles } from '@/styles/typography.css';
import { vars } from '@/styles/theme.css';

export const container = style({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'flex-start',
});

export const title = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
        margin: 0,
    },
]);

export const swiperContainer = style({
    width: '100%',
    overflow: 'visible', // allows peeking items
});

export const swiperSlide = style({
    width: '155px', // Exact width based on Figma node 838:13241
});

export const paginationWrapper = style({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
});

export const paginationCurrent = style([
    textStyles.body1Semibold,
    {
        color: vars.color.black,
        width: '19px',
        textAlign: 'center',
    },
]);

export const paginationDivider = style([
    textStyles.body1Medium,
    {
        color: vars.color.gray[60],
        textAlign: 'center',
    },
]);

export const paginationTotal = style([
    textStyles.body1Medium,
    {
        color: vars.color.gray[60],
        width: '19px',
        textAlign: 'center',
    },
]);

export const paginationButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '16px',
    height: '16px',
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
});
