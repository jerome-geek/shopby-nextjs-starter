import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    width: '100%',
    maxWidth: '100%',
    minWidth: 0,
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
        padding: '0 20px',

        '@media': {
            [media.desktop]: {
                padding: '0',
            },
        },
    },
]);

export const swiperContainer = style({
    width: '100%',
    overflow: 'hidden',
});

export const swiperSlide = style({
    width: '155px', // Exact width based on Figma node 838:13241
});

export const paginationWrapper = style({
    width: '100%',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',

    '@media': {
        [media.desktop]: {
            display: 'flex',
        },
    },
});

export const recommendPagination = style({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    width: 'fit-content',
    position: 'static', // Reset swiper default
});

export const paginationCurrent = style([
    textStyles.body1Semibold,
    {
        color: vars.color.black,
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
