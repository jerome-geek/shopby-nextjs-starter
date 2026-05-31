import { globalStyle, style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const wrapper = style({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',

    '@media': {
        [media.mobile]: {
            marginLeft: '-20px',
            width: 'calc(100% + 40px)',
        },
    },
});

export const title = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,

        '@media': {
            [media.mobile]: {
                padding: '0 20px',
            },
        },
    },
]);

globalStyle(`${wrapper} .swiper`, {
    width: '100%',

    '@media': {
        [media.mobile]: {
            padding: '0 20px',
        },
    },
});
