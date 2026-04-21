import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    padding: '24px 0 0',
});

export const titleGroup = style({
    textAlign: 'center',
    marginBottom: '32px',
    padding: '0 20px',
});

export const titleLine = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
        display: 'block',
        lineHeight: '1.5',
    },
]);

export const swiperContainer = style({
    width: 'calc(100% + 20px)',
    marginLeft: '20px',
    paddingRight: '40px',
});

export const swiperSlide = style({
    width: 'auto',
});

export const recipeCardItem = style({
    flexShrink: 0,
    width: '144px',
});

export const footerButtonGroup = style({
    display: 'flex',
    gap: '6px',
    width: '100%',
    padding: '0 20px 40px',
});

export const closeButton = style([
    textStyles.headlineSemibold,
    {
        flex: 1,
        height: '53px',
        backgroundColor: vars.color.white,
        border: `1px solid ${vars.color.gray['50']}`,
        borderRadius: '4px',
        color: vars.color.black,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
]);

export const moreButton = style([
    textStyles.headlineSemibold,
    {
        flex: 1,
        height: '53px',
        backgroundColor: vars.color.green['100'],
        borderRadius: '4px',
        color: vars.color.white,
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
]);
