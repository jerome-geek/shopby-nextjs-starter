import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { media } from '@/styles/media';
import { textStyles } from '@/styles/typography.css';

export const bottomNavContainer = style({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '64px',
    backgroundColor: vars.color.white,
    borderTop: `1px solid ${vars.color.gray[20]}`,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 1000,
    paddingBottom: 'env(safe-area-inset-bottom)',
    willChange: 'transform',

    '@media': {
        [media.tablet]: {
            display: 'none',
        },
        [media.desktop]: {
            display: 'none',
        },
    },
});

export const navItem = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    textDecoration: 'none',
    color: vars.color.gray[60],
    flex: 1,
});

export const navLabel = style([
    textStyles.caption2Semibold,
    {
        color: 'inherit',
    },
]);

export const activeNavItem = style({
    color: vars.color.black,
});
