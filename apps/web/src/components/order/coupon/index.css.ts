import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
});

export const title = style([
    textStyles.headingBold,
    {
        color: vars.color.black,
    },
]);

export const selectBox = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '56px',
    padding: '0 16px',
    border: `1px solid ${vars.color.gray['20']}`,
    borderRadius: '8px',
    backgroundColor: vars.color.white,
    transition: 'border-color 0.2s',
    selectors: {
        '&:hover': {
            borderColor: vars.color.green['80'],
        },
    },
});

export const selectedLabel = style({
    fontSize: '16px',
    color: vars.color.black,
});

export const countWrapper = style({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '14px',
    color: vars.color.gray['50'],
});
