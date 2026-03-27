import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',

    '@media': {
        [media.mobile]: {
            paddingBottom: 'calc(72px + env(safe-area-inset-bottom, 0px))',
        },
    },
});

export const title = style([
    textStyles.display1Semibold,
    {
        color: vars.color.black,
    },
]);

export const contentWrapper = style({
    display: 'flex',
    flexDirection: 'row',
    gap: '48px',
    maxWidth: '1200px',
    alignItems: 'flex-start',

    '@media': {
        [media.mobile]: {
            flexDirection: 'column',
            gap: '0',
        },
    },
});

export const articleContent = style({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',

    '@media': {
        [media.mobile]: {
            border: 'none',
            borderRadius: '0',
            padding: '20px',
            width: '100%',
        },
    },
});

export const contentDivider = style({
    width: '100%',
    height: '1px',
    backgroundColor: vars.color.gray['20'],
    margin: 0,
    border: 'none',
});
