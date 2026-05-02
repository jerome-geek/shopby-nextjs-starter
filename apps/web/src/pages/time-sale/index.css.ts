import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '48px',
    paddingBottom: '20px',

    '@media': {
        [media.desktop]: {
            paddingTop: '8px',
            gap: '60px',
            maxWidth: '1200px',
            paddingBottom: '80px',
        },
    },
});

export const topContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',

    '@media': {
        [media.desktop]: {
            flexDirection: 'row',
            gap: '48px',
        },
    },
});

export const title = style([
    textStyles.display1Semibold,
    {
        color: vars.color.black,
    },
]);

export const subTitle = style([
    textStyles.title1Semibold,
    {
        color: vars.color.gray['90'],
    },
]);

export const description = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['80'],

        '@media': {
            [media.desktop]: {
                fontWeight: '500',
                fontSize: '1.8rem',
                lineHeight: '1.5',
                letterSpacing: '-1.3%',
            },
        },
    },
]);

export const titleContainer = style({
    display: 'flex',
    flexDirection: 'column',

    '@media': {
        [media.desktop]: {
            gap: '20px',
            paddingTop: '32px',
        },
    },
});

export const subTitleContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',

    '@media': {
        [media.desktop]: {
            gap: '10px',
        },
    },
});

export const imageContainer = style({
    width: 'calc(100% + 40px)',
    margin: '0 -20px',
    aspectRatio: '1/1',
    backgroundColor: vars.color.gray['10'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '@media': {
        [media.desktop]: {
            width: '486px',
            height: '486px',
            margin: '0',
            borderRadius: '8px',
            overflow: 'hidden',
        },
    },
});

export const image = style({
    width: '100%',
    height: '100%',
    objectFit: 'contain',
});

export const sectionContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '48px',
    paddingTop: '24px',

    '@media': {
        [media.desktop]: {
            gap: '96px',
            paddingTop: '32px',
        },
    },
});

export const productListContainer = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    columnGap: '4px',
    rowGap: '24px',

    '@media': {
        [media.desktop]: {
            gridTemplateColumns: 'repeat(6, 1fr)',
            columnGap: '24px',
            rowGap: '48px',
        },
    },
});

export const section = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',

    '@media': {
        [media.desktop]: {
            gap: '24px',
        },
    },
});

export const moreButton = style([
    textStyles.headlineSemibold,
    {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '16px 0',
        width: '100%',
        border: `1px solid ${vars.color.gray['50']}`,
        borderRadius: '4px',
        color: vars.color.black,

        '@media': {
            [media.desktop]: {
                maxWidth: '588px',
                margin: '0 auto',
                padding: '18px 0',
                fontSize: '1.8rem',
                lineHeight: '1.5',
                letterSpacing: '-1.3%',
            },
        },
    },
]);

export const sectionTitle = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,

        '@media': {
            [media.desktop]: {
                fontWeight: '700',
                fontSize: '2.2rem',
                lineHeight: '1.32',
                letterSpacing: '-2%',
            },
        },
    },
]);

export const sectionDescription = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],

        '@media': {
            [media.desktop]: {
                fontSize: '1.5rem',
                letterSpacing: '-0.2%',
            },
        },
    },
]);
