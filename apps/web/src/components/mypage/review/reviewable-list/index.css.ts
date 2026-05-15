import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const productCell = style({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    minWidth: 0,
});

export const image = style({
    width: '90px',
    height: '90px',
    borderRadius: '4px',
    objectFit: 'cover',
    backgroundColor: vars.color.gray['20'],
    flexShrink: 0,

    '@media': {
        [media.mobile]: {
            width: '80px',
            height: '80px',
        },
    },
});

export const productText = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    minWidth: 0,
});

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

export const status = style([
    textStyles.body1Bold,
    {
        color: vars.color.gray['80'],

        '@media': {
            [media.mobile]: {
                fontSize: '1.2rem',
            },
        },
    },
]);

export const primaryStatus = style([
    status,
    {
        color: vars.color.primary,
    },
]);

export const actionRow = style({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',

    '@media': {
        [media.tablet]: {
            justifyContent: 'center',
        },
        [media.desktop]: {
            justifyContent: 'center',
        },
    },
});

export const writeButton = style({
    whiteSpace: 'nowrap',
    height: '32px',
    fontSize: '1.2rem',
});
