import { keyframes, style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const formContent = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '8px 0',
});

export const fieldRow = style({
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
});

export const postcodeButton = style([
    textStyles.body2Semibold,
    {
        height: '44px',
        padding: '0 16px',
        borderRadius: '4px',
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

export const phoneInputGroup = style({
    display: 'flex',
    gap: '8px',
    width: '100%',
    alignItems: 'center',
});

export const separator = style({
    color: vars.color.gray['70'],
    fontSize: '14px',
});

const expandDown = keyframes({
    from: {
        maxHeight: 0,
        opacity: 0,
        transform: 'translateY(-10px)',
    },
    to: {
        maxHeight: '500px',
        opacity: 1,
        transform: 'translateY(0)',
    },
});

export const relativeMenu = style({
    position: 'relative',
    boxShadow: 'none',
    marginTop: '8px',
    overflow: 'hidden',
    animation: `${expandDown} 0.3s ease-out forwards`,
});
