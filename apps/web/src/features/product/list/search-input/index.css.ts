import { style } from '@vanilla-extract/css';

import { globalVars } from '@/styles/global.css';
import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const searchKeywordFormContainer = style({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexShrink: 0,
    width: '100%',
    padding: '0 20px',
    boxSizing: 'border-box',
    height: globalVars.header.mobileHeight,

    '@media': {
        [media.desktop]: {
            alignItems: 'stretch',
            gap: '12px',
            padding: '0',
            maxWidth: '588px',
            height: 'auto',
        },
        [media.tablet]: {
            padding: '22px 20px 8px',
            height: 'auto',
        },
    },
});

export const iconButton = style({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    color: vars.color.black,
});

export const searchForm = style({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '12px',
    padding: '0',
    backgroundColor: vars.color.white,

    '@media': {
        [media.desktop]: {
            padding: '0 0 12px 0',
            borderBottom: `3px solid ${vars.color.black}`,
        },
    },
});

export const searchFormRow = style({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    height: '40px',
    padding: '10px',
    borderRadius: '4px',
    background: vars.color.gray['20'],
    color: vars.color.black,

    '@media': {
        [media.desktop]: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            padding: '0',
            background: vars.color.white,
        },
    },
});

export const searchInput = style([
    textStyles.body1Regular,
    {
        flex: 1,
        height: '40px',
        color: vars.color.black,
        selectors: {
            '&::placeholder': {
                color: vars.color.gray['50'],
            },
        },
        '@media': {
            [media.desktop]: {
                padding: '0',
                fontSize: '3rem',
                fontWeight: 600,
                lineHeight: '1.32',
                letterSpacing: '-2%',
                background: vars.color.white,
            },
        },
    },
]);

export const searchIconGroup = style({
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '12px',
});

export const searchClearButton = style({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: vars.color.gray['50'],
});

export const searchSubmitButton = style({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    padding: 0,
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: vars.color.black,
    '@media': {
        [media.desktop]: {
            width: '36px',
            height: '36px',
        },
    },
});
