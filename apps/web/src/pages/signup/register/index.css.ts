import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const form = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',

    '@media': {
        [media.mobile]: {
            gap: '16px',
        },
    },
});

export const memberConfigContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    marginTop: '16px',
    paddingTop: '44px',
    position: 'relative',

    selectors: {
        '&::after': {
            content: '',
            position: 'absolute',
            display: 'block',
            height: '8px',
            top: 0,
            left: 0,
            width: '100%',
            backgroundColor: vars.color.gray['30'],
        },
    },

    '@media': {
        [media.mobile]: {
            gap: '16px',
            marginTop: '16px',
            paddingTop: '36px',
            position: 'relative',

            selectors: {
                '&::after': {
                    content: '',
                    position: 'absolute',
                    display: 'block',
                    height: '8px',
                    top: 0,
                    left: 0,
                    marginLeft: '-20px',
                    width: 'calc(100% + 40px)',
                    backgroundColor: vars.color.gray['30'],
                },
            },
        },
    },
});

export const memberConfigTitle = style([
    textStyles.title2Semibold,
    {
        color: vars.color.black,
    },
]);
