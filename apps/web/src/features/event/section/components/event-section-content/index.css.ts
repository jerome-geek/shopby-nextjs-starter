import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const contentWrapper = style({
    width: '57%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    '@media': {
        [media.mobile]: {
            width: '100%',
        },
    },
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
            [media.tablet]: {
                fontSize: '2.8rem',
                lineHeight: '1.4',
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
            [media.tablet]: {
                fontSize: '1.6rem',
                lineHeight: '1.4',
                letterSpacing: '-2%',
            },
        },
    },
]);

export const productList = style({
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    gap: '24px',
    '@media': {
        [media.mobile]: {
            gap: '12px',
        },
    },
});

export const productItem = style({});
