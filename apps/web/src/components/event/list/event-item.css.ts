import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';

export const wrapper = style({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    gap: '12px',
    textDecoration: 'none',
    color: 'inherit',
    '@media': {
        'screen and (min-width: 769px)': {
            flexDirection: 'column',
            gap: '20px',
        },
    },
});

export const thumbnail = style({
    minWidth: '120px',
    aspectRatio: '1 / 1',
    borderRadius: '4px',
    overflow: 'hidden',
    flexShrink: 0,
    position: 'relative',
    backgroundColor: vars.color.gray[20],
    '@media': {
        'screen and (min-width: 769px)': {
            width: '100%',
            minWidth: 'unset',
            borderRadius: '16px',
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
    padding: '4px 0',
    '@media': {
        'screen and (min-width: 769px)': {
            padding: '0',
            gap: '16px',
        },
    },
});

export const info = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
});

export const label = style({
    fontSize: '15px',
    fontWeight: '600',
    letterSpacing: '-0.013em',
    lineHeight: '1.3',
    color: vars.color.gray[90],
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    '@media': {
        'screen and (min-width: 769px)': {
            fontSize: '22px',
            letterSpacing: '-0.02em',
            lineHeight: '1.32',
        },
    },
});

export const promotionText = style({
    fontSize: '13px',
    fontWeight: '400',
    letterSpacing: '-0.013em',
    lineHeight: '1.3',
    color: vars.color.gray[80],
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    '@media': {
        'screen and (min-width: 769px)': {
            fontSize: '15px',
            letterSpacing: '-0.002em',
            lineHeight: '1.4',
        },
    },
});

export const date = style({
    fontSize: '12px',
    fontWeight: '400',
    letterSpacing: '-0.02em',
    lineHeight: '1.4',
    color: vars.color.gray[60],
    '@media': {
        'screen and (min-width: 769px)': {
            fontSize: '13px',
            letterSpacing: '-0.013em',
            lineHeight: '1.3',
        },
    },
});
