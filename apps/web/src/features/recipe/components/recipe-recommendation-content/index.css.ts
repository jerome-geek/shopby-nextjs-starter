import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

export const container = style({
    padding: '24px 0 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '@media': {
        [media.desktop]: {
            padding: '40px 0 0',
        },
    },
});

export const titleGroup = style({
    textAlign: 'center',
    marginBottom: '32px',
    padding: '0 20px',
});

export const title = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.title2Semibold,
            },
        },
    },
]);

export const recipeArea = style({
    width: '100%',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '@media': {
        [media.desktop]: {
            padding: '0 24px',
        },
    },
});

export const swiperContainer = style({
    width: '100%',
    overflow: 'hidden',
    paddingLeft: '20px',
    marginBottom: '0',

    '@media': {
        [media.desktop]: {
            paddingLeft: '0',
            marginBottom: '24px',
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

export const footerButtonGroup = style({
    display: 'flex',
    width: '100%',
    padding: '0 20px 40px',
    marginTop: '32px',
    gap: '6px',

    '@media': {
        [media.desktop]: {
            padding: '0 24px 40px',
            marginTop: '48px',
            gap: '8px',
        },
    },
});

export const footerButton = style({
    flex: 1,
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const closeButton = style([
    footerButton,
    textStyles.headlineSemibold,
    {
        height: '53px',
        backgroundColor: vars.color.white,
        border: `1px solid ${vars.color.gray['50']}`,
        color: vars.color.black,

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.headingSemibold,
                height: '60px',
            },
        },
    },
]);

export const moreButton = style([
    footerButton,
    textStyles.headlineSemibold,
    {
        height: '53px',
        backgroundColor: vars.color.green['100'],
        color: vars.color.white,
        border: 'none',

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.headingSemibold,
                height: '60px',
            },
        },
    },
]);

export const skeletonList = style({
    display: 'flex',
    gap: '16px',
    width: '100%',
    overflow: 'hidden',
    padding: '0 20px',
    listStyle: 'none',

    '@media': {
        [media.desktop]: {
            padding: '0',
            gap: '24px',
        },
    },
});

export const skeletonItem = style({
    flexShrink: 0,
    width: '144px',

    '@media': {
        [media.desktop]: {
            width: '240px',
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
