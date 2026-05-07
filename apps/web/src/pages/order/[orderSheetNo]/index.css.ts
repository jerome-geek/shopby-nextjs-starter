import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    paddingBottom: 'calc(72px + env(safe-area-inset-bottom, 0px))',

    '@media': {
        [media.desktop]: {
            paddingBottom: 0,
        },
    },
});

export const title = style([
    textStyles.display1Semibold,
    {
        display: 'none',
        color: vars.color.black,

        '@media': {
            [media.desktop]: {
                display: 'block',
            },
        },
    },
]);

export const contentWrapper = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    width: '100%',

    '@media': {
        [media.desktop]: {
            flexDirection: 'row',
            gap: '48px',
            maxWidth: '1200px',
            alignItems: 'flex-start',
        },
    },
});

export const articleContent = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '36px',
    width: '100%',
    border: 'none',
    borderRadius: '0',

    '@media': {
        [media.desktop]: {
            flex: 1,
            gap: '32px',
        },
    },
});

export const contentDivider = style({
    width: '100vw',
    marginLeft: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: vars.color.gray['20'],
    border: 'none',
    height: '6px',

    '@media': {
        [media.desktop]: {
            width: '100%',
            height: '1px',
            marginLeft: 0,
            transform: 'none',
        },
    },
});
