import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';

export const emailRow = style({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
});

export const emailAt = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['70'],
        flexShrink: 0,
    },
]);

export const emailField = style({
    flex: '1 1 120px',
    minWidth: 0,
});

export const textArea = style({
    minHeight: '220px',
    resize: 'vertical',
});

export const productCard = style({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    borderRadius: '8px',
    border: `1px solid ${vars.color.gray['30']}`,
    background: vars.color.white,
    position: 'relative',
});

export const productThumb = style({
    width: '56px',
    height: '56px',
    flexShrink: 0,
    borderRadius: '6px',
    overflow: 'hidden',
    border: `1px solid ${vars.color.gray['20']}`,
    background: vars.color.gray['10'],
});

export const productThumbImg = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
});

export const productMeta = style({
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
});

export const productName = style([
    textStyles.body2Semibold,
    {
        color: vars.color.gray['90'],
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
]);

export const productCloseButton = style({
    position: 'absolute',
    top: '8px',
    right: '8px',
    padding: '4px',
    borderRadius: '50%',
    background: vars.color.gray['10'],
    border: `1px solid ${vars.color.gray['30']}`,

    '@media': {
        [media.mobile]: {
            top: '8px',
            right: '8px',
        },
    },
});

export const selectButton = style({
    width: '100%',
});
