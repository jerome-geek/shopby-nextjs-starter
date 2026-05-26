import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const form = style({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '520px',
    gap: '30px',
    margin: '0 auto',

    '@media': {
        [media.mobile]: {
            gap: '30px',
            width: '100%',
            maxWidth: 'none',
        },
    },
});

export const giftInfoContainer = style({
    width: '100%',
});

export const titleContainer = style({
    width: '100%',
    margin: '20px 0 0',
    borderBottom: `2px solid ${vars.color.black}`,

    '@media': {
        [media.desktop]: {
            margin: 0,
        },
    },
});

export const title = style([
    textStyles.headingSemibold,
    {
        lineHeight: '18px',
        marginBottom: '10px',
        color: vars.color.black,

        '@media': {
            [media.desktop]: {
                fontSize: '20px',
                lineHeight: '24px',
                marginBottom: '20px',
            },
        },
    },
]);

export const productListPlaceholder = style({
    padding: '16px 0',
    color: vars.color.gray['60'],
});

export const shippingFormPlaceholder = style({
    padding: '16px 0',
    color: vars.color.gray['60'],
});

export const buttonContainer = style({
    display: 'flex',
    width: '100%',
});

export const submitButton = style({
    width: '100%',
});
