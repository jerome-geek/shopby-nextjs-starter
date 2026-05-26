import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%',
});

export const title = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
    },
]);

export const fieldRow = style({
    display: 'flex',
    gap: '8px',
    width: '100%',
});

export const postcodeButton = style([
    textStyles.body2Medium,
    {
        flexShrink: 0,
        padding: '0 16px',
        height: '44px',
        border: `1px solid ${vars.color.gray['40']}`,
        borderRadius: '4px',
        backgroundColor: vars.color.white,
        color: vars.color.black,
        cursor: 'pointer',

        '@media': {
            [media.desktop]: {
                height: '52px',
            },
        },
    },
]);

export const phoneInputGroup = style({
    display: 'flex',
    gap: '8px',
    width: '100%',
});
