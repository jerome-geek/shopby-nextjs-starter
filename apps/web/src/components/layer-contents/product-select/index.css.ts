import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
});

export const searchForm = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    backgroundColor: vars.color.gray['10'],
    padding: '12px 16px',
    border: `1px solid ${vars.color.gray['20']}`,
    position: 'sticky',
    top: 0,
    zIndex: 1,
});

export const categoryGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
});

export const searchRow = style({
    position: 'relative',
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
});

export const searchInput = style({
    flex: 1,
    minWidth: 0,
    paddingRight: '40px',
});

export const searchButton = style({
    position: 'absolute',
    right: 8,
    top: '50%',
    transform: 'translateY(-50%)',
    padding: '6px',
    border: 0,
    background: 'transparent',
    cursor: 'pointer',
    color: vars.color.gray['70'],
    selectors: {
        '&:hover': {
            color: vars.color.gray['90'],
        },
    },
});

export const totalCount = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['70'],
        marginTop: '2px',
    },
]);

export const totalCountEm = style({
    color: vars.color.gray['90'],
    fontWeight: 600,
});

export const productList = style({
    maxHeight: '56vh',
    marginBottom: '16px',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    rowGap: '0px',
    columnGap: '16px',
});

export const productItem = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    paddingBottom: '16px',
    padding: '12px',
    borderRadius: '12px',
    border: `1px solid ${vars.color.gray['20']}`,
    backgroundColor: vars.color.white,
    transition: 'background-color 120ms ease, border-color 120ms ease',
    marginBottom: '16px',

    selectors: {
        '&:hover': {
            backgroundColor: vars.color.gray['10'],
        },
    },
});

export const productItemSelected = style({
    borderColor: vars.color.primary,
    borderWidth: '2px',
});

export const imageWrap = style({
    width: '100%',
    aspectRatio: '1 / 1',
    overflow: 'hidden',
    borderRadius: '8px',
    border: `1px solid ${vars.color.gray['20']}`,
    backgroundColor: vars.color.white,
});

export const productImg = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
});

export const productBody = style({
    position: 'relative',
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
});

export const productName = style([
    textStyles.body1Regular,
    {
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        wordBreak: 'break-word',
        color: vars.color.gray['90'],
    },
]);

export const productPrice = style([
    textStyles.body2Semibold,
    {
        color: vars.color.black,
    },
]);

export const selectButton = style({
    height: '44px',
    fontSize: '1.4rem',
});

export const selectHint = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['70'],
    },
]);
