import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '60px',
    marginTop: '-20px',

    '@media': {
        [media.desktop]: {
            gap: '60px',
        },
    },
});

export const titleContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',

    '@media': {
        [media.desktop]: {
            gap: '10px',
        },
    },
});

export const description = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
    },
]);

export const bannerList = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',

    '@media': {
        [media.desktop]: {
            display: 'flex',
            flexDirection: 'row',
            gap: '16px',
        },
    },
});

export const bannerListItem = style([
    textStyles.body1Bold,
    {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        minWidth: 0,
        textAlign: 'center',
        gap: '6px',
        position: 'relative',
        padding: '18px 10px',

        selectors: {
            '&:nth-child(1)::after': {
                content: "''",
                position: 'absolute',
                top: '5%',
                right: 0,
                display: 'block',
                width: '1px',
                height: '85%',
                backgroundColor: vars.color.gray['20'],
            },
            '&:nth-child(3)::after': {
                content: "''",
                position: 'absolute',
                bottom: '5%',
                right: 0,
                display: 'block',
                width: '1px',
                height: '85%',
                backgroundColor: vars.color.gray['20'],
            },
            '&:nth-child(1)::before': {
                content: "''",
                position: 'absolute',
                bottom: 0,
                left: 0,
                display: 'block',
                width: '90%',
                height: '1px',
                backgroundColor: vars.color.gray['20'],
            },
            '&:nth-child(2)::before': {
                content: "''",
                position: 'absolute',
                bottom: 0,
                right: 0,
                display: 'block',
                width: '90%',
                height: '1px',
                backgroundColor: vars.color.gray['20'],
            },
        },

        '@media': {
            [media.desktop]: {
                //  textStyles.headlineBold,
                gap: '10px',
                padding: 0,
                selectors: {
                    '&:nth-child(n)::before': {
                        display: 'none',
                    },
                    '&:nth-child(n)::after': {
                        display: 'none',
                    },
                    '&:not(:last-child)::after': {
                        content: "''",
                        position: 'absolute',
                        top: '5%',
                        bottom: '5%',
                        right: '-8px',
                        display: 'block',
                        width: '1px',
                        backgroundColor: vars.color.gray['20'],
                    },
                },
            },
        },
    },
]);

export const bannerImageContainer = style({
    width: '70px',
    height: '70px',
    aspectRatio: '1/1',
    objectFit: 'cover',
    overflow: 'hidden',
    borderRadius: '50%',
});
