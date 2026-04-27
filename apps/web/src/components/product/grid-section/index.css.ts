import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const section = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',

    '@media': {
        [media.desktop]: {
            gap: '24px',
        },
    },
});

export const sectionHeader = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export const sectionTitle = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.title1Bold,
            },
        },
    },
]);

export const productGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',

    '@media': {
        [media.desktop]: {
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '20px',
        },
    },
});

export const swiperContainer = style({
    margin: '0 -20px',
    padding: '0 20px',
    width: 'calc(100% + 40px)',
    overflow: 'hidden',
});

export const swiperSlide = style({
    width: '160px',
    height: 'auto',
});

export const emptyState = style({
    padding: '40px 0',
    textAlign: 'center',
    color: vars.color.gray['40'],
    backgroundColor: vars.color.gray['10'],
    borderRadius: '16px',
});
