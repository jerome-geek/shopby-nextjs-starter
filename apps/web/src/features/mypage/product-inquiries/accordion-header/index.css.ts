import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '12px',
    width: '100%',
    textAlign: 'left',
    padding: '16px 0',
});

export const topRow = style({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: '8px',
    minWidth: 0,
});

export const badgeRow = style({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '6px',
    minWidth: 0,
});

export const statusBadge = style([
    textStyles.caption1Semibold,
    {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '1.2rem',
        lineHeight: 1.3,
        backgroundColor: vars.color.gray['20'],
        border: `1px solid ${vars.color.gray['30']}`,
    },
]);

export const statusBadgeActive = style({
    color: vars.color.primary,
});

export const statusBadgeInactive = style({
    color: vars.color.gray['70'],
});

export const typeBadge = style([
    textStyles.caption1Regular,
    {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '1.2rem',
        lineHeight: 1.3,
        backgroundColor: vars.color.gray['10'],
        color: vars.color.gray['80'],
        border: `1px solid ${vars.color.gray['30']}`,
    },
]);

export const lockIcon = style({
    flexShrink: 0,
    color: vars.color.gray['60'],
});

export const date = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['70'],
        flexShrink: 0,
    },
]);

export const title = style([
    textStyles.body2Semibold,
    {
        color: vars.color.gray['90'],
        wordBreak: 'break-word',
        maxWidth: '100%',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        '@media': {
            [media.mobile]: {
                fontSize: '1.4rem',
            },
        },
    },
]);

export const productRow = style({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    minWidth: 0,
});

export const productThumbLink = style({
    display: 'block',
    flexShrink: 0,
    width: '44px',
    height: '44px',
    borderRadius: '6px',
    overflow: 'hidden',
    border: `1px solid ${vars.color.gray['30']}`,
    backgroundColor: vars.color.white,
});

export const productThumbImg = style({
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const productName = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['70'],
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
]);

// Desktop variant (mypage/product-inquiries PC accordion header)
export const desktopContainer = style({
    display: 'grid',
    gridTemplateColumns: '0.85fr 1fr 1.4fr 1.4fr 0.75fr',
    alignItems: 'center',
    gap: '16px',
    width: '100%',
    minWidth: 0,
    padding: '16px 8px',
});

export const desktopCell = style({
    textAlign: 'center',
    minWidth: 0,
    selectors: {
        '&:first-child': {
            textAlign: 'left',
        },
        '&:nth-child(3)': {
            textAlign: 'left',
        },
        '&:nth-child(4)': {
            textAlign: 'left',
        },
    },
});

export const desktopTitleEllipsis = style([
    textStyles.body2Semibold,
    {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
        maxWidth: '100%',
        minWidth: 0,
        color: vars.color.gray['90'],
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        wordBreak: 'break-word',
    },
]);

export const desktopProductRow = style([
    productRow,
    {
        justifyContent: 'flex-start',
    },
]);
