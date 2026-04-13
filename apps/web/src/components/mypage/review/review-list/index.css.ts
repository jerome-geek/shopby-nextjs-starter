import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const productCell = style({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    minWidth: 0,
    width: '100%',
});

export const image = style({
    width: '90px',
    height: '90px',
    minWidth: '90px',
    borderRadius: '4px',
    objectFit: 'cover',
    backgroundColor: vars.color.gray['20'],
    flexShrink: 0,

    '@media': {
        [media.mobile]: {
            width: '80px',
            height: '80px',
            minWidth: '80px',
        },
    },
});

export const productText = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    minWidth: 0,
});

export const productName = style([
    textStyles.body2Semibold,
    {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: vars.color.black,
        textAlign: 'left',
    },
]);

export const orderNo = style([
    textStyles.caption1Regular,
    {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: vars.color.gray['90'],
        textAlign: 'left',
    },
]);

export const detailButton = style([
    textStyles.body2Semibold,
    {
        whiteSpace: 'nowrap',
        height: '32px',
    },
]);

export const starRow = style({
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    color: vars.color.black,
});

export const mobileMeta = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '6px',
    marginTop: '4px',
    width: '100%',
});

export const mobileDate = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['70'],
    },
]);

export const mobileRate = style([
    textStyles.caption1Semibold,
    {
        color: vars.color.gray['90'],
    },
]);
