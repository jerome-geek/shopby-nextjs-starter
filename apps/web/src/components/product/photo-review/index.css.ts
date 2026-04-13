import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';

export const photoReviewSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
    minWidth: 0,
    overflow: 'hidden',

    '@media': {
        [media.desktop]: {
            gap: '12px',
        },
    },
});

export const photoReviewList = style({
    width: '100%',
    minWidth: 0,
    margin: '0 -20px',

    '@media': {
        [media.desktop]: {
            margin: 0,
        },
    },
});

export const photoReviewTitle = style([
    textStyles.headingSemibold,
    {
        color: vars.color.gray['90'],
    },
]);

export const photoReviewItem = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    height: 'auto',
});

export const photoReviewImage = style({
    width: '100%',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    borderRadius: '8px',
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
