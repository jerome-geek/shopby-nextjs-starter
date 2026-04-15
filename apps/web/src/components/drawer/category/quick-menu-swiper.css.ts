import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    flexShrink: 0,
    width: '100%',
    padding: '20px 0',
    borderBottom: `1px solid ${vars.color.gray['20']}`,
});

export const slide = style({
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
    color: 'inherit',
});

export const iconCircle = style({
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    backgroundColor: vars.color.gray['10'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2.8rem',
    flexShrink: 0,
});

export const label = style([
    textStyles.body2Medium,
    {
        color: vars.color.gray['90'],
        textAlign: 'center',
        whiteSpace: 'nowrap',
    },
]);
