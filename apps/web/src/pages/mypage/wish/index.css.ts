import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const selectAllLabel = style([
    textStyles.body2Regular,
    {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        color: vars.color.gray['80'],
        userSelect: 'none',
    },
]);

export const cardSelectWrap = style({
    position: 'relative',
});

export const checkboxAnchor = style({
    position: 'absolute',
    top: '6px',
    left: '6px',
    zIndex: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
    borderRadius: '2px',
    backgroundColor: vars.color.white,
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.12)',
});

export const productGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px 8px',
    width: '100%',
    listStyle: 'none',
    margin: 0,
    padding: 0,

    '@media': {
        'screen and (min-width: 430px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
        },
        [media.tablet]: {
            gridTemplateColumns: 'repeat(5, 1fr)',
        },
        [media.desktop]: {
            gridTemplateColumns: 'repeat(5, 1fr)',
        },
    },
});

export const productGridItem = style({
    minWidth: 0,
});

export const actionsWrapper = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
    width: '100%',
    backgroundColor: vars.color.gray['10'],
    border: `1px solid ${vars.color.gray['30']}`,
    borderRadius: '4px',
    padding: '12px',
    marginBottom: '12px',
});

export const deleteButton = style([
    textStyles.body2Regular,
    {
        height: 'auto',
        width: 'auto',
        color: vars.color.gray['80'],
        fontSize: '1.3rem',
        fontWeight: 400,
        lineHeight: '13px',
        letterSpacing: '-1.3%',
    },
]);
