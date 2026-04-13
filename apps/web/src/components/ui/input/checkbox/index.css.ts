import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { globalVars } from '@/styles/global.css';
import { vars } from '@/styles/theme.css';

export const checkboxRoot = recipe({
    base: {
        width: globalVars.input.checkboxSize,
        height: globalVars.input.checkboxSize,
        backgroundColor: vars.color.gray['20'],
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0',
        position: 'relative',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '1px',
        transition: 'background-color 0.2s',

        selectors: {
            '&[data-state="checked"]': {
                backgroundColor: vars.color.secondary,
            },
        },
    },
    variants: {
        disabled: {
            true: {
                cursor: 'not-allowed',
                opacity: 0.5,
            },
        },
    },
});

export const checkboxIndicator = style({
    display: 'contents',
});

export const checkIcon = style({
    width: '14px',
    height: '14px',
    color: vars.color.gray['50'],
    transition: 'color 0.2s',

    selectors: {
        [`${checkboxRoot.classNames.base}[data-state="checked"] &`]: {
            color: vars.color.white,
        },
    },
});
