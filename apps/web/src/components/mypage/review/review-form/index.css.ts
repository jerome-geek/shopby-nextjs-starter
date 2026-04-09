import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';

export const productContainer = style({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
});

export const productImageWrap = style({
    position: 'relative',
    width: '90px',
    height: '90px',
    minWidth: '90px',
    aspectRatio: '1 / 1',
    overflow: 'hidden',
    borderRadius: '4px',
    backgroundColor: vars.color.gray['20'],

    '@media': {
        [media.mobile]: {
            width: '80px',
            height: '80px',
            minWidth: '80px',
        },
    },
});

export const productImage = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
});

export const productContent = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    minWidth: 0,
});

export const status = style([
    textStyles.caption1Semibold,
    { color: vars.color.gray['70'] },
]);

export const primaryStatus = style([status, { color: vars.color.primary }]);

export const productName = style([
    textStyles.body2Semibold,
    {
        lineHeight: '1.4',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
]);

export const starRow = style({
    display: 'flex',
    gap: '2px',
    color: vars.color.black,
});

export const starButton = style({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: '26px',
    height: '26px',
    border: 0,
    background: 'transparent',
    cursor: 'pointer',
});

