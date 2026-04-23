import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

const ellipsis = style({
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
});

const boardTableRowHeight = '52px';

const thBase = style([
    textStyles.headlineMedium,
    {
        background: vars.color.green['20'],
        color: vars.color.black,
        textAlign: 'center',
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        height: boardTableRowHeight,
        padding: '0 8px',
        verticalAlign: 'middle',
    },
]);

const tdBase = style([
    textStyles.headlineRegular,
    {
        borderBottom: 'none',
        color: vars.color.gray['80'],
        textAlign: 'left',
        verticalAlign: 'middle',
        '@media': {
            [media.tablet]: {
                boxSizing: 'border-box',
                height: boardTableRowHeight,
                padding: '0 8px',
            },
            [media.desktop]: {
                boxSizing: 'border-box',
                height: boardTableRowHeight,
                padding: '0 8px',
            },
        },
    },
]);

export const boardPageMobile = style({
    paddingTop: '20px',
    minWidth: 0,
    width: '100%',
    maxWidth: '100%',

    '@media': {
        [media.desktop]: {
            padding: 0,
            maxWidth: 'none',
        },
    },
});

export const title = style([
    textStyles.display1Semibold,
    {
        color: vars.color.black,
    },
]);

export const categorySwiperWrapper = style({
    '@media': {
        [media.mobile]: {
            width: 'calc(100% + 40px)',
            marginLeft: '-20px',
        },
    },
});

export const categorySwiper = style({
    display: 'flex',
    alignItems: 'center',
    width: '100%',

    '@media': {
        [media.mobile]: {
            padding: '0 20px',
        },
    },
});

export const categorySwiperSlide = style({
    width: 'auto',
});

export const categoryLink = style([
    textStyles.body1Regular,
    {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '37px',
        padding: '0 16px',
        borderRadius: '60px',
        border: 'none',
        textDecoration: 'none',
        backgroundColor: vars.color.green['20'],
        color: vars.color.gray['80'],

        selectors: {
            '&[data-selected="true"]': {
                backgroundColor: vars.color.green['80'],
                color: vars.color.white,
                fontWeight: 500,
            },
        },

        '@media': {
            [media.desktop]: {
                fontSize: '1.5rem',
                letterSpacing: '-0.2%',
            },
        },
    },
]);

export const toolBarContainer = style({
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: '16px',
    flexWrap: 'wrap',
    width: '100%',
});

export const totalCount = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
    },
]);

export const totalCountValue = style({
    fontWeight: 600,
    color: vars.color.gray['90'],
});

export const toolBarRightContainer = style({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
});

export const sortButton = style([
    textStyles.body1Regular,
    {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2px',
        width: 'auto',
        color: vars.color.gray['60'],
        selectors: {
            '&[aria-pressed="true"]': {
                color: vars.color.black,
                fontWeight: 600,
                letterSpacing: '-1.3%',
            },
        },
    },
]);

export const writeLink = style([
    textStyles.body1Medium,
    {
        height: '46px !important',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 'fit-content !important',
        backgroundColor: vars.color.primary,
        color: vars.color.white,
        borderRadius: '4px',

        selectors: {
            '&:hover': {
                opacity: 0.85,
            },
        },

        '@media': {
            [media.mobile]: {
                height: '32px !important',
                padding: '0 8px',
            },
        },
    },
]);

export const writeFab = style({
    position: 'fixed',
    right: '20px',
    bottom: '200px',
    zIndex: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px !important',
    height: '48px !important',
    minWidth: '48px !important',
    minHeight: '48px !important',
    padding: 0,
    borderRadius: '50%',
    boxShadow: vars.shadow.lg,
});

export const boardTable = style({
    width: '100%',
    maxWidth: '100%',
    borderCollapse: 'collapse',
    minWidth: '680px',
    tableLayout: 'fixed',
    borderTop: `2px solid ${vars.color.green['80']}`,
    borderBottom: `2px solid ${vars.color.gray['20']}`,
});

export const boardMobileList = style({
    listStyle: 'none',
    margin: 0,
    padding: 0,
    borderTop: `2px solid ${vars.color.green['80']}`,
    borderBottom: `2px solid ${vars.color.gray['20']}`,
});

export const boardMobileItem = style({
    borderBottom: `1px solid ${vars.color.gray['20']}`,
    selectors: {
        '&:last-child': {
            borderBottom: 'none',
        },
    },
});

