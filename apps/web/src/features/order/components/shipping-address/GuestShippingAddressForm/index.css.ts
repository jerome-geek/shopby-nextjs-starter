import { globalStyle, style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const formContent = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
});

export const phoneInputGroup = style({
    display: 'flex',
    gap: '8px',
    width: '100%',
});

globalStyle(`${phoneInputGroup} > *`, {
    flex: 1,
    minWidth: 0,
});

export const fieldRow = style({
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-end',
});

export const ordererInfoRow = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

export const postcodeButton = style([
    textStyles.body2Semibold,
    {
        height: '44px',
        padding: '0 20px',
        borderRadius: '6px',
        border: `1px solid ${vars.color.gray['30']}`,
        backgroundColor: vars.color.white,
        cursor: 'pointer',
        flexShrink: 0,
        ':hover': {
            backgroundColor: vars.color.gray['10'],
        },

        '@media': {
            [media.desktop]: {
                height: '52px',
            },
        },
    },
]);
