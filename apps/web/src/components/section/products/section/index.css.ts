import { globalStyle, style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const section = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    position: 'relative',
    '@media': {
        [media.mobile]: {
            gap: '20px',
        },
    },
});

export const swiperArea = style({
    position: 'relative',
    width: '100%',
    '@media': {
        [media.mobile]: {
            marginLeft: '-20px',
            width: 'calc(100% + 40px)',
        },
    },
});

globalStyle(`${swiperArea} .swiper`, {
    '@media': {
        [media.mobile]: {
            padding: '0 20px',
        },
    },
});

export const titleContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
});

export const title = style([
    textStyles.title1Bold,
    {
        '@media': {
            [media.mobile]: {
                fontSize: '1.8rem',
                fontWeight: 600,
                lineHeight: '1.5',
                letterSpacing: '-1.3%',
            },
        },
    },
]);

export const description = style([
    textStyles.headlineRegular,
    {
        '@media': {
            [media.mobile]: {
                fontSize: '1.2rem',
                lineHeight: '1.4',
                letterSpacing: '-2%',
            },
        },
    },
]);

const navButton = style({
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 32,
    height: 48,
    padding: 0,
    border: 'none',
    backgroundColor: 'transparent',
    color: vars.color.gray['60'],
    cursor: 'pointer',
    zIndex: 2,

    selectors: {
        '&:active': {
            transform: 'translateY(-50%) scale(0.96)',
        },
        '&:disabled': {
            opacity: 0.25,
            cursor: 'not-allowed',
        },
    },

    '@media': {
        [media.tablet]: {
            display: 'flex',
        },
        [media.desktop]: {
            display: 'flex',
        },
    },
});

export const navPrev = style([
    navButton,
    {
        left: -16,
        background: 'rgba(0, 0, 0, 0.5)',
        color: vars.color.white,
        ['@media']: {
            ['(min-width: 1280px)']: {
                left: -60,
                color: vars.color.gray['60'],
                background: 'transparent',

                selectors: {
                    '&:hover': {
                        color: vars.color.gray['80'],
                    },
                },
            },
        },
    },
]);

export const navNext = style([
    navButton,
    {
        right: -16,
        background: 'rgba(0, 0, 0, 0.5)',
        color: vars.color.white,
        ['@media']: {
            ['(min-width: 1280px)']: {
                right: -60,
                color: vars.color.gray['60'],
                background: 'transparent',

                selectors: {
                    '&:hover': {
                        color: vars.color.gray['80'],
                    },
                },
            },
        },
    },
]);
