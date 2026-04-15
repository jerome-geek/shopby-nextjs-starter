import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const container = style({
    flexShrink: 0,
    width: '100%',
    paddingBottom: '16px',
    borderBottom: `6px solid ${vars.color.gray['10']}`,
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
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: vars.color.gray['10'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2.8rem',
    flexShrink: 0,
});

export const label = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['80'],
        textAlign: 'center',
        whiteSpace: 'nowrap',
    },
]);
