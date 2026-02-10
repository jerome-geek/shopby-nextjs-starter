import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const pagingContainer = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: '0',
    selectors: {
        '& svg': {
            width: '13px',
            height: '13px',
        },
    },
    '@media': {
        'screen and (min-width: 640px)': {
            gap: '20px',
            selectors: {
                '& svg': {
                    width: 'auto',
                    height: 'auto',
                },
            },
        },
    },
});

export const buttonGroup = style({
    display: 'flex',
    gap: '4px',
    '@media': {
        'screen and (min-width: 640px)': {
            gap: '8px',
        },
    },
});

export const pageListContainer = style({
    display: 'flex',
    alignItems: 'center',
    '@media': {
        'screen and (min-width: 640px)': {
            gap: '4px',
        },
    },
});

export const pageButton = style({
    fontSize: '1.6rem',
    fontWeight: '500',
    borderRadius: '50%',
    color: vars.color.gray[50],
    background: 'none',
    minWidth: '32px',
    height: 'auto',
    padding: '0 2px',
    aspectRatio: '1/1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: 'none',
    ':hover': {
        color: vars.color.black,
    },
    selectors: {
        '&[aria-selected="true"]': {
            color: vars.color.black,
            backgroundColor: vars.color.gray[20],
        },
    },
    '@media': {
        'screen and (min-width: 640px)': {
            fontSize: '1.8rem',
            width: '40px',
            height: '40px',
            padding: '0',
        },
    },
});

export const arrowButton = style({
    padding: '0',
    margin: '0',
    lineHeight: '0',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    '@media': {
        'screen and (min-width: 640px)': {
            width: '40px',
            height: '40px',
        },
    },
});

export const buttonContents = style({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ':hover': {
        selectors: {
            '& svg path': {
                stroke: vars.color.black,
            },
        },
    },
});

export const doubleCaretContainer = style({
    display: 'flex',
    alignItems: 'center',
});

export const doubleCaretSecond = style({
    marginLeft: '-8px',
});
