import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';

export const container = style({
    position: 'fixed',
    bottom: '90px',
    right: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '12px',
    zIndex: 999,
    /** height = 버튼 2개 쌓이는 높이 + 12px(gap) */
    height: '108px',

    '@media': {
        [media.mobile]: {
            /** height = 버튼 2개 쌓이는 높이 + 12px(gap) */
            height: '96px',
        },
    },
});

export const button = style({
    position: 'relative',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: vars.color.green['80'],
    color: vars.color.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0px 6px 10px 0px #0000001A',
    transition: 'background-color 0.2s',

    ':hover': {
        backgroundColor: vars.color.green['80'],
    },

    '@media': {
        [media.mobile]: {
            width: '42px',
            height: '42px',
        },
    },
});
