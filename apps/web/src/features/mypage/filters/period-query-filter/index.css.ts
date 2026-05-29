import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const row = style({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
});

export const label = style([
    textStyles.body2Semibold,
    {
        color: vars.color.gray['80'],
        whiteSpace: 'nowrap',
        '@media': {
            [media.tablet]: { fontSize: '1.4rem' },
            [media.desktop]: { fontSize: '1.4rem' },
        },
    },
]);

export const select = style({
    width: '100%',
    minWidth: 180,
});
