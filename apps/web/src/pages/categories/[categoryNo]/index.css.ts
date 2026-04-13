import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',

    '@media': {
        [media.tablet]: {
            display: 'flex',
            flexDirection: 'row',
            gap: '36px',
            maxWidth: '1200px',
            padding: '36px 0',
            margin: '0 auto',
        },
        [media.desktop]: {
            display: 'flex',
            flexDirection: 'row',
            gap: '36px',
            maxWidth: '1200px',
            padding: '36px 0',
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
        [media.tablet]: {
            paddingTop: '76px',
        },
        [media.desktop]: {
            flex: 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            paddingTop: '75px',
        },
    },
});

export const productList = style({
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '15px',
    '@media': {
        [media.tablet]: {
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '24px',
        },
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
    },
]);

export const totalCountValue = style([
    textStyles.caption1Semibold,
    {
        color: vars.color.gray['90'],
    },
]);
