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

export const shopMain = style({
    flex: 1,
    width: '100%',
    paddingTop: globalVars.header.height,

    '@media': {
        [media.mobile]: {
            paddingTop: globalVars.header.mobileShopMainHeight,
        },
    },
});

export const container = style({
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px 20px 40px',
    width: '100%',

    '@media': {
        [media.mobile]: {
            padding: '0 20px 40px',
        },
    },
});
