import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const form = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',

    '@media': {
        [media.desktop]: {
            gap: '24px',
        },
    },
});

export const stepGuideText = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['60'],
    },
]);

export const certificationFieldRow = style({
    position: 'relative',
});

export const timerText = style([
    textStyles.body2Medium,
    {
        position: 'absolute',
        top: '50%',
        right: '12px',
        transform: 'translateY(-50%)',
        color: vars.color.red,
    },
]);

export const submitButton = style({
    marginTop: '24px',

    '@media': {
        [media.desktop]: {
            marginTop: '40px',
        },
    },
});
