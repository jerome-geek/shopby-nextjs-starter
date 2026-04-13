import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',

    '@media': {
        [media.desktop]: {
            gap: '24px',
        },
    },
});

export const CommentsTitle = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
    },
]);

export const CommentsCount = style({
    color: vars.color.gray['60'],
});

export const commentList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',

    '@media': {
        [media.desktop]: {
            gap: '24px',
        },
    },
});

export const commentContainer = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '14px',
    padding: '20px 16px',
    borderRadius: '8px',
    background: vars.color.ivory['10'],
});

export const registerButton = style([
    textStyles.body2Semibold,
    {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '29px',
        padding: '0 8px',
        color: vars.color.gray['60'],
        borderRadius: '2px',
        background: vars.color.gray['20'],

        ':hover': {
            background: vars.color.gray['80'],
            color: vars.color.white,
        },

        '@media': {
            [media.desktop]: {
                fontSize: '1.4rem',
                lineHeight: '1.4',
            },
        },
    },
]);
