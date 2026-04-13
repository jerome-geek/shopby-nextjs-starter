import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const form = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '36px',
    alignItems: 'stretch',
});

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    alignItems: 'stretch',
});

export const section = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    alignItems: 'stretch',
});

export const headline = style({
    fontSize: '1.6rem',
    fontWeight: '600',
    color: vars.color.black,
});

export const checkboxContainer = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

export const warningContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'stretch',
});

export const warningTitle = style({
    fontSize: '1.3rem',
    fontWeight: '600',
    color: vars.color.black,
    margin: 0,
});

export const warningList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    alignItems: 'stretch',
    fontSize: '1.3rem', // body2
    color: vars.color.gray[80],
    paddingLeft: '16px',
    listStyleType: 'disc',
    margin: 0,
});

export const link = style({
    display: 'inline-block',
    textDecoration: 'underline',
    color: vars.color.black,
});

export const divider = style({
    width: '100%',
    height: '1px',
    backgroundColor: vars.color.gray[20],
    margin: 0,
    border: 'none',
});
