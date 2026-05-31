import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    padding: '20px 0',
    borderTop: `1px solid ${vars.color.gray[20]}`,
});

export const title = style([
    textStyles.headingBold,
    {
        marginBottom: '20px',
        fontSize: '1.6rem',
    },
]);

export const list = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
});

export const item = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
});

export const productContainer = style({
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
});

export const thumbWrapper = style({
    width: '100px',
    height: '100px',
    flexShrink: 0,
});

export const thumb = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '4px',
    backgroundColor: vars.color.gray[10],
});

export const content = style({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
});

export const name = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray[90],
        marginBottom: '4px',
        lineHeight: '1.4',
    },
]);

export const price = style([
    textStyles.headingBold,
    {
        color: vars.color.gray[90],
        fontSize: '1.7rem',
        marginBottom: '8px',
    },
]);

export const selectWrapper = style({
    width: '100%',
});

export const optionWrapper = style({
    width: '100%',

    selectors: {
        '&:empty': {
            display: 'none',
        },
    },
});
