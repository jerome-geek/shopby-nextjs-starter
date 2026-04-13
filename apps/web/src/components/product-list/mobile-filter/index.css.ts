import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const filterSwiper = style({
    width: '100%',
    height: '53px',
    padding: '12px 0',
    borderBottom: `1px solid ${vars.color.gray['20']}`,
});

export const refreshButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: vars.color.gray['20'],
});

export const filterPill = recipe({
    base: [
        textStyles.body1Medium,
        {
            display: 'flex',
            alignItems: 'center',
            width: 'fit-content',
            height: '29px',
            padding: '0 4px 0 12px',
            borderRadius: '60px',
            color: vars.color.gray['80'],
            background: vars.color.gray['20'],
            border: 'none',
            cursor: 'pointer',
        },
    ],
    variants: {
        isActive: {
            true: {
                color: vars.color.white,
                background: vars.color.gray['90'],
            },
            false: {},
        },
    },
    defaultVariants: {
        isActive: false,
    },
});

export const filterPillMain = style({
    display: 'flex',
    alignItems: 'center',
    minWidth: 0,
    flex: 1,
    padding: '0 0 0 2px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    textAlign: 'left',
    color: 'inherit',
    font: 'inherit',
});

export const filterPillLabel = style({
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
});

export const filterPillTrailing = style({
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '100%',
});

export const filterPillClear = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: 0,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    color: 'inherit',
});
