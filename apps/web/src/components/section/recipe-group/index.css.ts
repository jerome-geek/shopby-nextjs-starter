import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';

export const RecipeGroupSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '48px',
    width: '100%',

    '@media': {
        [media.desktop]: {
            flexDirection: 'row',
            gap: '80px',
        },
    },
});
