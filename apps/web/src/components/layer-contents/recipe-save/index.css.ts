import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '24px 0',

    '@media': {
        [media.mobile]: {
            padding: '24px 0 0',
        },
    },
});

export const description = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['80'],
    },
]);

export const collectionList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: 0,
    margin: 0,
    listStyle: 'none',
});

export const collectionItem = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    borderRadius: '4px',
    backgroundColor: vars.color.green['20'],
    transition: 'background-color 0.2s ease',

    selectors: {
        '&:hover': {
            backgroundColor: vars.color.green['40'],
        },
    },
});

export const collectionInfo = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
});

export const collectionTitle = style([
    textStyles.headlineSemibold,
    {
        color: vars.color.gray['90'],
    },
]);

export const collectionCount = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['60'],
    },
]);

export const addButton = style({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const footer = style({
    paddingTop: '8px',
});

export const createButton = style([
    textStyles.body2Semibold,
    {
        width: '100%',
        padding: '16px',
        borderRadius: '12px',
        border: `1px solid ${vars.color.gray['20']}`,
        backgroundColor: vars.color.white,
        color: vars.color.black,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        selectors: {
            '&:hover': {
                backgroundColor: vars.color.gray['10'],
            },
        },
    },
]);
