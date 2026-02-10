import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const contentContainer = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    whiteSpace: 'nowrap',
});

globalStyle(`${contentContainer} > svg`, {
    width: '72px',
    height: '72px',
});

export const titleContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    whiteSpace: 'break-spaces',
    textAlign: 'center',
    padding: '0',
    wordBreak: 'break-word',
});

globalStyle(`${titleContainer} > div`, {
    maxHeight: '40vh',
    overflowY: 'auto',
    marginTop: '6px',
});

globalStyle(`${titleContainer} > div::-webkit-scrollbar`, {
    width: '6px',
});

export const dialogFooter = style({
    display: 'flex',
    gap: '8px',
    height: '52px',
});

globalStyle(`${dialogFooter} button`, {
    flex: 1,
    width: '100%',
    minWidth: '0',
    border: `1px solid ${vars.color.black}`,
});

globalStyle(`${dialogFooter} button:last-child`, {
    backgroundColor: vars.color.black,
    color: vars.color.white,
});
