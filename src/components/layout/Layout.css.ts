import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';

export const layout = style({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%',

    '@media': {
        [media.desktop]: {
            maxWidth: '1200px',
            margin: '0 auto',
        },
    },
});

export const main = style({
    flex: 1,
    width: '100%',
});