export const boardMobileItemLink = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    width: '100%',
    minWidth: 0,
    padding: '14px 8px',
    textAlign: 'left',
    color: 'inherit',
    textDecoration: 'none',
});

export const boardMobileMetaRow = style({
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) auto',
    alignItems: 'center',
    gap: '8px',
    minWidth: 0,
});

export const boardTableHead = style({
    borderBottom: `1px solid ${vars.color.gray['20']}`,
});

export const boardTableBody = style({
    width: '100%',
    minWidth: 0,
});

export const boardTableRow = style({
    borderBottom: `1px solid ${vars.color.gray['20']}`,
});

export const boardTableColNo = style([
    thBase,
    {
        width: '80px',
        textAlign: 'center',
    },
]);

export const boardTableColTitle = thBase;

export const boardTableColView = style([
    thBase,
    {
        width: '100px',
        textAlign: 'center',
    },
]);

export const boardTableColWriter = style([
    thBase,
    {
        width: '140px',
    },
]);

export const boardTableColDate = style([
    thBase,
    {
        width: '160px',
        textAlign: 'center',
    },
]);

export const boardTableCellInner = style([
    ellipsis,
    {
        display: 'block',
        width: '100%',
    },
]);

export const boardTableCellNo = style([
    tdBase,
    {
        textAlign: 'center',
        color: vars.color.gray['70'],
        overflow: 'hidden',
        minWidth: 0,
    },
]);

export const boardTableCellView = style([
    tdBase,
    {
        textAlign: 'center',
        color: vars.color.gray['70'],
        overflow: 'hidden',
        minWidth: 0,
    },
]);

export const boardTableCellWriterDate = style([
    tdBase,
    {
        color: vars.color.gray['80'],
        overflow: 'hidden',
        minWidth: 0,
    },
]);

export const boardTableMetaRow = style({
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    minWidth: 0,
});

export const boardTableMetaWriter = style([
    textStyles.body1Regular,
    ellipsis,
    {
        textAlign: 'left',
        color: vars.color.gray['60'],

        '@media': {
            [media.tablet]: {
                textAlign: 'center',
                color: vars.color.gray['80'],
            },
            [media.desktop]: {
                textAlign: 'center',
                color: vars.color.gray['80'],
            },
        },
    },
]);

export const boardTableMetaDate = style([
    textStyles.body1Regular,
    ellipsis,
    {
        textAlign: 'right',
        color: vars.color.gray['60'],

        '@media': {
            [media.tablet]: {
                textAlign: 'center',
                color: vars.color.gray['80'],
            },
            [media.desktop]: {
                textAlign: 'center',
                color: vars.color.gray['80'],
            },
        },
    },
]);

export const boardTableTitleIconLock = style({
    flexShrink: 0,
    alignSelf: 'center',
});

export const boardTableTitleLabel = style({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    minWidth: 0,
    maxWidth: '100%',
    flex: '0 1 auto',
    overflow: 'hidden',
});

export const boardTableTitleLink = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    minWidth: 0,
    color: 'inherit',
    textDecoration: 'none',
});

export const boardTableTitleText = style([
    textStyles.headlineMedium,
    ellipsis,
    {
        flex: '1 1 0%',
        lineHeight: 1.45,
        letterSpacing: '-0.01em',
    },
]);

export const boardTableTitleAttachIcon = style({
    flexShrink: 0,
    alignSelf: 'center',
});

export const boardTableCellTitle = style([
    tdBase,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        minWidth: 0,
        width: '100%',
        overflow: 'hidden',
        padding: 0,
        fontSize: '1.4rem',
        lineHeight: 1.45,
        color: vars.color.gray['90'],
        fontWeight: 500,

        '@media': {
            [media.tablet]: {
                overflow: 'hidden',
                minWidth: 0,
                padding: '0 8px',
                fontSize: '1.5rem',
            },
            [media.desktop]: {
                overflow: 'hidden',
                minWidth: 0,
                padding: '0 8px',
                fontSize: '1.5rem',
            },
        },
    },
]);

export const noticeBadge = style([
    textStyles.caption1Semibold,
    {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        height: '23px',
        backgroundColor: vars.color.green['40'],
        color: vars.color.green['100'],
        padding: '0 6px',
    },
]);
