import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';

export const container = style({
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto',

    '@media': {
        [media.desktop]: {
            padding: '80px 0',
        },
    },
});

export const title = style([
    textStyles.title1Semibold,
    {
        marginBottom: '24px',
        color: vars.color.black,

        '@media': {
            [media.desktop]: {
                marginBottom: '32px',
            },
        },
    },
]);

export const swiperContainer = style({
    width: '100%',
    overflow: 'visible',
});

export const productItem = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    cursor: 'pointer',
});

export const imageWrapper = style({
    position: 'relative',
    width: '100%',
    aspectRatio: '1 / 1',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: vars.color.gray['10'],
});

export const thumbnail = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const likeButton = style({
    position: 'absolute',
    bottom: '12px',
    right: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    zIndex: 2,
});

export const infoLink = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    textDecoration: 'none',
});

export const brand = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
    },
]);

export const productName = style([
    textStyles.body2Regular,
    {
        color: vars.color.black,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        lineHeight: '1.4',
    },
]);
