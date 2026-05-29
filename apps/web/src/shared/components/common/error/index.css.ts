import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    width: '100%',
    maxWidth: '640px',
    margin: '0 auto',
    padding: '100px 20px',
    textAlign: 'center',
});

export const description = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['70'],
        whiteSpace: 'pre-line',
    },
]);

export const guestDescription = style([
    textStyles.headingMedium,
    {
        color: vars.color.gray['90'],
        textAlign: 'center',
    },
]);

export const guestPasswordForm = style({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
});

export const title = style([
    textStyles.title1Semibold,
    {
        color: vars.color.gray['90'],
    },
]);

export const errorCode = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
    },
]);
