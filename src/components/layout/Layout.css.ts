import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { globalVars } from '@/styles/global.css';

export const layout = style({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%',
});

export const main = style({
    flex: 1,
    width: '100%',
    paddingTop: globalVars.header.height,

    '@media': {
        [media.mobile]: {
            paddingTop: globalVars.header.mobileHeight,
        },
    },
});
