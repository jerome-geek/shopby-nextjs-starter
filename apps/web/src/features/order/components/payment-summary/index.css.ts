import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    width: '100%',
    maxWidth: '486px',
    position: 'sticky',
    top: 'calc(var(--header-height, 0px) + 20px)',
    backgroundColor: '#fff',
    transition: 'top 0.3s ease',

    '@media': {
        [media.mobile]: {
            maxWidth: '100%',
            position: 'static',
            border: 'none',
            borderRadius: '0',
            padding: '24px 0 0',
            gap: '24px',
        },
    },
});

export const buttonWrapper = style({
    '@media': {
        [media.mobile]: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            backgroundColor: vars.color.white,
            padding: '12px 20px calc(12px + env(safe-area-inset-bottom))',
            borderTop: `1px solid ${vars.color.gray['20']}`,
        },
    },
});

export const title = style([
    textStyles.title1Bold,
    {
        color: vars.color.black,
        marginBottom: '20px',
    },
]);

export const priceContent = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
});

/* 일반 정보 (상품금액, 배송비 등) */
export const priceList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
});

export const priceRow = style([
    textStyles.headlineRegular,
    {
        display: 'flex',
        justifyContent: 'space-between',
        color: vars.color.gray['80'],
    },
]);

export const divider = style({
    width: '100%',
    border: 'none',
    borderTop: `1px solid ${vars.color.gray['20']}`,
});

// export const totalPriceRow = style({
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
// });

export const totalPriceTitle = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
    },
]);

export const totalPrice = style([
    textStyles.title1Bold,
    {
        color: vars.color.pink['100'],
    },
]);

/* 하단 버튼 및 기타 */
export const footer = style({
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
});

export const termsList = style([
    {
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
]);

export const termListItem = style([
    textStyles.body1Regular,
    {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: vars.color.gray['60'],
    },
]);

export const termListItemTitle = style([
    textStyles.body1Medium,
    {
        color: vars.color.gray['90'],
    },
]);

export const termDetailButton = style([
    textStyles.caption1Regular,
    {
        textDecoration: 'underline',
        color: vars.color.gray['60'],
    },
]);

export const termAgreeTitle = style([
    textStyles.body1Medium,
    {
        color: vars.color.gray['90'],
    },
]);

export const termCheckboxContainer = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});
