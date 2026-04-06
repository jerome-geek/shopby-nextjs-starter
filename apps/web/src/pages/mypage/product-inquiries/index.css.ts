import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';

export const accordionContainer = style({
    display: 'flex',
    flexDirection: 'column',
});

export const desktopAccordionItem = style({
    padding: 0,
    selectors: {
        '&:hover': {
            backgroundColor: vars.color.gray['10'],
        },
    },
});
