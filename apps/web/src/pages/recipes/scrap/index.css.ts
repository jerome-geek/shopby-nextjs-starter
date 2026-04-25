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
            padding: '40px 0',
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
    width: '100vw',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    borderBottom: `1px solid ${vars.color.gray['20']}`,
    backgroundColor: vars.color.white,
    padding: '0 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',

    '@media': {
        [media.desktop]: {
            padding: '20px 20px 0 20px',
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
            gap: '40px',
        },
    },
});

export const tabList = style({
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
    padding: '12px 0',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',

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
    width: '40px',
    height: '40px',
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
});

export const tabItem = style([
    textStyles.body2Semibold,
    {
        position: 'relative',
        padding: '10px 20px',
        borderRadius: '100px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        color: vars.color.gray['60'],
        backgroundColor: 'rgba(242, 245, 241, 0.8)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(0, 0, 0, 0.02)',
        transition: 'color 0.3s ease',
        userSelect: 'none',
        selectors: {
            '&:hover': {
                color: vars.color.black,
            },
            '&[data-active="true"]': {
                color: vars.color.white,
                backgroundColor: 'transparent',
            },
        },
    },
]);

export const activeIndicator = style({
    position: 'absolute',
    inset: 0,
    borderRadius: '100px',
    backgroundColor: '#8da287',
    zIndex: -1,
    boxShadow: '0 4px 12px rgba(141, 162, 135, 0.3)',
});
