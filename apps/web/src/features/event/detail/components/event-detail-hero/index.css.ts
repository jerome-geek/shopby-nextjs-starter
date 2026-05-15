import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

const PC = 'screen and (min-width: 768px)';

export const container = style({
    width: '100%',
    marginBottom: '48px',
});

export const topRow = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    '@media': {
        [PC]: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: '48px',
        },
    },
});

export const bannerWrapper = style({
    width: '100%',
    aspectRatio: '1 / 1',
    flexShrink: 0,
    '@media': {
        [PC]: {
            width: '40%',
            maxWidth: '486px',
        },
    },
});

export const bannerImage = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
});

export const textContent = style({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '0 20px',
    '@media': {
        [PC]: {
            padding: '32px 0 0',
        },
    },
});

export const title = style([
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

export const description = style([
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

export const thumbnailSection = style({
    marginTop: '32px',
    width: '100%',
});

export const thumbnailPc = style({
    display: 'none',
    maxWidth: '80%',
    margin: '0 auto',
    '@media': {
        [PC]: {
            display: 'block',
            borderRadius: '16px',
        },
    },
});

export const thumbnailMobile = style({
    display: 'block',
    maxWidth: '80%',
    margin: '0 auto',
    '@media': {
        [PC]: {
            display: 'none',
        },
    },
});
