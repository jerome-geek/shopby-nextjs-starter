import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';

export const wrapper = style({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    textDecoration: 'none',
    color: 'inherit',
    flexDirection: 'column',
    gap: '20px',

    '@media': {
        [media.mobile]: {
            flexDirection: 'row',
            gap: '12px',
        },
    },
});

export const thumbnail = style({
    aspectRatio: '1 / 1',
    overflow: 'hidden',
    flexShrink: 0,
    position: 'relative',
    backgroundColor: vars.color.gray[20],
    width: '100%',
    borderRadius: '16px',

    '@media': {
        [media.mobile]: {
            maxWidth: '120px',
            minWidth: '120px',
            borderRadius: '4px',
        },
    },
});

export const image = style({
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    objectFit: 'cover',
});

export const infoBox = style({
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '0',
    gap: '16px',

    '@media': {
        [media.mobile]: {
            padding: '4px 0',
            gap: '0',
        },
    },
});

export const info = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
});

export const label = style({
    fontWeight: '600',
    color: vars.color.gray[90],
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    fontSize: '22px',
    letterSpacing: '-0.02em',
    lineHeight: '1.32',

    '@media': {
        [media.mobile]: {
            fontSize: '15px',
            letterSpacing: '-0.013em',
            lineHeight: '1.3',
        },
    },
});

export const promotionText = style({
    fontWeight: '400',
    color: vars.color.gray[80],
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    fontSize: '15px',
    letterSpacing: '-0.002em',
    lineHeight: '1.4',

    '@media': {
        [media.mobile]: {
            fontSize: '13px',
            letterSpacing: '-0.013em',
            lineHeight: '1.3',
        },
    },
});

export const date = style({
    fontWeight: '400',
    color: vars.color.gray[60],
    fontSize: '13px',
    letterSpacing: '-0.013em',
    lineHeight: '1.3',

    '@media': {
        [media.mobile]: {
            fontSize: '12px',
            letterSpacing: '-0.02em',
            lineHeight: '1.4',
        },
    },
});
