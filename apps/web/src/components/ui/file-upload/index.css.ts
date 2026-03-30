import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const imageContainer = style({
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
});

export const imageList = style({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
});

export const imageListItem = style({
    position: 'relative',
    width: '100px',
    height: '100px',
    borderRadius: '4px',
    overflow: 'hidden',
    border: `1px solid ${vars.color.gray['50']}`,
    aspectRatio: '1 / 1',
});

export const uploadButton = style({
    position: 'relative',
    width: '100px',
    height: '100px',
    borderRadius: '4px',
    overflow: 'hidden',
    border: `1px solid ${vars.color.gray['50']}`,
    aspectRatio: '1 / 1',
});

export const imageListItemImage = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const imageListItemCloseButton = style({
    backgroundColor: vars.color.black,
    position: 'absolute',
    top: '0',
    right: '0',
    padding: '2px',
    borderBottomLeftRadius: '4px',
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
