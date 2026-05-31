import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
});

export const subContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
});

export const title = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
    },
]);

export const inputWrapper = style({
    display: 'flex',
    gap: '8px',
});

export const input = style({
    flex: 1,
    height: '48px',
    padding: '0 16px',
    border: `1px solid ${vars.color.gray['20']}`,
    borderRadius: '4px',
    fontSize: '16px',
    outline: 'none',
    selectors: {
        '&:focus': {
            borderColor: vars.color.green['80'],
        },
    },
});

export const allUseButton = style({
    width: '100px',
    height: '48px',
    backgroundColor: vars.color.gray['90'],
    color: vars.color.white,
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.2s',
    selectors: {
        '&:hover': {
            backgroundColor: vars.color.gray['80'],
        },
    },
});

export const helperText = style([
    textStyles.body2Semibold,
    {
        color: vars.color.gray['60'],
    },
]);
