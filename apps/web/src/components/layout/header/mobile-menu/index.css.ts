import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const mobileMenu = style({
    display: 'none',
    '@media': {
        [media.mobile]: {
            display: 'flex',
            padding: '4px 0 12px',
            width: '100vw',
            borderBottom: `1px solid ${vars.color.gray['20']}`,
        },
    },
});

export const mobileMenuItem = style([
    textStyles.headlineRegular,
    {
        width: 'fit-content',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6px 12px',
        backgroundColor: vars.color.green['20'],
        color: vars.color.gray['80'],
        borderRadius: '60px',

        selectors: {
            '&[data-selected="true"]': {
                fontWeight: 500,
                backgroundColor: vars.color.green['100'],
                color: vars.color.white,
            },
        },
    },
]);
