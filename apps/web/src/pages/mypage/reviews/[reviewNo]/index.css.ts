import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
});

export const productRow = style({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
});

export const productImageWrap = style({
    width: '90px',
    height: '90px',
    minWidth: '90px',
    borderRadius: '4px',
    overflow: 'hidden',
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

export const productMeta = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    minWidth: 0,
});

export const ratingRow = style({
    display: 'flex',
    gap: '2px',
    color: vars.color.black,
    marginTop: '4px',
});

export const productName = style([
    textStyles.body2Semibold,
    {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
]);

export const panel = style({
    position: 'relative',
    padding: '20px',
    borderRadius: '8px',
    border: `1px solid ${vars.color.gray['20']}`,
    backgroundColor: vars.color.gray['10'],
});

export const content = style([
    textStyles.body2Regular,
    {
        whiteSpace: 'pre-wrap',
        marginBottom: '40px',
    },
]);

export const imageList = style({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '24px',
});

export const imageButton = style({
    width: '100px',
    height: '100px',
    borderRadius: '4px',
    overflow: 'hidden',
    border: 0,
    background: 'transparent',
    padding: 0,
    cursor: 'pointer',
});

export const attachImg = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
});

export const infoRow = style([
    textStyles.caption1Regular,
    {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '12px',
        color: vars.color.gray['70'],
        marginBottom: '12px',
        flexWrap: 'wrap',
    },
]);

export const badge = style([
    textStyles.caption1Semibold,
    {
        padding: '4px 6px',
        backgroundColor: vars.color.primary,
        color: vars.color.white,
        borderRadius: '4px',
        whiteSpace: 'nowrap',
    },
]);

export const date = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['70'],
        textAlign: 'right',
    },
]);

export const editRow = style({
    position: 'absolute',
    left: '20px',
    bottom: '20px',
    display: 'flex',
    gap: '8px',
});

export const textButton = style([
    textStyles.caption1Semibold,
    {
        border: `1px solid ${vars.color.gray['30']}`,
        backgroundColor: vars.color.white,
        borderRadius: '4px',
        padding: '6px 12px',
        color: vars.color.gray['70'],
        cursor: 'pointer',
    },
]);

export const backRow = style({
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',

    '@media': {
        [media.tablet]: {
            justifyContent: 'flex-start',
        },
    },
});

export const backButton = style({
    maxWidth: '320px',
    margin: '0 auto',
});
