import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const moreButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: vars.color.gray['40'],
    borderRadius: '50%',
    transition: 'background-color 0.2s ease',

    ':hover': {
        backgroundColor: vars.color.gray['10'],
        color: vars.color.black,
    },
});

export const dropdownContent = style({
    minWidth: '160px',
    backgroundColor: vars.color.white,
    borderRadius: '8px',
    padding: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
    border: `1px solid ${vars.color.gray['20']}`,
    zIndex: 1000,
});

export const dropdownItem = style({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    fontSize: '14px',
    fontWeight: '500',
    color: vars.color.gray['80'],
    cursor: 'pointer',
    borderRadius: '6px',
    outline: 'none',
    transition: 'all 0.2s ease',

    selectors: {
        '&[data-highlighted]': {
            backgroundColor: vars.color.gray['10'],
            color: vars.color.black,
        },
        '&[data-variant="danger"]': {
            color: vars.color.pink['80'],
        },
        '&[data-variant="danger"][data-highlighted]': {
            backgroundColor: vars.color.pink['20'],
            color: vars.color.pink['100'],
        },
    },
});
