import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const optionList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
});

export const optionListItem = style({
    background: vars.color.ivory['10'],
    width: '100%',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    position: 'relative',
});

export const optionHeader = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
});

export const optionLabel = style([
    textStyles.body1Semibold,
    {
        color: vars.color.black,
        wordBreak: 'break-all',
    },
]);

export const deleteButton = style({
    cursor: 'pointer',
    color: vars.color.black['40'],
    ':hover': {
        color: vars.color.black['100'],
    },
});

export const optionFooter = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export const quantitySelector = style({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: vars.color.white,
    border: `1px solid ${vars.color.gray['20']}`,
    borderRadius: '4px',
    padding: '8px',
    overflow: 'hidden',
});

export const countButton = style({
    width: '20px',
    height: '20px',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: vars.color.gray['60'],

    ':disabled': {
        color: vars.color.gray['50'],
        cursor: 'not-allowed',
    },
});

export const countValue = style([
    textStyles.body2Regular,
    {
        flex: 1,
        textAlign: 'center',
        color: vars.color.gray['80'],
    },
]);

export const priceValue = style([
    textStyles.headlineBold,
    {
        color: vars.color.black,
    },
]);
