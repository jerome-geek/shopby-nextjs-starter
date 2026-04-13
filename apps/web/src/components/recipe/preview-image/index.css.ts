import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';
import { style } from '@vanilla-extract/css';

export const container = style({
    aspectRatio: '1 / 1',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid transparent',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'visible',
    transition: 'all 0.2s ease',

    '@media': {
        [media.desktop]: {
            maxWidth: '130px',
        },
    },

    selectors: {
        '&:hover': {
            backgroundColor: vars.color.gray['20'],
            borderColor: vars.color.gray['40'],
        },
    },
});

export const mainBadge = style([
    textStyles.body1Semibold,
    {
        position: 'absolute',
        overflow: 'hidden',
        top: '0',
        left: '0',
        backgroundColor: 'rgba(26, 26, 26, 0.8)',
        color: vars.color.white,
        padding: '4px 8px',
        borderTopLeftRadius: '4px',
        zIndex: 10,
    },
]);

export const previewImage = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '4px',
});

export const deleteButtonWrapper = style({
    position: 'absolute',
    top: '-12px',
    right: '-12px',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: vars.color.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',

    selectors: {
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
});

export const deleteButton = style({
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    backgroundColor: vars.color.gray['50'],
    color: vars.color.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});
