import { globalStyle, style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

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

    selectors: {
        '&:empty': {
            display: 'none',
        },
    },

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

export const topTitle = style([
    textStyles.display1Semibold,
    {
        color: vars.color.black,
        '@media': {
            [media.mobile]: {
                fontSize: '2.2rem',
                lineHeight: '1.32',
                letterSpacing: '-2%',
            },
        },
    },
]);

export const topDescription = style([
    textStyles.headingMedium,
    {
        color: vars.color.gray[80],
        '@media': {
            [media.mobile]: {
                fontSize: '1.4rem',
                fontWeight: 400,
                lineHeight: '1.4',
                letterSpacing: '-2%',
            },
        },
    },
]);

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
