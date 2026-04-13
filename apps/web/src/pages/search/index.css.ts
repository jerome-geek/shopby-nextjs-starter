import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',

    '@media': {
        [media.desktop]: {
            display: 'flex',
            flexDirection: 'row',
            gap: '36px',
            maxWidth: '1200px',
            margin: '0 auto',
        },
    },
});

export const contentArea = style({
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    paddingTop: '24px',

    '@media': {
        [media.desktop]: {
            flex: 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            paddingTop: '0',
        },
    },
});

export const productList = style({
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '15px',
    '@media': {
        [media.desktop]: {
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: '24px',
        },
    },
});

export const depth4CategoryList = style({
    display: 'flex',
    gap: '16px',
    width: '100%',
    padding: '12px 16px',
    borderRadius: '4px',
    background: vars.color.green['20'],
});

export const depth4CategoryListItem = style([
    textStyles.headlineRegular,
    {
        position: 'relative',
        color: vars.color.gray['60'],
        selectors: {
            '&[data-selected="true"]': {
                color: vars.color.black,
                fontWeight: '600',
            },
            '&:not(:first-child)': {
                paddingLeft: '16px',
            },
            '&:not(:first-child)::before': {
                content: '',
                position: 'absolute',
                top: '50%',
                left: 0,
                transform: 'translateY(-50%)',
                width: '1px',
                height: '10px',
                backgroundColor: vars.color.gray['50'],
            },
        },
    },
]);

export const sortContainer = style({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    paddingBottom: '12px',
    borderBottom: `1px solid ${vars.color.gray['20']}`,
});

export const sortList = style({
    display: 'flex',
    gap: '16px',
});

export const sortListButton = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['60'],
        selectors: {
            '&[data-selected="true"]': {
                color: vars.color.black,
                fontWeight: '600',
            },
        },
    },
]);

export const mobileTopContainer = style({
    width: 'calc(100% + 40px)',
    margin: '0 -20px',
});

export const totalCount = style([
    textStyles.caption1Regular,
    {
        width: '100%',
        padding: '12px 20px',
        color: vars.color.gray['60'],
        background: vars.color.gray['10'],
        borderBottom: `1px solid ${vars.color.gray['20']}`,

        '@media': {
            [media.desktop]: {
                width: 'fit-content',
                padding: '0',
                borderBottom: 'none',
                fontSize: '1.3rem',
                lineHeight: '1.3',
                letterSpacing: '-1.3%',
                background: 'none',
            },
        },
    },
]);

export const totalCountValue = style([
    textStyles.caption1Semibold,
    {
        color: vars.color.gray['90'],

        '@media': {
            [media.desktop]: {
                fontSize: '1.3rem',
                lineHeight: '1.3',
                letterSpacing: '-1.3%',
            },
        },
    },
]);

export const tabList = style({
    display: 'flex',
    height: '44px',
    borderBottom: `1px solid ${vars.color.gray['20']}`,

    '@media': {
        [media.desktop]: {
            flexDirection: 'column',
            gap: '16px',
            height: 'auto',
            padding: '28px 0',
            borderTop: `1px solid ${vars.color.green['80']}`,
            borderBottom: `1px solid ${vars.color.green['80']}`,
        },
    },
});

export const tabListItem = style({
    flex: 1,
    display: 'flex',
    minWidth: 0,

    '@media': {
        [media.desktop]: {
            flex: 'none',
            width: '100%',
        },
    },
});

export const tabButton = style([
    textStyles.body1Medium,
    {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '44px',
        color: vars.color.gray['60'],
        selectors: {
            '&[data-selected="true"]': {
                color: vars.color.black,
                fontWeight: 500,
                borderBottom: `2px solid ${vars.color.green['80']}`,
            },
        },

        '@media': {
            [media.desktop]: {
                flex: 'none',
                justifyContent: 'flex-start',
                width: '100%',
                height: '27px',
                fontWeight: '500',
                fontSize: '1.8rem',
                lineHeight: '1.5',
                letterSpacing: '-1.3%',

                selectors: {
                    '&[data-selected="true"]': {
                        fontWeight: 600,
                        borderBottom: 'none',
                    },
                },
            },
        },
    },
]);

export const searchInputContainer = style({
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
});

export const sideBar = style({
    width: '212px',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
});
