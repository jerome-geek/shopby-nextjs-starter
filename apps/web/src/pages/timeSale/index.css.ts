import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',

    '@media': {
        [media.desktop]: {
            gap: '60px',
        },
    },
});

export const topContainer = style({
    display: 'flex',

    '@media': {
        [media.desktop]: {
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
    textStyles.headingMedium,
    {
        color: vars.color.gray['80'],
    },
]);

export const titleContainer = style({
    display: 'flex',
    flexDirection: 'column',

    '@media': {
        [media.desktop]: {
            gap: '20px',
        },
    },
});

export const subTitleContainer = style({
    display: 'flex',
    flexDirection: 'column',

    '@media': {
        [media.desktop]: {
            gap: '10px',
        },
    },
});
