import { globalStyle, style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const photoReviewSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    minWidth: 0,
    overflow: 'hidden',
    marginLeft: '-20px',
    width: 'calc(100% + 40px)',

    '@media': {
        [media.desktop]: {
            gap: '12px',
            marginLeft: 0,
            width: '100%',
            overflow: 'visible',
        },
    },
});

export const photoReviewList = style({
    width: '100%',
    minWidth: 0,

    '@media': {
        [media.desktop]: {
            margin: 0,
        },
    },
});

globalStyle(`${photoReviewList} .swiper`, {
    padding: '0 20px',

    '@media': {
        [media.desktop]: {
            padding: 0,
        },
    },
});

export const photoReviewTitle = style([
    textStyles.headingSemibold,
    {
        color: vars.color.gray['90'],
        padding: '0 20px',

        '@media': {
            [media.desktop]: {
                padding: 0,
            },
        },
    },
]);

export const photoReviewItem = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    height: 'auto',
});

export const photoReviewImageButton = style({
    aspectRatio: '1 / 1',
    height: 'fit-content',
    objectFit: 'cover',
    borderRadius: '4px',
    overflow: 'hidden',
    width: '88px',
});

export const photoReviewImage = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const photoReviewRating = style([
    textStyles.body2Semibold,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color: vars.color.gray['80'],
    },
]);

export const photoReviewText = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['80'],
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
]);
