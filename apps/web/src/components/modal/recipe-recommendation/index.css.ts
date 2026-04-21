import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const container = style({
    padding: '40px 0 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

export const titleGroup = style({
    textAlign: 'center',
    marginBottom: '32px',
});

export const titleLine = style([
    textStyles.title2Semibold,
    {
        color: vars.color.black,
        display: 'block',
        lineHeight: '1.4',
    },
]);

export const modalContent = style({
    maxHeight: '93vh',
});

export const recipeArea = style({
    width: '100%',
    padding: '0 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

export const recipeList = style({
    display: 'flex',
    gap: '24px',
    justifyContent: 'center',
    listStyle: 'none',
    padding: 0,
    marginBottom: '24px',
});

export const recipeCardItem = style({
    flex: 1,
});

export const footerButtonGroup = style({
    display: 'flex',
    gap: '8px',
    width: '100%',
    padding: '0 24px 40px',
    marginTop: '48px',
});

export const closeButton = style([
    textStyles.headingSemibold,
    {
        flex: 1,
        height: '60px',
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
    textStyles.headingSemibold,
    {
        flex: 1,
        height: '60px',
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
