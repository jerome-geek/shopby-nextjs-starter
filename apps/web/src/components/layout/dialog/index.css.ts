import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const dimmed = style({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: vars.color.black,
    zIndex: 1003,
});

export const container = style({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: vars.color.white,
    zIndex: 1004,
    minWidth: '432px',
    borderRadius: '24px',
    overflow: 'hidden',
    padding: '48px 24px 24px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '36px',

    '@media': {
        [media.mobile]: {
            minWidth: '300px',
            maxWidth: '100%',
        },
    },
});
