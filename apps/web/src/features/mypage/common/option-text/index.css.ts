import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
});

export const accordionContainer = style({
    width: 'fit-content',
});

export const optionList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    marginTop: '4px',
});

export const optionText = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['70'],
        lineHeight: '1.4',
        position: 'relative',
        width: 'fit-content',
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
        paddingRight: '8px',
    },
]);
