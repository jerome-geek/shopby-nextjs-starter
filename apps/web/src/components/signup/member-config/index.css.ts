import { style } from '@vanilla-extract/css';

import { textStyles } from '@/styles/typography.css';

export const checkboxList = style({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    listStyle: 'none',
});

export const checkboxListItem = style({
    display: 'flex',
    alignItems: 'center',
});

export const checkboxLabel = style([
    textStyles.body1Medium,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
]);
