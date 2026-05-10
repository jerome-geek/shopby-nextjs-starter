import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';

export const addCartTitle = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    padding: '10px 0',
});

export const cartIconBox = style({
    width: '64px',
    height: '64px',
    borderRadius: '20px',
    backgroundColor: vars.color.pink['20'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: vars.color.pink['80'],
});

export const addCartMessage = style({
    fontSize: '18px',
    fontWeight: vars.typography.fontWeight.bold,
    color: vars.color.gray['90'],
    lineHeight: '1.4',
    wordBreak: 'keep-all',
});

export const loginTitle = style({
    textAlign: 'center',
});

export const loginTitleText = style({
    fontSize: '18px',
    fontWeight: vars.typography.fontWeight.bold,
    marginBottom: '8px',
});

export const loginDescription = style({
    fontSize: '14px',
    color: vars.color.gray['60'],
});
