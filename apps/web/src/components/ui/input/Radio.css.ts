import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const radioGroupRoot = style({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: '24px',

    selectors: {
        '&[data-disabled]': {
            opacity: 0.5,
            pointerEvents: 'none',
            cursor: 'not-allowed',
        },
    },
});

export const radioItemContainer = style({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
});

export const radioItem = style({
    width: 'var(--radio-size, 20px)',
    height: 'var(--radio-size, 20px)',
    borderRadius: '50%',
    border: `1px solid ${vars.color.gray[50]}`,
    backgroundColor: vars.color.white,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0',
    cursor: 'pointer',
});

export const radioIndicator = style({
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: vars.color.black,
    position: 'relative',
    '::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '7px',
        height: '7px',
        borderRadius: '50%',
        backgroundColor: vars.color.white,
    },
});

export const radioLabel = style({
    fontSize: '1.4rem',
    fontWeight: '400',
    lineHeight: '1.5',
    color: vars.color.gray[80],
    cursor: 'pointer',
});
