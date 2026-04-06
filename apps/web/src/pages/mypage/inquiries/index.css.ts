import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const inquiryHeaderRow = style([
    textStyles.caption1Semibold,
    {
        display: 'grid',
        gridTemplateColumns: '0.85fr 1fr 1.4fr 0.75fr',
        alignItems: 'center',
        gap: '16px',
        padding: '12px 0',
        borderTop: `1px solid ${vars.color.black}`,
        borderBottom: `1px solid ${vars.color.gray['20']}`,
        color: vars.color.gray['80'],
        fontSize: '1.4rem',
        fontWeight: 600,
        lineHeight: '1.4',
        letterSpacing: '-1.3%',
        '@media': {
            [media.mobile]: {
                display: 'none',
            },
        },
    },
]);

export const inquiryHeaderCell = style({
    textAlign: 'center',
    selectors: {
        '&:first-child': {
            textAlign: 'left',
            paddingLeft: '8px',
        },
    },
});

export const inquiryDesktopItem = style({
    borderBottom: `1px solid ${vars.color.gray['20']}`,
    padding: '16px 0',
    selectors: {
        '&:hover': {
            backgroundColor: vars.color.gray['10'],
        },
    },
});

export const inquiryDesktopSummary = style({
    display: 'grid',
    gridTemplateColumns: '0.85fr 1fr 1.4fr 0.75fr',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '12px',
    padding: '0 8px',
    '@media': {
        [media.mobile]: {
            display: 'none',
        },
    },
});

export const inquiryDesktopCell = style({
    textAlign: 'center',
    minWidth: 0,
    selectors: {
        '&:first-child': {
            textAlign: 'left',
        },
        '&:nth-child(3)': {
            textAlign: 'left',
        },
    },
});

export const inquiryTitleEllipsis = style([
    textStyles.body2Semibold,
    {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: vars.color.gray['90'],
    },
]);

export const accordionContainer = style({
    display: 'flex',
    flexDirection: 'column',
});
