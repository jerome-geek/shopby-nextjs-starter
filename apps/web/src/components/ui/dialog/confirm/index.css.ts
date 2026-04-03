import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';

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

export const title = style([
    textStyles.body1Bold,
    {
        fontSize: '1.6rem',
        color: vars.color.black,
    },
]);

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

    '@media': {
        [media.mobile]: {
            height: '48px',
        },
    },
});

globalStyle(`${dialogFooter} button`, {
    flex: 1,
    width: '100%',
    height: '100%',
    minWidth: '0',
    border: `1px solid ${vars.color.black}`,
    fontSize: '1.6rem',
});

globalStyle(`${dialogFooter} button:last-child`, {
    backgroundColor: vars.color.black,
    color: vars.color.white,
});
