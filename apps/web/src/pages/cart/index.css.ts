import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 'calc(72px + env(safe-area-inset-bottom, 0px))',

    '@media': {
        [media.tablet]: {
            marginTop: '-24px',
        },
        [media.desktop]: {
            gap: '32px',
            paddingTop: '36px',
        },
    },
});

export const title = style([
    textStyles.display1Semibold,
    {
        color: vars.color.black,
        display: 'none',

        '@media': {
            [media.desktop]: {
                display: 'block',
            },
        },
    },
]);

export const summaryLabel = style([
    textStyles.body1Medium,
    {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: vars.color.gray['90'],

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.headlineMedium,
            },
        },
    },
]);

export const contentWrapper = style({
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100% + 40px)',
    marginLeft: '-20px',

    '@media': {
        [media.desktop]: {
            width: '100%',
            marginLeft: '0',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) clamp(320px, 38%, 486px)',
            columnGap: '48px',
            rowGap: '32px',
            maxWidth: '1200px',
        },
    },

    selectors: {
        '&[data-empty="true"]': {
            gridTemplateColumns: 'minmax(0, 1fr)',
        },
    },
});

export const cartListArea = style({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    order: 1,

    '@media': {
        [media.desktop]: {
            gridColumn: '1 / 2',
            gridRow: '1 / 2',
            gap: '32px',
        },
    },
});

export const cartList = style({
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0',

    '@media': {
        [media.desktop]: {
            gap: '32px',
        },
    },
});

export const itemList = style({
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',

    '@media': {
        [media.desktop]: {
            gap: '24px',
        },
    },
});

export const invalidItemList = style({
    margin: '24px 0 36px 0',
    padding: '0 20px',

    '@media': {
        [media.desktop]: {
            margin: '0',
            padding: '0 20px 32px',
            borderBottom: `1px solid ${vars.color.gray['20']}`,
        },
    },
});

export const selectAllArea = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: vars.color.gray['10'],
    padding: '12px 20px',
    borderBottom: `1px solid ${vars.color.gray['20']}`,

    '@media': {
        [media.desktop]: {
            padding: '16px 20px',
            backgroundColor: vars.color.gray['10'],
        },
    },
});

export const partnerGroup = style({
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 20px',
    gap: '16px',

    '@media': {
        [media.desktop]: {
            padding: '0 20px 32px 20px',
            gap: '24px',
            borderBottom: `1px solid ${vars.color.gray['20']}`,
        },
    },
});

export const partnerHeader = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    paddingBottom: '16px',
    borderBottom: `1px solid ${vars.color.gray['20']}`,

    '@media': {
        [media.desktop]: {
            gap: '12px',
            paddingBottom: 0,
            borderBottom: 'none',
        },
    },
});

export const partnerName = style([
    textStyles.headlineSemibold,
    {
        color: vars.color.gray['90'],
        display: 'flex',
        alignItems: 'center',
        gap: '12px',

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.headingSemibold,
            },
        },
    },
]);

export const recommendArea = style({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '36px 0',
    order: 3,

    '@media': {
        [media.desktop]: {
            gridColumn: '1 / 2',
            gridRow: '2 / 3',
            padding: '0',
            gap: '24px',
        },
    },
});

export const recommendTitle = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
    },
]);

export const thickDivider = style({
    height: '6px',
    backgroundColor: vars.color.gray['20'],
    width: '100%',

    '@media': {
        [media.desktop]: {
            display: 'none',
        },
    },
});

export const emptyCartContainer = style({
    display: 'flex',
    flexDirection: 'column',
    padding: '40px 20px',

    '@media': {
        [media.desktop]: {
            gap: '10px',
        },
    },
});

export const emptyCartTitle = style([
    textStyles.headingSemibold,
    { color: vars.color.black },
]);

export const emptyCartDesc = style([
    textStyles.body1Regular,
    { color: vars.color.gray['60'] },
]);

export const emptyCartLink = style([
    textStyles.headlineSemibold,
    {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: vars.color.black,
        color: vars.color.white,
        padding: '16px',
        borderRadius: '4px',
        marginTop: '20px',
    },
]);

export const deleteAllButton = style([
    textStyles.caption1Semibold,
    {
        color: vars.color.gray['60'],
        background: 'none',
        border: 'none',
        cursor: 'pointer',

        '@media': {
            [media.desktop]: {
                fontSize: '1.3rem',
                lineHeight: '1.3',
                letterSpacing: '-1.3%',
            },
        },
    },
]);
