import { style } from '@vanilla-extract/css';
import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

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
