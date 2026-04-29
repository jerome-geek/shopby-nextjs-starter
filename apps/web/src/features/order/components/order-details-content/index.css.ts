import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';

export const container = style({
    width: '100%',
    maxWidth: '792px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '48px',

    '@media': {
        [media.desktop]: {
            padding: '40px 0',
        },
    },
});

export const banner = style({
    backgroundColor: vars.color.green['20'],
    borderRadius: '8px',
    padding: '32px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    width: '100%',
});

export const bannerIcon = style({
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const bannerTitle = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
        textAlign: 'center',
    },
]);

export const bannerDate = style({
    marginTop: '12px',
    color: vars.color.gray['60'],
    fontSize: '14px',
});

/* ─── Info Grid ─── */
export const infoGrid = style({
    display: 'flex',
    gap: '24px',
    alignItems: 'flex-start',
    width: '100%',

    '@media': {
        'screen and (max-width: 480px)': {
            flexDirection: 'column',
            gap: '12px',
        },
    },
});

export const infoColumn = style({
    flex: '1 0 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    minWidth: 0,
});

export const infoRow = style({
    display: 'flex',
    gap: '11px',
    alignItems: 'flex-start',
    color: vars.color.gray['90'],
    lineHeight: '1.4',
});

export const infoLabel = style([
    textStyles.headlineSemibold,
    {
        width: '72px',
        flexShrink: 0,
        color: vars.color.gray['90'],
    },
]);

export const infoValue = style([
    textStyles.headlineRegular,
    {
        flex: 1,
        color: vars.color.gray['90'],
        lineHeight: '1.4',
        minWidth: 0,
    },
]);

export const bankLimitDate = style({
    color: '#ff4d4d',
});

/* ─── Divider ─── */
export const divider = style({
    border: 'none',
    borderTop: `1px solid ${vars.color.gray['20']}`,
    width: '100%',
    margin: 0,
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
    gap: '24px',
    alignItems: 'center',
    width: '100%',
});

export const productImage = style({
    width: '128px',
    height: '128px',
    objectFit: 'cover',
    borderRadius: '4px',
    flexShrink: 0,
});

export const productContent = style({
    flex: '1 0 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingTop: '4px',
    minWidth: 0,
});

export const productBrand = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['60'],
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '100%',
    },
]);

export const productName = style([
    textStyles.headlineMedium,
    {
        color: vars.color.black,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        maxHeight: '20px',
        width: '100%',
    },
]);

export const productOptionText = style({
    fontSize: '12px',
    color: vars.color.gray['40'],
    marginBottom: '4px',
});

export const productFooter = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
});

export const orderCount = style([
    textStyles.body2Semibold,
    {
        color: vars.color.gray['60'],
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
]);

export const productPriceText = style([
    textStyles.headingBold,
    {
        color: vars.color.black,
        flex: '1 0 0',
        textAlign: 'right',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
]);

/* ─── Price Summary ─── */
export const summaryContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
});

export const summaryRow = style([
    textStyles.headlineRegular,
    {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: vars.color.gray['80'],
        width: '100%',
    },
]);

export const totalRow = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
});

export const totalLabel = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
        whiteSpace: 'nowrap',
    },
]);

export const totalPriceText = style([
    textStyles.title1Bold,
    {
        color: vars.color.primary,
        flex: '1 0 0',
        textAlign: 'right',
    },
]);

/* ─── Buttons ─── */
export const buttonGroup = style({
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    width: '100%',
});

export const ghostButton = style([
    textStyles.headingSemibold,
    {
        flex: '1 0 0',
        padding: '18px',
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
    },
]);

export const primaryButton = style([
    textStyles.headingSemibold,
    {
        flex: '1 0 0',
        padding: '18px',
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
    },
]);
