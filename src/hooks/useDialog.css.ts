import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const title = style({
    fontSize: '1.8rem', // heading.semibold approximation
    fontWeight: '600',
    wordBreak: 'break-word',
    whiteSpace: 'normal',
    color: vars.color.gray[90],
    margin: 0,
});

export const description = style({
    fontSize: '1.6rem', // body1.medium approximation
    fontWeight: '500',
    color: vars.color.gray[80],
    marginTop: '8px',
    margin: 0,
});
