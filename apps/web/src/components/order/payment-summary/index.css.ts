import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    width: '360px',
    position: 'sticky',
    top: 'calc(var(--header-height, 0px) + 20px)',
    border: '1px solid #e1e1e1',
    borderRadius: '12px',
    padding: '30px',
    backgroundColor: '#fff',
    transition: 'top 0.3s ease',
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
});
/* 일반 정보 (상품금액, 배송비 등) */
export const priceList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
});
export const priceRow = style([
    textStyles.body1Medium,
    {
        display: 'flex',
        justifyContent: 'space-between',
        color: vars.color.black,
        // selectors: {
        //     '& dt': { color: vars.color.black },
        //     '& dd': { color: vars.color.black },
        // },
    },
]);
export const divider = style({
    width: '100%',
    border: 'none',
    borderTop: `1px solid ${vars.color.gray['20']}`,
    margin: '24px 0',
});
/* 총 결제 금액 강조 */
export const totalPriceRow = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

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
