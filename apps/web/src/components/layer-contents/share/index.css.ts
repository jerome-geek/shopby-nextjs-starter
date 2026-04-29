import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const list = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 70px)',
    justifyContent: 'center',
    gap: '18px',
    margin: '0 auto',
    padding: '8px 0',

    '@media': {
        [media.mobile]: {
            padding: '8px 0 0',
        },
    },
});

export const listButton = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
});

export const listImage = style({
    width: '70px',
});

export const listName = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['80'],
        textAlign: 'center',
    },
]);
