import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const photoReviewSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '16px',
});

export const photoReviewTitle = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
    },
]);

export const photoReviewList = style({
    margin: '0 -20px',
});

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
