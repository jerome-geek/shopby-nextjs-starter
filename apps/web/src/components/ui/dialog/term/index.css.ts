import { globalStyle, style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

export const closeButton = style({
    position: 'absolute',
    top: '32px',
    right: '32px',
    zIndex: 10,

    '@media': {
        [media.desktop]: {
            top: '26px',
            right: '26px',
        },
    },
});

export const titleContainer = style({
    position: 'relative',
});

export const title = style([
    textStyles.headingSemibold,
    {
        '@media': {
            [media.desktop]: {
                ...textStyleTokens.title2Semibold,
            },
        },
    },
]);

export const contentContainer = style({
    height: '100%',
    maxHeight: '70vh',
    overflowY: 'scroll',

    '::-webkit-scrollbar': {
        width: '4px',
    },
    '::-webkit-scrollbar-thumb': {
        backgroundColor: vars.color.gray['30'],
        borderRadius: '10px',
    },
});

globalStyle(`${contentContainer} *`, {
    all: 'revert',
});
