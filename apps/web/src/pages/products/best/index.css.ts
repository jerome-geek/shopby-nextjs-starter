import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',

    '@media': {
        [media.desktop]: {
            gap: '32px',
            padding: '36px 0',
            maxWidth: '1200px',
            margin: '0 auto',
        },
    },
});

export const title = style([textStyles.display1Semibold]);

export const categorySwiperContainer = style({
    width: 'calc(100% + 40px)',
    margin: '0 -20px',
    padding: '4px 0 12px 20px',
    borderBottom: `1px solid ${vars.color.gray['20']}`,

    '@media': {
        [media.desktop]: {
            width: '100%',
            margin: '0',
            padding: '0 0 12px 0',
        },
    },
});

export const categoryLink = style([
    textStyles.body1Regular,
    {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'fit-content',
        height: '32px',
        padding: '0 12px',
        borderRadius: '60px',
        background: vars.color.green['20'],
        color: vars.color.gray['80'],

        selectors: {
            '&[data-selected="true"]': {
                background: vars.color.green['80'],
                color: vars.color.white,
                fontWeight: '500',
            },
        },
    },
]);

export const productGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    columnGap: '4px',
    rowGap: '24px',

    '@media': {
        [media.desktop]: {
            gridTemplateColumns: 'repeat(5, 1fr)',
            columnGap: '25px',
            rowGap: '48px',
        },
    },
});
