import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const imageWrapper = style({
    position: 'relative',
    width: '43%',
    maxWidth: '486px',
    aspectRatio: '1 / 1',
    borderRadius: '8px',
    overflow: 'hidden',
    '@media': {
        [media.mobile]: {
            width: '100%',
            maxWidth: 'none',
        },
    },
});

export const image = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const fadeWrapper = style({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '24px 16px 36px',
    background:
        'linear-gradient(179.7deg, rgba(91, 100, 91, 0) 0.26%, #191C19 99.74%)',
});

export const textWrapper = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
});

export const title = style([
    textStyles.display1Semibold,
    {
        '@media': {
            [media.mobile]: {
                fontSize: '2.2rem',
                fontWeight: 700,
                lineHeight: '1.32',
                letterSpacing: '-2%',
                color: vars.color.white,
            },
        },
    },
]);

export const description = style([
    textStyles.headingMedium,
    {
        '@media': {
            [media.mobile]: {
                fontSize: '1.3rem',
                fontWeight: 400,
                lineHeight: '1.3',
                letterSpacing: '-1.3%',
                color: vars.color.white,
            },
        },
    },
]);
