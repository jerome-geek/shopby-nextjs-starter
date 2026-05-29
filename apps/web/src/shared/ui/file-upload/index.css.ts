import { keyframes, style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';

export const imageContainer = style({
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
});

export const undoButton = style({
    flexBasis: '100%',
    width: 'fit-content',
    padding: '8px 10px',
    borderRadius: '6px',
    border: `1px solid ${vars.color.gray['30']}`,
    backgroundColor: vars.color.white,
    color: vars.color.gray['70'],
    fontSize: '12px',
    fontWeight: '600',
});

export const imageList = style({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
});

export const imageListItem = style({
    position: 'relative',
    width: '88px',
    height: '88px',
    aspectRatio: '1 / 1',

    '@media': {
        [media.desktop]: {
            width: '130px',
            height: '130px',
        },
    },
});

export const imageListItemImageWrap = style({
    width: '100%',
    height: '100%',
    borderRadius: '4px',
    overflow: 'hidden',
});

export const uploadButton = style({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '88px',
    height: '88px',
    borderRadius: '4px',
    overflow: 'hidden',
    border: `1px dashed ${vars.color.gray['50']}`,
    aspectRatio: '1 / 1',
    backgroundColor: vars.color.gray['10'],
    '@media': {
        [media.desktop]: {
            width: '130px',
            height: '130px',
        },
    },
});

export const imageListItemImage = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const imageListItemCloseButton = style({
    position: 'absolute',
    top: '-10px',
    right: '-10px',
    width: '24px',
    height: '24px',
    padding: '2px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: vars.color.gray['50'],
    border: `4px solid ${vars.color.white}`,

    '@media': {
        [media.desktop]: {
            width: '28px',
            height: '28px',
        },
    },
});

export const plusIcon = style({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
});

export const uploadButtonText = style({
    position: 'absolute',
    bottom: '8px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '12px',
    fontWeight: '500',
    color: vars.color.gray['70'],
    whiteSpace: 'nowrap',
});

const spin = keyframes({
    to: { transform: 'rotate(360deg)' },
});

export const convertingPlaceholder = style({
    width: '88px',
    height: '88px',
    borderRadius: '4px',
    backgroundColor: vars.color.gray['10'],
    border: `1px solid ${vars.color.gray['30']}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '@media': {
        [media.desktop]: {
            width: '130px',
            height: '130px',
        },
    },
});

export const spinner = style({
    animation: `${spin} 1s linear infinite`,
    color: vars.color.gray['50'],
});
