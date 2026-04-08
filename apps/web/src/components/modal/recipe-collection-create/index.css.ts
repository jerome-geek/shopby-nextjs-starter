import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const modalForm = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '24px 0',
});

export const formItem = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
});

export const labelArea = style({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
});

export const label = style([
    textStyles.body2Semibold,
    {
        color: vars.color.black,
    },
]);

export const required = style({
    color: '#ff4d4d',
    marginLeft: '2px',
});

export const input = style([
    textStyles.body2Medium,
    {
        width: '100%',
        padding: '16px',
        borderRadius: '8px',
        border: `1px solid ${vars.color.gray['20']}`,
        backgroundColor: vars.color.white,
        transition: 'border-color 0.2s ease',
        '::placeholder': {
            color: vars.color.gray['30'],
        },
        ':focus': {
            outline: 'none',
            borderColor: vars.color.black,
        },
    },
]);

export const textarea = style([
    input,
    {
        height: '120px',
        resize: 'none',
    },
]);

export const tooltipTrigger = style({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: vars.color.gray['40'],
    cursor: 'help',
});

export const tooltipContent = style([
    textStyles.caption2Regular,
    {
        backgroundColor: vars.color.gray['80'],
        color: vars.color.white,
        padding: '8px 12px',
        borderRadius: '4px',
        maxWidth: '240px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: 1000,
    },
]);

export const submitButton = style([
    textStyles.body1Semibold,
    {
        width: '100%',
        padding: '18px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: vars.color.gray['10'],
        color: vars.color.gray['30'],
        cursor: 'not-allowed',
        transition: 'all 0.3s ease',
        selectors: {
            '&[data-active="true"]': {
                backgroundColor: '#f1b3bc',
                color: vars.color.white,
                cursor: 'pointer',
            },
        },
    },
]);
