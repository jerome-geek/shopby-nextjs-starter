import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

export const form = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',

    '@media': {
        [media.desktop]: {
            gap: '24px',
        },
    },
});

export const tabsRoot = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
});

export const tabsList = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
});

export const tabsTrigger = style([
    textStyles.body1Medium,
    {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '16px',
        color: vars.color.gray['60'],
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',

        selectors: {
            '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                height: '2px',
                backgroundColor: vars.color.gray['30'],
            },
            '&[data-state="active"]': {
                color: vars.color.black,
            },
        },

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.headingMedium,
                padding: '20px',
            },
        },
    },
]);

export const tabsIndicator = style({
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: '2px',
    backgroundColor: vars.color.black,
    zIndex: 1,
});

export const tabsContent = style({
    flexDirection: 'column',
    gap: '12px',
    display: 'none',

    selectors: {
        '&[data-state="active"]': {
            display: 'flex',
        },
    },
});

export const submitButton = style({
    marginTop: '24px',

    '@media': {
        [media.desktop]: {
            marginTop: '40px',
        },
    },
});
