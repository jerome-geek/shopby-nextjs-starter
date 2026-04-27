import { style } from '@vanilla-extract/css';

import { globalVars } from '@/styles/global.css';
import { media } from '@/styles/media';

export const layout = style({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%',
});

export const scrollWrapper = style({
    height: '100dvh',
    width: '100%',
    overflowY: 'auto',
    overflowX: 'clip',
    WebkitOverflowScrolling: 'touch',
});

export const main = style({
    flex: 1,
    width: '100%',
    paddingTop: globalVars.header.height,

    '@media': {
        [media.tablet]: {
            paddingTop: globalVars.header.mobileHeight,
        },
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
        [media.tablet]: {
            paddingTop: globalVars.header.mobileHeight,
        },
        [media.mobile]: {
            paddingTop: globalVars.header.mobileShopMainHeight,
        },
    },
});

export const container = style({
    maxWidth: '1240px',
    margin: '0 auto',
    padding: '32px 20px 120px',
    width: '100%',

    '@media': {
        [media.tablet]: {
            padding: '24px 20px 80px',
        },
        [media.mobile]: {
            padding: '0 20px 60px',
        },
    },
});
