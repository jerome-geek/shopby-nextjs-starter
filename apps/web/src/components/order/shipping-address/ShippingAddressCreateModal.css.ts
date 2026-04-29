import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const formContent = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
});

export const checkboxGroup = style({
    display: 'flex',
    gap: '20px',
    marginBottom: '8px',
});

export const fieldRow = style({
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-end',
});

export const postcodeButton = style([
    textStyles.body2Semibold,
    {
        height: '48px',
        padding: '0 20px',
        borderRadius: '6px',
        border: `1px solid ${vars.color.gray['30']}`,
        backgroundColor: vars.color.white,
        cursor: 'pointer',
        flexShrink: 0,
        ':hover': {
            backgroundColor: vars.color.gray['10'],
        },
    },
]);

export const phoneInputGroup = style({
    display: 'flex',
    gap: '8px',
    width: '100%',
});

export const footer = style({
    padding: '24px',
    display: 'flex',
    gap: '12px',
    borderTop: `1px solid ${vars.color.gray['10']}`,
});
