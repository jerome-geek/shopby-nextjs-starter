import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',

    '@media': {
        [media.desktop]: {
            gap: '32px',
            padding: '36px 0 80px',
            maxWidth: '1200px',
            margin: '0 auto',
        },
    },
});

export const title = style([
    textStyles.display1Semibold,
    {
        color: vars.color.black,
    },
]);

export const titleContainer = style({
    width: 'calc(100% + 40px)',
    marginLeft: '-20px',
    position: 'relative',
    backgroundColor: vars.color.white,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',

    '@media': {
        [media.desktop]: {
            width: '100%',
            marginLeft: '0',
        },
    },
});

export const titleArea = style({
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',

    '@media': {
        [media.desktop]: {
            gap: '32px',
        },
    },
});

export const tabList = style({
    display: 'flex',
    gap: '4px',
    padding: '4px 20px 0',
    overflowX: 'auto',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',

    '@media': {
        [media.desktop]: {
            gap: '6px',
            padding: '0',
        },
    },

    selectors: {
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
});

export const addCollectionButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: `1px solid ${vars.color.gray['40']}`,
    backgroundColor: vars.color.white,
    color: vars.color.gray['60'],
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    selectors: {
        '&:hover': {
            backgroundColor: vars.color.green['40'],
            borderColor: vars.color.green['80'],
            color: vars.color.green['80'],
        },
    },

    '@media': {
        [media.desktop]: {
            width: '37px',
            height: '37px',
        },
    },
});

export const tabItem = style([
    textStyles.body1Regular,
    {
        position: 'relative',
        padding: '0 12px',
        height: '32px',
        borderRadius: '60px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        color: vars.color.gray['80'],
        background: vars.color.green['20'],
        transition: 'color 0.3s ease',
        userSelect: 'none',
        selectors: {
            '&:hover': {
                color: vars.color.black,
            },
            '&[data-active="true"]': {
                fontWeight: '500',
                color: vars.color.white,
                background: vars.color.green['80'],
            },
        },

        '@media': {
            [media.desktop]: {
                padding: '0 16px',
                height: '37px',
                fontSize: '1.5rem',
                lineHeight: '1.4',
                letterSpacing: '-0.2%',
            },
        },
    },
]);

export const divider = style({
    width: '100vw',
    marginLeft: 'calc(50% - 50vw)',
    height: '1px',
    backgroundColor: vars.color.gray['20'],
});

export const activeIndicator = style({
    position: 'absolute',
    inset: 0,
    borderRadius: '100px',
    backgroundColor: '#8da287',
    zIndex: -1,
    boxShadow: '0 4px 12px rgba(141, 162, 135, 0.3)',
});
