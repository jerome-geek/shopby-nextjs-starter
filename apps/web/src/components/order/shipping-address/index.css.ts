import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
});

export const titleContainer = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export const title = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
    },
]);

export const selectAddressButton = style([
    textStyles.body1Semibold,
    {
        color: vars.color.gray['60'],
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    },
]);
