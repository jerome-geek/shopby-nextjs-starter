import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const sidebar = style({
    width: '212px',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
});

export const depth2Title = style([
    textStyles.display1Semibold,
    {
        color: vars.color.black,
    },
]);

export const depth3CategoryList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '28px 0',
    borderTop: `2px solid ${vars.color.green['80']}`,
    borderBottom: `2px solid ${vars.color.green['80']}`,
});

export const depth3CategoryListItem = style([
    textStyles.headingMedium,
    {
        color: vars.color.gray['60'],
        selectors: {
            '&[data-selected="true"]': {
                color: vars.color.black,
                fontWeight: '600',
            },
        },
    },
]);
