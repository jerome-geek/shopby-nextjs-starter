import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';

export const section = style({
    backgroundColor: vars.color.white,
    border: `1px solid ${vars.color.gray['30']}`,
    borderRadius: '4px',
    padding: '20px',
});

export const title = style([
    textStyles.body1Bold,
    {
        marginBottom: '12px',
        color: vars.color.black,
    },
]);

export const list = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
});

export const item = style({
    padding: '8px',
    borderRadius: '4px',
    backgroundColor: vars.color.gray['10'],
    border: `1px solid ${vars.color.gray['30']}`,
});

export const link = style([
    textStyles.body2Regular,
    {
        display: 'block',
        color: vars.color.black,
        textDecoration: 'none',
    },
]);

export const content = style({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
});

export const thumbnailContainer = style({
    width: '54px',
    height: '54px',
    minWidth: '54px',
    aspectRatio: '1/1',
    borderRadius: '4px',
    position: 'relative',
    overflow: 'hidden',
    flexShrink: 0,

    '@media': {
        [media.mobile]: {
            width: '44px',
            height: '44px',
            minWidth: '44px',
        },
    },
});

export const text = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    minWidth: 0,
});

export const productName = style([
    textStyles.body2Regular,
    {
        color: vars.color.black,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
]);

export const orderMeta = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['70'],
    },
]);

export const empty = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['70'],
    },
]);

export const noResultText = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['70'],
    },
]);
