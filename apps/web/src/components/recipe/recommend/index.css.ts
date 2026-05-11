import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',

    '@media': {
        [media.desktop]: { gap: '24px' },
    },
});

export const sectionTitle = style([
    textStyles.title1Semibold,
    {
        color: vars.color.black,

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.display1Semibold,
            },
        },
    },
]);

export const recommendedGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '36px 15px',

    listStyle: 'none',
    padding: 0,
    margin: 0,

    '@media': {
        [media.desktop]: {
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
        },
    },
});
