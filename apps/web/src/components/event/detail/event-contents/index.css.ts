import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { media } from '@/styles/media';

const MOBILE_BREAKPOINT = 768;

export const topContainer = style({
    width: '100%',
});

globalStyle(`${topContainer} img`, {
    display: 'block',
    margin: '0 auto',
    maxWidth: '100%',
    objectFit: 'cover',
});

export const topInner = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    '@media': {
        [`screen and (min-width: ${MOBILE_BREAKPOINT}px)`]: {
            flexDirection: 'row',
            alignItems: 'start',
            gap: '48px',
        },
    },
});

export const imageWrapper = style({
    width: '40%',
    aspectRatio: '1 / 1',
    flexShrink: 0,
    maxWidth: '486px',

    '@media': {
        [media.mobile]: {
            width: '100%',
            maxWidth: '100%',
        },
    },
});

export const contentWrapper = style({
    display: 'block',

    '@media': {
        [media.mobile]: {
            display: 'none',
        },
    },
});

export const mobileContentWrapper = style({
    display: 'none',

    '@media': {
        [media.mobile]: {
            display: 'block',
        },
    },
});

export const topImage = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
});

export const topContent = style({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '0 20px',
    '@media': {
        [`screen and (min-width: ${MOBILE_BREAKPOINT}px)`]: {
            padding: '32px 0 0',
            gap: '16px',
        },
    },
});

export const topTitle = style({
    fontSize: '2.2rem',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    color: vars.color.black,
    '@media': {
        [`screen and (min-width: ${MOBILE_BREAKPOINT}px)`]: {
            fontSize: '3rem',
        },
    },
});

export const topDescription = style({
    fontSize: '1.4rem',
    color: vars.color.gray[80],
    lineHeight: '1.4',
    '@media': {
        [`screen and (min-width: ${MOBILE_BREAKPOINT}px)`]: {
            fontSize: '1.5rem',
        },
    },
});

export const htmlContent = style({
    width: '100%',
    display: 'none',
    aspectRatio: '1 / 1',
    '@media': {
        [`screen and (min-width: ${MOBILE_BREAKPOINT}px)`]: {
            display: 'block',
            borderRadius: '16px',
        },
    },
});
