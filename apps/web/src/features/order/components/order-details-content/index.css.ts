import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles, textStyleTokens } from '@/styles/typography.css';
import { style } from '@vanilla-extract/css';

export const container = style({
    width: '100%',
    maxWidth: '792px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '36px',
    paddingTop: '12px',

    '@media': {
        [media.desktop]: {
            gap: '48px',
            padding: '40px 0',
        },
    },
});

export const banner = style({
    backgroundColor: vars.color.green['20'],
    borderRadius: '8px',
    padding: '24px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    width: '100%',

    '@media': {
        [media.desktop]: {
            padding: '32px 20px',
            gap: '16px',
        },
    },
});

export const bannerIcon = style({
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '@media': {
        [media.desktop]: {
            width: '80px',
            height: '80px',
        },
    },
});

export const bannerTitle = style([
    textStyles.headlineSemibold,
    {
        color: vars.color.black,
        textAlign: 'center',

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.headingSemibold,
            },
        },
    },
]);

export const bannerDate = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.body1Regular,
            },
        },
    },
]);

/* ─── Info Grid ─── */
export const infoGrid = style({
    display: 'flex',
    gap: '24px',
    alignItems: 'flex-start',
    width: '100%',

    '@media': {
        'screen and (max-width: 480px)': {
            flexDirection: 'column',
            gap: '8px',
        },
    },
});

export const infoColumn = style({
    flex: '1 0 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    minWidth: 0,

    '@media': {
        [media.desktop]: {
            gap: '12px',
        },
    },
});

export const infoRow = style({
    display: 'flex',
    gap: '11px',
    alignItems: 'flex-start',
    color: vars.color.gray['90'],
    lineHeight: '1.4',
});

export const infoLabel = style([
    textStyles.body1Semibold,
    {
        width: '72px',
        flexShrink: 0,
        color: vars.color.gray['90'],

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.headlineSemibold,
            },
        },
    },
]);

export const infoValue = style([
    textStyles.body1Regular,
    {
        flex: 1,
        color: vars.color.gray['90'],
        lineHeight: '1.4',
        minWidth: 0,

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.headlineRegular,
            },
        },
    },
]);

export const bankLimitDate = style({
    color: vars.color.pink['100'],
});

/* ─── Divider ─── */
export const divider = style({
    width: 'calc(100% + 40px)',
    height: '6px',
    margin: '0 -20px',
    background: vars.color.gray['20'],

    '@media': {
        [media.desktop]: {
            width: '100%',
            height: '1px',
            margin: '0',
        },
    },
});

/* ─── Product section ─── */
export const sectionTitle = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
]);

export const productList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%',
    marginTop: '20px',
    '@media': {
        'screen and (max-width: 480px)': {
            gap: '12px',
        },
    },
});

export const productItem = style({
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    width: '100%',

    '@media': {
        [media.desktop]: {
            gap: '24px',
        },
    },
});

export const productImage = style({
    width: '72px',
    height: '72px',
    objectFit: 'cover',
    borderRadius: '4px',
    flexShrink: 0,

    '@media': {
        [media.desktop]: {
            width: '128px',
            height: '128px',
        },
    },
});

export const productContent = style({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minWidth: 0,
});

export const productTextContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
});

export const productBrand = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.body1Regular,
            },
        },
    },
]);

export const productName = style([
    textStyles.body1Medium,
    {
        color: vars.color.black,

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.headlineMedium,
            },
        },
    },
]);

export const optionList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
});

export const optionItem = style({
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
});

export const optionLabel = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
        '::after': {
            content: '":"',
        },
    },
]);

export const optionValue = style([
    textStyles.caption1Regular,
    {
        color: vars.color.gray['60'],
    },
]);

export const productFooter = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 'auto',
});

export const orderCount = style([
    textStyles.caption1Semibold,
    {
        color: vars.color.gray['60'],

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.body2Semibold,
            },
        },
    },
]);

export const productPriceText = style([
    textStyles.headlineSemibold,
    {
        color: vars.color.black,

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.headingBold,
            },
        },
    },
]);

/* ─── Price Summary ─── */
export const summaryContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
});

export const summaryRow = style([
    textStyles.body2Regular,
    {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: vars.color.gray['80'],
        width: '100%',

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.headlineRegular,
            },
        },
    },
]);

export const totalRow = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderTop: `1px solid ${vars.color.gray['20']}`,
    paddingTop: '10px',

    '@media': {
        [media.desktop]: {
            paddingTop: '12px',
        },
    },
});

export const totalLabel = style([
    textStyles.headlineSemibold,
    {
        color: vars.color.black,
        whiteSpace: 'nowrap',

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.headingSemibold,
            },
        },
    },
]);

export const totalPriceText = style([
    textStyles.headingBold,
    {
        color: vars.color.pink['100'],
        flex: '1 0 0',
        textAlign: 'right',

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.title1Bold,
            },
        },
    },
]);

/* ─── Buttons ─── */
export const buttonGroup = style({
    display: 'flex',
    gap: '6px',
    alignItems: 'center',
    width: '100%',

    '@media': {
        [media.desktop]: {
            gap: '8px',
        },
    },
});

export const ghostButton = style([
    textStyles.headlineSemibold,
    {
        flex: '1 0 0',
        height: '53px',
        textAlign: 'center',
        borderRadius: '4px',
        border: `1px solid ${vars.color.gray['50']}`,
        backgroundColor: vars.color.white,
        color: vars.color.black,
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.2s',
        ':hover': {
            backgroundColor: vars.color.gray['10'],
        },

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.headingSemibold,
                height: '63px',
            },
        },
    },
]);

export const primaryButton = style([
    textStyles.headlineSemibold,
    {
        flex: '1 0 0',
        height: '53px',
        textAlign: 'center',
        borderRadius: '4px',
        backgroundColor: vars.color.green['100'],
        color: vars.color.white,
        textDecoration: 'none',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'opacity 0.2s',
        ':hover': {
            opacity: 0.9,
        },

        '@media': {
            [media.desktop]: {
                ...textStyleTokens.headingSemibold,
                height: '63px',
            },
        },
    },
]);
