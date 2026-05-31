import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const form = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
});

export const guideText = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['60'],
    },
]);

export const warningText = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['60'],
    },
]);

export const textAreaContainer = style({
    position: 'relative',
});

export const characterCount = style([
    textStyles.caption1Regular,
    {
        position: 'absolute',
        bottom: '8px',
        right: '12px',
        color: vars.color.gray['60'],
    },
]);
