import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const swiperContainer = style({
    width: '100%',
});

export const depth3CategorySwiper = style({
    width: '100%',
    borderBottom: `1px solid ${vars.color.gray['20']}`,
});

export const depth4CategorySwiper = style({
    width: '100%',
    backgroundColor: vars.color.gray['10'],
    borderBottom: `1px solid ${vars.color.gray['20']}`,
});

export const depth3CategoryLink = style([
    textStyles.body1Regular,
    {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'auto',
        height: '44px',
        padding: '0 2px',
        color: vars.color.gray['60'],

        selectors: {
            '&[data-selected="true"]': {
                color: vars.color.black,
                fontWeight: '500',
                borderBottom: `2px solid ${vars.color.green['80']}`,
            },
        },
    },
]);

export const depth4CategoryLink = style([
    textStyles.body1Regular,
    {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'auto',
        height: '44px',
        padding: '0 2px',
        color: vars.color.gray['60'],

        selectors: {
            '&[data-selected="true"]': {
                color: vars.color.black,
                fontWeight: '500',
            },
        },
    },
]);
