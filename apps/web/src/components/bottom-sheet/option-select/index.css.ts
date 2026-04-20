import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '8px 0 10px',
});

export const optionLabel = style([
    textStyles.body1Semibold,
    {
        color: vars.color.gray['90'],
        fontSize: '15px',
        marginBottom: '4px',
    },
]);

export const required = style({
    color: vars.color.pink['100'],
    marginLeft: '2px',
});

export const optionContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '0 0 20px',
});

export const totalPriceContainer = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 0 16px',
});

export const priceLabel = style([
    textStyles.headingSemibold,
    {
        fontSize: '15px',
    },
]);

export const priceValue = style([
    textStyles.title1Bold,
    {
        color: vars.color.pink['100'],
    },
]);

export const giftButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '53px',
    height: '53px',
    border: `1px solid ${vars.color.gray['50']}`,
    borderRadius: '4px',
    backgroundColor: vars.color.white,
    flex: 'none !important',
});

export const cartButton = style({
    flex: 1,
    borderColor: `${vars.color.gray['50']} !important`,
    color: `${vars.color.black} !important`,
    borderRadius: '4px !important',
    height: '53px !important',
});

export const buyButton = style({
    flex: 1,
    backgroundColor: `${vars.color.pink['80']} !important`,
    color: `${vars.color.white} !important`,
    borderRadius: '4px !important',
    height: '53px !important',
    border: 'none !important',
});

export const footerStickyWrapper = style({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '12px',
});

export const footerButtonsContainer = style({
    display: 'flex',
    gap: '6px',
    width: '100%',
});

export const relativeMenu = style({
    position: 'relative !important' as 'relative',
    boxShadow: 'none',
    border: `1px solid ${vars.color.gray['50']}`,
    borderRadius: '4px',
    marginTop: '1px',
    animation: 'none',
    maxHeight: '200px',
    overflowY: 'auto',
});
