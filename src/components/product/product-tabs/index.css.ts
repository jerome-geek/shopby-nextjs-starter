import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const tabsContainer = style({
    display: 'flex',
    marginTop: '32px',
    borderBottom: `1px solid ${vars.color.gray['20']}`,
});

export const tabButton = style([
    textStyles.body1Regular,
    {
        flex: 1,
        padding: '16px 0',
        textAlign: 'center',
        color: vars.color.gray['60'],
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: '2px solid transparent',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    },
]);

export const activeTab = style([
    textStyles.body1Semibold,
    {
        color: vars.color.black,
        borderBottomColor: vars.color.green['100'],
    },
]);

export const tabContentContainer = style({
    paddingTop: '24px',
});

// 상품 설명 Mockup Styles
export const descriptionSection = style({
    backgroundColor: vars.color.gray['10'],
    padding: '24px',
    borderRadius: '12px',
    marginTop: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
});

export const descriptionTitle = style([
    textStyles.headingSemibold,
    {
        color: vars.color.black,
    },
]);

export const descriptionText = style([
    textStyles.body2Regular,
    {
        width: '100%',
        lineHeight: 1.6,
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
    },
]);

globalStyle(`${descriptionText} *`, {
    maxWidth: '100% !important',
});

globalStyle(`${descriptionText} img, ${descriptionText} video`, {
    maxWidth: '100% !important',
    height: 'auto',
    objectFit: 'contain',
});

globalStyle(`${descriptionText} p`, {
    margin: 0,
});
