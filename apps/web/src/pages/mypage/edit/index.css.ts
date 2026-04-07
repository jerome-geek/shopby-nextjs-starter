import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const form = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
});

export const guideText = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['70'],
        '@media': {
            [media.tablet]: { fontSize: '1.4rem' },
            [media.desktop]: { fontSize: '1.4rem' },
        },
    },
]);

export const actions = style({
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '8px',

    '@media': {
        [media.mobile]: {
            flexDirection: 'column',
            alignItems: 'stretch',
        },
    },
});

export const inlineRow = style({
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
});

