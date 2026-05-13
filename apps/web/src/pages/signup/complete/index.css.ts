import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '60px',
    gap: '60px',

    '@media': {
        [media.desktop]: {
            gap: '60px',
        },
    },
});

export const bannerImage = style({
    aspectRatio: '384/220',
    width: '100%',
    maxWidth: '384px',
    height: 'auto',
});

export const description = style([
    textStyles.title2Semibold,
    {
        textAlign: 'center',
    },
]);
