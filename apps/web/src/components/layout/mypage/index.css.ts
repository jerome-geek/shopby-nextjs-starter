import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { globalVars } from '@/styles/global.css';

export const layout = style({
    display: 'flex',
    width: '100%',
});

export const article = style({
    flex: 1,
    width: '100%',
    paddingTop: globalVars.header.height,

    '@media': {
        [media.desktop]: {
            padding: '24px 16px',
        },
    },
});
