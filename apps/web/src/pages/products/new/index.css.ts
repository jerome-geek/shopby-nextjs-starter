import { style } from '@vanilla-extract/css';
import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

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

export const border = style({
    width: '100vw',
    borderBottom: `1px solid ${vars.color.gray['20']}`,
    marginLeft: 'calc(50% - 50vw)',
    marginRight: 'calc(50% - 50vw)',
});

export const categorySwiperContainer = style({
    width: 'calc(100% + 40px)',
    marginLeft: '-20px',
    padding: '4px 0 12px 0',

    '@media': {
        [media.desktop]: {
            width: '100%',
            margin: '0',
            padding: '0 0 12px 0',
        },
    },
});

export const categorySwiper = style({
    padding: '0 20px',

    '@media': {
        [media.desktop]: {
            padding: '0',
            maxWidth: '1200px',
            margin: '0 auto',
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
        cursor: 'pointer',
        border: 'none',
        outline: 'none',

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
        [media.tablet]: {
            gridTemplateColumns: 'repeat(4, 1fr)',
            columnGap: '18px',
            rowGap: '36px',
        },
        [media.desktop]: {
            gridTemplateColumns: 'repeat(5, 1fr)',
            columnGap: '25px',
            rowGap: '48px',
        },
    },
});
