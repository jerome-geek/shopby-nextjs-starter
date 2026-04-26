import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';

export const orderContainer = style({
    display: 'flex',
    flexDirection: 'column',
    '@media': {
        [media.desktop]: {
            gap: '12px',
            backgroundColor: vars.color.white,
            paddingTop: '12px',
            paddingBottom: '12px',
            boxShadow: `0 -10px 10px -5px ${vars.color.white}`,
        },
    },
});

export const buttonDivider = style({
    width: '100%',
    border: `2px solid ${vars.color.green['80']}`,
});

export const totalPriceContainer = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0',
});

export const totalPriceTitle = style([
    textStyles.headingSemibold,
    { color: vars.color.black },
]);

export const totalPrice = style([
    textStyles.title1Bold,
    {
        color: vars.color.pink['100'],
    },
]);

export const actionButtons = style({
    display: 'flex',
    gap: '8px',
});

export const giftButtonDesktop = style({
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    width: '63px',
    height: '63px',
    border: `1px solid ${vars.color.gray['50']}`,
    borderRadius: '4px',
    backgroundColor: vars.color.white,
    flexShrink: 0,

    '@media': {
        [media.desktop]: {
            display: 'flex',
        },
    },
});
