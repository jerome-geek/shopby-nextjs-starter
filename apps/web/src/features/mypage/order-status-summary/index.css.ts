import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';

export const section = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    backgroundColor: vars.color.white,
    border: `1px solid ${vars.color.gray['30']}`,
    borderRadius: '4px',
    padding: '20px',
});

export const titleRow = style({
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
});

export const title = style([
    textStyles.headlineBold,
    {
        color: vars.color.black,

        '@media': {
            [media.mobile]: {
                fontSize: '1.4rem',
            },
        },
    },
]);

export const subtitle = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['70'],

        '@media': {
            [media.mobile]: {
                fontSize: '1.2rem',
            },
        },
    },
]);

export const list = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: 0,
    margin: 0,

    '@media': {
        [media.mobile]: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px 8px',
        },
    },
});

export const item = style({
    flex: '1 1 0',
    textAlign: 'center',

    '@media': {
        [media.mobile]: {
            flex: 'none',
            width: '100%',
        },
    },
});

export const count = style([
    textStyles.body1Bold,
    {
        display: 'grid',
        placeItems: 'center',
        aspectRatio: '1 / 1',
        maxWidth: '92px',
        width: '100%',
        margin: '0 auto 10px',
        borderRadius: '999px',
        backgroundColor: vars.color.gray['10'],
        border: `1px solid ${vars.color.gray['30']}`,
        color: vars.color.black,

        '@media': {
            [media.mobile]: {
                maxWidth: '64px', // 모바일에서는 원 크기를 줄임
                fontSize: '1.2rem',
                margin: '0 auto 6px',
            },
        },
    },
]);

export const countPrimary = style({
    color: vars.color.primary,
});

export const label = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['80'],

        '@media': {
            [media.mobile]: {
                fontSize: '1.2rem',
            },
        },
    },
]);

export const skeletonTitle = style({
    width: '150px',
    height: '21px',

    '@media': {
        [media.mobile]: {
            width: '112px',
            height: '19px',
        },
    },
});

export const skeletonSubtitle = style({
    width: '92px',
    height: '19px',

    '@media': {
        [media.mobile]: {
            width: '76px',
            height: '17px',
        },
    },
});

export const skeletonCount = style({
    display: 'block',
    aspectRatio: '1 / 1',
    maxWidth: '92px',
    width: '100%',
    height: 'auto',
    margin: '0 auto 10px',
});

export const skeletonLabel = style({
    display: 'block',
    width: '56px',
    height: '18px',
    margin: '0 auto',

    '@media': {
        [media.mobile]: {
            width: '48px',
            height: '16px',
        },
    },
});
