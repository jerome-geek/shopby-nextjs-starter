import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 0 0',

    '@media': {
        [media.mobile]: {
            padding: '24px 0 0',
        },
    },
});

export const titleGroup = style({
    textAlign: 'center',
    marginBottom: '32px',
    padding: '0 20px',
});

export const title = style([
    textStyles.title2Semibold,
    {
        color: vars.color.black,

        '@media': {
            [media.mobile]: {
                ...textStyleTokens.headingSemibold,
            },
        },
    },
]);

export const recipeArea = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 24px',
    marginLeft: '0',
    width: '100%',

    '@media': {
        [media.mobile]: {
            padding: '0',
            width: 'calc(100vw - 4px)',
        },
    },
});

export const swiperContainer = style({
    width: '100%',
    overflow: 'hidden',
    marginBottom: '24px',
    padding: '0',

    '@media': {
        [media.mobile]: {
            marginBottom: '0',
            padding: '0 20px !important',
        },
    },
});

export const swiperSlide = style({
    width: 'auto',
    height: 'auto',
});

export const recipeCardWrapper = style({
    width: '100%',
    cursor: 'pointer',
});

export const paginationWrapper = style({
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    display: 'flex',
    height: '24px',

    '@media': {
        [media.mobile]: {
            display: 'none',
        },
    },
});

export const recommendPagination = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
});

export const paginationCurrent = style([
    textStyles.body1Semibold,
    {
        color: vars.color.black,
        minWidth: '20px',
        textAlign: 'center',
    },
]);

export const paginationDivider = style([
    textStyles.body1Medium,
    {
        color: vars.color.gray[60],
        margin: '0 2px',
    },
]);

export const paginationTotal = style([
    textStyles.body1Medium,
    {
        color: vars.color.gray[60],
        minWidth: '20px',
        textAlign: 'center',
    },
]);

export const paginationButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    color: vars.color.gray[80],

    ':disabled': {
        color: vars.color.gray[40],
    },
});

export const skeletonList = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    width: '100%',
    listStyle: 'none',
    padding: '0',
    gap: '24px',

    '@media': {
        [media.mobile]: {
            display: 'flex',
            overflow: 'hidden',
            padding: '0 20px',
            gap: '16px',
        },
    },
});

export const skeletonItem = style({
    flexShrink: 0,
    width: '100%',

    '@media': {
        [media.mobile]: {
            width: '144px',
        },
    },
});

export const skeletonCardInfo = style({
    marginTop: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
});

export const skeletonMetaList = style({
    display: 'flex',
    gap: '8px',
    marginTop: '8px',
    listStyle: 'none',
});
