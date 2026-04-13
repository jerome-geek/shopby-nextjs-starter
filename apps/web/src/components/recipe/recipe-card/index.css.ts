import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const cardLink = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',

    '@media': {
        [media.desktop]: {
            gap: '16px',
        },
    },
});

export const recipeImageContainer = style({
    position: 'relative',
    width: '100%',
    height: 'auto',
    aspectRatio: '160/213',
    borderRadius: '4px',
    overflow: 'hidden',

    '@media': {
        [media.desktop]: {
            aspectRatio: '220/293',
            borderRadius: '8px',
        },
    },
});

export const recipeImage = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const title = style([
    textStyles.body1Semibold,
    {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',

        '@media': {
            [media.desktop]: {
                fontSize: '1.8rem',
                lineHeight: '1.5',
                letterSpacing: '-1.3%',
            },
        },
    },
]);

export const authorName = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],

        '@media': {
            [media.desktop]: {
                fontSize: '1.4rem',
            },
        },
    },
]);

export const timeText = style([
    textStyles.caption1Semibold,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color: vars.color.gray['80'],

        '@media': {
            [media.desktop]: {
                fontSize: '1.3rem',
                lineHeight: '1.3',
                letterSpacing: '-1.3%',
            },
        },
    },
]);

export const amountText = style([
    textStyles.caption1Regular,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color: vars.color.gray['60'],

        '@media': {
            [media.desktop]: {
                fontSize: '1.3rem',
                lineHeight: '1.3',
                letterSpacing: '-1.3%',
            },
        },
    },
]);
