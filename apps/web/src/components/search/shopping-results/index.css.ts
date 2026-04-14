import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',

    '@media': {
        [media.desktop]: {
            gap: '60px',
        },
    },
});

export const productList = style({
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '15px',

    '@media': {
        [media.desktop]: {
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: '24px',
        },
    },
});

export const noResult = style([
    textStyles.body2Semibold,
    {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '300px',
        color: vars.color.gray['60'],
        '@media': {
            [media.desktop]: {
                height: '300px',
                fontWeight: '400',
                fontSize: '1.5rem',
                lineHeight: '1.4',
                letterSpacing: '-0.2%',
            },
        },
    },
]);
