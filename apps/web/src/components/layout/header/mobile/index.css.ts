import { globalStyle, style } from '@vanilla-extract/css';

import { globalVars } from '@/styles/global.css';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const headerInner = style({
    maxWidth: '1240px',
    height: globalVars.header.mobileHeight,
    margin: '0 auto',
    width: '100%',
    justifyContent: 'space-between',
    gap: '32px',
    alignItems: 'flex-end',
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    padding: '0 0 16px',
});

export const logo = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90px',
    height: '21px',
    flexShrink: 0,
    position: 'relative',
});

globalStyle(`${logo} > img`, {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
});

export const title = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
    },
]);

export const iconList = style({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    justifyContent: 'flex-end',
});

export const iconWrapper = style({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
    width: '24px',

    ':hover': {
        opacity: 0.7,
    },
});

export const cartBadge = style([
    textStyles.caption2Semibold,
    {
        position: 'absolute',
        top: '-4px',
        right: '-4px',
        width: '15px',
        height: '15px',
        color: vars.color.white,
        backgroundColor: vars.color.pink['100'],
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
]);
